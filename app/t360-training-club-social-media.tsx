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
const PINK = '#C026D3';
const GREEN = '#16A34A';

const PLATFORMS = [
  'Facebook',
  'Twitter / X',
  'LinkedIn',
  'Instagram',
  'WhatsApp',
  'YouTube',
  'Club Website',
];

const ADMIN_STEPS = [
  { title: 'Go to the Admin Panel', body: 'Access the admin section from your T360 navigation.' },
  { title: 'Open Club Social Media', body: 'Locate Club Social Media in the admin panel.' },
  { title: 'Add or update links', body: 'Enter the required social media URLs. Changes auto-save.' },
];

const MEMBER_BULLETS = [
  'No manual setup required',
  'Links update in real time',
  'Accessible from My Clubs tab',
  'All platforms visible in one place',
];

const SUPPORTED_PLATFORMS: { name: string; desc: string }[] = [
  { name: 'Facebook', desc: 'Community groups & event announcements' },
  { name: 'Twitter / X', desc: 'Quick updates & public engagement' },
  { name: 'LinkedIn', desc: 'Professional networking & achievements' },
  { name: 'Instagram', desc: 'Visual content, reels & highlights' },
  { name: 'WhatsApp', desc: 'Direct group communication' },
  { name: 'YouTube', desc: 'Meeting recordings & speech videos' },
  { name: 'Club Website', desc: 'Official club home & information hub' },
];

const WHY_IMPORTANT = [
  { icon: '📣', text: 'Improve club visibility across digital channels' },
  { icon: '🤝', text: 'Build stronger member engagement beyond meetings' },
  { icon: '🎉', text: 'Promote club events and achievements publicly' },
  { icon: '🆕', text: 'Help new members connect with the community' },
  { icon: '📢', text: 'Share announcements and updates quickly' },
  { icon: '🔗', text: 'Keep members connected between meetings' },
];

const MEMBER_BENEFITS = [
  'Directly access official club pages',
  'Follow club activities and announcements',
  'New members understand club culture faster',
  'Networking and community engagement become easier',
  'Stronger digital presence for the club',
  'Improved communication within the community',
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

export default function T360TrainingClubSocialMediaScreen() {
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
          Club Social Media
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
            Club Social Media
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Helps clubs maintain and share their official social media presence with all members — making it
            easy to discover, follow, and connect with the club across different platforms.
          </Text>

          <View style={styles.platformStrip}>
            {PLATFORMS.map((name) => (
              <View key={name} style={styles.platformPill}>
                <Text style={styles.platformPillText} maxFontSizeMultiplier={1.15}>
                  {name}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Who can update Club Social Media?
          </Text>
          <View style={styles.excommNotice}>
            <Text style={styles.excommTitle} maxFontSizeMultiplier={1.25}>
              EXCOMM access only
            </Text>
            <Text style={styles.excommBody} maxFontSizeMultiplier={1.25}>
              The Club Social Media section can be updated only by EXCOMM members. Updates are managed directly
              from the Admin Panel.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Where to find Club Social Media
          </Text>

          <View style={[styles.splitCard, { borderLeftColor: PINK }]}>
            <Text style={styles.splitCardTitle} maxFontSizeMultiplier={1.25}>
              For admins
            </Text>
            <Text style={styles.splitCardSub} maxFontSizeMultiplier={1.15}>
              EXCOMM · Admin Panel access
            </Text>
            <NumberedSteps steps={ADMIN_STEPS} />
          </View>

          <View style={[styles.splitCard, styles.splitCardMember, { borderLeftColor: GREEN }]}>
            <Text style={styles.splitCardTitle} maxFontSizeMultiplier={1.25}>
              For members
            </Text>
            <Text style={styles.splitCardSub} maxFontSizeMultiplier={1.15}>
              Automatic visibility · My Clubs tab
            </Text>
            <Text style={styles.body} maxFontSizeMultiplier={1.25}>
              Once an admin updates the club&apos;s social media links, they automatically appear under the My
              Clubs tab for all club members — no action needed.
            </Text>
            <BulletList items={MEMBER_BULLETS} bulletColor={GREEN} />
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Supported social media platforms
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The club can add links across seven platforms to build a complete digital presence:
          </Text>
          {SUPPORTED_PLATFORMS.map(({ name, desc }) => (
            <View key={name} style={styles.platformCard}>
              <Text style={styles.platformName} maxFontSizeMultiplier={1.25}>
                {name}
              </Text>
              <Text style={styles.platformDesc} maxFontSizeMultiplier={1.2}>
                {desc}
              </Text>
            </View>
          ))}

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why Club Social Media is important
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
            Benefits for members
          </Text>
          <View style={styles.benefitsCard}>
            <Text style={styles.benefitsCardTitle} maxFontSizeMultiplier={1.25}>
              Once social media links are updated
            </Text>
            <Text style={styles.benefitsCardSub} maxFontSizeMultiplier={1.15}>
              Members immediately gain access to the club&apos;s full digital presence
            </Text>
            {MEMBER_BENEFITS.map((item) => (
              <View key={item} style={styles.checkRow}>
                <Text style={styles.checkMark} maxFontSizeMultiplier={1.2}>
                  ✓
                </Text>
                <Text style={styles.checkText} maxFontSizeMultiplier={1.25}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Auto-save functionality
          </Text>
          <View style={styles.autosaveCard}>
            <Text style={styles.autosaveTitle} maxFontSizeMultiplier={1.25}>
              Automatic saving — no manual saves needed
            </Text>
            <Text style={styles.autosaveBody} maxFontSizeMultiplier={1.25}>
              The Club Social Media section supports auto-saving, making it easier for admins to update
              information quickly without worrying about losing changes.
            </Text>
            <View style={styles.autosaveBadge}>
              <Text style={styles.autosaveBadgeText} maxFontSizeMultiplier={1.1}>
                Auto-save on
              </Text>
            </View>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Final note
          </Text>
          <View style={styles.finalNote}>
            <Text style={styles.finalNoteTitle} maxFontSizeMultiplier={1.25}>
              Club Social Media is the club&apos;s digital identity hub
            </Text>
            <Text style={styles.finalNoteBody} maxFontSizeMultiplier={1.25}>
              By keeping social media links updated, clubs can strengthen their online presence, improve member
              engagement, and help members stay connected with the Toastmasters community across multiple
              platforms.
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
    backgroundColor: 'rgba(232, 121, 249, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  kbBadgeText: {
    fontSize: 12 * FS,
    fontWeight: '600',
    color: PINK,
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
  platformStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 22,
  },
  platformPill: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: N.surface,
  },
  platformPillText: {
    fontSize: 11 * FS,
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
    marginBottom: 10,
  },
  excommNotice: {
    backgroundColor: 'rgba(232, 121, 249, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(232, 121, 249, 0.25)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  excommTitle: {
    fontSize: 14 * FS,
    fontWeight: '700',
    color: PINK,
    marginBottom: 6,
  },
  excommBody: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
  },
  splitCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderLeftWidth: 3,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: N.surface,
  },
  splitCardMember: {
    backgroundColor: 'rgba(22, 163, 74, 0.04)',
  },
  splitCardTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 2,
  },
  splitCardSub: {
    fontSize: 12 * FS,
    color: N.textSecondary,
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: N.border,
  },
  stepNum: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(232, 121, 249, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(232, 121, 249, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumText: {
    fontSize: 12 * FS,
    fontWeight: '700',
    color: PINK,
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
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletMark: {
    fontSize: 12 * FS,
    color: PINK,
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 13 * FS,
    lineHeight: 19 * FS,
    color: N.textSecondary,
  },
  platformCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    backgroundColor: N.surface,
  },
  platformName: {
    fontSize: 14 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 4,
  },
  platformDesc: {
    fontSize: 12 * FS,
    lineHeight: 17 * FS,
    color: N.textSecondary,
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
  benefitsCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: 'rgba(22, 163, 74, 0.04)',
  },
  benefitsCardTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 4,
  },
  benefitsCardSub: {
    fontSize: 13 * FS,
    color: N.textSecondary,
    marginBottom: 12,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  checkMark: {
    fontSize: 12 * FS,
    color: GREEN,
    marginRight: 8,
    marginTop: 2,
  },
  checkText: {
    flex: 1,
    fontSize: 13 * FS,
    lineHeight: 19 * FS,
    color: N.textSecondary,
  },
  autosaveCard: {
    backgroundColor: 'rgba(108, 99, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.22)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  autosaveTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 6,
  },
  autosaveBody: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
    marginBottom: 10,
  },
  autosaveBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.25)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  autosaveBadgeText: {
    fontSize: 11 * FS,
    fontWeight: '700',
    color: GREEN,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  finalNote: {
    backgroundColor: 'rgba(232, 121, 249, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(232, 121, 249, 0.2)',
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
