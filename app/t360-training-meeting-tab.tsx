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

const BENEFITS: { title: string; body: string }[] = [
  {
    title: 'Stay Updated',
    body: 'View upcoming and currently open meetings.',
  },
  {
    title: 'Access Meeting Details',
    body: 'Check meeting date, time, venue, and format.',
  },
  {
    title: 'Review Past Meetings',
    body: 'Access completed meeting history anytime.',
  },
  {
    title: 'Track Meeting Reports',
    body: 'View meeting reports and historical insights.',
  },
];

const OPEN_CHECKS = [
  'View meeting title and number',
  'Check meeting date and time',
  'View meeting mode (In-Person / Online / Hybrid)',
  'Access meeting actions and details',
];

const NEXT_CHECKS = [
  'View upcoming meeting schedules',
  'Stay prepared for future sessions',
  'Contact the respective coordinator (if applicable)',
];

const HISTORY_CHECKS = [
  'View previously conducted meetings',
  'Revisit meeting details',
  'Access past participation information',
];

const REPORTS_CHECKS = [
  'Meeting performance reports',
  'Historical meeting data',
  'Role and participation insights (if available)',
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Can I see upcoming meetings?',
    a: 'Yes. Upcoming meetings are displayed under Next Meetings.',
  },
  {
    q: 'What is an Open Meeting?',
    a: 'An Open Meeting is an active meeting available for participation and role management.',
  },
  {
    q: 'Can I access past meetings?',
    a: 'Yes. Completed meetings are available under Meeting History.',
  },
  {
    q: 'What can I see in Meeting Reports?',
    a: 'You can view historical reports and meeting-related insights.',
  },
  {
    q: 'Why can’t I see a meeting?',
    a: 'Check whether the meeting is listed under Open Meetings, Next Meetings, or Meeting History.',
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

export default function T360TrainingMeetingTabScreen() {
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
        <Text style={styles.headerTitle} maxFontSizeMultiplier={1.3}>
          Meeting Tab
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
            Meeting Tab Overview
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Manage upcoming meetings, access meeting history, and stay updated on club sessions.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why the Meeting Tab?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Meeting tab helps members stay informed about upcoming meetings, active meetings, meeting history, and
            reports — all in one place.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Purpose of the Meeting Tab
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Meeting tab acts as a central place to view, participate in, and revisit club meetings, helping members
            stay organized and engaged.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Benefits of Using the Meeting Tab
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
            Stay informed, prepared, and actively involved in club meetings with easy access to meeting information and
            history.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            What You Can Access on the Meeting Tab
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            📅 Open Meetings
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Open Meetings section displays meetings that are currently active and available.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can:
          </Text>
          <CheckList lines={OPEN_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Open meetings are currently active and ready for participation.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            ⏳ Next Meetings
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Next Meetings section shows upcoming meetings that are scheduled for the future.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can:
          </Text>
          <CheckList lines={NEXT_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Helps members plan ahead and stay meeting-ready.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🕘 Meeting History
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Meeting History section stores completed meetings for future reference.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can:
          </Text>
          <CheckList lines={HISTORY_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 A useful place to review previous meetings and club activities.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            📊 Meeting Reports
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Meeting Reports section provides historical reports and meeting insights.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can access:
          </Text>
          <CheckList lines={REPORTS_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Meeting reports help track learning, participation, and meeting effectiveness.
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
            💡 The Meeting tab helps you stay prepared, informed, and connected with every club meeting.
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
