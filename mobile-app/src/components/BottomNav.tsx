import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

export function BottomNav({ onHome, onScan, onBeneficiary }: { onHome: () => void; onScan: () => void; onBeneficiary: () => void }) {
  return (
    <View style={styles.nav}>
      <Pressable accessibilityRole="button" onPress={onHome} style={styles.navItem}><Ionicons name="home-outline" size={22} color={colors.white} /><Text style={styles.navText}>Home</Text></Pressable>
      <Pressable accessibilityRole="button" onPress={onScan} style={styles.scan}><Ionicons name="scan-outline" size={26} color={colors.blue} /></Pressable>
      <Pressable accessibilityRole="button" onPress={onBeneficiary} style={styles.navItem}><Ionicons name="people-outline" size={22} color={colors.white} /><Text style={styles.navText}>Beneficiary</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: { height: 70, borderRadius: 24, backgroundColor: colors.blue, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 18, marginTop: 22 },
  navItem: { alignItems: 'center', justifyContent: 'center', gap: 3, minWidth: 70 },
  navText: { color: colors.white, fontFamily: fonts.medium, fontSize: 10 },
  scan: { width: 61, height: 61, borderRadius: 31, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginTop: -28, borderWidth: 6, borderColor: colors.background }
});
