import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { formatPHP, useDemoWallet } from '../state/DemoContext';
import { colors, fonts, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'CashIn'>;
const banks = [{ name: 'Online Banking', brands: ['BDO', 'UnionBank', 'BPI'], icon: 'card-outline' as const }, { name: 'ATM Cash Deposit', brands: ['BDO', 'BPI'], icon: 'business-outline' as const }, { name: 'Over The Counter', brands: ['BDO', 'BPI', 'PNB', 'D?S'], icon: 'storefront-outline' as const }];

export function CashInScreen({ navigation }: Props) {
  const { cashIn } = useDemoWallet();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');

  const submit = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    const result = cashIn(numericAmount, selectedMethod);
    if (!result.success) {
      Alert.alert('Cash-in not completed', result.message);
      return;
    }
    Alert.alert('Cash-in complete', `${formatPHP(numericAmount)} was added through ${selectedMethod}.`, [{ text: 'Done', onPress: () => navigation.goBack() }]);
  };

  return <Screen backgroundColor={colors.blue} contentStyle={styles.content}>
    <AppHeader title="Cash-In" navigation={navigation} dark />
    <View style={styles.heading}><Text style={styles.title}>Add money to your account</Text><Text style={styles.subtitle}>Choose a convenient way to top up your iCASH wallet.</Text></View>
    {banks.map((bank) => <Pressable key={bank.name} onPress={() => setSelectedMethod(bank.name)} style={({ pressed }) => [styles.bankCard, selectedMethod === bank.name && styles.selected, pressed && styles.pressed]}><View style={styles.bankIcon}><Ionicons name={bank.icon} size={20} color={colors.blue} /></View><View style={styles.bankCopy}><Text style={styles.bankName}>{bank.name}</Text><View style={styles.brandRow}>{bank.brands.map((brand) => <Text key={brand} style={styles.brandBadge}>{brand}</Text>)}</View></View>{selectedMethod === bank.name ? <Ionicons name="checkmark-circle" size={20} color={colors.blue} /> : <Ionicons name="chevron-forward" size={18} color={colors.muted} />}</Pressable>)}
    {selectedMethod ? <View style={styles.formCard}><Text style={styles.formTitle}>Cash in through {selectedMethod}</Text><FormField label="Amount (PHP)" value={amount} onChangeText={setAmount} placeholder="Enter amount" keyboardType="decimal-pad" /><PrimaryButton title="Add money" onPress={submit} icon="add-circle-outline" /></View> : <View style={styles.infoBox}><Ionicons name="shield-checkmark-outline" size={20} color={colors.green} /><Text style={styles.infoText}>Select a method to enter the amount you want to add.</Text></View>}
  </Screen>;
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
  infoBox: { margin: 18, marginTop: 24, padding: 14, borderRadius: 12, backgroundColor: colors.greenSoft, flexDirection: 'row', gap: 10, alignItems: 'center' },
  infoText: { flex: 1, color: '#3E8D68', fontFamily: fonts.regular, fontSize: 11, lineHeight: 16 }
});
