import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Building2, Calendar, MapPin, Package } from 'lucide-react-native';
import { useTrainingKbBack } from '@/lib/trainingBackNavigation';

const N = {
  page: '#FBFBFA',
  surface: '#FFFFFF',
  border: 'rgba(55, 53, 47, 0.09)',
  text: '#37352F',
  textSecondary: '#787774',
};

const FS = 0.9;

const AUDIENCE_CHIPS: { label: string; dot: string }[] = [
  { label: 'Members', dot: '#2563EB' },
  { label: 'ExCom Members', dot: '#7C3AED' },
  { label: 'Guests', dot: '#16A34A' },
  { label: 'Visiting Toastmasters', dot: '#EA580C' },
  { label: 'Club Leaders', dot: '#DC2626' },
];

type ClubSection = {
  num: string;
  title: string;
  icon: React.ReactNode;
  fill: string[];
  why: string;
  note?: string;
  accent: string;
  whyBg: string;
};

const CLUB_SECTIONS: ClubSection[] = [
  {
    num: '01',
    title: 'Club Info',
    icon: <Building2 size={16} color="#2563EB" strokeWidth={2} />,
    fill: ['Club Mission', 'Club Status', 'Club Type', 'Club Banner Colour'],
    why: "Helps members and guests understand the club's purpose, identity, and operating status.",
    note: 'Club Name, Number, and Charter Date are system-generated and non-editable.',
    accent: '#2563EB',
    whyBg: 'rgba(37, 99, 235, 0.08)',
  },
  {
    num: '02',
    title: 'Club Location',
    icon: <MapPin size={16} color="#DC2626" strokeWidth={2} />,
    fill: ['Country', 'Time Zone', 'Club Address', 'City', 'Map / Location Link'],
    why: 'Helps members, guests, and visiting Toastmasters easily locate the venue. A valid map link improves navigation and accessibility.',
    accent: '#16A34A',
    whyBg: 'rgba(22, 163, 74, 0.1)',
  },
  {
    num: '03',
    title: 'Club Meeting Details',
    icon: <Calendar size={16} color="#D97706" strokeWidth={2} />,
    fill: ['Meeting Day', 'Meeting Frequency', 'Start Time', 'End Time', 'Meeting Type'],
    why: 'Members and guests rely on this to know when meetings happen. Keeping it current avoids missed meetings and scheduling confusion.',
    accent: '#D97706',
    whyBg: 'rgba(217, 119, 6, 0.12)',
  },
  {
    num: '04',
    title: 'Club More Details',
    icon: <Package size={16} color="#7C3AED" strokeWidth={2} />,
    fill: ['Region / State', 'District', 'Division', 'Area'],
    why: "Provides visibility into the club's Toastmasters structure and helps members understand district and area alignment.",
    accent: '#7C3AED',
    whyBg: 'rgba(124, 58, 237, 0.1)',
  },
];

export default function T360TrainingClubInfoAdminScreen() {
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
          Club Info
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <Text style={styles.heroCrumb} maxFontSizeMultiplier={1.15}>
            T360 KNOWLEDGE BASE · ADMIN PANEL · CLUB INFO
          </Text>
          <Text style={styles.heroTitle} maxFontSizeMultiplier={1.35}>
            Club Info
          </Text>
          <Text style={styles.heroScript} maxFontSizeMultiplier={1.25}>
            Admin Panel
          </Text>
          <Text style={styles.heroLead} maxFontSizeMultiplier={1.25}>
            A centralized section for ExCom members to maintain official club details — ensuring members, guests, and
            visiting Toastmasters always have accurate, up-to-date information.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.kbBadge}>
            <Text style={styles.kbBadgeText} maxFontSizeMultiplier={1.2}>
              T360 · Knowledge base
            </Text>
          </View>

          <View style={styles.accessHeadRow}>
            <Text style={styles.sectionHeading} maxFontSizeMultiplier={1.3}>
              Who can update this?
            </Text>
            <View style={styles.accessPill}>
              <Text style={styles.accessPillText} maxFontSizeMultiplier={1.05}>
                ACCESS CONTROL
              </Text>
            </View>
          </View>

          <View style={styles.lockCard}>
            <View style={styles.lockIconWrap}>
              <Text style={styles.lockEmoji} maxFontSizeMultiplier={1.2}>
                🔐
              </Text>
            </View>
            <View style={styles.lockTextWrap}>
              <Text style={styles.lockTitle} maxFontSizeMultiplier={1.25}>
                ExCom members only can edit Club Info
              </Text>
              <Text style={styles.lockBody} maxFontSizeMultiplier={1.2}>
                Once updated, the information becomes visible to all users in the{' '}
                <Text style={styles.clubTabHl}>Club Tab</Text>.
              </Text>
              <View style={styles.audienceRow}>
                {AUDIENCE_CHIPS.map(({ label, dot }) => (
                  <View key={label} style={styles.audienceChip}>
                    <View style={[styles.audienceDot, { backgroundColor: dot }]} />
                    <Text style={styles.audienceChipText} maxFontSizeMultiplier={1.1}>
                      {label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <Text style={[styles.sectionHeading, styles.sectionHeadingSpaced]} maxFontSizeMultiplier={1.3}>
            Sections in Club Info
          </Text>
          <Text style={styles.sectionSub} maxFontSizeMultiplier={1.15}>
            4 sections
          </Text>

          <View style={styles.grid}>
            {CLUB_SECTIONS.map((sec) => (
              <View key={sec.title} style={[styles.sectionCard, { borderTopColor: sec.accent }]}>
                <View style={styles.sectionCardHead}>
                  <View style={[styles.sectionIconTile, { borderColor: sec.accent + '55' }]}>{sec.icon}</View>
                  <View style={styles.sectionNumWrap}>
                    <Text style={[styles.sectionNum, { color: sec.accent }]} maxFontSizeMultiplier={1.1}>
                      {sec.num}
                    </Text>
                  </View>
                  <Text style={styles.sectionCardTitle} maxFontSizeMultiplier={1.2}>
                    {sec.title}
                  </Text>
                </View>
                <Text style={styles.fillLabel} maxFontSizeMultiplier={1.1}>
                  Fill in
                </Text>
                {sec.fill.map((line) => (
                  <View key={line} style={styles.fillRow}>
                    <View style={[styles.fillBullet, { backgroundColor: sec.accent }]} />
                    <Text style={styles.fillText} maxFontSizeMultiplier={1.15}>
                      {line}
                    </Text>
                  </View>
                ))}
                <View style={[styles.whyBox, { backgroundColor: sec.whyBg }]}>
                  <Text style={styles.whyLabel} maxFontSizeMultiplier={1.1}>
                    Why it matters
                  </Text>
                  <Text style={styles.whyText} maxFontSizeMultiplier={1.15}>
                    {sec.why}
                  </Text>
                  {sec.note ? (
                    <Text style={styles.whyNote} maxFontSizeMultiplier={1.1}>
                      {sec.note}
                    </Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.importantBanner}>
            <Text style={styles.importantIcon} maxFontSizeMultiplier={1.2}>
              ⚠️
            </Text>
            <View style={styles.importantTextWrap}>
              <Text style={styles.importantTitle} maxFontSizeMultiplier={1.25}>
                Important Note
              </Text>
              <Text style={styles.importantBody} maxFontSizeMultiplier={1.2}>
                Please ensure all information is accurate and regularly updated. Complete club information creates
                greater visibility, improves member engagement, helps guests understand the club better, and ensures
                everyone can confidently access the latest details directly from the{' '}
                <Text style={styles.importantHl}>Club Tab</Text>.
              </Text>
            </View>
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
    marginBottom: 12,
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
  hero: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 20,
    marginBottom: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroCrumb: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10 * FS,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26 * FS,
    fontWeight: '700',
    marginBottom: 4,
  },
  heroScript: {
    color: '#7DD3FC',
    fontSize: 18 * FS,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  heroLead: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
  },
  card: {
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 14,
    padding: 16,
  },
  kbBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 14,
  },
  kbBadgeText: {
    fontSize: 12 * FS,
    fontWeight: '600',
    color: '#0369A1',
  },
  accessHeadRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 16 * FS,
    fontWeight: '700',
    color: N.text,
    flexShrink: 1,
  },
  sectionHeadingSpaced: {
    marginTop: 8,
  },
  sectionSub: {
    fontSize: 12 * FS,
    fontWeight: '700',
    color: N.textSecondary,
    letterSpacing: 1,
    marginBottom: 12,
  },
  accessPill: {
    backgroundColor: 'rgba(125, 211, 252, 0.35)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.35)',
  },
  accessPillText: {
    fontSize: 10 * FS,
    fontWeight: '800',
    color: '#0369A1',
    letterSpacing: 0.6,
  },
  lockCard: {
    flexDirection: 'row',
    backgroundColor: N.surface,
    borderWidth: 1,
    borderColor: N.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  lockIconWrap: {
    width: 44,
    alignItems: 'center',
    paddingTop: 2,
  },
  lockEmoji: {
    fontSize: 28,
  },
  lockTextWrap: {
    flex: 1,
  },
  lockTitle: {
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
    marginBottom: 6,
  },
  lockBody: {
    fontSize: 14 * FS,
    lineHeight: 20 * FS,
    color: N.textSecondary,
    marginBottom: 10,
  },
  clubTabHl: {
    fontWeight: '800',
    color: '#0369A1',
  },
  audienceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  audienceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(55, 53, 47, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: N.border,
  },
  audienceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  audienceChipText: {
    fontSize: 12 * FS,
    fontWeight: '600',
    color: N.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    marginBottom: 16,
  },
  sectionCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: N.border,
    borderTopWidth: 4,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.96)',
  },
  sectionCardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  sectionIconTile: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  sectionNumWrap: {
    marginRight: 8,
  },
  sectionNum: {
    fontSize: 12 * FS,
    fontWeight: '800',
  },
  sectionCardTitle: {
    flex: 1,
    minWidth: 100,
    fontSize: 15 * FS,
    fontWeight: '700',
    color: N.text,
  },
  fillLabel: {
    fontSize: 11 * FS,
    fontWeight: '800',
    color: N.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  fillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  fillBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  fillText: {
    flex: 1,
    fontSize: 13 * FS,
    color: N.text,
    lineHeight: 18 * FS,
  },
  whyBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  whyLabel: {
    fontSize: 11 * FS,
    fontWeight: '800',
    color: N.text,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  whyText: {
    fontSize: 13 * FS,
    lineHeight: 18 * FS,
    color: N.text,
  },
  whyNote: {
    marginTop: 8,
    fontSize: 12 * FS,
    lineHeight: 17 * FS,
    fontStyle: 'italic',
    color: N.textSecondary,
  },
  importantBanner: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    overflow: 'hidden',
  },
  importantIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  importantTextWrap: {
    flex: 1,
  },
  importantTitle: {
    fontSize: 16 * FS,
    fontWeight: '800',
    color: '#FACC15',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  importantBody: {
    fontSize: 14 * FS,
    lineHeight: 21 * FS,
    color: 'rgba(255,255,255,0.88)',
  },
  importantHl: {
    fontWeight: '800',
    color: '#FACC15',
  },
});
