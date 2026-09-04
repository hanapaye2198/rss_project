import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField, SelectField } from '../components/FormField';
import { OutlineButton, PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { formatPHP, useDemoWallet } from '../state/DemoContext';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'CashIn'>;
const banks = [{ name: 'Online Banking', brands: ['BDO', 'UnionBank', 'BPI'], icon: 'card-outline' as const }, { name: 'ATM Cash Deposit', brands: ['BDO', 'BPI'], icon: 'business-outline' as const }, { name: 'Over The Counter', brands: ['BDO', 'BPI', 'PNB', 'D?S'], icon: 'storefront-outline' as const }];
const bankOptions = ['BDO', 'BPI', 'UnionBank', 'Metrobank', 'Landbank'];

export function CashInScreen({ navigation }: Props) {
  const { cashIn } = useDemoWallet();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [bank, setBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [reviewing, setReviewing] = useState(false);

  const openReview = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    const normalizedAccountNumber = accountNumber.replace(/\D/g, '');
    if (!selectedMethod) {
      showAlert('Cash-in not completed', 'Choose a cash-in method.');
      return;
    }
    if (!bank) {
      showAlert('Cash-in not completed', 'Choose the bank receiving the deposit.');
      return;
    }
    if (!accountName.trim()) {
      showAlert('Cash-in not completed', 'Enter the account name.');
      return;
    }
    if (normalizedAccountNumber.length < 6) {
      showAlert('Cash-in not completed', 'Enter a valid receiving account number.');
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      showAlert('Cash-in not completed', 'Enter a cash-in amount greater than zero.');
      return;
    }
    setReviewing(true);
  };

  const confirmCashIn = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    const result = cashIn(numericAmount, selectedMethod, bank, accountName, accountNumber);
    if (!result.success) {
      setReviewing(false);
      showAlert('Cash-in not completed', result.message);
      return;
    }
    showAlert('Cash-in complete', `${formatPHP(numericAmount)} was added through ${selectedMethod} at ${bank}.`, [{ text: 'Done', onPress: () => navigation.goBack() }]);
  };

  return <Screen backgroundColor={colors.blue} contentStyle={styles.content}>
    <AppHeader title="Cash-In" navigation={navigation} dark />
    <View style={styles.heading}><Text style={styles.title}>Add money to your account</Text><Text style={styles.subtitle}>Choose a convenient way to top up your iCASH wallet.</Text></View>
    {banks.map((bank) => <Pressable accessibilityRole="button" key={bank.name} onPress={() => setSelectedMethod(bank.name)} style={({ pressed }) => [styles.bankCard, selectedMethod === bank.name && styles.selected, pressed && styles.pressed]}><View style={styles.bankIcon}><Ionicons name={bank.icon} size={20} color={colors.blue} /></View><View style={styles.bankCopy}><Text style={styles.bankName}>{bank.name}</Text><View style={styles.brandRow}>{bank.brands.map((brand) => <Text key={brand} style={styles.brandBadge}>{brand}</Text>)}</View></View>{selectedMethod === bank.name ? <Ionicons name="checkmark-circle" size={20} color={colors.blue} /> : <Ionicons name="chevron-forward" size={18} color={colors.muted} />}</Pressable>)}
    {selectedMethod ? (reviewing ? <View style={styles.formCard}><Text style={styles.formTitle}>Review cash-in</Text><Text style={styles.reviewIntro}>Check these details before adding money to your wallet.</Text><View style={styles.reviewList}><ReviewRow label="Method" value={selectedMethod} /><ReviewRow label="Receiving bank" value={bank} /><ReviewRow label="Account name" value={accountName.trim()} /><ReviewRow label="Account number" value={`•••• ${accountNumber.replace(/\D/g, '').slice(-4)}`} /><ReviewRow label="Amount" value={formatPHP(Number(amount.replace(/,/g, '')))} last /></View><PrimaryButton title="Confirm cash-in" onPress={confirmCashIn} icon="checkmark" /><OutlineButton title="Edit details" onPress={() => setReviewing(false)} /></View> : <View style={styles.formCard}><Text style={styles.formTitle}>Deposit details</Text><SelectField label="Receiving bank" value={bank} options={bankOptions} onChange={setBank} placeholder="Select bank" /><FormField label="Account name" value={accountName} onChangeText={setAccountName} placeholder="Enter account name" autoCapitalize="words" /><FormField label="Account number" value={accountNumber} onChangeText={setAccountNumber} placeholder="Enter account number" keyboardType="number-pad" /><FormField label="Amount (PHP)" value={amount} onChangeText={setAmount} placeholder="Enter amount" keyboardType="decimal-pad" helper="Funds will be credited after you confirm the deposit details." /><PrimaryButton title="Review cash-in" onPress={openReview} icon="arrow-forward" /></View>) : <View style={styles.infoBox}><Ionicons name="shield-checkmark-outline" size={20} color={colors.green} /><Text style={styles.infoText}>Select a method to enter the deposit details.</Text></View>}
  </Screen>;
}

function ReviewRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return <View style={[styles.reviewRow, last && styles.reviewRowLast]}><Text style={styles.reviewLabel}>{label}</Text><Text style={styles.reviewValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 32, backgroundColor: colors.background },
  heading: { paddingHorizontal: spacing.md, paddingTop: 10, paddingBottom: 20 },
  title: { color: colors.ink, fontFamily: fonts.bold, fontSize: 21 },
  subtitle: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12, marginTop: 7 },
  bankCard: { minHeight: 74, marginHorizontal: spacing.md, marginBottom: 10, padding: 12, borderWidth: 1, borderColor: colors.line, borderRadius: 12, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', gap: 12 },
  selected: { borderColor: colors.blue, backgroundColor: '#F6F7FF' },
  bankIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.blueSoft, alignItems: 'center', justifyContent: 'center' },
  bankCopy: { flex: 1 },
  bankName: { color: colors.ink, fontFamily: fonts.bold, fontSize: 14 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
  brandBadge: { color: colors.blue, fontFamily: fonts.bold, fontSize: 8, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 3, backgroundColor: '#F1F3F8' },
  pressed: { opacity: .8, transform: [{ scale: .99 }] },
  formCard: { margin: 18, padding: 17, borderRadius: 15, backgroundColor: colors.white, shadowColor: '#1B235D', shadowOpacity: .08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  formTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 14, marginBottom: 15 },
  reviewIntro: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, marginBottom: 9 },
  reviewList: { borderTopWidth: 1, borderTopColor: colors.line, marginBottom: 17 },
  reviewRow: { minHeight: 45, borderBottomWidth: 1, borderBottomColor: colors.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 15 },
  reviewRowLast: { borderBottomWidth: 0 },
  reviewLabel: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12 },
  reviewValue: { flex: 1, color: colors.ink, fontFamily: fonts.bold, fontSize: 12, textAlign: 'right' },
  infoBox: { margin: 18, marginTop: 24, padding: 14, borderRadius: 12, backgroundColor: colors.greenSoft, flexDirection: 'row', gap: 10, alignItems: 'center' },
  infoText: { flex: 1, color: '#3E8D68', fontFamily: fonts.regular, fontSize: 11, lineHeight: 16 }
});
