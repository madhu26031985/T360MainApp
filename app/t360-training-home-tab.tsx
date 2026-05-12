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

const BENEFITS: { title: string; body: string }[] = [
  {
    title: 'Quick Meeting Access',
    body: 'View upcoming meeting details and stay prepared.',
  },
  {
    title: 'Easy Role Participation',
    body: 'Book meeting roles and participate actively.',
  },
  {
    title: 'Track Personal Growth',
    body: 'Monitor attendance, speeches, evaluations, and role participation.',
  },
  {
    title: 'Stay Organized',
    body: 'View tasks, reminders, and meeting updates in one place.',
  },
  {
    title: 'Club Engagement',
    body: 'Participate in agendas, voting, and club activities seamlessly.',
  },
];

const PROFILE_CHECKS = [
  'View your profile information',
  'See your current club details',
  'Switch between clubs by clicking the dropdown icon available on the right side of the club name on the Home tab',
];

const GROWTH_METRICS = [
  'Meeting attendance',
  'Speeches completed',
  'Roles completed',
  'Evaluations given',
  'Role insights and participation trends',
];

const TASK_EXAMPLES = [
  'Open meeting roles',
  'Upcoming responsibilities',
  'Smart reminders and participation suggestions',
];

const MEETING_DETAIL_ITEMS = [
  'Meeting number',
  'Meeting date and time',
  'Meeting mode (In-Person / Online / Hybrid)',
  'Countdown to the meeting',
];

const MEETING_ACTION_ITEMS = [
  'Book a Role',
  'View Prepared Speeches',
  'Access Speech Evaluation',
  'Participate as Toastmaster of the Day',
  'Take part in Table Topics',
  'Volunteer for supporting meeting roles',
];

const AGENDA_ITEMS = [
  'View the meeting flow',
  'See role assignments',
  'Track speech order and timing',
];

const VOTING_ITEMS = [
  'Vote for speakers or role performance',
  'Participate in live club voting',
  'View voting status and results (when enabled)',
];

const JOURNEY_METRICS = ['Meetings attended', 'Speeches delivered', 'Roles completed', 'Evaluations given'];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Can I switch between clubs from the Home tab?',
    a: 'Yes. Click the dropdown icon beside the club name to switch between clubs.',
  },
  {
    q: 'Can I book roles directly from the Home tab?',
    a: 'Yes. Use the Meeting Actions section to quickly book available meeting roles.',
  },
  {
    q: 'What can I track under My Growth?',
    a: 'You can monitor attendance, speeches, evaluations, roles completed, and participation insights.',
  },
  {
    q: 'What is shown under My Tasks?',
    a: 'Pending activities, meeting reminders, and suggested actions to help you stay engaged.',
  },
  {
    q: 'Can I view the meeting agenda before the meeting?',
    a: 'Yes. The Meeting Agenda section provides a complete roadmap of the meeting.',
  },
  {
    q: 'Can I participate in voting from the Home tab?',
    a: 'Yes, live voting and club polls can be accessed from the Voting section when available.',
  },
];

function CheckList({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => (
        <View key={line} style={styles.checkRow}>
          <Text style={styles.checkMark} maxFontSizeMultiplier={1.25}>
            ✔
          </Text>
          <Text style={styles.checkText} maxFontSizeMultiplier={1.25}>
            {line}
          </Text>
        </View>
      ))}
    </>
  );
}

export default function T360TrainingHomeTabScreen() {
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
          Home Tab
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
          <Text style={styles.docTitle} maxFontSizeMultiplier={1.35}>
            Getting Started with Home Tab
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Everything you need to participate, prepare, and track your Toastmasters journey in one place.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why the Home Tab Matters?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Home tab is your central workspace in T360, helping members stay updated with meetings, book roles,
            participate in club activities, and track personal growth.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Purpose of the Home Tab
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Home tab provides quick access to meetings, meeting actions, voting, agendas, and your Toastmasters
            progress — all from one place.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Benefits of Using the Home Tab
          </Text>
          {BENEFITS.map(({ title, body }) => (
            <View key={title} style={styles.benefitBlock}>
              <Text style={styles.benefitTitle} maxFontSizeMultiplier={1.25}>
                ✔ {title}
              </Text>
              <Text style={styles.benefitBody} maxFontSizeMultiplier={1.25}>
                {body}
              </Text>
            </View>
          ))}

          <Text style={styles.calloutLabel} maxFontSizeMultiplier={1.3}>
            🚀 What You Gain
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Home tab helps members stay informed, participate actively, and make the most of their Toastmasters
            experience through one simple dashboard.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            What You Can Access on the Home Tab
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            👤 Profile Overview
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            At the top of the screen, you can view and manage your profile and club information.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can:
          </Text>
          <CheckList lines={PROFILE_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 If you are part of multiple clubs, you can quickly switch between them without logging out.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            📈 My Growth
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Track your Toastmasters progress and achievements.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can monitor:
          </Text>
          <CheckList lines={GROWTH_METRICS} />
          <Text style={styles.calloutLabel} maxFontSizeMultiplier={1.3}>
            🚀 What You Gain:
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Understand your Toastmasters journey and monitor your continuous growth.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            📌 My Tasks
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Stay updated on pending activities and reminders.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            Examples include:
          </Text>
          <CheckList lines={TASK_EXAMPLES} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Helpful reminders help you stay ahead in club activities.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            📅 Upcoming Meeting Details
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            View details of your upcoming meeting.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            Meeting details include:
          </Text>
          <CheckList lines={MEETING_DETAIL_ITEMS} />
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            This helps members stay informed and prepared.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🎭 Meeting Actions
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Quick access to meeting participation features.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can:
          </Text>
          <CheckList lines={MEETING_ACTION_ITEMS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Meeting Actions make participation quick and easy.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            📄 Meeting Agenda
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Access the complete meeting agenda.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can:
          </Text>
          <CheckList lines={AGENDA_ITEMS} />
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            This helps members stay prepared before the meeting begins.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🗳 Voting
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Participate in club voting and live polls.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            Members can:
          </Text>
          <CheckList lines={VOTING_ITEMS} />

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🌱 Your Toastmasters Journey
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Track your overall club participation and progress.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            Metrics include:
          </Text>
          <CheckList lines={JOURNEY_METRICS} />

          <Text style={styles.calloutLabel} maxFontSizeMultiplier={1.3}>
            🚀 What You Gain
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Home tab keeps everything important in one place — helping you stay organized, participate actively, and
            grow confidently throughout your Toastmasters journey.
          </Text>

          <Text style={styles.faqHeading} maxFontSizeMultiplier={1.3}>
            ❓ Frequently Asked Questions
          </Text>
          {FAQS.map(({ q, a }) => (
            <View key={q} style={styles.faqBlock}>
              <Text style={styles.faqQ} maxFontSizeMultiplier={1.25}>
                {q}
              </Text>
              <Text style={styles.faqA} maxFontSizeMultiplier={1.25}>
                {a}
              </Text>
            </View>
          ))}

          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 The Home tab is designed to make participation simple, organized, and engaging for every member.
          </Text>
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
    marginTop: 4,
    marginBottom: 8,
  },
  featureHeading: {
    fontSize: 15 * FS,
    fontWeight: '700',
    lineHeight: 22 * FS,
    color: N.text,
    marginTop: 14,
    marginBottom: 6,
  },
  bodyLead: {
    fontSize: 15 * FS,
    fontWeight: '600',
    lineHeight: 22 * FS,
    color: N.text,
    marginBottom: 6,
    marginTop: 2,
  },
  body: {
    fontSize: 15 * FS,
    lineHeight: 23 * FS,
    color: N.text,
    marginBottom: 14,
  },
  benefitBlock: { marginBottom: 12, paddingLeft: 2 },
  benefitTitle: {
    fontSize: 15 * FS,
    fontWeight: '600',
    lineHeight: 22 * FS,
    color: N.text,
    marginBottom: 2,
  },
  benefitBody: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
    paddingLeft: 18,
  },
  calloutLabel: {
    fontSize: 16 * FS,
    fontWeight: '700',
    color: N.text,
    marginTop: 8,
    marginBottom: 8,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingLeft: 2,
  },
  checkMark: {
    fontSize: 14 * FS,
    lineHeight: 22 * FS,
    color: N.text,
    minWidth: 20 * FS,
    marginTop: 1,
  },
  checkText: {
    flex: 1,
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.text,
  },
  tip: {
    marginTop: 8,
    marginBottom: 14,
    fontSize: 15 * FS,
    lineHeight: 22 * FS,
    color: N.text,
  },
  faqHeading: {
    fontSize: 16 * FS,
    fontWeight: '700',
    color: N.text,
    marginTop: 8,
    marginBottom: 12,
  },
  faqBlock: { marginBottom: 14 },
  faqQ: {
    fontSize: 15 * FS,
    fontWeight: '600',
    lineHeight: 22 * FS,
    color: N.text,
    marginBottom: 4,
  },
  faqA: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
  },
});
