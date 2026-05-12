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

/** Page typography: 10% smaller than base training scale. */
const FS = 0.9;

const STEPS = [
  'Go to Settings',
  'Tap Create New Club',
  'Enter the Club Name',
  'Enter the Club Number and Charter Date',
  'Tap Create Club',
];

const BENEFITS: { title: string; body: string }[] = [
  {
    title: 'Centralized Club Management',
    body: 'Manage meetings, agendas, attendance, and member engagement from a single platform.',
  },
  {
    title: 'Member Collaboration',
    body: 'Invite members and assign roles with ease.',
  },
  {
    title: 'Meeting Management',
    body: 'Create, edit, close, and track club meetings seamlessly.',
  },
  {
    title: 'Track Club Growth',
    body: 'Monitor participation, attendance, awards, and role insights.',
  },
  {
    title: 'Multi-Club Support',
    body: 'Manage and switch between multiple clubs from one account.',
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Who can create a club?',
    a: 'Users with the required access can create a club.',
  },
  {
    q: 'Is Club Name mandatory?',
    a: 'Yes, Club Name is required.',
  },
  {
    q: 'What is a Club Number?',
    a: 'The official Toastmasters Club ID (if available).',
  },
  {
    q: 'Can I create a club without a Club Number?',
    a: 'Yes, you can update it later.',
  },
  {
    q: 'What is a Charter Date?',
    a: 'The official date the club was formed or chartered.',
  },
  {
    q: 'Can I edit club details later?',
    a: 'Yes, based on your permissions.',
  },
  {
    q: 'Why can’t I create a club?',
    a: 'Check whether all required fields are filled and ensure you have access permissions.',
  },
  {
    q: 'Can I manage multiple clubs?',
    a: 'Yes, T360 supports multiple clubs.',
  },
  {
    q: 'How do I switch between clubs?',
    a: 'Use the Club Switch option in the app to move between clubs.',
  },
  {
    q: 'What should I do after creating a club?',
    a: 'Invite members, configure settings, and schedule meetings.',
  },
];

export default function T360TrainingExcommCreateClubScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => goBackOrReplace('/t360-training-excomm')}
          activeOpacity={0.7}
        >
          <ArrowLeft size={Math.round(22 * FS)} color={N.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} maxFontSizeMultiplier={1.3}>
          Club Set Up
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
            Club Set Up
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Set up your club and configure essential club information in just a few steps.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why Create a Club?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Creating a club in T360 helps you establish a dedicated digital space to manage all your club activities in
            one place.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Purpose of Creating a Club
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            A club acts as the foundation for managing meetings, members, roles, attendance, awards, voting, and club
            operations efficiently.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Benefits of Creating a Club
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
            Once a club is created, your ExComm team can collaborate more effectively, reduce manual work, and run
            meetings in a structured and organized manner.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            How to Create a Club
          </Text>
          {STEPS.map((step, i) => (
            <View key={step} style={styles.stepRow}>
              <Text style={styles.stepNum} maxFontSizeMultiplier={1.25}>
                {i + 1}.
              </Text>
              <Text style={styles.stepText} maxFontSizeMultiplier={1.25}>
                {step}
              </Text>
            </View>
          ))}

          <Text style={styles.done} maxFontSizeMultiplier={1.25}>
            ✅ Your club is now ready to use!
          </Text>

          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 After creating a club, you can invite members, configure settings, and start scheduling meetings.
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
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
  body: {
    fontSize: 15 * FS,
    lineHeight: 23 * FS,
    color: N.text,
    marginBottom: 18,
  },
  benefitBlock: {
    marginBottom: 12,
    paddingLeft: 2,
  },
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
    marginTop: 6,
    marginBottom: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  stepNum: {
    fontSize: 15 * FS,
    fontWeight: '600',
    color: N.textSecondary,
    minWidth: 22 * FS,
  },
  stepText: {
    flex: 1,
    marginLeft: 6,
    fontSize: 15 * FS,
    lineHeight: 22 * FS,
    color: N.text,
  },
  done: {
    marginTop: 14,
    fontSize: 15 * FS,
    lineHeight: 22 * FS,
    color: N.text,
    fontWeight: '600',
  },
  tip: {
    marginTop: 14,
    marginBottom: 20,
    fontSize: 15 * FS,
    lineHeight: 22 * FS,
    color: N.text,
  },
  faqHeading: {
    fontSize: 16 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 12,
  },
  faqBlock: {
    marginBottom: 14,
  },
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
