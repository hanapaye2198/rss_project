import { Ionicons } from '@expo/vector-icons';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Save'>;

const goals = [
  { title: 'Emergency Fund', saved: 'PHP 12,500', target: 'PHP 25,000', progress: 0.5, icon: 'shield-checkmark-outline' as const, color: '#635BDB' },
  { title: 'New laptop', saved: 'PHP 18,200', target: 'PHP 40,000', progress: 0.455, icon: 'laptop-outline' as const, color: '#EE945A' }
];

export function SaveScreen({ navigation }: Props) {
  const { balance, saveMoney } = useDemoWallet();
  const [totalSaved, setTotalSaved] = useState(30700);
  const [savingGoal, setSavingGoal] = useState(goals[0]?.title ?? 'Emergency Fund');
  const [savingAmount, setSavingAmount] = useState('');

  const submitSave = () => {
    const numericAmount = Number(savingAmount.replace(/,/g, ''));
    const result = saveMoney(numericAmount, savingGoal);
    if (!result.success) {
      showAlert('Savings not completed', result.message);
      return;
    }
    setTotalSaved((current) => current + numericAmount);
    setSavingAmount('');
    showAlert('Money saved', `${formatPHP(numericAmount)} moved to ${savingGoal}. Your wallet balance is now ${formatPHP(balance - numericAmount)}.`);
  };

  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent} scroll>
      <AppHeader title="Save" subtitle="Make your goals happen" navigation={navigation} dark />
      <View style={styles.content}>
        <View style={styles.balanceCard}><View><Text style={styles.mutedLight}>Total saved</Text><Text style={styles.balance}>{formatPHP(totalSaved)}</Text><Text style={styles.earned}>+PHP 214.90 interest earned</Text></View><View style={styles.saveIcon}><Ionicons name="save-outline" size={25} color={colors.white} /></View></View>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Your savings goals</Text><Text style={styles.goalCount}>2 active</Text></View>
        <View style={styles.goalList}>{goals.map((goal) => <GoalRow key={goal.title} {...goal} />)}</View>
        <View style={styles.tipCard}><Ionicons name="bulb-outline" size={23} color="#D89400" /><View style={styles.tipText}><Text style={styles.tipTitle}>Small steps add up</Text><Text style={styles.tipBody}>Set aside a little every week and watch your goals grow.</Text></View></View>
        <View style={styles.saveCard}><View style={styles.saveHeading}><Text style={styles.saveTitle}>Add to your savings</Text><Text style={styles.available}>{formatPHP(balance)} available</Text></View><SelectField label="Savings goal" value={savingGoal} options={goals.map((goal) => goal.title)} onChange={setSavingGoal} /><FormField label="Amount (PHP)" value={savingAmount} onChangeText={setSavingAmount} keyboardType="decimal-pad" placeholder="0.00" /><PrimaryButton title="Save money" icon="save-outline" onPress={submitSave} /></View>
        <PrimaryButton title="Create savings goal" icon="add" onPress={() => showAlert('New savings goal', 'Your new goal setup will open here. Choose a name, target, and schedule.')} />
      </View>
    </Screen>
  );
}

function GoalRow({ title, saved, target, progress, icon, color }: { title: string; saved: string; target: string; progress: number; icon: 'shield-checkmark-outline' | 'laptop-outline'; color: string }) {
  return <Pressable accessibilityRole="button" onPress={() => showAlert(title, `${saved} saved of ${target}. Keep going!`)} style={({ pressed }) => [styles.goalRow, pressed && styles.pressed]}><View style={[styles.goalIcon, { backgroundColor: color }]}><Ionicons name={icon} size={19} color={colors.white} /></View><View style={styles.goalMain}><View style={styles.goalHeading}><Text style={styles.goalName}>{title}</Text><Text style={styles.goalPercent}>{Math.round(progress * 100)}%</Text></View><View style={styles.track}><View style={[styles.progress, { width: `${progress * 100}%`, backgroundColor: color }]} /></View><Text style={styles.goalAmounts}>{saved} <Text style={styles.of}>of {target}</Text></Text></View><Ionicons name="chevron-forward" size={16} color={colors.muted} /></Pressable>;
}

const styles = StyleSheet.create({
  screenContent: { backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  balanceCard: { minHeight: 145, borderRadius: 18, backgroundColor: '#2121D9', padding: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  mutedLight: { color: 'rgba(255,255,255,.7)', fontFamily: fonts.regular, fontSize: 11 },
  balance: { color: colors.white, fontFamily: fonts.bold, fontSize: 25, marginTop: 5 },
  earned: { color: '#A9F3C9', fontFamily: fonts.medium, fontSize: 10, marginTop: 12 },
  saveIcon: { width: 48, height: 48, borderRadius: 15, backgroundColor: 'rgba(255,255,255,.17)', alignItems: 'center', justifyContent: 'center' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15 },
  goalCount: { color: colors.blue, fontFamily: fonts.medium, fontSize: 11 },
  goalList: { backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: spacing.md },
  goalRow: { minHeight: 88, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderBottomColor: '#F0F1F5' },
  pressed: { opacity: .65 },
  goalIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  goalMain: { flex: 1 },
  goalHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  goalName: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  goalPercent: { color: colors.muted, fontFamily: fonts.bold, fontSize: 10 },
  track: { height: 7, borderRadius: 5, backgroundColor: '#EFF0F5', marginTop: 10, overflow: 'hidden' },
  progress: { height: '100%', borderRadius: 5 },
  goalAmounts: { color: colors.ink, fontFamily: fonts.bold, fontSize: 10, marginTop: 7 },
  of: { color: colors.muted, fontFamily: fonts.regular },
  tipCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: spacing.md, borderRadius: 14, backgroundColor: '#FFF7DC', marginVertical: spacing.lg },
  tipText: { flex: 1 },
  tipTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  tipBody: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, lineHeight: 15, marginTop: 3 },
  saveCard: { borderRadius: 16, backgroundColor: colors.white, padding: spacing.md, marginBottom: spacing.md },
  saveHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  saveTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15 },
  available: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10 }
});
