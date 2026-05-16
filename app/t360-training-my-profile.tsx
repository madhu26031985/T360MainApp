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

const META_PILLS = ['2 access routes', 'Partially editable', 'Social media support'];

const ACCESS_ROUTES: { num: string; title: string; steps: string[] }[] = [
  {
    num: '01',
    title: 'Via Home Tab',
    steps: [
      'Tap the Home tab in the bottom navigation bar.',
      'Scroll to and tap My Profile on the home screen.',
      'The Edit Profile screen opens directly.',
    ],
  },
  {
    num: '02',
    title: 'Via Settings Tab',
    steps: [
      'Tap the Settings tab in the bottom navigation bar.',
      'Tap Edit Profile in the settings list.',
      'The Edit Profile screen opens directly.',
    ],
  },
];

const PROFILE_FIELDS: { name: string; desc: string; badge: 'locked' | 'editable' }[] = [
  {
    name: 'Full Name',
    desc: 'Your display name shown across the app. This field is managed by support and cannot be self-edited.',
    badge: 'locked',
  },
  {
    name: 'Email Address',
    desc: 'The email linked to your account. To change it, please contact support.',
    badge: 'locked',
  },
  {
    name: 'Phone Number',
    desc: 'Your registered mobile number. Tap the field to update it.',
    badge: 'editable',
  },
  {
    name: 'Location',
    desc: 'Your city or region. Tap the field to update your current location.',
    badge: 'editable',
  },
  {
    name: 'About',
    desc: 'A short bio about yourself, up to 300 characters. The counter shows how many characters you have used.',
    badge: 'editable',
  },
];

const SOCIAL_PLATFORMS = ['LinkedIn', 'Twitter / X', 'Instagram', 'YouTube'];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Why can't I edit my Full Name or Email?",
    a: 'Full Name and Email are account-level fields managed by the support team to prevent unauthorised changes. Contact support through the app or at support@t360.in.',
  },
  {
    q: 'How do I update my phone number?',
    a: 'Tap the phone number field on the Edit Profile screen, enter a new number, then tap Save when done.',
  },
  {
    q: 'What is the character limit for the About section?',
    a: 'The About/Bio field supports up to 300 characters. A counter in the top-right corner shows your current usage (e.g. 145/300).',
  },
  {
    q: 'Can I remove my profile photo?',
    a: 'Tap the camera icon or "Change Photo" and look for a "Remove Photo" option. Some app versions may require a photo at all times.',
  },
  {
    q: 'Are social media links visible to everyone?',
    a: 'Social media links are shared within the platform based on your privacy settings. Check Privacy settings in the Settings tab before adding links.',
  },
  {
    q: 'The Save button is greyed out — what should I do?',
    a: 'A greyed-out Save button means no changes have been detected yet. Edit any editable field and the Save button will become active.',
  },
  {
    q: 'I navigated away and lost my changes. Can I recover them?',
    a: 'Unsaved changes cannot be recovered once you leave the Edit Profile screen. Always tap Save before leaving.',
  },
  {
    q: 'Which social media platforms are supported?',
    a: 'Currently: LinkedIn, Twitter/X, Instagram, and YouTube. More platforms may be added in future updates.',
  },
  {
    q: 'Why are there two ways to open Edit Profile?',
    a: 'The app provides Home (My Profile) and Settings (Edit Profile) routes for convenience. Both open exactly the same screen.',
  },
  {
    q: 'How do I contact support to update my name or email?',
    a: 'Email support@t360.in or use the in-app support option. Provide your registered phone number and the change you need.',
  },
];

function AccessRouteCard({ num, title, steps }: { num: string; title: string; steps: string[] }) {
  return (
    <View style={styles.accessCard}>
      <Text style={styles.accessNum} maxFontSizeMultiplier={1.2}>
        {num}
      </Text>
      <Text style={styles.accessTitle} maxFontSizeMultiplier={1.25}>
        {title}
      </Text>
      {steps.map((step, i) => (
        <View key={step} style={styles.stepRow}>
          <View style={styles.stepNum}>
            <Text style={styles.stepNumText} maxFontSizeMultiplier={1.1}>
              {i + 1}
            </Text>
          </View>
          <Text style={styles.stepText} maxFontSizeMultiplier={1.25}>
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
}

function FieldBadge({ type }: { type: 'locked' | 'editable' }) {
  const locked = type === 'locked';
  return (
    <View style={[styles.fieldBadge, locked ? styles.fieldBadgeLocked : styles.fieldBadgeEditable]}>
      <Text
        style={[styles.fieldBadgeText, locked ? styles.fieldBadgeTextLocked : styles.fieldBadgeTextEditable]}
        maxFontSizeMultiplier={1.1}
      >
        {locked ? 'Locked' : 'Editable'}
      </Text>
    </View>
  );
}

export default function T360TrainingMyProfileScreen() {
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
          My Profile
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
            My Profile — View & Edit
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Your Profile screen is where you view your account details and make updates — all in one place. Access it
            from the Home tab or Settings tab.
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
            How to access My Profile
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The My Profile screen can be reached in two ways — both open the exact same screen where you can view and
            edit your details:
          </Text>
          {ACCESS_ROUTES.map((route) => (
            <AccessRouteCard key={route.title} {...route} />
          ))}
          <View style={styles.calloutInfo}>
            <Text style={styles.calloutInfoText} maxFontSizeMultiplier={1.25}>
              Both routes open the same Edit Profile screen. Use whichever is more convenient for you.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            What you can see
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            When you open My Profile, you&apos;ll see all your current account information at a glance:
          </Text>
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              Profile overview
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              Your profile picture, full name, email address, phone number, and city are displayed at the top. Below
              that, your About/Bio text and linked social media accounts are shown. Some fields are view-only; others
              can be tapped to edit directly.
            </Text>
          </View>
          <View style={styles.calloutInfo}>
            <Text style={styles.calloutInfoText} maxFontSizeMultiplier={1.25}>
              My Profile = Edit Profile. The screen is named &quot;My Profile&quot; from Home and &quot;Edit Profile&quot;
              from Settings — same screen, identical functionality.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Editable fields
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Below is a description of every field and whether it can be changed by you directly.
          </Text>
          {PROFILE_FIELDS.map(({ name, desc, badge }) => (
            <View key={name} style={styles.fieldRow}>
              <View style={styles.fieldRowTop}>
                <Text style={styles.fieldName} maxFontSizeMultiplier={1.25}>
                  {name}
                </Text>
                <FieldBadge type={badge} />
              </View>
              <Text style={styles.fieldDesc} maxFontSizeMultiplier={1.25}>
                {desc}
              </Text>
            </View>
          ))}
          <View style={styles.calloutWarn}>
            <Text style={styles.calloutWarnText} maxFontSizeMultiplier={1.25}>
              Full Name &amp; Email are locked. These fields display &quot;Contact support to update&quot; below them.
              Reach out to the support team to request changes.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Profile photo
          </Text>
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              How to change your photo
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              Tap the camera icon on the bottom-right of your profile picture, or tap Change Photo below it. Choose an
              image from your device&apos;s photo library or take a new one.
            </Text>
          </View>
          <View style={styles.calloutOk}>
            <Text style={styles.calloutOkText} maxFontSizeMultiplier={1.25}>
              For best results, use a square image. A clear, well-lit headshot helps others recognise you in clubs and
              meetings.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Social media links
          </Text>
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              Supported platforms
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              You can add profile links for the following platforms. Tap on any icon to add or update your URL.
            </Text>
            <View style={styles.socialRow}>
              {SOCIAL_PLATFORMS.map((platform) => (
                <View key={platform} style={styles.socialChip}>
                  <Text style={styles.socialChipText} maxFontSizeMultiplier={1.15}>
                    {platform}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.calloutInfo}>
            <Text style={styles.calloutInfoText} maxFontSizeMultiplier={1.25}>
              Social media links are optional. Only add the ones you&apos;d like to share with your network on the
              platform.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Saving your changes
          </Text>
          <View style={styles.miniCard}>
            <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
              Using the Save button
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
              After making any edits, tap Save at the bottom of the screen. The button appears active only when there
              are unsaved changes. If no changes have been made, Save remains greyed out.
            </Text>
          </View>
          <View style={styles.calloutWarn}>
            <Text style={styles.calloutWarnText} maxFontSizeMultiplier={1.25}>
              Navigating away without tapping Save will discard any unsaved changes. Always tap Save before leaving the
              screen.
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
    backgroundColor: 'rgba(59, 91, 219, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 91, 219, 0.2)',
  },
  metaPillText: {
    fontSize: 12 * FS,
    fontWeight: '600',
    color: '#3B5BDB',
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
  accessCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(55, 53, 47, 0.02)',
    borderTopWidth: 3,
    borderTopColor: '#3B5BDB',
  },
  accessNum: {
    fontSize: 28 * FS,
    fontWeight: '700',
    color: 'rgba(59, 91, 219, 0.25)',
    marginBottom: 4,
  },
  accessTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3B5BDB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  stepNumText: {
    fontSize: 11 * FS,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
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
  fieldRow: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: N.surface,
  },
  fieldRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 8,
  },
  fieldName: {
    flex: 1,
    fontSize: 14 * FS,
    fontWeight: '700',
    color: N.text,
  },
  fieldDesc: {
    fontSize: 13 * FS,
    lineHeight: 20 * FS,
    color: N.textSecondary,
  },
  fieldBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  fieldBadgeLocked: {
    backgroundColor: '#FFF3BF',
  },
  fieldBadgeEditable: {
    backgroundColor: '#D3F9D8',
  },
  fieldBadgeText: {
    fontSize: 11 * FS,
    fontWeight: '700',
  },
  fieldBadgeTextLocked: {
    color: '#945000',
  },
  fieldBadgeTextEditable: {
    color: '#2F9E44',
  },
  socialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  socialChip: {
    backgroundColor: N.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: N.border,
    marginRight: 8,
    marginBottom: 8,
  },
  socialChipText: {
    fontSize: 13 * FS,
    fontWeight: '600',
    color: N.text,
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
