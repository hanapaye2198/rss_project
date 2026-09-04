import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField, SelectField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'IREMITX'>;

const countries = ['United States', 'Canada', 'United Kingdom', 'Singapore'];

export function IREMITXScreen({ navigation }: Props) {
  const [country, setCountry] = useState(countries[0] ?? 'United States');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const submit = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    if (!recipient.trim() || !numericAmount || numericAmount <= 0) {
      showAlert('Complete the details', 'Enter the recipient name and amount before continuing.');
      return;
    }
    showAlert('Ready to send', `Your demo remittance to ${recipient.trim()} in ${country} is ready for review.\nAmount: PHP ${numericAmount.toLocaleString('en-PH')}`);
  };

  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent} scroll>
      <AppHeader title="IREMITX" subtitle="Send money across borders" navigation={navigation} dark />
      <View style={styles.content}>
        <View style={styles.banner}><View style={styles.bannerIcon}><Ionicons name="globe-outline" size={25} color={colors.blue} /></View><View style={styles.bannerText}><Text style={styles.bannerTitle}>Send money worldwide</Text><Text style={styles.bannerBody}>Fast, convenient remittance for the people who matter.</Text></View></View>
        <View style={styles.formCard}><Text style={styles.formTitle}>Recipient details</Text><SelectField label="Send to" value={country} options={countries} onChange={setCountry} /><FormField label="Recipient full name" value={recipient} onChangeText={setRecipient} placeholder="Enter full name" autoCapitalize="words" /><FormField label="Amount to send" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="0.00" helper="Service fees and exchange rates are shown before confirmation." /><View style={styles.rateRow}><Text style={styles.rateLabel}>Estimated delivery</Text><Text style={styles.rateValue}>Within minutes</Text></View><PrimaryButton title="Continue remittance" icon="arrow-forward" onPress={submit} /></View>
        <View style={styles.recentCard}><Text style={styles.recentTitle}>Recent recipients</Text><View style={styles.recipientRow}><View style={styles.avatar}><Text style={styles.avatarText}>JR</Text></View><View style={styles.recipientText}><Text style={styles.recipientName}>Juan Reyes</Text><Text style={styles.recipientDetail}>United States · Bank deposit</Text></View><Ionicons name="chevron-forward" size={17} color={colors.muted} /></View></View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  banner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5FF', borderRadius: 17, padding: spacing.md, marginBottom: spacing.md },
  bannerIcon: { width: 48, height: 48, borderRadius: 15, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  bannerText: { flex: 1 },
  bannerTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15 },
  bannerBody: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, lineHeight: 15, marginTop: 3 },
  formCard: { borderRadius: 16, backgroundColor: colors.white, padding: spacing.md },
  formTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15, marginBottom: spacing.md },
  rateRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -2, marginBottom: spacing.md },
  rateLabel: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10 },
  rateValue: { color: '#2EAF72', fontFamily: fonts.bold, fontSize: 10 },
  recentCard: { borderRadius: 16, backgroundColor: colors.white, padding: spacing.md, marginTop: spacing.md },
  recentTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 14, marginBottom: 12 },
  recipientRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#DDE9FF', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.blue, fontFamily: fonts.bold, fontSize: 12 },
  recipientText: { flex: 1 },
  recipientName: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  recipientDetail: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 3 }
});
