import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { formatPHP, useDemoWallet } from '../state/DemoContext';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'Activities'>;

export function ActivitiesScreen({ navigation }: Props) {
  const { transactions } = useDemoWallet();
  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent} scroll>
      <AppHeader title="Activities" subtitle="Your complete transaction history" navigation={navigation} dark />
      <View style={styles.content}><View style={styles.filterRow}><View style={styles.filterActive}><Text style={styles.filterActiveText}>All activity</Text></View><Pressable accessibilityRole="button" onPress={() => showAlert('Filter activity', 'Filter by money in, money out, or date range in the full app.')} style={styles.filterButton}><Ionicons name="options-outline" size={17} color={colors.blue} /><Text style={styles.filterText}>Filter</Text></Pressable></View><View style={styles.list}>{transactions.map((transaction, index) => { const credited = transaction.direction === 'credit'; return <Pressable accessibilityRole="button" key={transaction.id} onPress={() => showAlert(transaction.title, `${formatPHP(transaction.amount)} · ${transaction.status}\n${transaction.date}`)} style={({ pressed }) => [styles.row, index === transactions.length - 1 && styles.lastRow, pressed && styles.pressed]}><View style={[styles.icon, { backgroundColor: credited ? colors.greenSoft : '#EEF0F4' }]}><Ionicons name={credited ? 'arrow-down' : 'arrow-up'} size={18} color={credited ? '#2EAF72' : colors.blue} /></View><View style={styles.copy}><Text style={styles.title}>{transaction.title}</Text><Text style={styles.status}>{transaction.status} · {transaction.date}</Text></View><Text style={[styles.amount, credited && styles.credit]}>{credited ? '+' : '-'}{formatPHP(transaction.amount)}</Text><Ionicons name="chevron-forward" size={15} color={colors.muted} /></Pressable>; })}</View></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  filterActive: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 100, backgroundColor: colors.blue },
  filterActiveText: { color: colors.white, fontFamily: fonts.medium, fontSize: 10 },
  filterButton: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 100, backgroundColor: colors.white },
  filterText: { color: colors.blue, fontFamily: fonts.medium, fontSize: 10 },
  list: { borderRadius: 16, backgroundColor: colors.white, paddingHorizontal: spacing.md },
  row: { minHeight: 78, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderBottomColor: '#F0F1F5' },
  lastRow: { borderBottomWidth: 0 },
  pressed: { opacity: .65 },
  icon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  title: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  status: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 4 },
  amount: { color: colors.ink, fontFamily: fonts.bold, fontSize: 11 },
  credit: { color: '#2EAF72' }
});
