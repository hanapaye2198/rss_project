import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

export function BottomNav({ onHome, onScan, onBeneficiary }: { onHome: () => void; onScan: () => void; onBeneficiary: () => void }) {
  return (
    <View style={styles.nav}>
      <View pointerEvents="none" style={styles.notch} />
      <Pressable accessibilityRole="button" accessibilityLabel="Home" onPress={onHome} style={[styles.navItem, styles.homeItem]}><Ionicons name="home-outline" size={21} color={colors.white} /><Text style={styles.navText}>Home</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Scan to pay" onPress={onScan} style={styles.scan}><Ionicons name="qr-code-outline" size={24} color="#5B58C8" /></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Beneficiary" onPress={onBeneficiary} style={[styles.navItem, styles.beneficiaryItem]}><Ionicons name="people-outline" size={21} color={colors.white} /><Text style={styles.navText}>Beneficiary</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: { height: 58, borderRadius: 29, backgroundColor: '#0000FF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, marginHorizontal: 16, marginTop: 12, marginBottom: 8, position: 'relative', overflow: 'visible' },
  notch: { position: 'absolute', width: 94, height: 30, top: -1, left: '50%', marginLeft: -47, backgroundColor: colors.background, borderBottomLeftRadius: 47, borderBottomRightRadius: 47 },
  navItem: { alignItems: 'center', justifyContent: 'center', gap: 2, minWidth: 78, zIndex: 1 },
  homeItem: { marginLeft: 2 },
  beneficiaryItem: { marginRight: 2 },
  navText: { color: colors.white, fontFamily: fonts.medium, fontSize: 9 },
  scan: { position: 'absolute', zIndex: 2, width: 54, height: 54, borderRadius: 27, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', top: -22, left: '50%', marginLeft: -27, borderWidth: 5, borderColor: colors.background, shadowColor: '#717171', shadowOpacity: .16, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 3 }
});
