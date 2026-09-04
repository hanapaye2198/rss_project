import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomNav } from '../components/BottomNav';
import { Screen } from '../components/Screen';
import { SectionTitle } from '../components/AppHeader';
import { colors, fonts, spacing } from '../theme';
import { RootStackParamList } from '../navigation/types';
import { formatPHP, useDemoWallet } from '../state/DemoContext';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
type IconName = keyof typeof Ionicons.glyphMap;

const actions: { label: string; icon: IconName; color: string; screen: keyof RootStackParamList }[] = [
  { label: 'Send', icon: 'paper-plane', color: '#4C83ED', screen: 'SendMoney' },
  { label: 'Cash-In', icon: 'wallet', color: colors.purple, screen: 'CashIn' },
  { label: 'Pay Bills', icon: 'receipt', color: colors.orange, screen: 'PayBills' },
  { label: 'E-Load', icon: 'phone-portrait', color: colors.green, screen: 'ELoad' },
  { label: 'Crypto', icon: 'hardware-chip', color: '#F6AB1A', screen: 'Crypto' },
  { label: 'Loans', icon: 'hand-left', color: '#50BBDD', screen: 'Loans' },
  { label: 'IREMITX', icon: 'swap-horizontal', color: '#7BC03F', screen: 'IREMITX' },
  { label: 'Save', icon: 'save-outline', color: '#728DE0', screen: 'Save' }
];

export function DashboardScreen({ navigation }: Props) {
  const { balance, transactions } = useDemoWallet();
  const openAction = (screen: keyof RootStackParamList) => navigation.navigate(screen);

  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent} footer={<BottomNav onHome={() => navigation.navigate('Dashboard')} onScan={() => navigation.navigate('Scan')} onBeneficiary={() => navigation.navigate('Beneficiary')} />}>
      <LinearGradient colors={[colors.blue, '#1313D7']} style={styles.walletHero}>
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" accessibilityLabel="Profile" onPress={() => navigation.navigate('Profile')} style={styles.circleButton}><Ionicons name="person-outline" size={20} color={colors.ink} /></Pressable>
          <Image source={require('../../assets/icash-icon.png')} style={styles.logo} resizeMode="contain" />
          <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={() => navigation.navigate('Notifications')} style={styles.circleButton}><Ionicons name="notifications-outline" size={20} color={colors.ink} /><View style={styles.notificationDot} /></Pressable>
        </View>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <View style={styles.balanceRow}><Text style={styles.balance}>₱ {balance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</Text><Ionicons name="eye-outline" size={27} color={colors.white} /></View>
      </LinearGradient>

      <View style={styles.dashboardBody}>
        <View style={styles.actionPanel}>
          <View style={styles.actionRow}>
            {actions.slice(0, 4).map((action) => <ActionTile key={action.label} {...action} onPress={() => openAction(action.screen)} />)}
          </View>
          <View style={styles.actionRow}>
            {actions.slice(4).map((action) => <ActionTile key={action.label} {...action} onPress={() => openAction(action.screen)} />)}
          </View>
        </View>

        <View style={styles.offerBanner}>
          <Image source={require('../../assets/dashboard-reference.png')} style={styles.offerPhoto} resizeMode="stretch" />
        </View>

        <SectionTitle title="Activities" action="View All" onAction={() => navigation.navigate('Activities')} />
        <View style={styles.activityCard}>
          {transactions.slice(0, 3).map((transaction, index) => <ActivityRow key={transaction.id} {...transaction} last={index === Math.min(transactions.length, 3) - 1} />)}
        </View>
      </View>
    </Screen>
  );
}

function ActionTile({ label, icon, color, onPress }: { label: string; icon: IconName; color: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.actionTile, pressed && styles.actionPressed]}><View style={[styles.actionIcon, { backgroundColor: color }]}><Ionicons name={icon} size={24} color={colors.white} /></View><Text style={styles.actionLabel}>{label}</Text></Pressable>;
}

function ActivityRow({ title, amount, direction, status, date, last = false }: { icon: IconName; title: string; amount: number; direction: 'credit' | 'debit'; status: string; date: string; last?: boolean }) {
  const credited = direction === 'credit';
  return <View style={[styles.activityRow, last && styles.activityLast]}><View style={styles.activityLeft}><Text style={styles.activityTitle}>{title}</Text><Text style={[styles.status, { backgroundColor: credited ? colors.greenSoft : '#EEF0F4', color: credited ? '#2EAF72' : '#606778' }]}>{status}</Text></View><View style={styles.activityRight}><Text style={[styles.activityAmount, credited && styles.creditAmount]}>{credited ? '+' : '-'}{formatPHP(amount)}</Text><Text style={styles.activityDate}>{date}</Text></View></View>;
}

const styles = StyleSheet.create({
  screenContent: { paddingBottom: 0, backgroundColor: colors.background },
  walletHero: { width: '100%', paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: 44, borderBottomLeftRadius: 34, borderBottomRightRadius: 34 },
  topBar: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logo: { width: 72, height: 29 },
  circleButton: { width: 37, height: 37, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  notificationDot: { position: 'absolute', width: 8, height: 8, borderRadius: 5, top: 7, right: 7, backgroundColor: '#EA3E43', borderWidth: 1, borderColor: colors.white },
  balanceLabel: { textAlign: 'center', color: 'rgba(255,255,255,.72)', fontFamily: fonts.regular, fontSize: 12, marginTop: 14 },
  balanceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 5 },
  balance: { color: colors.white, fontFamily: fonts.bold, fontSize: 28, letterSpacing: -.5 },
  dashboardBody: { width: '100%', marginTop: -22, paddingHorizontal: spacing.md },
  actionPanel: { alignSelf: 'stretch', paddingHorizontal: 10, paddingTop: 22, paddingBottom: 10, borderRadius: 25, backgroundColor: colors.white, shadowColor: '#1B235D', shadowOpacity: .12, shadowRadius: 18, shadowOffset: { width: 0, height: 7 }, elevation: 4 },
  actionRow: { width: '100%', flexDirection: 'row' },
  actionTile: { flex: 1, alignItems: 'center', paddingVertical: 9, gap: 7, minWidth: 0 },
  actionPressed: { opacity: .65, transform: [{ scale: .97 }] },
  actionIcon: { width: 43, height: 43, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { color: colors.ink, fontFamily: fonts.medium, fontSize: 11 },
  offerBanner: { minHeight: 128, marginTop: 22, marginBottom: 25, paddingHorizontal: 19, paddingVertical: 17, borderRadius: 18, backgroundColor: '#8B7568', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
  offerPhoto: { position: 'absolute', left: '-14.4%', top: '-521%', width: '144%', height: '1117%' },
  activityCard: { borderRadius: 16, backgroundColor: colors.white, paddingHorizontal: 15, shadowColor: '#1B235D', shadowOpacity: .05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  activityRow: { minHeight: 74, borderBottomWidth: 1, borderBottomColor: '#F0F1F5', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  activityLast: { borderBottomWidth: 0 },
  activityLeft: { flex: 1 },
  activityTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 13 },
  status: { alignSelf: 'flex-start', marginTop: 5, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 100, fontFamily: fonts.medium, fontSize: 9, overflow: 'hidden' },
  activityRight: { alignItems: 'flex-end' },
  activityAmount: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  creditAmount: { color: '#2EAF72' },
  activityDate: { color: '#A3A7B4', fontFamily: fonts.regular, fontSize: 10, marginTop: 5 }
});
