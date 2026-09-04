import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { formatPHP, useDemoWallet } from '../state/DemoContext';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'PayBills'>;
const categories: { label: string; icon: keyof typeof Ionicons.glyphMap; color: string }[] = [
  { label: 'Electricity', icon: 'flash', color: '#FFC12B' }, { label: 'Water and sewer', icon: 'water', color: '#4C9CE8' }, { label: 'Internet', icon: 'wifi', color: '#6C73E8' }, { label: 'Travel tax', icon: 'airplane', color: '#7EBE54' }, { label: 'Telecom', icon: 'phone-portrait', color: '#A65EE7' }, { label: 'Government', icon: 'business', color: '#EC7F57' }, { label: 'Insurance', icon: 'shield-checkmark', color: '#40B9AE' }, { label: 'Credit cards', icon: 'card', color: '#E3A63C' }, { label: 'Real estate', icon: 'home', color: '#72A2E4' }, { label: 'Payments', icon: 'receipt', color: '#EC7091' }, { label: 'Loans', icon: 'cash', color: '#8FB44B' }, { label: 'Others', icon: 'ellipsis-horizontal', color: '#999EAE' }
];

export function PayBillsScreen({ navigation }: Props) {
  const { balance, payBill } = useDemoWallet();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [biller, setBiller] = useState('');
  const [amount, setAmount] = useState('');

  const submit = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    const result = payBill(numericAmount, selectedCategory, biller);
    if (!result.success) {
      showAlert('Bill payment not completed', result.message);
      return;
    }
    showAlert('Bill payment complete', `${formatPHP(numericAmount)} paid to ${biller}.`, [{ text: 'Done', onPress: () => navigation.goBack() }]);
  };

  return <Screen backgroundColor={colors.blue} contentStyle={styles.content}>
    <AppHeader title="Pay Bills" navigation={navigation} dark />
    <Text style={styles.helper}>Choose a category to find your biller.</Text>
    <View style={styles.balancePill}><Text style={styles.balancePillText}>Wallet balance {formatPHP(balance)}</Text></View>
    <Text style={styles.sectionLabel}>Choose from categories</Text>
    <View style={styles.grid}>{categories.map((category) => <Pressable accessibilityRole="button" key={category.label} onPress={() => setSelectedCategory(category.label)} style={({ pressed }) => [styles.category, selectedCategory === category.label && styles.selected, pressed && styles.pressed]}><View style={[styles.categoryIcon, { backgroundColor: category.color }]}><Ionicons name={category.icon} size={20} color={colors.white} /></View><Text style={styles.categoryLabel}>{category.label}</Text>{selectedCategory === category.label ? <Ionicons name="checkmark-circle" size={15} color={colors.blue} style={styles.check} /> : null}</Pressable>)}</View>
    {selectedCategory ? <View style={styles.formCard}><Text style={styles.formTitle}>{selectedCategory} bill payment</Text><FormField label="Biller or account number" value={biller} onChangeText={setBiller} placeholder="Enter biller reference" /><FormField label="Amount (PHP)" value={amount} onChangeText={setAmount} placeholder="Enter amount" keyboardType="decimal-pad" /><PrimaryButton title="Pay bill" onPress={submit} icon="receipt-outline" /></View> : <Text style={styles.selectHint}>Select a category to enter your bill details.</Text>}
  </Screen>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 30, backgroundColor: colors.background },
  helper: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12, marginHorizontal: spacing.md, marginTop: 8, marginBottom: 13 },
  balancePill: { alignSelf: 'flex-start', marginHorizontal: spacing.md, marginBottom: 22, paddingHorizontal: 11, paddingVertical: 6, borderRadius: 100, backgroundColor: colors.blueSoft },
  balancePillText: { color: colors.blue, fontFamily: fonts.medium, fontSize: 10 },
  sectionLabel: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15, marginHorizontal: spacing.md, marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.md, justifyContent: 'space-between' },
  category: { position: 'relative', width: '31.4%', minHeight: 94, marginBottom: 11, borderWidth: 1, borderColor: colors.line, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 8 },
  selected: { borderColor: colors.blue, backgroundColor: colors.blueSoft },
  categoryIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  categoryLabel: { color: colors.ink, fontFamily: fonts.medium, fontSize: 10, textAlign: 'center' },
  check: { position: 'absolute', top: 7, right: 7 },
  pressed: { transform: [{ scale: .97 }] },
  formCard: { margin: spacing.md, marginTop: 24, padding: 17, borderRadius: 15, backgroundColor: colors.white, shadowColor: '#1B235D', shadowOpacity: .08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  formTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 14, marginBottom: 15 },
  selectHint: { margin: 24, color: colors.muted, textAlign: 'center', fontFamily: fonts.regular, fontSize: 11 }
});
