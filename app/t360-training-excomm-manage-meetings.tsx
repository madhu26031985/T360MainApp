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

const CREATE_STEPS: { title: string; body: string }[] = [
  {
    title: 'Enter meeting information',
    body: 'Meeting Title — per your club naming convention. Meeting Number — for tracking and reference. Then tap Next.',
  },
  {
    title: 'Select meeting mode',
    body: 'Choose In-Person, Online, or Hybrid (see Meeting modes below). Then tap Next.',
  },
  {
    title: 'Select date & time',
    body: 'Set Meeting Date, Start Time, and End Time. Then tap Create Meeting.',
  },
];

const EDIT_STEPS: { title: string; body: string }[] = [
  {
    title: 'Navigate to Open Meetings',
    body: 'Admin Panel → Manage Meetings → Open Meetings. Find the meeting to edit.',
  },
  { title: 'Tap Edit Meeting', body: 'Opens meeting details for editing (Open meetings only).' },
  {
    title: 'Update information & mode',
    body: 'Title, number, mode, location (in-person/hybrid), meeting link (online/hybrid).',
  },
  {
    title: 'Update date & time',
    body: 'Adjust date, start, and end time as needed.',
  },
  { title: 'Save', body: 'Tap Save to apply changes.' },
];

const MODES: { title: string; body: string; fields: string }[] = [
  { title: 'In-Person', body: 'Meeting at a physical venue.', fields: 'Required: Location details' },
  { title: 'Online', body: 'Meeting held virtually.', fields: 'Required: Meeting link' },
  { title: 'Hybrid', body: 'Members may attend in person or online.', fields: 'Required: Location + meeting link' },
];

const OPEN_STATUS_LINES = [
  'Members can view the meeting',
  'Members and visiting Toastmasters can book roles',
  'Users can see who has booked each role',
];

const CLOSED_STATUS_LINES = [
  'Members cannot book roles',
  'Role booking is disabled',
  'Treated as a completed meeting',
];

const HOME_TAB_LINES = ['View available roles', 'Book roles quickly', 'See role assignments'];

const MEETING_TAB_LINES = ['Access all meetings', 'View and book roles', 'Browse open meetings'];

const WHY_POINTS = [
  'Open meetings for role booking',
  'Enable seamless participation',
  'Improve planning and visibility',
  'Track booked and available roles',
  'Organise meetings more effectively',
];

const ROLE_ACTIONS: { title: string; body: string }[] = [
  {
    title: 'Manage role availability',
    body: 'Control which roles are visible and bookable. Move roles between Available and Deleted.',
  },
  {
    title: 'Assign on behalf',
    body: 'Assign a role to any member — useful when someone confirms offline or via WhatsApp.',
  },
  {
    title: 'Reassign or unassign',
    body: 'Reassign to another member, unassign a booked role, or manage changes before the meeting.',
  },
];

const FAQS: { q: string; a: string }[] = [
  { q: 'Who can create a meeting?', a: 'Only ExComm members can create meetings in T360.' },
  {
    q: 'What meeting modes are available?',
    a: 'In-person, online, and hybrid.',
  },
  { q: 'What is required for an online meeting?', a: 'You must provide a meeting link.' },
  { q: 'What is required for an in-person meeting?', a: 'You must provide the meeting location details.' },
  {
    q: 'What is a hybrid meeting?',
    a: 'Members can attend physically or online; both location details and a meeting link are required.',
  },
  {
    q: 'What happens after a meeting is created?',
    a: 'The meeting moves to Open status so members and visiting Toastmasters can book roles.',
  },
  {
    q: 'Where can members see the meeting?',
    a: 'In the Home tab and the Meeting tab.',
  },
  { q: 'Can members see who booked a role?', a: 'Yes. Booked roles and assignees are visible.' },
  { q: 'How many roles are available by default?', a: 'T360 provides 37 Toastmasters meeting roles per meeting.' },
  {
    q: 'What is the difference between Available and Deleted roles?',
    a: 'Available roles are visible and bookable. Deleted roles are hidden and not bookable but can be restored.',
  },
  { q: 'Can ExComm assign roles on behalf of members?', a: 'Yes.' },
  { q: 'Can ExComm reassign or unassign roles?', a: 'Yes, anytime before the meeting.' },
  {
    q: 'What is the open meeting limit?',
    a: 'A club can keep at most 3 meetings in Open status. Close one before opening another when at the limit.',
  },
  { q: 'Who can manage meeting roles?', a: 'Only ExComm members.' },
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

export default function T360TrainingExcommManageMeetingsScreen() {
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
          Create & Manage Meeting
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
            Create & Manage Meeting
          </Text>
          <Text style={styles.lead} maxFontSizeMultiplier={1.3}>
            Admin Panel · ExComm members · Create meetings, edit open meetings, understand modes and statuses, and
            manage meeting roles.
          </Text>

          <View style={styles.calloutCream}>
            <Text style={styles.calloutCreamText} maxFontSizeMultiplier={1.25}>
              <Text style={styles.calloutBold}>ExComm only.</Text> Only ExComm members can create a meeting. Go to{' '}
              <Text style={styles.calloutBold}>Admin Panel → Manage Meetings → Create Meetings</Text> to start.
            </Text>
          </View>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            <Text style={styles.inlineBold}>Create Meeting</Text> lets your club start meetings so members and visiting
            Toastmasters can view and book roles.
          </Text>

          <View style={styles.restrictBadge}>
            <Text style={styles.restrictBadgeText} maxFontSizeMultiplier={1.15}>
              ExComm members only
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            How to create a meeting
          </Text>
          {CREATE_STEPS.map(({ title, body }, i) => (
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
            How to edit a meeting
          </Text>
          <View style={styles.calloutInfo}>
            <Text style={styles.calloutInfoText} maxFontSizeMultiplier={1.25}>
              <Text style={styles.inlineBold}>ExComm only.</Text> Admin Panel → Manage Meetings → Open Meetings →{' '}
              <Text style={styles.inlineBold}>Edit Meeting</Text> on the card. Editing is only for meetings in{' '}
              <Text style={styles.inlineBold}>Open</Text> status.
            </Text>
          </View>
          {EDIT_STEPS.map(({ title, body }, i) => (
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
            Meeting modes
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Pick the mode that matches how your meeting runs.
          </Text>
          {MODES.map((m) => (
            <View key={m.title} style={styles.miniCard}>
              <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
                {m.title}
              </Text>
              <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
                {m.body}
              </Text>
              <Text style={styles.modeFields} maxFontSizeMultiplier={1.1}>
                {m.fields}
              </Text>
            </View>
          ))}

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Meeting statuses
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            ExComm can move a closed meeting back to Open from the Closed tab when needed.
          </Text>
          <View style={styles.statusPair}>
            <View style={[styles.statusCard, styles.statusOpen]}>
              <Text style={styles.statusTitleOpen} maxFontSizeMultiplier={1.15}>
                Open meeting
              </Text>
              <BulletList lines={OPEN_STATUS_LINES} />
            </View>
            <View style={[styles.statusCard, styles.statusClosed]}>
              <Text style={styles.statusTitleClosed} maxFontSizeMultiplier={1.15}>
                Closed meeting
              </Text>
              <BulletList lines={CLOSED_STATUS_LINES} />
            </View>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Open meeting limit
          </Text>
          <View style={styles.limitBox}>
            <Text style={styles.limitNum} maxFontSizeMultiplier={1.2}>
              3
            </Text>
            <Text style={styles.limitBody} maxFontSizeMultiplier={1.25}>
              A club may keep at most <Text style={styles.limitStrong}>three meetings</Text> in Open status. Close one
              before creating another when you are at the limit.
            </Text>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Where members see meetings
          </Text>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            After creation, meetings show in both places:
          </Text>
          <View style={styles.tabPair}>
            <View style={styles.tabCard}>
              <View style={styles.tabCardHeader}>
                <Text style={styles.tabCardHeaderText} maxFontSizeMultiplier={1.1}>
                  Home tab
                </Text>
              </View>
              <View style={styles.tabCardBody}>
                <BulletList lines={HOME_TAB_LINES} />
              </View>
            </View>
            <View style={styles.tabCard}>
              <View style={styles.tabCardHeader}>
                <Text style={styles.tabCardHeaderText} maxFontSizeMultiplier={1.1}>
                  Meeting tab
                </Text>
              </View>
              <View style={styles.tabCardBody}>
                <BulletList lines={MEETING_TAB_LINES} />
              </View>
            </View>
          </View>

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Why create a meeting?
          </Text>
          <BulletList lines={WHY_POINTS} />

          <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
            Manage meeting roles
          </Text>
          <View style={styles.calloutInfo}>
            <Text style={styles.calloutInfoText} maxFontSizeMultiplier={1.25}>
              <Text style={styles.inlineBold}>ExComm only.</Text> Meeting → select meeting →{' '}
              <Text style={styles.inlineBold}>Manage Meeting Roles</Text>.
            </Text>
          </View>
          <Text style={styles.body} maxFontSizeMultiplier={1.25}>
            Each meeting includes <Text style={styles.inlineBold}>37 Toastmasters roles</Text> by default. ExComm can
            hide roles, restore them, assign on behalf, and reassign before the meeting.
          </Text>
          {ROLE_ACTIONS.map((a) => (
            <View key={a.title} style={styles.miniCard}>
              <Text style={styles.miniCardTitle} maxFontSizeMultiplier={1.25}>
                {a.title}
              </Text>
              <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.25}>
                {a.body}
              </Text>
            </View>
          ))}
          <View style={styles.rolePair}>
            <View style={[styles.roleBox, styles.roleBoxAvail]}>
              <Text style={styles.roleBoxTitleAvail} maxFontSizeMultiplier={1.1}>
                Available roles
              </Text>
              <BulletList lines={['Visible to members', 'Bookable', 'Active for this meeting']} />
            </View>
            <View style={[styles.roleBox, styles.roleBoxDel]}>
              <Text style={styles.roleBoxTitleDel} maxFontSizeMultiplier={1.1}>
                Deleted roles
              </Text>
              <BulletList lines={['Hidden from members', 'Not bookable', 'Can be restored']} />
            </View>
          </View>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle} maxFontSizeMultiplier={1.1}>
              Example — 3 prepared speakers
            </Text>
            <Text style={styles.miniCardBody} maxFontSizeMultiplier={1.2}>
              Keep Prepared Speaker 1–3 in Available; move Prepared Speaker 4–5 to Deleted. Restore from Deleted if
              plans change.
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
    marginBottom: 18,
  },
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
  },
  calloutBold: { fontWeight: '800', color: '#37352F' },
  inlineBold: { fontWeight: '800', color: N.text },
  restrictBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(190, 24, 93, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 14,
    marginTop: 4,
  },
  restrictBadgeText: {
    fontSize: 12 * FS,
    fontWeight: '700',
    color: '#9D174D',
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
  calloutInfo: {
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  calloutInfoText: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: '#1D4ED8',
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
  modeFields: {
    marginTop: 8,
    fontSize: 12 * FS,
    fontWeight: '600',
    color: N.text,
    backgroundColor: 'rgba(55, 53, 47, 0.05)',
    padding: 8,
    borderRadius: 6,
  },
  statusPair: { gap: 12, marginBottom: 8 },
  statusCard: {
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  statusOpen: {
    backgroundColor: '#f0faf5',
    borderColor: '#b2ddc3',
  },
  statusClosed: {
    backgroundColor: '#fdf4f4',
    borderColor: '#e0bbb8',
  },
  statusTitleOpen: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: '#2e7d52',
    marginBottom: 8,
  },
  statusTitleClosed: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: '#c0392b',
    marginBottom: 8,
  },
  limitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2340',
    borderRadius: 10,
    padding: 18,
    gap: 16,
    marginBottom: 12,
  },
  limitNum: {
    fontSize: 40 * FS,
    fontWeight: '800',
    color: '#f0d080',
    lineHeight: 44 * FS,
  },
  limitBody: {
    flex: 1,
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: 'rgba(255,255,255,0.88)',
  },
  limitStrong: { fontWeight: '800', color: '#FFFFFF' },
  tabPair: { gap: 12, marginBottom: 8 },
  tabCard: {
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  tabCardHeader: {
    backgroundColor: '#1a2340',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  tabCardHeaderText: {
    color: '#FFFFFF',
    fontSize: 13 * FS,
    fontWeight: '700',
  },
  tabCardBody: { padding: 12 },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletMark: {
    fontSize: 14 * FS,
    lineHeight: 20 * FS,
    color: N.textSecondary,
    minWidth: 16 * FS,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 14 * FS,
    lineHeight: 20 * FS,
    color: N.text,
  },
  rolePair: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8, marginBottom: 8 },
  roleBox: {
    flex: 1,
    minWidth: 140,
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
  },
  roleBoxAvail: {
    backgroundColor: '#f0faf5',
    borderColor: '#b2ddc3',
  },
  roleBoxDel: {
    backgroundColor: '#fdf4f4',
    borderColor: '#e0bbb8',
  },
  roleBoxTitleAvail: {
    fontSize: 13 * FS,
    fontWeight: '800',
    color: '#2e7d52',
    marginBottom: 8,
  },
  roleBoxTitleDel: {
    fontSize: 13 * FS,
    fontWeight: '800',
    color: '#c0392b',
    marginBottom: 8,
  },
  exampleBox: {
    backgroundColor: '#fffbf0',
    borderWidth: 1,
    borderColor: '#e8d49a',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  exampleTitle: {
    fontSize: 12 * FS,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#7a5a10',
    marginBottom: 8,
    textTransform: 'uppercase',
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
