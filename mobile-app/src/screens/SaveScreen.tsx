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
type Goal = { title: string; saved: number; target: number; icon: keyof typeof Ionicons.glyphMap; color: string };

const goals: Goal[] = [
  { title: 'Emergency Fund', saved: 12500, target: 25000, icon: 'shield-checkmark-outline', color: '#635BDB' },
  { title: 'New laptop', saved: 18200, target: 40000, icon: 'laptop-outline', color: '#EE945A' }
];

export function SaveScreen({ navigation }: Props) {
  const { balance, saveMoney } = useDemoWallet();
  const [totalSaved, setTotalSaved] = useState(30700);
  const [goalList, setGoalList] = useState(goals);
  const [savingGoal, setSavingGoal] = useState(goals[0]?.title ?? 'Emergency Fund');
  const [savingAmount, setSavingAmount] = useState('');
  const [creatingGoal, setCreatingGoal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');

  const submitSave = () => {
    const numericAmount = Number(savingAmount.replace(/,/g, ''));
    const result = saveMoney(numericAmount, savingGoal);
    if (!result.success) {
      showAlert('Savings not completed', result.message);
      return;
    }
    setTotalSaved((current) => current + numericAmount);
    setGoalList((current) => current.map((goal) => goal.title === savingGoal ? { ...goal, saved: goal.saved + numericAmount } : goal));
    setSavingAmount('');
    showAlert('Money saved', `${formatPHP(numericAmount)} moved to ${savingGoal}. Your wallet balance is now ${formatPHP(balance - numericAmount)}.`);
  };

  const createGoal = () => {
    const trimmedName = newGoalName.trim();
    const numericTarget = Number(newGoalTarget.replace(/,/g, ''));
    if (!trimmedName || !numericTarget || numericTarget <= 0) {
      showAlert('Complete the goal', 'Enter a goal name and a target greater than zero.');
      return;
    }
    if (goalList.some((goal) => goal.title.toLowerCase() === trimmedName.toLowerCase())) {
      showAlert('Goal already exists', 'Choose a different name for your savings goal.');
      return;
    }
    const newGoal: Goal = { title: trimmedName, saved: 0, target: numericTarget, icon: 'flag-outline', color: '#5D8CE8' };
    setGoalList((current) => [...current, newGoal]);
    setSavingGoal(trimmedName);
    setNewGoalName('');
    setNewGoalTarget('');
    setCreatingGoal(false);
    showAlert('Goal created', `${trimmedName} is ready for your first deposit.`);
  };

  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent} scroll>
      <AppHeader title="Save" subtitle="Make your goals happen" navigation={navigation} dark />
      <View style={styles.content}>
        <View style={styles.balanceCard}><View><Text style={styles.mutedLight}>Total saved</Text><Text style={styles.balance}>{formatPHP(totalSaved)}</Text><Text style={styles.earned}>+PHP 214.90 interest earned</Text></View><View style={styles.saveIcon}><Ionicons name="save-outline" size={25} color={colors.white} /></View></View>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Your savings goals</Text><Text style={styles.goalCount}>{goalList.length} active</Text></View>
        <View style={styles.goalList}>{goalList.map((goal) => <GoalRow key={goal.title} {...goal} />)}</View>
        <View style={styles.tipCard}><Ionicons name="bulb-outline" size={23} color="#D89400" /><View style={styles.tipText}><Text style={styles.tipTitle}>Small steps add up</Text><Text style={styles.tipBody}>Set aside a little every week and watch your goals grow.</Text></View></View>
        <View style={styles.saveCard}><View style={styles.saveHeading}><Text style={styles.saveTitle}>Add to your savings</Text><Text style={styles.available}>{formatPHP(balance)} available</Text></View><SelectField label="Savings goal" value={savingGoal} options={goalList.map((goal) => goal.title)} onChange={setSavingGoal} /><FormField label="Amount (PHP)" value={savingAmount} onChangeText={setSavingAmount} keyboardType="decimal-pad" placeholder="0.00" /><PrimaryButton title="Save money" icon="save-outline" onPress={submitSave} /></View>
        {creatingGoal ? <View style={styles.createCard}><Text style={styles.createTitle}>New savings goal</Text><FormField label="Goal name" value={newGoalName} onChangeText={setNewGoalName} placeholder="e.g. Travel fund" autoCapitalize="words" /><FormField label="Target amount (PHP)" value={newGoalTarget} onChangeText={setNewGoalTarget} keyboardType="decimal-pad" placeholder="0.00" /><PrimaryButton title="Create goal" icon="checkmark" onPress={createGoal} /><Pressable accessibilityRole="button" onPress={() => setCreatingGoal(false)} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable></View> : <PrimaryButton title="Create savings goal" icon="add" onPress={() => setCreatingGoal(true)} />}
      </View>
    </Screen>
  );
}

function GoalRow({ title, saved, target, icon, color }: Goal) {
  const progress = Math.min(saved / target, 1);
  return <Pressable accessibilityRole="button" onPress={() => showAlert(title, `${formatPHP(saved)} saved of ${formatPHP(target)}. Keep going!`)} style={({ pressed }) => [styles.goalRow, pressed && styles.pressed]}><View style={[styles.goalIcon, { backgroundColor: color }]}><Ionicons name={icon} size={19} color={colors.white} /></View><View style={styles.goalMain}><View style={styles.goalHeading}><Text style={styles.goalName}>{title}</Text><Text style={styles.goalPercent}>{Math.round(progress * 100)}%</Text></View><View style={styles.track}><View style={[styles.progress, { width: `${progress * 100}%`, backgroundColor: color }]} /></View><Text style={styles.goalAmounts}>{formatPHP(saved)} <Text style={styles.of}>of {formatPHP(target)}</Text></Text></View><Ionicons name="chevron-forward" size={16} color={colors.muted} /></Pressable>;
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
  available: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10 },
  createCard: { borderRadius: 16, backgroundColor: colors.white, padding: spacing.md, marginBottom: spacing.md },
  createTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15, marginBottom: spacing.md },
  cancel: { alignItems: 'center', justifyContent: 'center', minHeight: 40, marginTop: 6 },
  cancelText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 12 }
});
