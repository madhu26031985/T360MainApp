import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTrainingKbBack } from '@/lib/trainingBackNavigation';

const N = {
  page: '#FBFBFA',
  surface: '#FFFFFF',
  border: 'rgba(55, 53, 47, 0.09)',
  text: '#37352F',
  textSecondary: '#787774',
};

const FS = 0.9;
const GREEN = '#16A34A';

const DASH_AREAS: { title: string; desc: string }[] = [
  { title: 'My Attendance', desc: 'Month-wise participation' },
  { title: 'My Awards', desc: 'Recognitions & milestones' },
  { title: 'My Role Insights', desc: 'Role intelligence dashboard' },
];

const FIND_STEPS = [
  {
    title: 'Go to the My Growth section from the application',
    body: 'Access it from the main navigation in T360.',
  },
  {
    title: 'You will see three main areas',
    body: 'My Attendance, My Awards, and My Role Insights.',
  },
];

const ATTENDANCE_VIEW = [
  'Number of meetings attended',
  'Number of absences',
  'Monthly attendance percentage',
  'Attendance consistency over time',
];

const ATTENDANCE_WHY = [
  'Stay connected with the club',
  'Improve your speaking confidence',
  'Participate actively in club activities',
  'Maintain consistency in your journey',
];

const AWARDS_ITEMS: { icon: string; label: string }[] = [
  { icon: '🥇', label: 'Awards won' },
  { icon: '📆', label: 'Best performance month' },
  { icon: '🔢', label: 'Total wins' },
  { icon: '🔥', label: 'Streaks & achievements' },
  { icon: '🎭', label: 'Role-related recognitions' },
  { icon: '⭐', label: 'Consistency highlights' },
];

const AWARDS_USEFUL = [
  'Track your accomplishments over time',
  'Stay motivated through recognition',
  'Understand and celebrate your strengths',
  'Celebrate progress and consistency',
];

const ROLE_TRACKS: { title: string; roles: string[]; accent: string }[] = [
  {
    title: 'Speaking track',
    roles: ['Prepared Speaker', 'Table Topic Speaker', 'Educational Speaker', 'Keynote Speaker'],
    accent: '#EF4444',
  },
  {
    title: 'Leadership track',
    roles: ['Leadership-oriented roles', 'Meeting responsibilities', 'Club contributions'],
    accent: '#38BDF8',
  },
  {
    title: 'Feedback track',
    roles: ['Evaluation roles', 'Feedback-related duties', 'Communication & mentoring'],
    accent: GREEN,
  },
  {
    title: 'Coordination track',
    roles: ['Meeting management roles', 'Coordination duties', 'Operational skills'],
    accent: '#F59E0B',
  },
];

const ROLE_METRICS: { icon: string; label: string }[] = [
  { icon: '🔢', label: 'Times performed' },
  { icon: '🕐', label: 'Last performed date' },
  { icon: '📆', label: 'Last 30 days activity' },
  { icon: '🔄', label: 'Consistency score' },
  { icon: '📈', label: 'Performance trends' },
];

const INTEL_SUGGESTIONS = [
  'Which roles you perform frequently',
  'Which skills you are building consistently',
  'Which roles you may need to explore next',
  'Areas to improve your participation balance',
];

const WHY_GROWTH: { icon: string; text: string }[] = [
  { icon: '📏', text: 'Measure consistency across meetings and roles' },
  { icon: '📈', text: 'Track progress on your Toastmasters journey' },
  { icon: '⚖️', text: 'Build balanced Toastmasters skills across all tracks' },
  { icon: '🔎', text: 'Identify growth opportunities and unexplored roles' },
  { icon: '🗺️', text: 'Plan your next role effectively using data' },
  { icon: '🚀', text: 'Stay motivated through achievements and insights' },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bulletMark} maxFontSizeMultiplier={1.2}>
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

function FeatureCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureHeader}>
        <Text style={styles.featureTitle} maxFontSizeMultiplier={1.25}>
          {title}
        </Text>
        <Text style={styles.featureSubtitle} maxFontSizeMultiplier={1.25}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.featureBody}>{children}</View>
    </View>
  );
}

export default function T360TrainingMyGrowthScreen() {
  const onTrainingKbBack = useTrainingKbBack();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onTrainingKbBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={Math.round(22 * FS)} color={N.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} maxFontSizeMultiplier={1.25}>
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
            Track your Toastmasters journey through attendance, awards, and role performance insights. Your
            personal growth dashboard gives you data-driven visibility into your meeting participation and role
            progress.
          </Text>

          <View style={styles.dashRow}>
            {DASH_AREAS.map(({ title, desc }) => (
              <View key={title} style={styles.dashPill}>
                <Text style={styles.dashTitle} maxFontSizeMultiplier={1.2}>
                  {title}
                </Text>
                <Text style={styles.dashDesc} maxFontSizeMultiplier={1.15}>
                  {desc}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Where to find My Growth
          </Text>
          <NumberedSteps steps={FIND_STEPS} />

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            1. My Attendance
          </Text>
          <FeatureCard
            title="Meeting participation tracker"
            subtitle="Track your meeting participation month-wise and monitor your consistency over time."
          >
            <View style={styles.twoCol}>
              <View style={styles.subBlock}>
                <Text style={styles.subLabel} maxFontSizeMultiplier={1.2}>
                  What you can view
                </Text>
                <BulletList items={ATTENDANCE_VIEW} />
              </View>
              <View style={styles.subBlock}>
                <Text style={styles.subLabel} maxFontSizeMultiplier={1.2}>
                  Why attendance matters
                </Text>
                <BulletList items={ATTENDANCE_WHY} />
              </View>
            </View>
          </FeatureCard>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            2. My Awards
          </Text>
          <FeatureCard
            title="Recognitions & milestones"
            subtitle="Displays all the awards and recognitions you have received during meetings — your milestones in a single view."
          >
            <View style={styles.awardsGrid}>
              {AWARDS_ITEMS.map(({ icon, label }) => (
                <View key={label} style={styles.awardItem}>
                  <Text style={styles.awardIcon} maxFontSizeMultiplier={1.3}>
                    {icon}
                  </Text>
                  <Text style={styles.awardLabel} maxFontSizeMultiplier={1.15}>
                    {label}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.twoCol}>
              <View style={styles.subBlock}>
                <Text style={styles.subLabel} maxFontSizeMultiplier={1.2}>
                  Why this is useful
                </Text>
                <BulletList items={AWARDS_USEFUL} />
              </View>
              <View style={[styles.subBlock, styles.rememberBlock]}>
                <Text style={[styles.subLabel, styles.rememberLabel]} maxFontSizeMultiplier={1.2}>
                  Remember
                </Text>
                <BulletList
                  items={[
                    'Awards act as milestones in your growth journey',
                    'Each recognition encourages continuous improvement',
                  ]}
                />
              </View>
            </View>
          </FeatureCard>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            3. My Role Insights
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The most powerful feature inside My Growth — your personal role intelligence dashboard. It spans
            four major tracks:
          </Text>

          {ROLE_TRACKS.map(({ title, roles, accent }) => (
            <View key={title} style={[styles.trackCard, { borderLeftColor: accent }]}>
              <Text style={styles.trackTitle} maxFontSizeMultiplier={1.25}>
                {title}
              </Text>
              {roles.map((role) => (
                <Text key={role} style={styles.trackRole} maxFontSizeMultiplier={1.2}>
                  · {role}
                </Text>
              ))}
            </View>
          ))}

          <FeatureCard
            title="What role insights shows"
            subtitle="For each role across all four tracks, you get a detailed performance picture."
          >
            <View style={styles.metricsGrid}>
              {ROLE_METRICS.map(({ icon, label }) => (
                <View key={label} style={styles.metricChip}>
                  <Text style={styles.metricIcon} maxFontSizeMultiplier={1.2}>
                    {icon}
                  </Text>
                  <Text style={styles.metricLabel} maxFontSizeMultiplier={1.15}>
                    {label}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.intelCallout}>
              <Text style={styles.intelTitle} maxFontSizeMultiplier={1.25}>
                Intelligent role suggestions
              </Text>
              <BulletList items={INTEL_SUGGESTIONS} />
            </View>
            <Text style={styles.bodyMuted} maxFontSizeMultiplier={1.25}>
              This helps members choose their next role strategically instead of randomly.
            </Text>
          </FeatureCard>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why My Growth is important
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            My Growth acts as your personal growth intelligence dashboard — helping you:
          </Text>
          <View style={styles.whyGrid}>
            {WHY_GROWTH.map(({ icon, text }) => (
              <View key={text} style={styles.whyCard}>
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
            Final note
          </Text>
          <View style={styles.finalNote}>
            <Text style={styles.finalNoteTitle} maxFontSizeMultiplier={1.25}>
              My Growth is more than just statistics
            </Text>
            <Text style={styles.finalNoteBody} maxFontSizeMultiplier={1.25}>
              It is a reflection of your Toastmasters journey. By regularly reviewing your attendance, awards, and
              role insights, you can make better decisions about your next steps, improve consistently, and become
              a well-rounded communicator and leader.
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
    backgroundColor: 'rgba(22, 163, 74, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  kbBadgeText: {
    fontSize: 12 * FS,
    fontWeight: '600',
    color: GREEN,
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
    marginBottom: 16,
  },
  dashRow: {
    gap: 8,
    marginBottom: 20,
  },
  dashPill: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: 'rgba(22, 163, 74, 0.04)',
    marginBottom: 6,
  },
  dashTitle: {
    fontSize: 14 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 2,
  },
  dashDesc: {
    fontSize: 12 * FS,
    color: N.textSecondary,
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
  bodyMuted: {
    fontSize: 13 * FS,
    lineHeight: 20 * FS,
    color: N.textSecondary,
    marginTop: 8,
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
    backgroundColor: 'rgba(22, 163, 74, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumText: {
    fontSize: 12 * FS,
    fontWeight: '700',
    color: GREEN,
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
  featureCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: N.surface,
  },
  featureHeader: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: N.border,
    backgroundColor: 'rgba(55, 53, 47, 0.02)',
  },
  featureTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 13 * FS,
    lineHeight: 19 * FS,
    color: N.textSecondary,
  },
  featureBody: {
    padding: 14,
  },
  twoCol: {
    gap: 12,
  },
  subBlock: {
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 11 * FS,
    fontWeight: '700',
    color: N.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  rememberBlock: {
    backgroundColor: 'rgba(245, 158, 11, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 10,
    padding: 12,
  },
  rememberLabel: {
    color: '#D97706',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletMark: {
    fontSize: 12 * FS,
    color: GREEN,
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 13 * FS,
    lineHeight: 19 * FS,
    color: N.textSecondary,
  },
  awardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  awardItem: {
    width: '30%',
    flexGrow: 1,
    minWidth: 90,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 9,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(55, 53, 47, 0.02)',
  },
  awardIcon: {
    marginBottom: 4,
  },
  awardLabel: {
    fontSize: 11 * FS,
    color: N.textSecondary,
    textAlign: 'center',
    lineHeight: 15 * FS,
  },
  trackCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderLeftWidth: 3,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    backgroundColor: N.surface,
  },
  trackTitle: {
    fontSize: 14 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  trackRole: {
    fontSize: 13 * FS,
    color: N.textSecondary,
    marginBottom: 2,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metricChip: {
    width: '30%',
    flexGrow: 1,
    minWidth: 95,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 9,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(55, 53, 47, 0.02)',
  },
  metricIcon: {
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11 * FS,
    color: N.textSecondary,
    textAlign: 'center',
    lineHeight: 15 * FS,
  },
  intelCallout: {
    backgroundColor: 'rgba(108, 99, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.2)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  intelTitle: {
    fontSize: 14 * FS,
    fontWeight: '700',
    color: '#7C3AED',
    marginBottom: 8,
  },
  whyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  whyCard: {
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
  finalNote: {
    backgroundColor: 'rgba(22, 163, 74, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.2)',
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
