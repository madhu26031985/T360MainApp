import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import type { T360ClubOnboardingProgress } from '@/lib/t360ClubOnboarding';

const N = {
  page: '#FBFBFA',
  surface: '#FFFFFF',
  border: 'rgba(55, 53, 47, 0.09)',
  borderStrong: 'rgba(55, 53, 47, 0.16)',
  text: '#37352F',
  textSecondary: '#787774',
  textTertiary: 'rgba(55, 53, 47, 0.45)',
  accent: '#2383E2',
  accentSoft: 'rgba(35, 131, 226, 0.1)',
  accentSoftBorder: 'rgba(35, 131, 226, 0.28)',
  success: '#0F7B6C',
  successSoft: 'rgba(15, 123, 108, 0.12)',
};

type Props = {
  progress: T360ClubOnboardingProgress;
  loading?: boolean;
};

export default function T360ClubOnboardingBox({ progress, loading }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    create_club: true,
    setting_up: true,
    user_management: false,
    meeting_management: false,
  });

  const sectionStats = useMemo(
    () =>
      progress.sections.map((section) => {
        const done = section.items.filter((i) => i.done).length;
        return { done, total: section.items.length };
      }),
    [progress.sections]
  );

  const toggleSection = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={[styles.card, { backgroundColor: N.page, borderColor: N.border }]}>
      <View style={styles.headerRow}>
        <View style={[styles.badge, { backgroundColor: N.accentSoft, borderColor: N.accentSoftBorder }]}>
          <Text style={[styles.badgeText, { color: N.accent }]} maxFontSizeMultiplier={1.2}>
            {progress.percent}%
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: N.text }]} maxFontSizeMultiplier={1.2}>
            T360 onboarding
          </Text>
          <Text style={[styles.subtitle, { color: N.textSecondary }]} maxFontSizeMultiplier={1.2}>
            {loading
              ? 'Loading progress…'
              : `${progress.completedCount} of ${progress.totalCount} tasks complete`}
          </Text>
        </View>
      </View>

      <View style={[styles.progressTrack, { backgroundColor: N.border }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: progress.isComplete ? N.success : N.accent,
              width: `${Math.min(100, progress.percent)}%`,
            },
          ]}
        />
      </View>

      {progress.sections.map((section, sectionIndex) => {
        const { done, total } = sectionStats[sectionIndex];
        const isOpen = expanded[section.id] ?? false;
        const sectionComplete = done === total && total > 0;

        return (
          <View key={section.id} style={[styles.sectionBlock, { borderTopColor: N.border }]}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.id)}
              activeOpacity={0.7}
            >
              {isOpen ? (
                <ChevronDown size={16} color={N.textTertiary} strokeWidth={2} />
              ) : (
                <ChevronRight size={16} color={N.textTertiary} strokeWidth={2} />
              )}
              <Text
                style={[
                  styles.sectionTitle,
                  { color: sectionComplete ? N.success : N.text },
                ]}
                maxFontSizeMultiplier={1.2}
              >
                {section.title}
              </Text>
              <Text style={[styles.sectionCount, { color: N.textTertiary }]} maxFontSizeMultiplier={1.2}>
                {done}/{total}
              </Text>
            </TouchableOpacity>

            {isOpen
              ? section.items.map((item) => (
                  <View key={item.id} style={styles.itemRow}>
                    <View
                      style={[
                        styles.check,
                        item.done
                          ? { backgroundColor: N.success }
                          : { backgroundColor: N.surface, borderWidth: 1, borderColor: N.borderStrong },
                      ]}
                    >
                      <Text
                        style={[
                          styles.checkText,
                          { color: item.done ? N.surface : N.textTertiary },
                        ]}
                        maxFontSizeMultiplier={1.2}
                      >
                        {item.done ? '✓' : ''}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.itemLabel,
                        { color: item.done ? N.textSecondary : N.text },
                        item.done && styles.itemLabelDone,
                      ]}
                      maxFontSizeMultiplier={1.2}
                    >
                      {item.label}
                    </Text>
                  </View>
                ))
              : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  badge: {
    minWidth: 44,
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  sectionBlock: {
    borderTopWidth: 1,
    paddingTop: 8,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.15,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 6,
    paddingLeft: 24,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkText: {
    fontSize: 11,
    fontWeight: '700',
  },
  itemLabel: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.1,
  },
  itemLabelDone: {
    textDecorationLine: 'line-through',
  },
});
