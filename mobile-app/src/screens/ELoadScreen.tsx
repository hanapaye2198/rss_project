import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { formatPHP, useDemoWallet } from '../state/DemoContext';
import { colors, fonts, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ELoad'>;
const networks = [
  { label: 'Globe', logo: require('../../assets/network-logos/globe.png') },
  { label: 'Smart', logo: require('../../assets/network-logos/smart.png') },
  { label: 'TM', logo: require('../../assets/network-logos/tm.png') },
  { label: 'DITO', logo: require('../../assets/network-logos/dito.png') },
  { label: 'GOMO', logo: require('../../assets/network-logos/gomo.png') },
  { label: 'Sun', logo: require('../../assets/network-logos/sun.png') }
];

export function ELoadScreen({ navigation }: Props) {
  const { balance, buyELoad } = useDemoWallet();
  const [selected, setSelected] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const submit = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    const result = buyELoad(numericAmount, selected, phone);
    if (!result.success) {
      Alert.alert('E-Load not completed', result.message);
      return;
    }
    Alert.alert('E-Load purchased', `${formatPHP(numericAmount)} of ${selected} load was sent to ${phone}.`, [{ text: 'Done', onPress: () => navigation.goBack() }]);
  };

  return <Screen backgroundColor={colors.blue} contentStyle={styles.content}>
    <AppHeader title="E-Load" navigation={navigation} dark />
    <Text style={styles.helper}>Select a network to buy prepaid load.</Text>
    <View style={styles.balancePill}><Text style={styles.balancePillText}>Wallet balance {formatPHP(balance)}</Text></View>
    <Text style={styles.sectionLabel}>Select network</Text>
    <View style={styles.grid}>{networks.map((network) => <Pressable key={network.label} onPress={() => setSelected(network.label)} style={[styles.network, selected === network.label && styles.selected]}><View style={styles.networkIcon}><Image source={network.logo} style={styles.networkLogo} resizeMode="contain" /></View><Text style={styles.networkLabel}>{network.label}</Text>{selected === network.label ? <Ionicons name="checkmark-circle" size={16} color={colors.blue} style={styles.check} /> : null}</Pressable>)}</View>
    {selected ? <View style={styles.formCard}><Text style={styles.formTitle}>{selected} load details</Text><FormField label="Mobile number" value={phone} onChangeText={setPhone} placeholder="09XX XXX XXXX" keyboardType="phone-pad" /><FormField label="Amount (PHP)" value={amount} onChangeText={setAmount} placeholder="Enter load amount" keyboardType="decimal-pad" /><PrimaryButton title="Buy load" onPress={submit} icon="phone-portrait-outline" /></View> : <Text style={styles.selectHint}>Select a network to enter the load details.</Text>}
  </Screen>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 30, backgroundColor: colors.background },
  helper: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12, marginHorizontal: spacing.md, marginTop: 8, marginBottom: 13 },
  balancePill: { alignSelf: 'flex-start', marginHorizontal: spacing.md, marginBottom: 22, paddingHorizontal: 11, paddingVertical: 6, borderRadius: 100, backgroundColor: colors.blueSoft },
  balancePillText: { color: colors.blue, fontFamily: fonts.medium, fontSize: 10 },
  sectionLabel: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15, marginHorizontal: spacing.md, marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.md, gap: 11 },
  network: { position: 'relative', width: '31.4%', minHeight: 98, borderWidth: 1, borderColor: colors.line, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', gap: 9, padding: 8 },
  selected: { borderColor: colors.blue, backgroundColor: colors.blueSoft },
  networkIcon: { width: 62, height: 40, alignItems: 'center', justifyContent: 'center' },
  networkLogo: { width: 60, height: 36 },
  networkLabel: { color: colors.ink, fontFamily: fonts.bold, fontSize: 11 },
  check: { position: 'absolute', top: 7, right: 7 },
  formCard: { margin: spacing.md, marginTop: 24, padding: 17, borderRadius: 15, backgroundColor: colors.white, shadowColor: '#1B235D', shadowOpacity: .08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  formTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 14, marginBottom: 15 },
  selectHint: { margin: 24, color: colors.muted, textAlign: 'center', fontFamily: fonts.regular, fontSize: 11 }
});
