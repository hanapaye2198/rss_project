import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

const notifications = [
  { title: 'Cash-in credited', body: 'PHP 14,350 was added to your wallet.', time: 'Today · 9:42 AM', icon: 'checkmark-circle' as const, color: '#40B982' },
  { title: 'New wallet feature', body: 'Explore savings goals and grow your money with iCASH.', time: 'Yesterday · 4:16 PM', icon: 'sparkles-outline' as const, color: '#8071E8' },
  { title: 'Security reminder', body: 'Never share your passcode or one-time PIN.', time: 'Jun 14 · 8:00 AM', icon: 'shield-checkmark-outline' as const, color: '#F1A23E' }
];

export function NotificationsScreen({ navigation }: Props) {
  const [read, setRead] = useState<string[]>([]);
  const unreadCount = notifications.length - read.length;

  const openNotification = (title: string, body: string) => {
    setRead((current) => current.includes(title) ? current : [...current, title]);
    showAlert(title, body);
  };

  const markAllRead = () => {
    setRead(notifications.map((item) => item.title));
    showAlert('Notifications cleared', 'All notifications are marked as read.');
  };

  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent}>
      <AppHeader title="Notifications" subtitle="Stay up to date" navigation={navigation} dark />
      <View style={styles.content}><View style={styles.headerRow}><Text style={styles.heading}>Recent updates</Text><Text style={styles.unread}>{unreadCount} unread</Text></View><View style={styles.list}>{notifications.map((item) => <Pressable accessibilityRole="button" key={item.title} onPress={() => openNotification(item.title, item.body)} style={({ pressed }) => [styles.row, !read.includes(item.title) && styles.unreadRow, pressed && styles.pressed]}><View style={[styles.icon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={19} color={colors.white} /></View><View style={styles.copy}><Text style={styles.title}>{item.title}</Text><Text style={styles.body}>{item.body}</Text><Text style={styles.time}>{item.time}</Text></View>{!read.includes(item.title) ? <View style={styles.dot} /> : null}<Ionicons name="chevron-forward" size={16} color={colors.muted} /></Pressable>)}</View><PrimaryButton title={unreadCount ? 'Mark all as read' : 'All notifications read'} icon="checkmark-done" onPress={markAllRead} disabled={!unreadCount} /></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.md },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  heading: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15 },
  unread: { color: colors.blue, fontFamily: fonts.medium, fontSize: 10 },
  list: { backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  row: { minHeight: 88, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderBottomColor: '#F0F1F5' },
  unreadRow: { backgroundColor: '#FBFBFF' },
  pressed: { opacity: .65 },
  icon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  title: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  body: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, lineHeight: 15, marginTop: 3 },
  time: { color: '#A3A7B4', fontFamily: fonts.regular, fontSize: 9, marginTop: 4 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.blue }
});
