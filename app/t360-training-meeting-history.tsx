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
const BLUE = '#0284C7';

const FIND_STEPS = [
  {
    title: 'Go to the Meetings tab',
    body: 'Navigate to the Meetings tab from the main navigation.',
  },
  {
    title: 'Scroll down to the Meeting History section',
    body: 'The history archive is located below the active meetings area.',
  },
  {
    title: 'Click View Meeting History',
    body: 'Tap View Meeting History to open the full archive of completed meetings.',
  },
];

const ACCESS_AREAS: { title: string; items: string[]; accent: string; notice?: string }[] = [
  {
    title: 'Meeting details',
    items: ['Date of the meeting', 'Meeting theme or title', 'Meeting agenda overview', 'Participants and attendance'],
    accent: BLUE,
  },
  {
    title: 'Role information',
    items: [
      'Who booked each role',
      'Who performed the role',
      'Role assignments for the meeting',
      'Participation details of members',
    ],
    accent: '#7C3AED',
  },
  {
    title: 'Meeting agendas',
    items: [
      'Previously generated agendas',
      'Meeting schedules and timings',
      'Session structure and flow',
      'How the meeting was organised',
    ],
    accent: '#16A34A',
  },
  {
    title: 'Editing & managing',
    items: [
      'Edit completed meeting records',
      'Update role information',
      'Modify records for corrections',
      'Maintain accurate historical data',
    ],
    accent: '#D97706',
    notice: 'Editing access is limited to authorized users only',
  },
];

const WHY_IMPORTANT = [
  { icon: '🗄️', text: 'Preserve club records over time' },
  { icon: '📊', text: 'Review past participation and engagement' },
  { icon: '👥', text: 'Track member involvement across meetings' },
  { icon: '📈', text: 'Analyse meeting performance and trends' },
  { icon: '📑', text: 'Refer to old agendas and structures' },
  { icon: '🔍', text: 'Maintain transparency and continuity' },
];

const MEMBER_BENEFITS = [
  'Revisit past roles and participation',
  'Review previous meeting agendas',
  'Track their Toastmasters journey over time',
];

const LEADERSHIP_BENEFITS = [
  'Access historical meeting data easily',
  'Verify role participation and records',
  'Maintain proper meeting documentation',
  'Use past records for planning future meetings',
];

function BulletList({ items, bulletColor }: { items: string[]; bulletColor?: string }) {
  return (
    <>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={[styles.bulletMark, bulletColor ? { color: bulletColor } : undefined]} maxFontSizeMultiplier={1.2}>
            ▸
          </Text>
          <Text style={styles.bulletText} maxFontSizeMultiplier={1.25}>
            {item}
          </Text>
        </View>
      ))}
    </>
  );
}

function NumberedSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <>
      {steps.map((step, i) => (
        <View key={step.title} style={styles.stepRow}>
          <View style={styles.stepNum}>
            <Text style={styles.stepNumText} maxFontSizeMultiplier={1.1}>
              {i + 1}
            </Text>
          </View>
          <View style={styles.stepBody}>
            <Text style={styles.stepTitle} maxFontSizeMultiplier={1.25}>
              {step.title}
            </Text>
            <Text style={styles.stepText} maxFontSizeMultiplier={1.25}>
              {step.body}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
}

export default function T360TrainingMeetingHistoryScreen() {
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
        <Text style={styles.headerTitle} maxFontSizeMultiplier={1.25}>
          Meeting History
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
            Meeting History
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            The central repository for all completed club meetings. Access past meeting records, agendas, role
            details, and meeting-related information — all in one place.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Where to find Meeting History
          </Text>
          <NumberedSteps steps={FIND_STEPS} />

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            What is Meeting History?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Meeting History stores all completed meetings conducted within the club. It serves as a historical
            archive where members can review previous meetings and access important meeting data whenever needed.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            What you can access
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Once you open a completed meeting, you will be able to view four key areas:
          </Text>

          {ACCESS_AREAS.map(({ title, items, accent, notice }) => (
            <View key={title} style={[styles.accessCard, { borderLeftColor: accent }]}>
              <Text style={styles.accessTitle} maxFontSizeMultiplier={1.25}>
                {title}
              </Text>
              <BulletList items={items} bulletColor={accent} />
              {notice ? (
                <View style={styles.editNotice}>
                  <Text style={styles.editNoticeText} maxFontSizeMultiplier={1.2}>
                    {notice}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why Meeting History is important
          </Text>
          <View style={styles.whyGrid}>
            {WHY_IMPORTANT.map(({ icon, text }) => (
              <View key={text} style={styles.whyChip}>
                <Text style={styles.whyIcon} maxFontSizeMultiplier={1.3}>
                  {icon}
                </Text>
                <Text style={styles.whyText} maxFontSizeMultiplier={1.2}>
                  {text}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            How it helps members & leadership
          </Text>
          <View style={styles.benefitSplit}>
            <View style={styles.benefitCard}>
              <Text style={styles.benefitCardTitle} maxFontSizeMultiplier={1.25}>
                Members
              </Text>
              <Text style={styles.benefitCardSub} maxFontSizeMultiplier={1.15}>
                Personal history & journey
              </Text>
              <BulletList items={MEMBER_BENEFITS} />
            </View>
            <View style={styles.benefitCard}>
              <Text style={styles.benefitCardTitle} maxFontSizeMultiplier={1.25}>
                Club leadership
              </Text>
              <Text style={styles.benefitCardSub} maxFontSizeMultiplier={1.15}>
                Oversight & planning
              </Text>
              <BulletList items={LEADERSHIP_BENEFITS} bulletColor="#7C3AED" />
            </View>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Final note
          </Text>
          <View style={styles.finalNote}>
            <Text style={styles.finalNoteTitle} maxFontSizeMultiplier={1.25}>
              Meeting History is the club&apos;s historical data repository
            </Text>
            <Text style={styles.finalNoteBody} maxFontSizeMultiplier={1.25}>
              It gives members and leadership complete visibility into completed meetings, role participation,
              agendas, and meeting records — making it easier to manage, review, and preserve the club&apos;s
              journey over time.
            </Text>
          </View>
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
    fontSize: 18 * FS,
    fontWeight: '700',
  },
  headerSpacer: { width: 36, height: 36 },
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
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  kbBadgeText: {
    fontSize: 12 * FS,
    fontWeight: '600',
    color: BLUE,
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
    marginBottom: 22,
  },
  sectionHeading: {
    fontSize: 16 * FS,
    fontWeight: '700',
    color: N.text,
    marginTop: 8,
    marginBottom: 12,
  },
  body: {
    fontSize: 15 * FS,
    lineHeight: 23 * FS,
    color: N.text,
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: N.border,
  },
  stepNum: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumText: {
    fontSize: 12 * FS,
    fontWeight: '700',
    color: BLUE,
  },
  stepBody: { flex: 1 },
  stepTitle: {
    fontSize: 14 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 13 * FS,
    lineHeight: 20 * FS,
    color: N.textSecondary,
  },
  accessCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderLeftWidth: 3,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: N.surface,
  },
  accessTitle: {
    fontSize: 14 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletMark: {
    fontSize: 12 * FS,
    color: BLUE,
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 13 * FS,
    lineHeight: 19 * FS,
    color: N.textSecondary,
  },
  editNotice: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  editNoticeText: {
    fontSize: 12 * FS,
    color: N.textSecondary,
    fontStyle: 'italic',
  },
  whyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  whyChip: {
    width: '47%',
    flexGrow: 1,
    minWidth: 140,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    backgroundColor: N.surface,
  },
  whyIcon: {
    marginBottom: 6,
  },
  whyText: {
    fontSize: 12 * FS,
    lineHeight: 17 * FS,
    color: N.textSecondary,
    textAlign: 'center',
  },
  benefitSplit: {
    gap: 10,
    marginBottom: 8,
  },
  benefitCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    backgroundColor: 'rgba(56, 189, 248, 0.04)',
  },
  benefitCardTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 2,
  },
  benefitCardSub: {
    fontSize: 12 * FS,
    color: N.textSecondary,
    marginBottom: 10,
  },
  finalNote: {
    backgroundColor: 'rgba(56, 189, 248, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
    borderRadius: 12,
    padding: 16,
  },
  finalNoteTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 6,
  },
  finalNoteBody: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
  },
});
