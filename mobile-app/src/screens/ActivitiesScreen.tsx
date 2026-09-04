import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { SelectField } from '../components/FormField';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { formatPHP, useDemoWallet } from '../state/DemoContext';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'Activities'>;
const filters = ['All activity', 'Money in', 'Money out'];

export function ActivitiesScreen({ navigation }: Props) {
  const { transactions } = useDemoWallet();
  const [filter, setFilter] = useState(filters[0] ?? 'All activity');
  const visibleTransactions = useMemo(() => transactions.filter((transaction) => filter === 'All activity' || (filter === 'Money in' ? transaction.direction === 'credit' : transaction.direction === 'debit')), [filter, transactions]);

  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent} scroll>
      <AppHeader title="Activities" subtitle="Your complete transaction history" navigation={navigation} dark />
      <View style={styles.content}>
        <SelectField label="Activity type" value={filter} options={filters} onChange={setFilter} />
        <View style={styles.listHeader}><Text style={styles.heading}>Transactions</Text><Text style={styles.count}>{visibleTransactions.length} results</Text></View>
        <View style={styles.list}>{visibleTransactions.length ? visibleTransactions.map((transaction, index) => { const credited = transaction.direction === 'credit'; return <Pressable accessibilityRole="button" key={transaction.id} onPress={() => showAlert(transaction.title, `${formatPHP(transaction.amount)} - ${transaction.status}\n${transaction.date}`)} style={({ pressed }) => [styles.row, index === visibleTransactions.length - 1 && styles.lastRow, pressed && styles.pressed]}><View style={[styles.icon, { backgroundColor: credited ? colors.greenSoft : '#EEF0F4' }]}><Ionicons name={credited ? 'arrow-down' : 'arrow-up'} size={18} color={credited ? '#2EAF72' : colors.blue} /></View><View style={styles.copy}><Text style={styles.title}>{transaction.title}</Text><Text style={styles.status}>{transaction.status} - {transaction.date}</Text></View><Text style={[styles.amount, credited && styles.credit]}>{credited ? '+' : '-'}{formatPHP(transaction.amount)}</Text><Ionicons name="chevron-forward" size={15} color={colors.muted} /></Pressable>; }) : <View style={styles.empty}><Ionicons name="receipt-outline" size={28} color={colors.muted} /><Text style={styles.emptyTitle}>No matching activity</Text><Text style={styles.emptyBody}>Try another activity type.</Text></View>}</View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  heading: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15 },
  count: { color: colors.blue, fontFamily: fonts.medium, fontSize: 10 },
  list: { borderRadius: 16, backgroundColor: colors.white, paddingHorizontal: spacing.md },
  row: { minHeight: 78, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderBottomColor: '#F0F1F5' },
  lastRow: { borderBottomWidth: 0 },
  pressed: { opacity: .65 },
  icon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  title: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  status: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 4 },
  amount: { color: colors.ink, fontFamily: fonts.bold, fontSize: 11 },
  credit: { color: '#2EAF72' },
  empty: { minHeight: 180, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 13, marginTop: 9 },
  emptyBody: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 4 }
});
