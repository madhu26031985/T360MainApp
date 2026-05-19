import { View, Text, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Megaphone } from 'lucide-react-native';

type OpenMeetingsHorizonCardProps = {
  vpeName: string;
  borderColor: string;
  primaryColor: string;
  /** Inside a parent master box (e.g. Home) — no extra card chrome */
  embedded?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function OpenMeetingsHorizonCard({
  vpeName,
  borderColor,
  primaryColor,
  embedded = false,
  style,
}: OpenMeetingsHorizonCardProps) {
  const vpeFirstName = vpeName.trim().split(/\s+/).filter(Boolean)[0] || vpeName || 'VPE';

  return (
    <View
      style={[
        styles.card,
        embedded ? styles.cardEmbedded : { borderColor },
        style,
      ]}
    >
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Megaphone size={18} color="#475569" strokeWidth={2} />
        </View>
        <View style={styles.body}>
          <Text style={styles.message} maxFontSizeMultiplier={1.3}>
            Exciting meetings are on the way! Our{' '}
            <Text style={[styles.vpeName, { color: primaryColor }]} maxFontSizeMultiplier={1.3}>
              {vpeFirstName}
            </Text>
            {' '}is planning the upcoming sessions. Stay tuned, or connect with{' '}
            <Text style={[styles.vpeName, { color: primaryColor }]} maxFontSizeMultiplier={1.3}>
              {vpeFirstName}
            </Text>
            {' '}for more information.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    overflow: 'hidden',
  },
  cardEmbedded: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  message: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748B',
    lineHeight: 18,
  },
  vpeName: {
    fontWeight: '600',
  },
});
