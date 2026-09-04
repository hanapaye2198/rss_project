import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { showAlert } from '../utils/feedback';

export function BottomNav({ onHome }: { onHome: () => void }) {
  return (
    <View style={styles.nav}>
      <Pressable accessibilityRole="button" onPress={onHome} style={styles.navItem}><Ionicons name="home-outline" size={22} color={colors.white} /><Text style={styles.navText}>Home</Text></Pressable>
      <Pressable accessibilityRole="button" onPress={() => showAlert('Scan to pay', 'The QR scanner will be connected here.')} style={styles.scan}><Ionicons name="scan-outline" size={26} color={colors.blue} /></Pressable>
      <Pressable accessibilityRole="button" onPress={() => showAlert('Beneficiaries', 'Your saved beneficiaries will appear here.')} style={styles.navItem}><Ionicons name="people-outline" size={22} color={colors.white} /><Text style={styles.navText}>Beneficiary</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: { height: 70, borderRadius: 24, backgroundColor: colors.blue, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 18, marginTop: 22 },
  navItem: { alignItems: 'center', justifyContent: 'center', gap: 3, minWidth: 70 },
  navText: { color: colors.white, fontFamily: fonts.medium, fontSize: 10 },
  scan: { width: 61, height: 61, borderRadius: 31, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginTop: -28, borderWidth: 6, borderColor: colors.background }
});
