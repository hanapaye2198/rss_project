import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

export function BottomNav({ onHome, onScan, onBeneficiary }: { onHome: () => void; onScan: () => void; onBeneficiary: () => void }) {
  return (
    <View style={styles.navWrap}>
      <View pointerEvents="none" style={styles.navSurface} />
      <Pressable accessibilityRole="button" onPress={onHome} style={styles.navItem}><Ionicons name="home-outline" size={22} color={colors.white} /><Text style={styles.navText}>Home</Text></Pressable>
      <Pressable accessibilityRole="button" onPress={onScan} style={styles.scan}><Ionicons name="scan-outline" size={26} color={colors.blue} /></Pressable>
      <Pressable accessibilityRole="button" onPress={onBeneficiary} style={styles.navItem}><Ionicons name="people-outline" size={22} color={colors.white} /><Text style={styles.navText}>Beneficiary</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navWrap: { height: 80, position: 'relative', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 12 },
  navSurface: { position: 'absolute', right: 0, bottom: 0, left: 0, height: 58, borderRadius: 22, backgroundColor: colors.blue },
  navItem: { zIndex: 1, height: 58, alignItems: 'center', justifyContent: 'center', gap: 2, minWidth: 78 },
  navText: { color: colors.white, fontFamily: fonts.medium, fontSize: 9 },
  scan: { zIndex: 2, width: 54, height: 54, borderRadius: 27, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginBottom: 26, borderWidth: 5, borderColor: colors.background }
});
