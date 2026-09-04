import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>;

export function ScanScreen({ navigation }: Props) {
  const [merchantCode, setMerchantCode] = useState('');
  const [amount, setAmount] = useState('');

  const pay = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    if (!merchantCode.trim() || !numericAmount || numericAmount <= 0) {
      showAlert('Complete payment details', 'Enter a merchant code and amount, or use the demo scanner.');
      return;
    }
    showAlert('Payment ready', `Merchant ${merchantCode.trim()}\nAmount: PHP ${numericAmount.toLocaleString('en-PH')}\n\nReview this payment before confirming.`);
  };

  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent} scroll>
      <AppHeader title="Scan to Pay" subtitle="Pay securely with a QR code" navigation={navigation} dark />
      <View style={styles.content}>
        <View style={styles.scannerCard}><View style={styles.scanFrame}><View style={[styles.corner, styles.topLeft]} /><View style={[styles.corner, styles.topRight]} /><View style={[styles.corner, styles.bottomLeft]} /><View style={[styles.corner, styles.bottomRight]} /><Ionicons name="scan-outline" size={58} color={colors.blue} /></View><Text style={styles.scanTitle}>Scan a merchant QR</Text><Text style={styles.scanBody}>Point your camera at the QR code to continue.</Text><PrimaryButton title="Open camera" icon="camera-outline" onPress={() => showAlert('Camera demo', 'The camera view will open here on a physical device.')} style={styles.cameraButton} /></View>
        <View style={styles.dividerRow}><View style={styles.divider} /><Text style={styles.or}>OR ENTER MANUALLY</Text><View style={styles.divider} /></View>
        <View style={styles.manualCard}><Text style={styles.manualTitle}>Pay using a merchant code</Text><FormField label="Merchant code" value={merchantCode} onChangeText={setMerchantCode} placeholder="e.g. ICASH-1234" autoCapitalize="characters" /><FormField label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="0.00" /><PrimaryButton title="Continue payment" icon="arrow-forward" onPress={pay} /></View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  scannerCard: { backgroundColor: colors.white, borderRadius: 18, alignItems: 'center', padding: spacing.lg },
  scanFrame: { width: 190, height: 190, borderRadius: 18, backgroundColor: '#F2F4FF', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  corner: { position: 'absolute', width: 30, height: 30, borderColor: colors.blue },
  topLeft: { top: 18, left: 18, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 6 },
  topRight: { top: 18, right: 18, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 6 },
  bottomLeft: { bottom: 18, left: 18, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 6 },
  bottomRight: { bottom: 18, right: 18, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 6 },
  scanTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15, marginTop: spacing.md },
  scanBody: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11, marginTop: 5, textAlign: 'center' },
  cameraButton: { alignSelf: 'stretch', marginTop: spacing.md },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginVertical: spacing.lg },
  divider: { flex: 1, height: 1, backgroundColor: colors.line },
  or: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  manualCard: { backgroundColor: colors.white, borderRadius: 18, padding: spacing.md },
  manualTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15, marginBottom: spacing.md }
});
