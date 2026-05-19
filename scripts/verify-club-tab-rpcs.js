#!/usr/bin/env node
/**
 * Verify Club tab Supabase RPCs exist and measure latency.
 *
 * Usage:
 *   npm run verify:club-rpcs
 *
 * Optional .env:
 *   VERIFY_CLUB_ID=<uuid>     — club to test (else first authenticated club)
 *   VERIFY_EMAIL / VERIFY_PASSWORD — sign in (RPCs require auth.uid())
 */

const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

loadEnv();

const { createClient } = require('@supabase/supabase-js');

const url = process.env.EXPO_PUBLIC_SUPABASE_WEB_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const email = process.env.VERIFY_EMAIL;
const password = process.env.VERIFY_PASSWORD;
const clubIdEnv = process.env.VERIFY_CLUB_ID;

if (!url || !anonKey) {
  console.error('Missing EXPO_PUBLIC_SUPABASE_URL (or WEB_URL) and EXPO_PUBLIC_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(url, anonKey);

function rpcMissing(error) {
  const msg = (error?.message || '').toLowerCase();
  return (
    msg.includes('could not find the function') ||
    msg.includes('does not exist') ||
    error?.code === 'PGRST202'
  );
}

async function timed(label, fn) {
  const t0 = Date.now();
  const result = await fn();
  return { label, ms: Date.now() - t0, ...result };
}

async function main() {
  console.log('Club tab RPC verification');
  console.log('  URL:', url);
  console.log('');

  if (email && password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Sign-in failed:', error.message);
      console.error('Set VERIFY_EMAIL and VERIFY_PASSWORD in .env, or run without them (RPCs need auth).');
      process.exit(1);
    }
    console.log('Signed in as', email);
  } else {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      console.warn(
        'No session — RPCs return NULL without auth. Add VERIFY_EMAIL and VERIFY_PASSWORD to .env for a full test.\n'
      );
    }
  }

  let clubId = clubIdEnv;
  if (!clubId) {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData?.user?.id;
    if (uid) {
      const { data: rels } = await supabase
        .from('app_club_user_relationship')
        .select('club_id')
        .eq('user_id', uid)
        .eq('is_authenticated', true)
        .limit(1);
      clubId = rels?.[0]?.club_id;
    }
  }

  if (!clubId) {
    console.error('No club id. Set VERIFY_CLUB_ID in .env or sign in with VERIFY_EMAIL / VERIFY_PASSWORD.');
    process.exit(1);
  }

  console.log('Club id:', clubId);
  console.log('');

  const migrations = [
    'supabase/migrations/20260413130500_club_tab_critical_snapshot_rpc.sql',
    'supabase/migrations/20260414160000_club_tab_secondary_snapshot_rpc.sql',
    'supabase/migrations/20260518120000_fix_club_timer_report_prepared_speaker.sql (may redefine secondary)',
  ];

  console.log('Expected migrations in repo:');
  migrations.forEach((m) => console.log('  -', m));
  console.log('Apply with: supabase db push  (or deploy SQL in Supabase Dashboard)\n');

  const tests = [
    {
      name: 'get_club_landing_critical_snapshot',
      run: () =>
        supabase.rpc('get_club_landing_critical_snapshot', {
          p_club_id: clubId,
          p_member_limit: 24,
        }),
    },
    {
      name: 'get_club_tab_secondary_snapshot',
      run: () =>
        supabase.rpc('get_club_tab_secondary_snapshot', {
          p_club_id: clubId,
          p_months: 6,
        }),
    },
  ];

  let failed = 0;

  for (const test of tests) {
    const { ms, error, data } = await timed(test.name, test.run);
    if (error) {
      failed += 1;
      console.log(`❌ ${test.name} (${ms} ms)`);
      console.log(`   ${error.message}`);
      if (rpcMissing(error)) {
        console.log('   → RPC not deployed. Run migrations listed above.');
      } else if ((error.message || '').includes('JWT') || error.code === '42501') {
        console.log('   → Auth/permission issue. Sign in with VERIFY_EMAIL / VERIFY_PASSWORD.');
      }
    } else {
      const size =
        data && typeof data === 'object'
          ? JSON.stringify(data).length
          : data == null
            ? 0
            : String(data).length;
      console.log(`✅ ${test.name} (${ms} ms, ~${size} bytes JSON)`);
      if (data == null) {
        console.log('   (null payload — often means auth.uid() is null or user is not a club member)');
      }
    }
  }

  console.log('');
  if (failed > 0) {
    console.log('Some checks failed. Fix migrations/auth, then re-run.');
    process.exit(1);
  }
  console.log('All RPCs reachable. Slow Club tab? Check network and [club-perf] logs in the app.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
