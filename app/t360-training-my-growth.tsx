import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { goBackOrReplace } from '@/lib/trainingBackNavigation';

const N = {
  page: '#FBFBFA',
  surface: '#FFFFFF',
  border: 'rgba(55, 53, 47, 0.09)',
  text: '#37352F',
  textSecondary: '#787774',
};

const FS = 0.9;

const META_PILLS = ['Home tab', '3 tabs', 'Awards & streaks', '4 role tracks'];

const OVERVIEW_TABS: { label: string; title: string; desc: string; accent: 'blue' | 'gold' | 'green' }[] = [
  {
    label: 'Tab 1',
    title: 'My Attendance',
    desc: 'Month-by-month meeting attendance with present and absent counts and a visual progress bar.',
    accent: 'blue',
  },
  {
    label: 'Tab 2',
    title: 'My Awards',
    desc: 'A showcase of all awards won, your best month, win count, roles count, and streak.',
    accent: 'gold',
  },
  {
    label: 'Tab 3',
    title: 'My Role Insights',
    desc: 'A breakdown of roles across Speaking, Leadership, Feedback, and Coordination tracks.',
    accent: 'green',
  },
];

const ATTENDANCE_EXAMPLES: { month: string; pct: string; pctType: 'full' | 'zero'; present: number; absent: number }[] = [
  { month: 'March 2026', pct: '100% attended', pctType: 'full', present: 1, absent: 0 },
  { month: 'May 2026', pct: '0% attended', pctType: 'zero', present: 0, absent: 0 },
];

const AWARD_CATEGORIES: { icon: string; name: string; desc: string }[] = [
  { icon: '✏️', name: 'Best Role Player', desc: 'Awarded for outstanding performance in a general meeting role.' },
  { icon: '🎙️', name: 'Best Ancillary Speaker', desc: 'Awarded for the best supporting speaker segment in a meeting.' },
  { icon: '🧠', name: 'Best Speech Evaluator', desc: 'Awarded for the most constructive and insightful speech evaluation.' },
  { icon: '🔵', name: 'Best Prepared Speaker', desc: 'Awarded for delivering the best prepared speech of the meeting.' },
];

const SPEAKING_ROLES: { name: string; count: string }[] = [
  { name: 'Prepared Speaker', count: '19' },
  { name: 'Educational Speaker', count: '12' },
  { name: 'Keynote Speaker', count: '7' },
  { name: 'Table Topic Speaker', count: '5' },
];

const OTHER_TRACKS = ['Leadership Track', 'Feedback Track', 'Coordination Track'];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Where do I find My Growth in the app?',
    a: 'Go to the Home tab in the bottom navigation bar, then tap My Growth on the home screen.',
  },
  {
    q: 'Why does a month show 0% attendance with Present: 0 and Absent: 0?',
    a: 'This means no meetings were scheduled or recorded for that month. It does not mean you were absent.',
  },
  {
    q: 'How is my attendance percentage calculated?',
    a: 'The percentage is (Present ÷ Total Meetings) × 100 for that month. For example, 1 meeting attended = 100%.',
  },
  {
    q: 'What is the Streak on My Awards?',
    a: 'The Streak represents consecutive meetings in which you won at least one award. Participating in roles keeps it growing.',
  },
  {
    q: 'What does "Your Best Month" mean?',
    a: 'Your Best Month is the calendar month in which you earned the highest number of awards, highlighted at the top of the list.',
  },
  {
    q: 'How do I see awards for a specific month?',
    a: 'On My Awards, scroll below the hero banner. Awards are listed month by month in reverse chronological order.',
  },
  {
    q: 'What are the four Role Tracks in My Role Insights?',
    a: 'Speaking (prepared, educational, keynote, table topic), Leadership, Feedback, and Coordination. Tap each tab to see roles and counts.',
  },
  {
    q: 'What does the number in the shield badge mean on My Role Insights?',
    a: 'The shield badge is your total cumulative count for that role. The green indicator shows only the past 30 days.',
  },
  {
    q: "Can I see the history of a specific role I've played?",
    a: 'Yes. On My Role Insights, tap any role row (› arrow) to open detailed history for that role.',
  },
  {
    q: 'My awards or attendance data looks incorrect — what should I do?',
    a: 'Contact support@t360.in with the meeting date and discrepancy. The administration team can review and correct records.',
  },
];

function TabBanner({ tabLabel, title, body }: { tabLabel: string; title: string; body: string }) {
  return (
    <View style={styles.tabBanner}>
      <Text style={styles.tabBannerLabel} maxFontSizeMultiplier={1.15}>
        {tabLabel}
      </Text>
      <Text style={styles.tabBannerTitle} maxFontSizeMultiplier={1.25}>
        {title}
      </Text>
      <Text style={styles.tabBannerBody} maxFontSizeMultiplier={1.25}>
        {body}
      </Text>
    </View>
  );
}

function OverviewTabCard({
  label,
  title,
  desc,
  accent,
}: {
  label: string;
  title: string;
  desc: string;
  accent: 'blue' | 'gold' | 'green';
}) {
  const borderColor =
    accent === 'blue' ? '#3B5BDB' : accent === 'gold' ? '#F59F00' : '#2F9E44';
  return (
    <View style={[styles.overviewCard, { borderTopColor: borderColor }]}>
      <Text style={styles.overviewLabel} maxFontSizeMultiplier={1.15}>
        {label}
      </Text>
      <Text style={styles.overviewTitle} maxFontSizeMultiplier={1.25}>
        {title}
      </Text>
      <Text style={styles.overviewDesc} maxFontSizeMultiplier={1.25}>
        {desc}
      </Text>
    </View>
  );
}

export default function T360TrainingMyGrowthScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => goBackOrReplace('/t360-training')}
          activeOpacity={0.7}
        >
          <ArrowLeft size={Math.round(22 * FS)} color={N.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} maxFontSizeMultiplier={1.3}>
          My Growth
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.kbBadge}>
            <Text style={styles.kbBadgeText} maxFontSizeMultiplier={1.2}>
              T360 · Knowledge base
            </Text>
          </View>
          <Text style={styles.docTitle} maxFontSizeMultiplier={1.35}>
            My Growth
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Track your meeting attendance, celebrate your awards, and explore your progress across speaking and
            leadership roles — all in one place.
          </Text>

          <View style={styles.metaWrap}>
            {META_PILLS.map((pill) => (
              <View key={pill} style={styles.metaPill}>
                <Text style={styles.metaPillText} maxFontSizeMultiplier={1.15}>
                  {pill}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            How to access My Growth
          </Text>
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              Via the Home tab
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              Tap the Home tab in the bottom navigation bar. On the home screen, tap My Growth. The screen opens
              defaulting to the My Attendance tab.
            </Text>
          </View>
          <View style={styles.calloutInfo}>
            <Text style={styles.calloutInfoText} maxFontSizeMultiplier={1.25}>
              My Growth is a personal dashboard — it shows data specific to your account and your participation in
              club meetings and roles.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Overview
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            My Growth is divided into three tabs, each focusing on a different dimension of your progress:
          </Text>
          {OVERVIEW_TABS.map((tab) => (
            <OverviewTabCard key={tab.title} {...tab} />
          ))}

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            My Attendance
          </Text>
          <TabBanner
            tabLabel="Tab 1 of 3"
            title="My Attendance"
            body="A monthly breakdown of your meeting attendance — how many sessions you were present for and how many you missed."
          />
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              What you will see
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              Each month is displayed as a card with a progress bar, an attendance percentage badge (for example, 100%
              attended or 0% attended), and a summary showing Present and Absent counts.
            </Text>
          </View>
          <Text style={styles.exampleLabel} maxFontSizeMultiplier={1.2}>
            Example entries
          </Text>
          {ATTENDANCE_EXAMPLES.map((row) => (
            <View key={row.month} style={styles.attendanceRow}>
              <View style={styles.attendanceHeader}>
                <Text style={styles.attendanceMonth} maxFontSizeMultiplier={1.25}>
                  {row.month}
                </Text>
                <View
                  style={[
                    styles.attendancePct,
                    row.pctType === 'full' ? styles.attendancePctFull : styles.attendancePctZero,
                  ]}
                >
                  <Text
                    style={[
                      styles.attendancePctText,
                      row.pctType === 'full' ? styles.attendancePctTextFull : styles.attendancePctTextZero,
                    ]}
                    maxFontSizeMultiplier={1.15}
                  >
                    {row.pct}
                  </Text>
                </View>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: row.pctType === 'full' ? '100%' : '0%' },
                  ]}
                />
              </View>
              <Text style={styles.attendanceCounts} maxFontSizeMultiplier={1.2}>
                Present: {row.present} · Absent: {row.absent}
              </Text>
            </View>
          ))}
          <View style={styles.calloutInfo}>
            <Text style={styles.calloutInfoText} maxFontSizeMultiplier={1.25}>
              Months are listed in reverse chronological order. Attendance is updated automatically after each meeting
              is marked.
            </Text>
          </View>
          <View style={styles.calloutWarn}>
            <Text style={styles.calloutWarnText} maxFontSizeMultiplier={1.25}>
              A month showing 0% attended with Present: 0 and Absent: 0 means no meetings were scheduled or recorded —
              not necessarily that you were absent.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            My Awards
          </Text>
          <TabBanner
            tabLabel="Tab 2 of 3"
            title="My Awards"
            body="A celebratory overview of every award you have earned, organised by month, with highlights for your best performance period."
          />
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              Hero banner
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              At the top, a banner displays your profile picture, name, total Awards Won, and a motivational tagline
              (Consistency creates champions). Below, three quick stats are shown inline.
            </Text>
          </View>
          <View style={styles.twoCol}>
            <View style={[styles.statCard, styles.statCardGold]}>
              <Text style={styles.statLabel} maxFontSizeMultiplier={1.15}>
                Total wins
              </Text>
              <Text style={styles.statValue} maxFontSizeMultiplier={1.3}>
                25
              </Text>
              <Text style={styles.statDesc} maxFontSizeMultiplier={1.2}>
                Cumulative awards across all meetings.
              </Text>
            </View>
            <View style={[styles.statCard, styles.statCardBlue]}>
              <Text style={styles.statLabel} maxFontSizeMultiplier={1.15}>
                Roles played
              </Text>
              <Text style={styles.statValue} maxFontSizeMultiplier={1.3}>
                4
              </Text>
              <Text style={styles.statDesc} maxFontSizeMultiplier={1.2}>
                Distinct roles in which you received awards.
              </Text>
            </View>
          </View>
          <View style={styles.streakBox}>
            <Text style={styles.streakTitle} maxFontSizeMultiplier={1.25}>
              Streak
            </Text>
            <Text style={styles.streakBody} maxFontSizeMultiplier={1.25}>
              Your current consecutive winning streak across meetings. Keep participating in roles to maintain and grow
              your streak.
            </Text>
          </View>
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              Your best month
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              Highlighted below the stats, this shows the month in which you won the most awards — for example, April
              2026 — 17 wins.
            </Text>
          </View>
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              Award breakdown by month
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              All awards are listed month by month with total wins and specific award categories. Trophy icons represent
              individual wins.
            </Text>
          </View>
          <Text style={styles.exampleLabel} maxFontSizeMultiplier={1.2}>
            Award categories you may win
          </Text>
          {AWARD_CATEGORIES.map(({ icon, name, desc }) => (
            <View key={name} style={styles.awardEntry}>
              <Text style={styles.awardIcon} maxFontSizeMultiplier={1.3}>
                {icon}
              </Text>
              <View style={styles.awardTextWrap}>
                <Text style={styles.awardName} maxFontSizeMultiplier={1.25}>
                  {name}
                </Text>
                <Text style={styles.awardDesc} maxFontSizeMultiplier={1.25}>
                  {desc}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.calloutOk}>
            <Text style={styles.calloutOkText} maxFontSizeMultiplier={1.25}>
              Each trophy icon next to an award category represents one win. Multiple trophies means you won that award
              multiple times within the same month.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            My Role Insights
          </Text>
          <TabBanner
            tabLabel="Tab 3 of 3"
            title="My Role Insights"
            body="A detailed breakdown of all roles you have taken on, organised into four tracks, with total counts and recent activity."
          />
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              What are tracks?
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              Roles are grouped into four tracks based on their nature. Tap any track tab to switch between them and see
              roles you have played under that category.
            </Text>
          </View>
          <View style={styles.trackCard}>
            <Text style={styles.trackTitle} maxFontSizeMultiplier={1.25}>
              Speaking track
            </Text>
            {SPEAKING_ROLES.map(({ name, count }) => (
              <View key={name} style={styles.trackRoleRow}>
                <Text style={styles.trackRoleName} maxFontSizeMultiplier={1.25}>
                  {name}
                </Text>
                <View style={styles.trackRoleCount}>
                  <Text style={styles.trackRoleCountText} maxFontSizeMultiplier={1.15}>
                    {count}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          {OTHER_TRACKS.map((track) => (
            <View key={track} style={styles.trackCard}>
              <Text style={styles.trackTitle} maxFontSizeMultiplier={1.25}>
                {track}
              </Text>
              <Text style={styles.trackPlaceholder} maxFontSizeMultiplier={1.25}>
                Tap tab to view roles
              </Text>
            </View>
          ))}
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              Recent activity indicator
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              Each role entry shows a green indicator for how many times you played that role in the past 30 days (for
              example, +9 in the last 30 days).
            </Text>
          </View>
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              Tapping a role
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              Each role row has a › arrow indicating it is tappable. Tapping opens a detail view with more information
              about your history in that role.
            </Text>
          </View>
          <View style={styles.calloutInfo}>
            <Text style={styles.calloutInfoText} maxFontSizeMultiplier={1.25}>
              The shield badge number is your total cumulative count for that role. The green recent activity indicator
              shows only the past 30 days.
            </Text>
          </View>

          <Text style={styles.faqHeading} maxFontSizeMultiplier={1.3}>
            Frequently asked questions
          </Text>
          {FAQS.map(({ q, a }, i) => (
            <View key={q} style={[styles.faqBlock, i > 0 && styles.faqBlockBorder]}>
              <View style={styles.faqQRow}>
                <View style={styles.faqQBadge}>
                  <Text style={styles.faqQBadgeText} maxFontSizeMultiplier={1.1}>
                    Q{i + 1}
                  </Text>
                </View>
                <Text style={styles.faqQ} maxFontSizeMultiplier={1.25}>
                  {q}
                </Text>
              </View>
              <Text style={styles.faqA} maxFontSizeMultiplier={1.25}>
                {a}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: N.page,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: N.text,
    fontSize: 20 * FS,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 36,
    height: 36,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  card: {
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 14,
    padding: 20,
  },
  kbBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  kbBadgeText: {
    fontSize: 12 * FS,
    fontWeight: '600',
    color: '#0369A1',
  },
  docTitle: {
    fontSize: 22 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 8,
    letterSpacing: -0.3 * FS,
  },
  lead: {
    fontSize: 15 * FS,
    lineHeight: 22 * FS,
    color: N.textSecondary,
    marginBottom: 14,
  },
  metaWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  metaPill: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },
  metaPillText: {
    fontSize: 12 * FS,
    fontWeight: '600',
    color: '#2563C4',
  },
  sectionHeading: {
    fontSize: 16 * FS,
    fontWeight: '700',
    color: N.text,
    marginTop: 8,
    marginBottom: 8,
  },
  body: {
    fontSize: 15 * FS,
    lineHeight: 23 * FS,
    color: N.text,
    marginBottom: 12,
  },
  miniCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: 'rgba(55, 53, 47, 0.02)',
  },
  miniCardTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 6,
  },
  miniCardBody: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
  },
  calloutInfo: {
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  calloutInfoText: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: '#1D4ED8',
    fontWeight: '500',
  },
  calloutWarn: {
    backgroundColor: 'rgba(234, 179, 8, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.35)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  calloutWarnText: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: '#7C5A00',
    fontWeight: '500',
  },
  calloutOk: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.22)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  calloutOkText: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: '#15803D',
    fontWeight: '500',
  },
  overviewCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    backgroundColor: N.surface,
    borderTopWidth: 3,
  },
  overviewLabel: {
    fontSize: 11 * FS,
    fontWeight: '600',
    color: N.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  overviewTitle: {
    fontSize: 17 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 6,
  },
  overviewDesc: {
    fontSize: 13 * FS,
    lineHeight: 20 * FS,
    color: N.textSecondary,
  },
  tabBanner: {
    backgroundColor: '#1A3A6E',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  },
  tabBannerLabel: {
    fontSize: 11 * FS,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  tabBannerTitle: {
    fontSize: 18 * FS,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  tabBannerBody: {
    fontSize: 13 * FS,
    lineHeight: 20 * FS,
    color: 'rgba(255,255,255,0.78)',
  },
  exampleLabel: {
    fontSize: 12 * FS,
    fontWeight: '600',
    color: N.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 4,
  },
  attendanceRow: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: N.surface,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  attendanceMonth: {
    fontSize: 14 * FS,
    fontWeight: '600',
    color: N.text,
  },
  attendancePct: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  attendancePctFull: {
    backgroundColor: '#D3F9D8',
  },
  attendancePctZero: {
    backgroundColor: '#F1F3F5',
  },
  attendancePctText: {
    fontSize: 12 * FS,
    fontWeight: '600',
  },
  attendancePctTextFull: {
    color: '#2F9E44',
  },
  attendancePctTextZero: {
    color: N.textSecondary,
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#E9ECEF',
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#3B5BDB',
  },
  attendanceCounts: {
    fontSize: 12 * FS,
    color: N.textSecondary,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 12,
    padding: 14,
    borderTopWidth: 3,
  },
  statCardGold: {
    borderTopColor: '#F59F00',
  },
  statCardBlue: {
    borderTopColor: '#3B5BDB',
  },
  statLabel: {
    fontSize: 11 * FS,
    fontWeight: '600',
    color: N.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 4,
  },
  statDesc: {
    fontSize: 12 * FS,
    lineHeight: 18 * FS,
    color: N.textSecondary,
  },
  streakBox: {
    backgroundColor: '#FFF9DB',
    borderWidth: 1,
    borderColor: '#FFD43B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  streakTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: '#7C5A00',
    marginBottom: 4,
  },
  streakBody: {
    fontSize: 13 * FS,
    lineHeight: 20 * FS,
    color: '#945000',
  },
  awardEntry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: N.surface,
  },
  awardIcon: {
    fontSize: 22 * FS,
  },
  awardTextWrap: {
    flex: 1,
  },
  awardName: {
    fontSize: 14 * FS,
    fontWeight: '600',
    color: N.text,
    marginBottom: 3,
  },
  awardDesc: {
    fontSize: 13 * FS,
    lineHeight: 19 * FS,
    color: N.textSecondary,
  },
  trackCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: N.surface,
  },
  trackTitle: {
    fontSize: 14 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 10,
  },
  trackRoleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: N.border,
  },
  trackRoleName: {
    fontSize: 13 * FS,
    fontWeight: '500',
    color: N.text,
    flex: 1,
  },
  trackRoleCount: {
    backgroundColor: 'rgba(59, 91, 219, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  trackRoleCountText: {
    fontSize: 12 * FS,
    fontWeight: '700',
    color: '#3B5BDB',
  },
  trackPlaceholder: {
    fontSize: 13 * FS,
    fontStyle: 'italic',
    color: N.textSecondary,
  },
  faqHeading: {
    fontSize: 16 * FS,
    fontWeight: '700',
    color: N.text,
    marginTop: 12,
    marginBottom: 12,
  },
  faqBlock: {
    paddingVertical: 12,
  },
  faqBlockBorder: {
    borderTopWidth: 1,
    borderTopColor: N.border,
  },
  faqQRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  faqQBadge: {
    backgroundColor: 'rgba(14, 165, 233, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  faqQBadgeText: {
    fontSize: 11 * FS,
    fontWeight: '800',
    color: '#0369A1',
  },
  faqQ: {
    flex: 1,
    fontSize: 15 * FS,
    fontWeight: '700',
    lineHeight: 22 * FS,
    color: N.text,
  },
  faqA: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
  },
});
