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
    title: 'Easy Participation',
    body: 'Members can quickly volunteer for available meeting roles.',
  },
  {
    title: 'Clear Visibility',
    body: 'See which roles are available, booked by you, or taken by others.',
  },
  {
    title: 'Improved Meeting Planning',
    body: 'Helps ensure meetings are fully prepared with all required roles assigned.',
  },
  {
    title: 'Leadership & Growth',
    body: 'Taking up roles helps members develop leadership, speaking, and organizational skills.',
  },
];

const ROLE_TABS: { label: string; body: string }[] = [
  {
    label: '🟢 Open',
    body: 'Displays all available roles that are open for booking for the selected meeting.',
  },
  {
    label: '👤 Mine',
    body: 'Displays all roles that are booked by you.',
  },
  {
    label: '👥 Taken',
    body: 'Displays roles that have already been booked by other members.',
  },
];

const OPTION1_STEPS = [
  'Go to the Home Page',
  'Under Meeting Details, click Book a Role',
];

const OPTION1_TAIL = ['Select an available role from the Open tab', 'Click Book Role'];

const OPTION2_STEPS = [
  'Go to the Home Page',
  'Under Meeting Actions, view the list of available meeting roles',
  'Click on the desired role',
  'Click Book Role',
];

const ADMIN_MANAGE_STEPS = [
  'Go to the Admin tab',
  'Click Manage Meetings',
  'Select the required Meeting',
  'Click Manage Roles',
];

const ADMIN_ACTIONS: { title: string; body: string }[] = [
  { title: 'Reassign Roles', body: 'Assign a role to a different member' },
  { title: 'Unassign Roles', body: 'Remove a member from a booked role' },
  { title: 'Delete Roles', body: 'Remove a role from the meeting if no longer required' },
];

const FAQS: { q: string; a: string }[] = [
  { q: 'Who can book a role?', a: 'Any eligible club member can book an available role.' },
  { q: 'Can I book more than one role?', a: 'Yes, depending on your club’s meeting rules and role availability.' },
  {
    q: 'Can I change my role after booking?',
    a: 'Admins can reassign or unassign roles if changes are required.',
  },
  {
    q: 'Why can’t I see available roles?',
    a: 'Check the Open tab or Meeting Actions section to view available roles.',
  },
  {
    q: 'What is the difference between Open, Mine, and Taken?',
    a: 'Open → Available roles\nMine → Roles booked by you\nTaken → Roles booked by other members',
  },
  {
    q: 'Who can manage or modify booked roles?',
    a: 'Only Admins can reassign, unassign, or delete meeting roles.',
  },
];

function BulletList({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => (
        <View key={line} style={styles.bulletRow}>
          <Text style={styles.bulletMark} maxFontSizeMultiplier={1.25}>
            •
          </Text>
          <Text style={styles.bulletText} maxFontSizeMultiplier={1.25}>
            {line}
          </Text>
        </View>
      ))}
    </>
  );
}

export default function T360TrainingRoleBookingScreen() {
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
          Role Booking
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
            Role Booking
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Book meeting roles easily and participate actively in club meetings.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why Book a Role?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Role booking helps members actively participate in meetings while ensuring every meeting role is assigned and
            managed efficiently.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Purpose of Role Booking
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Role booking enables members to volunteer for meeting responsibilities, improve communication skills, and
            contribute to smooth meeting execution.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Benefits of Role Booking
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
            By booking meeting roles, members become more engaged, meetings run smoothly, and clubs maintain stronger
            participation and accountability.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            How to Book a Role
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Roles can be booked in multiple ways within T360.
          </Text>

          <Text style={styles.subHeading} maxFontSizeMultiplier={1.25}>
            Option 1: Book a Role from the Home Page
          </Text>
          <BulletList lines={OPTION1_STEPS} />
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            At the top of the screen, you will see:{'\n'}Club Name{'\n'}Meeting Details
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Below the meeting details, you will find three tabs:
          </Text>
          {ROLE_TABS.map(({ label, body }) => (
            <View key={label} style={styles.tabExplainBlock}>
              <Text style={styles.tabLabel} maxFontSizeMultiplier={1.25}>
                {label}
              </Text>
              <Text style={styles.tabBody} maxFontSizeMultiplier={1.25}>
                {body}
              </Text>
            </View>
          ))}
          <BulletList lines={OPTION1_TAIL} />
          <Text style={styles.done} maxFontSizeMultiplier={1.25}>
            ✅ Role booked successfully!
          </Text>

          <Text style={styles.subHeading} maxFontSizeMultiplier={1.25}>
            Option 2: Quick Role Booking from Meeting Actions
          </Text>
          <BulletList lines={OPTION2_STEPS} />
          <Text style={styles.done} maxFontSizeMultiplier={1.25}>
            ✅ The selected role will be assigned to you instantly.
          </Text>
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Tip: This is the quickest way to book roles directly from the meeting dashboard.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Role Management by Admins
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Admins can manage, modify, and organize meeting role assignments.
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Admins have additional access to manage meeting roles and ensure all meeting responsibilities are assigned
            properly.
          </Text>

          <Text style={styles.subHeading} maxFontSizeMultiplier={1.25}>
            How Admins Can Manage Roles
          </Text>
          <BulletList lines={ADMIN_MANAGE_STEPS} />

          <Text style={styles.subHeading} maxFontSizeMultiplier={1.25}>
            What Admins Can Do
          </Text>
          {ADMIN_ACTIONS.map(({ title, body }) => (
            <View key={title} style={styles.benefitBlock}>
              <Text style={styles.benefitTitle} maxFontSizeMultiplier={1.25}>
                ✔ {title}
              </Text>
              <Text style={styles.benefitBody} maxFontSizeMultiplier={1.25}>
                {body}
              </Text>
            </View>
          ))}
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Tip: Admin role management helps ensure meetings are fully prepared and no important role remains
            unassigned.
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
            💡 Regularly taking meeting roles helps members build confidence, leadership, and communication skills while
            contributing to successful meetings.
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
  subHeading: {
    fontSize: 15 * FS,
    fontWeight: '600',
    lineHeight: 22 * FS,
    color: N.text,
    marginTop: 10,
    marginBottom: 6,
  },
  body: {
    fontSize: 15 * FS,
    lineHeight: 23 * FS,
    color: N.text,
    marginBottom: 18,
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
    marginTop: 6,
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletMark: {
    fontSize: 15 * FS,
    lineHeight: 22 * FS,
    color: N.textSecondary,
    minWidth: 18 * FS,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 15 * FS,
    lineHeight: 22 * FS,
    color: N.text,
  },
  tabExplainBlock: { marginBottom: 10, paddingLeft: 2 },
  tabLabel: {
    fontSize: 15 * FS,
    fontWeight: '600',
    lineHeight: 22 * FS,
    color: N.text,
    marginBottom: 2,
  },
  tabBody: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
    paddingLeft: 2,
  },
  done: {
    marginTop: 10,
    marginBottom: 8,
    fontSize: 15 * FS,
    lineHeight: 22 * FS,
    color: N.text,
    fontWeight: '600',
  },
  tip: {
    marginTop: 6,
    marginBottom: 16,
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
