import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField, SelectField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { formatPHP, useDemoWallet } from '../state/DemoContext';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'BankTransfer'>;

export function BankTransferScreen({ navigation }: Props) {
  const { bankTransfer } = useDemoWallet();
  const [bank, setBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const submit = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    if (!accountNumber.trim()) {
      showAlert('Account number needed', 'Enter the receiving account number to continue.');
      return;
    }
    const result = bankTransfer(numericAmount, bank, accountName);
    if (!result.success) {
      showAlert('Transfer not completed', result.message);
      return;
    }
    showAlert('Bank transfer complete', `${formatPHP(numericAmount)} sent to ${accountName}.`, [{ text: 'Done', onPress: () => navigation.goBack() }]);
  };

  return <Screen backgroundColor={colors.blue} contentStyle={styles.content}>
    <AppHeader title="Bank Transfer" navigation={navigation} dark />
    <Text style={styles.sectionLabel}>Favorites</Text>
    <Pressable accessibilityRole="button" onPress={() => { setBank('BDO'); setAccountName('Maria Santos'); setAccountNumber('0012345678'); }} style={({ pressed }) => [styles.favorite, pressed && styles.pressed]}><View style={styles.plus}><Text style={styles.plusText}>+</Text></View><Text style={styles.addText}>{bank ? 'Favorite loaded' : 'Add demo favorite'}</Text></Pressable>
    <Text style={styles.sectionLabel}>Account to Transfer</Text>
    <SelectField label="Account type" value="PHP" onPress={() => showAlert('Account type', 'PHP selected for this demo.')} />
    <FormField label="Account name" value={accountName} onChangeText={setAccountName} placeholder="Enter account name" autoCapitalize="words" />
    <SelectField label="Bank" value={bank} onPress={() => setBank(bank ? '' : 'BDO')} placeholder="Select bank (tap to choose BDO)" />
    <FormField label="Account number" value={accountNumber} onChangeText={setAccountNumber} placeholder="Enter account number" keyboardType="number-pad" />
    <FormField label="Amount (PHP)" value={amount} onChangeText={setAmount} placeholder="Enter transfer amount" keyboardType="decimal-pad" />
    <PrimaryButton title="Continue" onPress={submit} icon="swap-horizontal" style={styles.button} />
  </Screen>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 28, backgroundColor: colors.background },
  sectionLabel: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15, marginHorizontal: spacing.md, marginTop: 10, marginBottom: 13 },
  favorite: { height: 96, marginHorizontal: spacing.md, borderWidth: 1, borderStyle: 'dashed', borderColor: '#C9CDD8', borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20 },
  plus: { width: 29, height: 29, borderRadius: 9, backgroundColor: colors.blueSoft, alignItems: 'center', justifyContent: 'center' },
  plusText: { color: colors.blue, fontFamily: fonts.regular, fontSize: 22, lineHeight: 24 },
  addText: { color: colors.blue, fontFamily: fonts.medium, fontSize: 11 },
  pressed: { backgroundColor: '#F2F4FF', transform: [{ scale: .99 }] },
  button: { marginHorizontal: spacing.md, marginTop: 4 }
});
