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

const BENEFITS: { emoji: string; body: string }[] = [
  { emoji: '🎯', body: 'Choose your preferred meeting role' },
  { emoji: '📅', body: 'Plan your participation in advance' },
  { emoji: '📢', body: 'Inform the club about your role' },
  { emoji: '🚫', body: 'Avoid duplicate bookings' },
];

const BOOK_STEPS: { title: string; body: string }[] = [
  {
    title: 'Browse available roles',
    body: 'Review all roles listed in the Open section of the page.',
  },
  {
    title: 'Select your preferred role',
    body: 'Tap the role you wish to take on for the meeting.',
  },
  {
    title: 'Tap Book',
    body: 'Confirm your selection. The role is instantly reserved for you.',
  },
];

const SECTION_CARDS: {
  badge: string;
  title: string;
  lines: string[];
  variant: 'open' | 'mine' | 'taken';
}[] = [
  {
    badge: 'Section 1',
    title: 'Open',
    lines: ['Role is available', 'No one has booked it yet', 'You can select and book it'],
    variant: 'open',
  },
  {
    badge: 'Section 2',
    title: 'Mine',
    lines: ['Roles you have booked', 'Track your responsibilities', 'Quick personal overview'],
    variant: 'mine',
  },
  {
    badge: 'Section 3',
    title: 'Taken',
    lines: ['Roles booked by others', 'See who is doing which role', 'Avoid duplicate selection'],
    variant: 'taken',
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Who can book a role?',
    a: 'Members and eligible club users who are part of the club can book meeting roles.',
  },
  {
    q: 'Can I book a role in a closed meeting?',
    a: 'No. Role booking is only available when the meeting status is Open.',
  },
  {
    q: 'What does the Open section mean?',
    a: 'The Open section displays all roles that are currently available and have not been booked by anyone.',
  },
  {
    q: 'What does the Mine section mean?',
    a: 'The Mine section shows all roles that you have personally booked for that meeting — your responsibilities at a glance.',
  },
  {
    q: 'What does the Taken section mean?',
    a: 'The Taken section shows roles already reserved by other members, helping you avoid duplicates and understand overall meeting readiness.',
  },
  {
    q: 'Can I see who booked a role?',
    a: 'Yes. The Taken section shows which member has booked each role.',
  },
  {
    q: 'Can I book more than one role?',
    a: 'Yes, if multiple roles are available and permitted for the meeting, you may book more than one role.',
  },
  {
    q: 'Can I consult the VPE before booking?',
    a: 'Yes. Members are welcome to consult the Vice President Education (VPE) before booking a role for guidance or coordination.',
  },
  {
    q: 'What happens after I book a role?',
    a: 'The role is reserved for you, appears under Mine, and is displayed as Taken to all other members.',
  },
  {
    q: 'Why should I book a role?',
    a: 'Booking a role confirms your participation, helps the club plan the meeting smoothly, and prevents confusion or duplicate assignments.',
  },
];

function BulletList({ lines, markColor }: { lines: string[]; markColor?: string }) {
  return (
    <>
      {lines.map((line) => (
        <View key={line} style={styles.bulletRow}>
          <Text style={[styles.bulletMark, markColor ? { color: markColor } : null]} maxFontSizeMultiplier={1.25}>
            ✓
          </Text>
          <Text style={styles.bulletText} maxFontSizeMultiplier={1.25}>
            {line}
          </Text>
        </View>
      ))}
    </>
  );
}

export default function T360TrainingBookARoleScreen() {
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
          Book a Role
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
            Book a Role
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Reserve your preferred role for an open Toastmasters meeting — simple, transparent, and conflict-free.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Overview
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The <Text style={styles.inlineBold}>Book a Role</Text> feature enables club members and eligible club users
            to reserve their preferred role for an open Toastmasters meeting. Members can see all available roles at a
            glance and select the one they wish to perform.
          </Text>
          <View style={styles.calloutCream}>
            <Text style={styles.calloutCreamText} maxFontSizeMultiplier={1.25}>
              Members may also consult the <Text style={styles.inlineBold}>Vice President Education (VPE)</Text> before
              booking a role if guidance or coordination is required.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Who can book a role?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Any <Text style={styles.inlineBold}>member or eligible club user</Text> who is part of the club may book a
            role — provided the meeting status is <Text style={styles.inlineBold}>Open</Text>.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why book a role?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Booking a role is a commitment: “I am taking responsibility for this role in the meeting.” It helps members
            and clubs alike:
          </Text>
          <View style={styles.benefitGrid}>
            {BENEFITS.map(({ emoji, body }) => (
              <View key={body} style={styles.benefitCard}>
                <Text style={styles.benefitEmoji} maxFontSizeMultiplier={1.2}>
                  {emoji}
                </Text>
                <Text style={styles.benefitBody} maxFontSizeMultiplier={1.2}>
                  {body}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            How to book a role
          </Text>
          <Text style={styles.subHeading} maxFontSizeMultiplier={1.25}>
            Navigation path
          </Text>
          <View style={styles.navPath}>
            <Text style={styles.navPathText} maxFontSizeMultiplier={1.15}>
              Meeting <Text style={styles.navSep}>→</Text> Open Meeting <Text style={styles.navSep}>→</Text> Book a
              Role
            </Text>
          </View>
          {BOOK_STEPS.map(({ title, body }, i) => (
            <View key={title} style={styles.lifecycleBlock}>
              <View style={styles.lifecycleHead}>
                <View style={styles.lifecycleNum}>
                  <Text style={styles.lifecycleNumText} maxFontSizeMultiplier={1.2}>
                    {i + 1}
                  </Text>
                </View>
                <Text style={styles.lifecycleTitle} maxFontSizeMultiplier={1.25}>
                  {title}
                </Text>
              </View>
              <Text style={styles.lifecycleBody} maxFontSizeMultiplier={1.25}>
                {body}
              </Text>
            </View>
          ))}

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Page sections
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Book a Role page is organised into three clearly labelled sections:
          </Text>
          {SECTION_CARDS.map((sc) => (
            <View
              key={sc.title}
              style={[
                styles.sectionCard,
                sc.variant === 'open' && styles.sectionCardOpen,
                sc.variant === 'mine' && styles.sectionCardMine,
                sc.variant === 'taken' && styles.sectionCardTaken,
              ]}
            >
              <View style={[styles.sectionBadge, styles[`sectionBadge_${sc.variant}`]]}>
                <Text style={[styles.sectionBadgeText, styles[`sectionBadgeText_${sc.variant}`]]} maxFontSizeMultiplier={1.05}>
                  {sc.badge}
                </Text>
              </View>
              <Text style={[styles.sectionCardTitle, styles[`sectionCardTitle_${sc.variant}`]]} maxFontSizeMultiplier={1.25}>
                {sc.title}
              </Text>
              <BulletList
                lines={sc.lines}
                markColor={
                  sc.variant === 'open' ? '#2D7A45' : sc.variant === 'mine' ? '#2B57A0' : '#B5541C'
                }
              />
            </View>
          ))}

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            What happens after booking?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The moment you book a role, it moves through the following states:
          </Text>
          <View style={styles.flowRow}>
            <View style={styles.flowItem}>
              <Text style={styles.flowLabel} maxFontSizeMultiplier={1.05}>
                Open
              </Text>
              <Text style={styles.flowBody} maxFontSizeMultiplier={1.15}>
                Available for all members
              </Text>
            </View>
            <Text style={styles.flowArrow} maxFontSizeMultiplier={1.2}>
              →
            </Text>
            <View style={styles.flowItem}>
              <Text style={styles.flowLabel} maxFontSizeMultiplier={1.05}>
                Mine
              </Text>
              <Text style={styles.flowBody} maxFontSizeMultiplier={1.15}>
                Reserved for you
              </Text>
            </View>
            <Text style={styles.flowArrow} maxFontSizeMultiplier={1.2}>
              →
            </Text>
            <View style={styles.flowItem}>
              <Text style={styles.flowLabel} maxFontSizeMultiplier={1.05}>
                Taken
              </Text>
              <Text style={styles.flowBody} maxFontSizeMultiplier={1.15}>
                Visible to others as booked
              </Text>
            </View>
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
    marginBottom: 22,
  },
  sectionHeading: {
    fontSize: 16 * FS,
    fontWeight: '700',
    color: N.text,
    marginTop: 8,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 13 * FS,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: N.textSecondary,
    marginBottom: 8,
  },
  body: {
    fontSize: 15 * FS,
    lineHeight: 23 * FS,
    color: N.text,
    marginBottom: 12,
  },
  inlineBold: { fontWeight: '800', color: N.text },
  calloutCream: {
    backgroundColor: '#FFF9EE',
    borderWidth: 1,
    borderColor: 'rgba(232, 212, 154, 0.9)',
    borderLeftWidth: 4,
    borderLeftColor: '#C8922A',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  calloutCreamText: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: '#5a4a1e',
    fontStyle: 'italic',
  },
  benefitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  benefitCard: {
    width: '47%',
    flexGrow: 1,
    minWidth: 140,
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  benefitEmoji: {
    fontSize: 22 * FS,
    marginBottom: 6,
  },
  benefitBody: {
    fontSize: 13 * FS,
    lineHeight: 18 * FS,
    color: N.text,
    textAlign: 'center',
  },
  navPath: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E1410',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  navPathText: {
    fontSize: 13 * FS,
    color: '#E3B870',
    fontFamily: 'Menlo',
  },
  navSep: { color: 'rgba(255,255,255,0.35)' },
  lifecycleBlock: { marginBottom: 14 },
  lifecycleHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  lifecycleNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(14, 165, 233, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  lifecycleNumText: {
    fontSize: 14 * FS,
    fontWeight: '700',
    color: '#0369A1',
  },
  lifecycleTitle: {
    flex: 1,
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
  },
  lifecycleBody: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
    paddingLeft: 38,
    marginBottom: 4,
  },
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  sectionCardOpen: {
    backgroundColor: '#EFF8F0',
    borderColor: 'rgba(45, 122, 69, 0.25)',
  },
  sectionCardMine: {
    backgroundColor: '#EEF3FB',
    borderColor: 'rgba(43, 87, 160, 0.25)',
  },
  sectionCardTaken: {
    backgroundColor: '#FDF3EC',
    borderColor: 'rgba(181, 84, 28, 0.25)',
  },
  sectionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 10,
  },
  sectionBadge_open: { backgroundColor: 'rgba(45, 122, 69, 0.15)' },
  sectionBadge_mine: { backgroundColor: 'rgba(43, 87, 160, 0.15)' },
  sectionBadge_taken: { backgroundColor: 'rgba(181, 84, 28, 0.15)' },
  sectionBadgeText: {
    fontSize: 10 * FS,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  sectionBadgeText_open: { color: '#2D7A45' },
  sectionBadgeText_mine: { color: '#2B57A0' },
  sectionBadgeText_taken: { color: '#B5541C' },
  sectionCardTitle: {
    fontSize: 18 * FS,
    fontWeight: '700',
    marginBottom: 10,
  },
  sectionCardTitle_open: { color: '#2D7A45' },
  sectionCardTitle_mine: { color: '#2B57A0' },
  sectionCardTitle_taken: { color: '#B5541C' },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletMark: {
    fontSize: 13 * FS,
    lineHeight: 20 * FS,
    fontWeight: '700',
    minWidth: 18 * FS,
    marginTop: 1,
    color: '#2D7A45',
  },
  bulletText: {
    flex: 1,
    fontSize: 14 * FS,
    lineHeight: 20 * FS,
    color: N.text,
  },
  flowRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 8,
  },
  flowItem: {
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  flowLabel: {
    fontSize: 11 * FS,
    fontWeight: '800',
    color: '#6B1F2A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  flowBody: {
    fontSize: 13 * FS,
    lineHeight: 18 * FS,
    color: N.textSecondary,
    textAlign: 'center',
  },
  flowArrow: {
    alignSelf: 'center',
    fontSize: 18 * FS,
    color: '#C8963E',
    paddingHorizontal: 2,
    marginVertical: 4,
  },
  faqHeading: {
    fontSize: 16 * FS,
    fontWeight: '700',
    color: N.text,
    marginTop: 12,
    marginBottom: 12,
  },
  faqBlock: { paddingVertical: 12 },
  faqBlockBorder: { borderTopWidth: 1, borderTopColor: N.border },
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
