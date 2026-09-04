import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { colors, fonts, spacing } from '../theme';
import { showAlert } from '../utils/feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const menu = [
  { title: 'Personal information', detail: 'Update your name and contact details', icon: 'person-outline' as const },
  { title: 'Security and privacy', detail: 'Passcode, biometrics, and account access', icon: 'shield-checkmark-outline' as const },
  { title: 'Help center', detail: 'Get answers and contact support', icon: 'help-circle-outline' as const }
];

export function ProfileScreen({ navigation }: Props) {
  return (
    <Screen backgroundColor={colors.blue} contentStyle={styles.screenContent} scroll>
      <AppHeader title="Profile" subtitle="Manage your account" navigation={navigation} dark />
      <View style={styles.content}>
        <View style={styles.profileCard}><View style={styles.avatar}><Text style={styles.avatarText}>MH</Text></View><Text style={styles.name}>Miss Hannah</Text><Text style={styles.email}>hannah@example.com</Text><View style={styles.verified}><Ionicons name="checkmark-circle" size={14} color="#2EAF72" /><Text style={styles.verifiedText}>Verified account</Text></View></View>
        <View style={styles.menu}>{menu.map((item) => <Pressable accessibilityRole="button" key={item.title} onPress={() => showAlert(item.title, 'This account section is ready for your profile settings.')} style={({ pressed }) => [styles.menuRow, pressed && styles.pressed]}><View style={styles.menuIcon}><Ionicons name={item.icon} size={20} color={colors.blue} /></View><View style={styles.menuText}><Text style={styles.menuTitle}>{item.title}</Text><Text style={styles.menuDetail}>{item.detail}</Text></View><Ionicons name="chevron-forward" size={17} color={colors.muted} /></Pressable>)}</View>
        <PrimaryButton title="Edit profile" icon="create-outline" onPress={() => showAlert('Edit profile', 'Your profile details can be updated in this demo flow.')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  profileCard: { alignItems: 'center', backgroundColor: colors.white, borderRadius: 18, padding: spacing.lg, marginBottom: spacing.md },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontFamily: fonts.bold, fontSize: 22 },
  name: { color: colors.ink, fontFamily: fonts.bold, fontSize: 18, marginTop: 12 },
  email: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11, marginTop: 4 },
  verified: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 11 },
  verifiedText: { color: '#2EAF72', fontFamily: fonts.medium, fontSize: 10 },
  menu: { backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  menuRow: { minHeight: 73, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderBottomColor: '#F0F1F5' },
  pressed: { opacity: .65 },
  menuIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.blueSoft, alignItems: 'center', justifyContent: 'center' },
  menuText: { flex: 1 },
  menuTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 12 },
  menuDetail: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 4 }
});
