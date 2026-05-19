/**
 * Club tab meeting insights stats (rolling window). Prefetched with Club tab session.
 */

import { supabase } from '@/lib/supabase';

export type ClubStatsCounts = {
  speeches: number;
  educationalSpeeches: number;
  tableTopicSpeeches: number;
  meetingsConducted: number;
  themes: number;
  evaluations: number;
};

/** Default period on Club tab — prefetch this window in the background. */
export const DEFAULT_CLUB_STATS_PERIOD_DAYS = 180;

export const CLUB_STATS_PREFETCH_PERIODS = [30, 90, 180] as const;

export function emptyClubStats(): ClubStatsCounts {
  return {
    speeches: 0,
    educationalSpeeches: 0,
    tableTopicSpeeches: 0,
    meetingsConducted: 0,
    themes: 0,
    evaluations: 0,
  };
}

function formatLocalYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function meetingDateRangeRollingDays(daysBack: number): { from: string; to: string } {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - daysBack);
  return { from: formatLocalYmd(from), to: formatLocalYmd(to) };
}

async function countThemesForMeetings(clubId: string, meetingIds: string[]): Promise<number> {
  if (meetingIds.length === 0) return 0;
  const CHUNK = 100;
  const chunks: string[][] = [];
  for (let i = 0; i < meetingIds.length; i += CHUNK) {
    chunks.push(meetingIds.slice(i, i + CHUNK));
  }
  const counts = await Promise.all(
    chunks.map(async (chunk) => {
      const { count, error } = await supabase
        .from('toastmaster_meeting_data')
        .select('id', { count: 'exact', head: true })
        .eq('club_id', clubId)
        .in('meeting_id', chunk)
        .not('theme_of_the_day', 'is', null)
        .neq('theme_of_the_day', '');
      if (error) {
        console.warn('Club stats theme count:', error.message);
        return 0;
      }
      return count ?? 0;
    })
  );
  return counts.reduce((a, b) => a + b, 0);
}

/** Club-wide counts from completed roles / meetings in the rolling last `daysBack` calendar days. */
export async function fetchClubStatsRollingDays(
  clubId: string,
  daysBack: number
): Promise<ClubStatsCounts> {
  const empty = emptyClubStats();

  try {
    const { from: meetingDateStart, to: meetingDateEnd } = meetingDateRangeRollingDays(daysBack);
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - daysBack);
    const rolesCreatedAtGte = start.toISOString();

    const rolesBase = () =>
      supabase
        .from('app_meeting_roles_management')
        .select('id', { count: 'exact', head: true })
        .eq('club_id', clubId)
        .eq('is_completed', true)
        .gte('created_at', rolesCreatedAtGte);

    const [speechesR, edR, ttR, evalR, meetingsInRangeR] = await Promise.all([
      rolesBase().eq('role_classification', 'Prepared Speaker'),
      rolesBase().eq('role_classification', 'Educational speaker'),
      rolesBase().eq('role_classification', 'On-the-Spot Speaking'),
      rolesBase().in('role_classification', ['Speech evaluvator', 'Master evaluvator', 'speech_evaluator']),
      supabase
        .from('app_club_meeting')
        .select('id')
        .eq('club_id', clubId)
        .gte('meeting_date', meetingDateStart)
        .lte('meeting_date', meetingDateEnd),
    ]);

    if (speechesR.error) console.warn('Club stats speeches:', speechesR.error.message);
    if (edR.error) console.warn('Club stats educational:', edR.error.message);
    if (ttR.error) console.warn('Club stats table topics:', ttR.error.message);
    if (evalR.error) console.warn('Club stats evaluations:', evalR.error.message);
    if (meetingsInRangeR.error) console.warn('Club stats meetings list:', meetingsInRangeR.error.message);

    const meetingIds =
      !meetingsInRangeR.error && meetingsInRangeR.data?.length
        ? meetingsInRangeR.data.map((r) => r.id)
        : [];
    const meetingsConducted = meetingsInRangeR.error ? 0 : (meetingsInRangeR.data?.length ?? 0);
    const themes = meetingsInRangeR.error ? 0 : await countThemesForMeetings(clubId, meetingIds);

    return {
      speeches: speechesR.error ? 0 : (speechesR.count ?? 0),
      educationalSpeeches: edR.error ? 0 : (edR.count ?? 0),
      tableTopicSpeeches: ttR.error ? 0 : (ttR.count ?? 0),
      meetingsConducted,
      themes,
      evaluations: evalR.error ? 0 : (evalR.count ?? 0),
    };
  } catch (e) {
    console.warn('Club stats load error:', e);
    return empty;
  }
}

/** Prefetch common stats windows (fire-and-forget friendly). */
export async function prefetchClubStatsByDays(
  clubId: string,
  periods: readonly number[] = CLUB_STATS_PREFETCH_PERIODS
): Promise<Record<number, ClubStatsCounts>> {
  const out: Record<number, ClubStatsCounts> = {};
  await Promise.all(
    periods.map(async (days) => {
      out[days] = await fetchClubStatsRollingDays(clubId, days);
    })
  );
  return out;
}
