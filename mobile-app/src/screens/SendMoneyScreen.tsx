import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField, SelectField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { formatPHP, useDemoWallet } from '../state/DemoContext';
import { colors, fonts, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SendMoney'>;

export function SendMoneyScreen({ navigation }: Props) {
  const { balance, sendMoney } = useDemoWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');

  const submit = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    const result = sendMoney(numericAmount, recipient);
    if (!result.success) {
      Alert.alert('Transfer not sent', result.message);
      return;
    }
    Alert.alert('Transfer complete', `${formatPHP(numericAmount)} sent to ${recipient}.`, [{ text: 'Done', onPress: () => navigation.goBack() }]);
  };

  return <Screen backgroundColor={colors.blue} contentStyle={styles.content}>
    <AppHeader title="Send Money" navigation={navigation} dark />
    <View style={styles.availableRow}><Text style={styles.availableText}>Available balance: {formatPHP(balance)}</Text></View>
    <FormField label="Recipient" value={recipient} onChangeText={setRecipient} placeholder="Enter mobile number or name" keyboardType="phone-pad" />
    <SelectField label="Exchange rate" value="1 USD = ₱59.9200 PHP" onPress={() => Alert.alert('Exchange rate', 'Rates are refreshed before you confirm the transfer.')} />
    <SelectField label="Purpose" value={purpose} placeholder="Select purpose" onPress={() => setPurpose(purpose ? '' : 'Family support')} />
    <FormField label="Payment method" value="iCASH wallet" editable={false} />
    <FormField label="Amount (PHP)" value={amount} onChangeText={setAmount} placeholder="Enter amount" keyboardType="decimal-pad" helper="Your transfer will be deducted from your wallet balance." />
    <View style={styles.converted}><Text style={styles.convertedLabel}>Estimated recipient amount</Text><Text style={styles.convertedText}>{amount && Number(amount) > 0 ? `≈ ${(Number(amount) / 59.92).toFixed(2)} USD` : 'Converted amount will appear here'}</Text></View>
    <PrimaryButton title="Send" onPress={submit} icon="paper-plane" style={styles.button} />
  </Screen>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 26, backgroundColor: colors.background },
  availableRow: { marginHorizontal: spacing.md, marginTop: 5, marginBottom: 16 },
  availableText: { color: colors.ink, fontFamily: fonts.regular, fontSize: 11 },
  converted: { marginHorizontal: spacing.md, marginBottom: spacing.md, padding: 13, borderRadius: 10, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line },
  convertedLabel: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10 },
  convertedText: { color: colors.ink, fontFamily: fonts.bold, fontSize: 13, marginTop: 3 },
  button: { marginHorizontal: spacing.md, marginTop: 5 }
});
