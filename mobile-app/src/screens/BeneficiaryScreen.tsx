import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'Beneficiary'>;

const beneficiaries = [
  { name: 'Maria Santos', detail: 'GCash · 0917 123 4567', initials: 'MS', color: '#F2A65A' },
  { name: 'Juan Reyes', detail: 'BDO · 0012 3456 78', initials: 'JR', color: '#6778E9' },
  { name: 'Hannah Cruz', detail: 'BPI · 0098 7654 32', initials: 'HC', color: '#45B98A' },
  { name: 'Alex Tan', detail: 'UnionBank · 0201 2345 67', initials: 'AT', color: '#A65EE7' }
];

export function BeneficiaryScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => beneficiaries.filter((item) => `${item.name} ${item.detail}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent}>
      <AppHeader title="Beneficiary" subtitle="Your saved recipients" navigation={navigation} dark />
      <View style={styles.content}>
        <View style={styles.summary}><View style={styles.summaryIcon}><Ionicons name="people-outline" size={24} color={colors.blue} /></View><View><Text style={styles.summaryTitle}>Send in a few taps</Text><Text style={styles.summaryBody}>Save trusted recipients for faster transfers.</Text></View></View>
        <FormField label="Search saved beneficiaries" value={query} onChangeText={setQuery} placeholder="Search by name or account" rightIcon="search-outline" />
        <View style={styles.listHeader}><Text style={styles.sectionTitle}>Saved beneficiaries</Text><Text style={styles.count}>{filtered.length} people</Text></View>
        <View style={styles.list}>{filtered.length ? filtered.map((item) => <BeneficiaryRow key={item.name} {...item} />) : <View style={styles.empty}><Ionicons name="search-outline" size={27} color={colors.muted} /><Text style={styles.emptyTitle}>No beneficiary found</Text><Text style={styles.emptyBody}>Try another name or account number.</Text></View>}</View>
        <PrimaryButton title="Add beneficiary" icon="add" onPress={() => showAlert('Add beneficiary', 'Choose a bank, e-wallet, or mobile number to save a new recipient.')} />
      </View>
    </Screen>
  );
}

function BeneficiaryRow({ name, detail, initials, color }: { name: string; detail: string; initials: string; color: string }) {
  return <Pressable accessibilityRole="button" onPress={() => showAlert(name, `${detail}\n\nThis saved recipient is ready for a transfer.`)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}><View style={[styles.avatar, { backgroundColor: color }]}><Text style={styles.avatarText}>{initials}</Text></View><View style={styles.rowText}><Text style={styles.name}>{name}</Text><Text style={styles.detail}>{detail}</Text></View><Ionicons name="chevron-forward" size={17} color={colors.muted} /></Pressable>;
}

const styles = StyleSheet.create({
  screenContent: { backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.md },
  summary: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5FF', borderRadius: 17, padding: spacing.md, marginBottom: spacing.lg, gap: 12 },
  summaryIcon: { width: 47, height: 47, borderRadius: 15, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  summaryTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 14 },
  summaryBody: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 4 },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15 },
  count: { color: colors.blue, fontFamily: fonts.medium, fontSize: 10 },
  list: { backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  row: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderBottomColor: '#F0F1F5' },
  pressed: { opacity: .65 },
  avatar: { width: 39, height: 39, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontFamily: fonts.bold, fontSize: 11 },
  rowText: { flex: 1 },
  name: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  detail: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 4 },
  empty: { minHeight: 160, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 13, marginTop: 9 },
  emptyBody: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 4 }
});
