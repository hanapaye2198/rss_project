import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, SectionTitle } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'Crypto'>;
type IconName = keyof typeof Ionicons.glyphMap;

const holdings = [
  { name: 'Bitcoin', symbol: 'BTC', amount: '0.0124 BTC', value: 'PHP 4,218.00', change: '+4.8%', icon: 'logo-bitcoin' as IconName, color: '#F6AB1A' },
  { name: 'Ethereum', symbol: 'ETH', amount: '0.18 ETH', value: 'PHP 3,104.00', change: '+2.1%', icon: 'diamond-outline' as IconName, color: '#667EEA' },
  { name: 'Tether', symbol: 'USDT', amount: '19.40 USDT', value: 'PHP 1,098.00', change: '+0.2%', icon: 'cash-outline' as IconName, color: '#22A87A' }
];

export function CryptoScreen({ navigation }: Props) {
  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent}>
      <AppHeader title="Crypto" subtitle="Buy, sell, and track digital assets" navigation={navigation} dark />
      <View style={styles.content}>
        <View style={styles.portfolioCard}>
          <View style={styles.portfolioTop}><View><Text style={styles.mutedLight}>Total crypto balance</Text><Text style={styles.portfolioValue}>PHP 8,420.00</Text></View><View style={styles.cryptoBadge}><Ionicons name="hardware-chip" size={25} color={colors.white} /></View></View>
          <View style={styles.portfolioBottom}><Text style={styles.positive}>+PHP 420.00 (5.2%)</Text><Text style={styles.mutedLight}>This month</Text></View>
        </View>

        <View style={styles.quickRow}>
          <QuickAction icon="arrow-down-circle-outline" label="Buy" onPress={() => showAlert('Buy crypto', 'Choose a coin and payment method to place a demo buy order.')} />
          <QuickAction icon="arrow-up-circle-outline" label="Sell" onPress={() => showAlert('Sell crypto', 'Your available holdings will appear here when you sell crypto.')} />
          <QuickAction icon="swap-horizontal" label="Convert" onPress={() => showAlert('Convert crypto', 'Swap between supported coins in this demo flow.')} />
        </View>

        <SectionTitle title="My holdings" action="View prices" onAction={() => showAlert('Market prices', 'Live market prices will be connected here.')} />
        <View style={styles.card}>{holdings.map((holding, index) => <HoldingRow key={holding.symbol} {...holding} last={index === holdings.length - 1} />)}</View>

        <View style={styles.infoCard}><Ionicons name="shield-checkmark-outline" size={23} color={colors.blue} /><View style={styles.infoText}><Text style={styles.infoTitle}>Secure by design</Text><Text style={styles.infoBody}>Your crypto wallet is protected with iCASH security controls.</Text></View></View>
        <PrimaryButton title="Explore crypto" icon="trending-up" onPress={() => showAlert('Crypto demo', 'You can explore the crypto market from this demo wallet.')} />
      </View>
    </Screen>
  );
}

function QuickAction({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}><View style={styles.quickIcon}><Ionicons name={icon} size={21} color={colors.blue} /></View><Text style={styles.quickLabel}>{label}</Text></Pressable>;
}

function HoldingRow({ name, symbol, amount, value, change, icon, color, last }: { name: string; symbol: string; amount: string; value: string; change: string; icon: IconName; color: string; last: boolean }) {
  return <Pressable accessibilityRole="button" onPress={() => showAlert(name, `${amount}\nCurrent value: ${value}`)} style={[styles.holdingRow, last && styles.lastRow]}><View style={[styles.coinIcon, { backgroundColor: color }]}><Ionicons name={icon} size={19} color={colors.white} /></View><View style={styles.holdingName}><Text style={styles.name}>{name}</Text><Text style={styles.symbol}>{symbol} · {amount}</Text></View><View style={styles.holdingValue}><Text style={styles.value}>{value}</Text><Text style={styles.change}>{change}</Text></View><Ionicons name="chevron-forward" size={16} color={colors.muted} /></Pressable>;
}

const styles = StyleSheet.create({
  screenContent: { backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.md, gap: spacing.md },
  portfolioCard: { borderRadius: 18, backgroundColor: '#2121D9', padding: spacing.md, minHeight: 143 },
  portfolioTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mutedLight: { color: 'rgba(255,255,255,.7)', fontFamily: fonts.regular, fontSize: 11 },
  portfolioValue: { color: colors.white, fontFamily: fonts.bold, fontSize: 25, marginTop: 5 },
  cryptoBadge: { width: 48, height: 48, borderRadius: 15, backgroundColor: 'rgba(255,255,255,.17)', alignItems: 'center', justifyContent: 'center' },
  portfolioBottom: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24 },
  positive: { color: '#9AF0C3', fontFamily: fonts.bold, fontSize: 11 },
  quickRow: { flexDirection: 'row', gap: 10 },
  quickAction: { flex: 1, minHeight: 76, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', gap: 6 },
  quickIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: colors.blueSoft, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { color: colors.ink, fontFamily: fonts.bold, fontSize: 11 },
  pressed: { opacity: .65, transform: [{ scale: .98 }] },
  card: { backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: spacing.md },
  holdingRow: { minHeight: 70, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F1F5', gap: 10 },
  lastRow: { borderBottomWidth: 0 },
  coinIcon: { width: 37, height: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  holdingName: { flex: 1 },
  name: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  symbol: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 3 },
  holdingValue: { alignItems: 'flex-end' },
  value: { color: colors.ink, fontFamily: fonts.bold, fontSize: 11 },
  change: { color: '#2EAF72', fontFamily: fonts.medium, fontSize: 10, marginTop: 3 },
  infoCard: { flexDirection: 'row', backgroundColor: colors.blueSoft, borderRadius: 14, padding: spacing.md, gap: 10, alignItems: 'center' },
  infoText: { flex: 1 },
  infoTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  infoBody: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, lineHeight: 15, marginTop: 3 }
});
