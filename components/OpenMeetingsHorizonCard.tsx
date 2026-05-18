import { View, Text, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Calendar, Clock, Megaphone, Sparkles } from 'lucide-react-native';

type OpenMeetingsHorizonCardProps = {
  vpeName: string;
  borderColor: string;
  primaryColor: string;
  style?: StyleProp<ViewStyle>;
};

export default function OpenMeetingsHorizonCard({
  vpeName,
  borderColor,
  primaryColor,
  style,
}: OpenMeetingsHorizonCardProps) {
  const vpeFirstName = vpeName.trim().split(/\s+/).filter(Boolean)[0] || vpeName || 'VPE';

  return (
    <View style={[styles.card, { borderColor }, style]}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Megaphone size={22} color="#2563EB" strokeWidth={2} />
        </View>
        <View style={styles.body}>
          <Text style={styles.headline} maxFontSizeMultiplier={1.3}>
            Something exciting is on the horizon! 🚀
          </Text>
          <Text style={styles.desc} maxFontSizeMultiplier={1.3}>
            Your VPE is planning upcoming meetings that will inspire, engage, and help everyone grow.
          </Text>
          <Text style={styles.footer} maxFontSizeMultiplier={1.3}>
            Stay tuned or connect with{' '}
            <Text style={[styles.vpeName, { color: primaryColor }]} maxFontSizeMultiplier={1.3}>
              {vpeFirstName}
            </Text>
            {' '}for more details.
          </Text>
        </View>
        <View style={styles.art} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <Sparkles size={14} color="#93C5FD" style={styles.sparkleTop} />
          <View style={styles.artIcons}>
            <View style={styles.calendarTile}>
              <Calendar size={28} color="#2563EB" strokeWidth={1.75} />
            </View>
            <View style={styles.clockTile}>
              <Clock size={22} color="#1D4ED8" strokeWidth={1.75} />
            </View>
          </View>
          <Sparkles size={12} color="#BFDBFE" style={styles.sparkleBottom} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8FAFC',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 14,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  body: {
    flex: 1,
    minWidth: 0,
    paddingRight: 4,
  },
  headline: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E3A5F',
    lineHeight: 20,
  },
  desc: {
    fontSize: 13,
    fontWeight: '400',
    color: '#475569',
    lineHeight: 18,
    marginTop: 6,
  },
  footer: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748B',
    lineHeight: 17,
    marginTop: 8,
  },
  vpeName: {
    fontWeight: '600',
  },
  art: {
    width: 76,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative',
  },
  artIcons: {
    width: 64,
    height: 56,
    position: 'relative',
  },
  calendarTile: {
    position: 'absolute',
    left: 0,
    top: 4,
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockTile: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  sparkleTop: {
    position: 'absolute',
    top: 2,
    right: 6,
  },
  sparkleBottom: {
    position: 'absolute',
    bottom: 4,
    left: 2,
  },
});
