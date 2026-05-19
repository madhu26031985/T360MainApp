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
const AMBER = '#D97706';

const FIND_STEPS = [
  { title: 'Go to the Home tab', body: 'Start from the main Home screen in T360.' },
  {
    title: 'Open My Profile or Edit Profile',
    body: 'Tap My Profile or Edit Profile to access your profile settings.',
  },
  { title: 'Update your details and save', body: 'Make your changes and click Save to apply them.' },
];

const ABOUT_WHY: { icon: string; text: string }[] = [
  { icon: '👥', text: 'Other members can view your profile under the Clubs tab' },
  { icon: '🤝', text: 'Members learn about you before interacting' },
  { icon: '🎤', text: 'Role holders can introduce you accurately during meetings' },
  { icon: '🌐', text: 'Builds stronger personal and professional connections' },
];

const SOCIAL_PLATFORMS: { name: string; desc: string }[] = [
  { name: 'LinkedIn', desc: 'Professional networking' },
  { name: 'Twitter / X', desc: 'Ideas & updates' },
  { name: 'Instagram', desc: 'Personal highlights' },
  { name: 'YouTube', desc: 'Content & talks' },
];

const SOCIAL_BENEFITS = [
  'Helps members connect with you professionally',
  'Builds networking opportunities beyond meetings',
  'Encourages collaboration and ongoing engagement',
  'Adding social links is optional, but recommended',
];

const MATTERS_CARDS: { icon: string; text: string }[] = [
  { icon: '🪪', text: 'Represents who you are within the club community' },
  { icon: '🤝', text: 'Helps members connect with you more naturally' },
  { icon: '🎙️', text: 'Supports better and more accurate meeting introductions' },
  { icon: '👁️', text: 'Builds your visibility within the club' },
  { icon: '🌐', text: 'Creates professional and personal networking opportunities' },
  { icon: '🚀', text: 'Showcases your Toastmasters journey and growth' },
];

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

function UpdateCard({
  title,
  body,
  tags,
  children,
}: {
  title: string;
  body: string;
  tags?: string[];
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.updateCard}>
      <Text style={styles.updateCardTitle} maxFontSizeMultiplier={1.25}>
        {title}
      </Text>
      <Text style={styles.updateCardBody} maxFontSizeMultiplier={1.25}>
        {body}
      </Text>
      {tags ? (
        <View style={styles.tagRow}>
          {tags.map((tag) => (
            <View key={tag} style={styles.miniTag}>
              <Text style={styles.miniTagText} maxFontSizeMultiplier={1.15}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
      {children}
    </View>
  );
}

export default function T360TrainingMyProfileScreen() {
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
            My Profile
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Your profile acts as your personal introduction within the club. Keeping it updated helps other members
            know more about you and makes networking and role-based introductions easier during meetings.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Where to find My Profile
          </Text>
          <NumberedSteps steps={FIND_STEPS} />

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            What you can update
          </Text>

          <UpdateCard
            title="1. Profile photo"
            body="Add a clear profile picture so other members can easily recognize you during meetings and events."
            tags={['Helps with recognition', 'Visible to all members']}
          />

          <UpdateCard
            title="2. Contact information"
            body="Keep your contact details current so members can reach you when needed."
            tags={['Phone number', 'Location', 'Email address']}
          />

          <UpdateCard
            title="3. About section"
            body="The About section acts as your introduction to the club. Share what makes you, you."
            tags={[
              'Interests',
              'Professional background',
              'Toastmasters journey',
              'Goals & achievements',
              'Hobbies & passions',
            ]}
          >
            <Text style={styles.subLabel} maxFontSizeMultiplier={1.2}>
              Why the About section matters
            </Text>
            {ABOUT_WHY.map(({ icon, text }) => (
              <View key={text} style={styles.whyCard}>
                <Text style={styles.whyIcon} maxFontSizeMultiplier={1.2}>
                  {icon}
                </Text>
                <Text style={styles.whyText} maxFontSizeMultiplier={1.25}>
                  {text}
                </Text>
              </View>
            ))}
          </UpdateCard>

          <UpdateCard
            title="4. Social media links"
            body="Optionally connect your social profiles to expand your presence and enable networking beyond meetings."
          >
            <View style={styles.socialGrid}>
              {SOCIAL_PLATFORMS.map(({ name, desc }) => (
                <View key={name} style={styles.socialCard}>
                  <Text style={styles.socialName} maxFontSizeMultiplier={1.2}>
                    {name}
                  </Text>
                  <Text style={styles.socialDesc} maxFontSizeMultiplier={1.15}>
                    {desc}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.calloutAmber}>
              {SOCIAL_BENEFITS.map((line) => (
                <Text key={line} style={styles.calloutAmberLine} maxFontSizeMultiplier={1.25}>
                  → {line}
                </Text>
              ))}
            </View>
          </UpdateCard>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why keeping your profile updated matters
          </Text>
          <View style={styles.mattersGrid}>
            {MATTERS_CARDS.map(({ icon, text }) => (
              <View key={text} style={styles.mattersCard}>
                <Text style={styles.mattersIcon} maxFontSizeMultiplier={1.3}>
                  {icon}
                </Text>
                <Text style={styles.mattersText} maxFontSizeMultiplier={1.2}>
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
              Your profile is more than basic information
            </Text>
            <Text style={styles.finalNoteBody} maxFontSizeMultiplier={1.25}>
              It is your identity within the club. Keeping it updated helps others understand your journey, interests,
              and contributions to the community — making every interaction more meaningful and every introduction
              more impactful.
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
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
  },
  kbBadgeText: {
    fontSize: 12 * FS,
    fontWeight: '600',
    color: AMBER,
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
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumText: {
    fontSize: 12 * FS,
    fontWeight: '700',
    color: AMBER,
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
  updateCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(55, 53, 47, 0.02)',
    borderLeftWidth: 3,
    borderLeftColor: AMBER,
  },
  updateCardTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 6,
  },
  updateCardBody: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  miniTag: {
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  miniTagText: {
    fontSize: 12 * FS,
    color: N.textSecondary,
  },
  subLabel: {
    fontSize: 11 * FS,
    fontWeight: '700',
    color: N.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 12,
    marginBottom: 8,
  },
  whyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    backgroundColor: N.surface,
  },
  whyIcon: { fontSize: 16 },
  whyText: {
    flex: 1,
    fontSize: 13 * FS,
    lineHeight: 19 * FS,
    color: N.textSecondary,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  socialCard: {
    width: '47%',
    flexGrow: 1,
    minWidth: 130,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: N.surface,
    alignItems: 'center',
  },
  socialName: {
    fontSize: 13 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  socialDesc: {
    fontSize: 12 * FS,
    color: N.textSecondary,
    textAlign: 'center',
  },
  calloutAmber: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.22)',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
  },
  calloutAmberLine: {
    fontSize: 13 * FS,
    lineHeight: 20 * FS,
    color: N.textSecondary,
    marginBottom: 4,
  },
  mattersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  mattersCard: {
    width: '47%',
    flexGrow: 1,
    minWidth: 140,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: N.surface,
    alignItems: 'center',
  },
  mattersIcon: {
    marginBottom: 6,
  },
  mattersText: {
    fontSize: 12 * FS,
    lineHeight: 17 * FS,
    color: N.textSecondary,
    textAlign: 'center',
  },
  finalNote: {
    backgroundColor: 'rgba(108, 99, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.2)',
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
