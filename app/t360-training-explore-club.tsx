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
    title: 'Know Your Club Better',
    body: 'Understand the club’s mission, meeting schedule, and values.',
  },
  {
    title: 'Stay Connected',
    body: 'View Executive Committee members and connect with club members.',
  },
  {
    title: 'Track Club Performance',
    body: 'Monitor speeches, evaluations, themes, and meeting statistics.',
  },
  {
    title: 'Learn from Club Activities',
    body: 'Access educational speeches, prepared speeches, words of the day, and meeting insights.',
  },
  {
    title: 'Celebrate Club Growth',
    body: 'Explore club trends, meeting reports, and member participation.',
  },
];

const CLUB_OVERVIEW_CHECKS = [
  'Club name and club number',
  'Charter date',
  'District, Division, and Area details',
  'Club mission statement',
];

const MEETING_SCHEDULE_CHECKS = [
  'Meeting day and time',
  'Meeting frequency (Weekly / Bi-weekly / Monthly)',
  'Timezone',
  'Meeting mode (In-Person / Online / Hybrid)',
  'Meeting duration',
];

const WHY_TM_CHECKS = [
  'Public Speaking – Improve confidence and communication skills',
  'Leadership Skills – Learn to lead and inspire others',
  'Personal Growth – Build confidence and self-awareness',
  'Networking Opportunities – Connect with professionals and peers',
  'Career Development – Strengthen communication and leadership abilities',
];

const LOCATION_CHECKS = ['View the club address', 'Open the location directly in Maps for navigation'];

const EXCOMM_CHECKS = [
  'Executive Committee members',
  'Leadership roles and responsibilities',
  'Contact or profile details (if enabled)',
];

const EXCOMM_ROLES = [
  'President',
  'Vice President Education (VPE)',
  'Vice President Membership (VPM)',
  'Vice President Public Relations (VPPR)',
  'Secretary',
  'Treasurer',
  'Sergeant at Arms (SAA)',
];

const MEMBERS_CHECKS = [
  'View club members',
  'See member profiles (if enabled)',
  'Connect and engage with fellow Toastmasters',
];

const STATS_MAIN = [
  'Prepared Speeches',
  'Educational Speeches',
  'Table Topic Speeches',
  'Meetings Conducted',
  'Themes Used',
  'Evaluations Completed',
];

const STATS_PERIODS = ['Last 30 Days', 'Last 90 Days', 'Last 180 Days', 'Last 1 Year'];

const THEME_HISTORY_CHECKS = [
  'Past meeting themes',
  'Toastmaster of the Day details',
  'Meeting history and trends',
];

const PREPARED_SPEECH_CHECKS = ['Speaker name', 'Speech title', 'Pathway information', 'Project level'];

const EDUCATIONAL_CHECKS = ['Educational speech topics', 'Speaker information', 'Meeting dates'];

const WOTD_CHECKS = ['Word of the Day', 'Meaning and usage', 'Contributor details', 'Date added'];

const QUOTE_CHECKS = ['Motivational or learning quotes', 'Meaning or context', 'Contributor details'];

const IDIOM_CHECKS = ['Idiom meaning', 'Example usage', 'Contributor information'];

const TIMER_CHECKS = [
  'Prepared Speech timings',
  'Evaluation timings',
  'Table Topic timings',
  'Educational Speech timings',
];

const AH_WORDS = ['Ah', 'Um', 'Uh', 'Like', 'Well', 'Er'];

const TTQ_CHECKS = ['Question/topic details', 'Added by whom', 'Date created'];

const GE_CHECKS = ['Meeting evaluation ratings', 'Overall meeting performance score', 'Meeting-wise evaluation insights'];

const CONNECT_CHECKS = ['Club social media pages', 'YouTube channel', 'External club resources'];

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Can I see club meeting details in the Club tab?',
    a: 'Yes. The Meeting Schedule section provides complete meeting information.',
  },
  {
    q: 'Can I view club members?',
    a: 'Yes. The Members section displays club members and profiles (if enabled).',
  },
  {
    q: 'Can I access past speeches?',
    a: 'Yes. Prepared and Educational speeches are available under their respective sections.',
  },
  {
    q: 'What is Club Statistics used for?',
    a: 'It helps members and ExComm teams track club engagement, speeches, meetings, and overall participation.',
  },
  {
    q: 'Can I view previous meeting themes?',
    a: 'Yes. Toastmaster & Theme History provides access to past meeting themes.',
  },
  {
    q: 'What is the Ah-Counter Report?',
    a: 'It tracks filler words such as Ah, Um, Uh, Like, and Well to improve speaking effectiveness.',
  },
  {
    q: 'Can I open the club location in Maps?',
    a: 'Yes. Use the Open in Maps option available under the Location section.',
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

function DotList({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => (
        <View key={line} style={styles.dotRow}>
          <Text style={styles.dotMark} maxFontSizeMultiplier={1.25}>
            •
          </Text>
          <Text style={styles.dotText} maxFontSizeMultiplier={1.25}>
            {line}
          </Text>
        </View>
      ))}
    </>
  );
}

export default function T360TrainingExploreClubScreen() {
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
          Explore Your Club
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
            Explore Your Club
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Explore your club, stay connected, and track club activities and performance
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why the Club Tab Matters?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Club tab serves as your club’s digital hub in T360, providing everything you need to know about your
            club — from mission and meeting schedules to member engagement, club statistics, speeches, and performance
            insights.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Purpose of the Club Tab
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            The Club tab helps members understand the club, connect with fellow members, explore club activities, and
            stay informed about club growth and achievements.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Benefits of Using the Club Tab
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
            The Club tab helps you stay informed, engaged, and connected with your Toastmasters club while tracking
            growth and learning opportunities.
          </Text>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            What You Can Access on the Club Tab
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🏛 Club Overview
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            At the top of the screen, you can view your club’s core information.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can view:
          </Text>
          <CheckList lines={CLUB_OVERVIEW_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 This section helps members understand the club’s identity and purpose.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            📅 Meeting Schedule
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Stay informed about when and how your club meets.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            Meeting details include:
          </Text>
          <CheckList lines={MEETING_SCHEDULE_CHECKS} />
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            This helps members plan and participate effectively.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🌟 Why Join Toastmasters?
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Learn how the club supports personal and professional development.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            Benefits may include:
          </Text>
          <CheckList lines={WHY_TM_CHECKS} />
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            🚀 Toastmasters helps members grow personally and professionally.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            📍 Club Location
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Quickly access your meeting venue details.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can:
          </Text>
          <CheckList lines={LOCATION_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Helpful for members attending in-person meetings.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            👥 Executive Committee
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Get to know the leadership team managing the club.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can view:
          </Text>
          <CheckList lines={EXCOMM_CHECKS} />
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            Examples of roles:
          </Text>
          <DotList lines={EXCOMM_ROLES} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 The Executive Committee helps run the club smoothly.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🤝 Club Members
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Explore your club community.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can:
          </Text>
          <CheckList lines={MEMBERS_CHECKS} />
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            This helps members build stronger club connections.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            📊 Club Statistics
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Track overall club activity and performance trends.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            Statistics may include:
          </Text>
          <CheckList lines={STATS_MAIN} />
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can also view insights across different periods:
          </Text>
          <CheckList lines={STATS_PERIODS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Club stats help understand engagement and club growth.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🎤 Toastmaster & Theme History
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Explore previous meeting themes and Toastmasters of the Day.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can view:
          </Text>
          <CheckList lines={THEME_HISTORY_CHECKS} />
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            This helps members learn from past meetings and ideas.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🗣 Prepared Speeches
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            View speeches delivered within the club.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            Speech information includes:
          </Text>
          <CheckList lines={PREPARED_SPEECH_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Useful for tracking member speaking progress and learning from speech topics.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🎓 Educational Speeches
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Explore educational speeches shared within the club.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can view:
          </Text>
          <CheckList lines={EDUCATIONAL_CHECKS} />
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            This helps members learn and grow through shared knowledge.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            📖 Word of the Day
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Build vocabulary and improve communication skills.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can view:
          </Text>
          <CheckList lines={WOTD_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 A great way to improve language and speaking skills.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            💬 Quote of the Day
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Discover inspiring quotes shared during meetings.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can view:
          </Text>
          <CheckList lines={QUOTE_CHECKS} />

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🧠 Idiom of the Day
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Learn commonly used idioms and expressions.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can view:
          </Text>
          <CheckList lines={IDIOM_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Improves language fluency and communication confidence.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            ⏱ Timer Report (Meeting Wise)
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            View timing performance for past meetings.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            Reports may include:
          </Text>
          <CheckList lines={TIMER_CHECKS} />
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            This helps members understand time discipline during meetings.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🎯 Ah-Counter Report
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Review filler word tracking from previous meetings.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can monitor usage of:
          </Text>
          <CheckList lines={AH_WORDS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Helps members improve speaking clarity and reduce filler words.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            ❓ Table Topic Questions
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Explore previous Table Topic questions used in meetings.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can view:
          </Text>
          <CheckList lines={TTQ_CHECKS} />
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Helpful for practice and inspiration.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            ⭐ General Evaluator Scoring
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Review meeting evaluation scores and feedback.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You can view:
          </Text>
          <CheckList lines={GE_CHECKS} />
          <Text style={styles.tip} maxFontSizeMultiplier={1.25}>
            💡 Helps clubs continuously improve meeting quality.
          </Text>

          <Text style={styles.featureHeading} maxFontSizeMultiplier={1.25}>
            🔗 Connect
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Stay connected with the club online.
          </Text>
          <Text style={styles.bodyLead} maxFontSizeMultiplier={1.25}>
            You may find links to:
          </Text>
          <CheckList lines={CONNECT_CHECKS} />

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
            💡 The Club tab helps members understand, engage with, and grow alongside their Toastmasters club.
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
  dotRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingLeft: 4,
  },
  dotMark: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: N.textSecondary,
    minWidth: 16 * FS,
  },
  dotText: {
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
