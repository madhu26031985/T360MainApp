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

const BOOK_METHODS: {
  num: string;
  title: string;
  path?: string[];
  intro?: string;
  steps: string[];
  callout?: string;
}[] = [
  {
    num: '1',
    title: 'From Book a Role',
    path: ['Meeting', 'Open Meeting', 'Book a Role'],
    steps: [
      'Open the meeting',
      'Tap Book a Role',
      'Go to the Open section',
      'Find Table Topic Master',
      'Tap Book',
    ],
  },
  {
    num: '2',
    title: 'From the Home Page',
    intro: 'A dedicated tab on the Home page for faster access.',
    steps: ['Open the Home page', 'Tap the Table Topics tab', 'If the role is available, tap Book'],
    callout: 'A faster way to reserve the role without navigating to the full role booking page.',
  },
];

const AFTER_FLOW: { label: string; body: string }[] = [
  { label: 'Open', body: 'Available for members' },
  { label: 'Mine', body: 'Reserved for you' },
  { label: 'Agenda', body: 'Name appears' },
  { label: 'Table Topic Corner', body: 'Workspace unlocked' },
];

const AFTER_CHIPS = [
  'Name appears in meeting agenda',
  'Table Topic Corner unlocked',
  'Table Topic Summary unlocked',
];

const CORNER_TABS: { badge: string; title: string; intro: string; bullets: string[]; tone: 'corner' | 'summary' }[] = [
  {
    badge: 'Tab 1',
    title: 'Table Topic Corner',
    intro: 'Your private workspace to prepare questions before and during the meeting.',
    bullets: [
      'Add Table Topic questions in advance',
      'Prepare impromptu speaking prompts',
      'Edit or refine questions anytime',
      'Build your session digitally',
    ],
    tone: 'corner',
  },
  {
    badge: 'Tab 2',
    title: 'Table Topic Summary',
    intro: 'The member-facing view — published after the session concludes.',
    bullets: [
      'Members can see all questions asked',
      'Speakers can revisit prompts anytime',
      'Supports self-improvement at home',
      'Builds a growing knowledge base',
    ],
    tone: 'summary',
  },
];

const EYE_MODES: { pill: string; title: string; intro: string; bullets: string[]; mode: 'off' | 'on' }[] = [
  {
    pill: 'Eye OFF',
    title: 'Hidden from Members',
    intro: 'Keep the Eye button OFF before and during the meeting to preserve the spontaneity of the session.',
    bullets: [
      'Questions remain private',
      'Members cannot see prompts',
      "Speakers won't know questions in advance",
      'You can freely add or modify questions',
    ],
    mode: 'off',
  },
  {
    pill: 'Eye ON',
    title: 'Visible to Members',
    intro: 'Turn the Eye button ON after the Table Topics session is completed to publish all questions asked.',
    bullets: [
      'Questions visible in Table Topic Summary',
      'Members can revisit anytime',
      'Speakers can reflect and practise again',
      'Club users can learn from past questions',
    ],
    mode: 'on',
  },
];

const REPO_ITEMS: { icon: string; text: string }[] = [
  { icon: '🕰️', text: 'Historical collection of all club Table Topics' },
  { icon: '🎯', text: 'Unlimited practice material for members' },
  { icon: '💡', text: 'Inspiration for future Table Topic Masters' },
  { icon: '📈', text: 'Better preparation for impromptu speaking' },
];

const DIGITAL_STEPS: { title: string; body: string }[] = [
  { title: 'Book the role', body: 'Reserve the Table Topic Master role from the Home page or via Book a Role.' },
  { title: 'Open the Table Topic Corner page', body: 'Access your dedicated workspace immediately after booking.' },
  {
    title: 'Add your questions',
    body: 'Use + Add Question to prepare all Table Topic prompts in advance.',
  },
  {
    title: 'Keep questions private',
    body: 'Leave the Eye button OFF before and during the meeting to maintain spontaneity.',
  },
  {
    title: 'Conduct the Table Topics session',
    body: 'Ask the prepared impromptu questions to speakers during the meeting.',
  },
  {
    title: 'Publish the questions',
    body: 'Turn ON Show Table Topic Summary to Member after the session ends.',
  },
  {
    title: 'Members review later',
    body: 'Questions become available in Table Topic Summary and are saved under the Club section for future reference.',
  },
];

export default function T360TrainingTableTopicMasterScreen() {
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
          Table Topic Master
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
            Table Topic Master
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            How to perform the Table Topic Master role digitally in T360 — from booking the role to preparing impromptu
            questions and publishing the Table Topic Summary.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            How to book the Table Topic Master role
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Before you can manage Table Topics, you must first book the Table Topic Master role. You can do this in{' '}
            <Text style={styles.bodyStrong}>two ways</Text>:
          </Text>

          {BOOK_METHODS.map((m) => (
            <View key={m.title} style={styles.miniCard}>
              <View style={styles.methodNum}>
                <Text style={styles.methodNumText} maxFontSizeMultiplier={1.2}>
                  {m.num}
                </Text>
              </View>
              <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
                {m.title}
              </Text>
              {m.path ? (
                <View style={styles.flowWrap}>
                  {m.path.map((step, i) => (
                    <View key={step} style={styles.flowChunk}>
                      {i > 0 ? (
                        <Text style={styles.flowArrow} maxFontSizeMultiplier={1.2}>
                          →{' '}
                        </Text>
                      ) : null}
                      <View style={styles.flowPill}>
                        <Text style={styles.flowPillText} maxFontSizeMultiplier={1.2}>
                          {step}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}
              {m.intro ? (
                <Text style={styles.bodyMuted} maxFontSizeMultiplier={1.2}>
                  {m.intro}
                </Text>
              ) : null}
              {m.steps.map((s, i) => (
                <Text key={s} style={styles.stepLine} maxFontSizeMultiplier={1.25}>
                  {i + 1}. {s}
                </Text>
              ))}
              {m.callout ? (
                <View style={styles.calloutTip}>
                  <Text style={styles.calloutTipText} maxFontSizeMultiplier={1.2}>
                    {m.callout}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            What happens after booking?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Once you book the Table Topic Master role, your name appears in the meeting agenda and two dedicated tabs
            become available:
          </Text>
          <View style={styles.flowWrap}>
            {AFTER_FLOW.map((item, i) => (
              <View key={item.label} style={styles.flowChunk}>
                {i > 0 ? (
                  <Text style={styles.flowArrow} maxFontSizeMultiplier={1.2}>
                    →{' '}
                  </Text>
                ) : null}
                <View style={styles.flowPillStack}>
                  <Text style={styles.flowPillLabel} maxFontSizeMultiplier={1.1}>
                    {item.label}
                  </Text>
                  <Text style={styles.flowPillSub} maxFontSizeMultiplier={1.15}>
                    {item.body}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.shareRow}>
            {AFTER_CHIPS.map((ch) => (
              <View key={ch} style={styles.shareChip}>
                <Text style={styles.shareChipText} maxFontSizeMultiplier={1.15}>
                  ✓ {ch}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            The Table Topic Corner page
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            After booking, the <Text style={styles.bodyStrong}>Table Topic Corner</Text> page becomes your dedicated
            workspace. It contains two tabs that work together to help you prepare and preserve your session:
          </Text>
          {CORNER_TABS.map((tab) => (
            <View
              key={tab.title}
              style={[styles.tabCard, tab.tone === 'corner' ? styles.tabCardCorner : styles.tabCardSummary]}
            >
              <View style={[styles.tabBadge, tab.tone === 'corner' ? styles.tabBadgeCorner : styles.tabBadgeSummary]}>
                <Text style={[styles.tabBadgeText, tab.tone === 'corner' ? styles.tabBadgeTextTeal : styles.tabBadgeTextSlate]} maxFontSizeMultiplier={1.1}>
                  {tab.badge}
                </Text>
              </View>
              <Text style={[styles.tabCardTitle, tab.tone === 'corner' ? styles.tabTitleTeal : styles.tabTitleSlate]} maxFontSizeMultiplier={1.25}>
                {tab.title}
              </Text>
              <Text style={styles.tabIntro} maxFontSizeMultiplier={1.2}>
                {tab.intro}
              </Text>
              {tab.bullets.map((b) => (
                <Text key={b} style={styles.tabBullet} maxFontSizeMultiplier={1.2}>
                  ✓ {b}
                </Text>
              ))}
            </View>
          ))}
          <View style={styles.calloutInfo}>
            <Text style={styles.calloutInfoText} maxFontSizeMultiplier={1.25}>
              Tap <Text style={styles.bodyStrong}>+ Add Question</Text> inside Table Topic Corner to continuously build
              your complete set of questions before the meeting starts.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Controlling visibility — the Eye button
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            At the top of the Table Topic Corner page, you will see{' '}
            <Text style={styles.bodyStrong}>Show Table Topic Summary to Member</Text> along with an{' '}
            <Text style={styles.bodyStrong}>Eye button</Text>. This controls whether members can view your prepared
            questions.
          </Text>
          {EYE_MODES.map((e) => (
            <View key={e.title} style={[styles.eyeCard, e.mode === 'off' ? styles.eyeCardOff : styles.eyeCardOn]}>
              <View style={[styles.eyePill, e.mode === 'off' ? styles.eyePillOff : styles.eyePillOn]}>
                <Text style={[styles.eyePillText, e.mode === 'off' ? styles.eyePillTextOff : styles.eyePillTextOn]} maxFontSizeMultiplier={1.1}>
                  {e.pill}
                </Text>
              </View>
              <Text style={[styles.eyeTitle, e.mode === 'off' ? styles.eyeTitleOff : styles.eyeTitleOn]} maxFontSizeMultiplier={1.25}>
                {e.title}
              </Text>
              <Text style={styles.bodyMuted} maxFontSizeMultiplier={1.2}>
                {e.intro}
              </Text>
              {e.bullets.map((b) => (
                <Text key={b} style={styles.tabBullet} maxFontSizeMultiplier={1.2}>
                  {e.mode === 'off' ? '🔒 ' : '✓ '}
                  {b}
                </Text>
              ))}
            </View>
          ))}

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Club-wide Table Topic question repository
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Every published Table Topic question is automatically saved and made available club-wide. Over time, this
            builds a central pool of impromptu speaking prompts for your club.
          </Text>
          <View style={styles.repoBox}>
            <Text style={styles.repoTitle} maxFontSizeMultiplier={1.25}>
              📚 Questions saved under the Club section
            </Text>
            <Text style={styles.repoLead} maxFontSizeMultiplier={1.2}>
              All published questions from every meeting are collected and displayed under the Club section for ongoing
              reference and practice.
            </Text>
            <View style={styles.repoGrid}>
              {REPO_ITEMS.map((r) => (
                <View key={r.text} style={styles.repoItem}>
                  <Text style={styles.repoIcon} maxFontSizeMultiplier={1.3}>
                    {r.icon}
                  </Text>
                  <Text style={styles.repoItemText} maxFontSizeMultiplier={1.15}>
                    {r.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            How the role is performed in T360
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Table Topic Master role in T360 is <Text style={styles.bodyStrong}>fully digital</Text>. Here is the
            complete end-to-end flow:
          </Text>
          {DIGITAL_STEPS.map(({ title, body }, i) => (
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
    marginBottom: 22,
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
  bodyMuted: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
    marginBottom: 10,
  },
  bodyStrong: {
    fontWeight: '700',
    color: N.text,
  },
  miniCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: 'rgba(55, 53, 47, 0.02)',
  },
  methodNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(15, 118, 110, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  methodNumText: {
    fontSize: 16 * FS,
    fontWeight: '700',
    color: '#0F766E',
  },
  miniCardTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 8,
  },
  flowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
  },
  flowChunk: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  flowArrow: {
    fontSize: 14 * FS,
    color: N.textSecondary,
    marginRight: 2,
  },
  flowPill: {
    backgroundColor: 'rgba(55, 53, 47, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: N.border,
  },
  flowPillText: {
    fontSize: 13 * FS,
    fontWeight: '600',
    color: N.text,
  },
  flowPillStack: {
    backgroundColor: 'rgba(55, 53, 47, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: N.border,
    minWidth: 100,
    maxWidth: 160,
  },
  flowPillLabel: {
    fontSize: 11 * FS,
    fontWeight: '700',
    color: N.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  flowPillSub: {
    fontSize: 12 * FS,
    color: N.textSecondary,
    lineHeight: 16 * FS,
  },
  stepLine: {
    fontSize: 14 * FS,
    lineHeight: 22 * FS,
    color: N.text,
    marginBottom: 4,
    paddingLeft: 2,
  },
  calloutTip: {
    marginTop: 10,
    backgroundColor: 'rgba(234, 179, 8, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(202, 138, 4, 0.35)',
    borderRadius: 8,
    padding: 10,
  },
  calloutTipText: {
    fontSize: 13 * FS,
    lineHeight: 19 * FS,
    color: '#A16207',
    fontStyle: 'italic',
  },
  shareRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    marginTop: 4,
  },
  shareChip: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.22)',
    marginRight: 8,
    marginBottom: 8,
  },
  shareChipText: {
    fontSize: 13 * FS,
    fontWeight: '600',
    color: '#15803D',
  },
  tabCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  tabCardCorner: {
    backgroundColor: 'rgba(45, 212, 191, 0.08)',
    borderColor: 'rgba(15, 118, 110, 0.28)',
  },
  tabCardSummary: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderColor: 'rgba(37, 99, 235, 0.28)',
  },
  tabBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
  },
  tabBadgeCorner: {
    backgroundColor: 'rgba(15, 118, 110, 0.15)',
  },
  tabBadgeSummary: {
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
  },
  tabBadgeText: {
    fontSize: 10 * FS,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  tabBadgeTextTeal: {
    color: '#0F766E',
  },
  tabBadgeTextSlate: {
    color: '#1D4ED8',
  },
  tabCardTitle: {
    fontSize: 17 * FS,
    fontWeight: '700',
    marginBottom: 6,
  },
  tabTitleTeal: {
    color: '#0F766E',
  },
  tabTitleSlate: {
    color: '#1D4ED8',
  },
  tabIntro: {
    fontSize: 14 * FS,
    lineHeight: 20 * FS,
    color: N.textSecondary,
    marginBottom: 8,
  },
  tabBullet: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.text,
    marginBottom: 4,
    paddingLeft: 2,
  },
  calloutInfo: {
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    marginTop: 4,
  },
  calloutInfoText: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: '#1D4ED8',
    fontWeight: '500',
  },
  eyeCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  eyeCardOff: {
    backgroundColor: '#F5F5F5',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  eyeCardOn: {
    backgroundColor: 'rgba(22, 163, 74, 0.08)',
    borderColor: 'rgba(22, 163, 74, 0.25)',
  },
  eyePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  eyePillOff: {
    backgroundColor: '#E0E0E0',
  },
  eyePillOn: {
    backgroundColor: 'rgba(22, 163, 74, 0.18)',
  },
  eyePillText: {
    fontSize: 11 * FS,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  eyePillTextOff: {
    color: '#555',
  },
  eyePillTextOn: {
    color: '#15803D',
  },
  eyeTitle: {
    fontSize: 16 * FS,
    fontWeight: '700',
    marginBottom: 6,
  },
  eyeTitleOff: {
    color: '#444',
  },
  eyeTitleOn: {
    color: '#15803D',
  },
  repoBox: {
    backgroundColor: 'rgba(234, 88, 12, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(234, 88, 12, 0.25)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  repoTitle: {
    fontSize: 17 * FS,
    fontWeight: '700',
    color: '#C2410C',
    marginBottom: 8,
  },
  repoLead: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
    marginBottom: 12,
  },
  repoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  repoItem: {
    width: '47%',
    minWidth: 140,
    flexGrow: 1,
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  repoIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  repoItemText: {
    fontSize: 13 * FS,
    lineHeight: 18 * FS,
    color: N.textSecondary,
    textAlign: 'center',
  },
  lifecycleBlock: {
    marginBottom: 16,
  },
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
  },
});
