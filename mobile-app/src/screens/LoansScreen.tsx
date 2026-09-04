import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField, SelectField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'Loans'>;

const products = [
  { name: 'Personal Loan', detail: 'Flexible cash for your everyday needs', icon: 'wallet-outline' as const },
  { name: 'Salary Loan', detail: 'Fast access to your next payday', icon: 'briefcase-outline' as const }
];

export function LoansScreen({ navigation }: Props) {
  const [product, setProduct] = useState('Personal Loan');
  const [amount, setAmount] = useState('10000');
  const [term, setTerm] = useState('6 months');
  const terms = ['3 months', '6 months', '12 months'];

  const submit = () => {
    const numericAmount = Number(amount.replace(/,/g, ''));
    if (!numericAmount || numericAmount <= 0) {
      showAlert('Check your amount', 'Enter the loan amount you want to apply for.');
      return;
    }
    showAlert('Application started', `${product}\nAmount: PHP ${numericAmount.toLocaleString('en-PH')}\nTerm: ${term}\n\nThis demo will guide you through the next application step.`);
  };

  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent} scroll>
      <AppHeader title="Loans" subtitle="Borrow with confidence" navigation={navigation} dark />
      <View style={styles.content}>
        <View style={styles.hero}><View style={styles.heroIcon}><Ionicons name="hand-left" size={24} color={colors.blue} /></View><View style={styles.heroText}><Text style={styles.heroTitle}>Need extra funds?</Text><Text style={styles.heroBody}>Apply for a loan with simple, transparent terms.</Text></View></View>

        <Text style={styles.sectionLabel}>Choose a loan</Text>
        <View style={styles.productList}>{products.map((item) => <ProductCard key={item.name} {...item} selected={product === item.name} onPress={() => setProduct(item.name)} />)}</View>

        <View style={styles.formCard}><Text style={styles.formTitle}>Loan details</Text><FormField label="How much do you need?" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="0.00" /><SelectField label="Repayment term" value={term} options={terms} onChange={setTerm} /><Text style={styles.helper}>Choose a repayment period from the dropdown.</Text><PrimaryButton title="Start application" icon="arrow-forward" onPress={submit} /></View>

        <View style={styles.trust}><Ionicons name="lock-closed-outline" size={17} color={colors.blue} /><Text style={styles.trustText}>Your application details are encrypted and kept private.</Text></View>
      </View>
    </Screen>
  );
}

function ProductCard({ name, detail, icon, selected, onPress }: { name: string; detail: string; icon: 'wallet-outline' | 'briefcase-outline'; selected: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.productCard, selected && styles.productSelected, pressed && styles.productPressed]}><View style={styles.productIcon}><Ionicons name={icon} size={20} color={colors.blue} /></View><View style={styles.productText}><Text style={styles.productName}>{name}</Text><Text style={styles.productDetail}>{detail}</Text></View><Ionicons name={selected ? 'checkmark-circle' : 'ellipse-outline'} size={21} color={selected ? colors.blue : '#C9CBD5'} /></Pressable>;
}

const styles = StyleSheet.create({
  screenContent: { backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  hero: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F7FF', borderRadius: 17, padding: spacing.md, marginBottom: spacing.lg },
  heroIcon: { width: 47, height: 47, borderRadius: 15, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  heroText: { flex: 1 },
  heroTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 16 },
  heroBody: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11, lineHeight: 16, marginTop: 3 },
  sectionLabel: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15, marginBottom: 10 },
  productList: { gap: 10, marginBottom: spacing.lg },
  productCard: { minHeight: 70, borderRadius: 14, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  productSelected: { borderColor: colors.blue, backgroundColor: '#FBFBFF' },
  productPressed: { opacity: .7 },
  productIcon: { width: 37, height: 37, borderRadius: 12, backgroundColor: colors.blueSoft, alignItems: 'center', justifyContent: 'center' },
  productText: { flex: 1 },
  productName: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  productDetail: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 3 },
  formCard: { borderRadius: 16, backgroundColor: colors.white, padding: spacing.md },
  formTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15, marginBottom: spacing.md },
  helper: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: -5, marginBottom: spacing.md },
  trust: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: spacing.md },
  trustText: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10 }
});
