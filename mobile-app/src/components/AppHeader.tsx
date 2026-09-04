import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '../theme';
import { RootStackParamList } from '../navigation/types';

type HeaderProps = {
  title: string;
  subtitle?: string;
  navigation: NavigationProp<RootStackParamList>;
  dark?: boolean;
};

export function AppHeader({ title, subtitle, navigation, dark = false }: HeaderProps) {
  return (
    <View style={[styles.header, dark && styles.headerDark]}>
      <Pressable accessibilityLabel="Go back" hitSlop={10} onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={22} color={dark ? colors.white : colors.ink} />
      </Pressable>
      <View style={styles.titleWrap}>
        <Text style={[styles.title, dark && styles.textLight]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, dark && styles.textLightMuted]}>{subtitle}</Text> : null}
      </View>
      <View style={styles.headerSpacer} />
    </View>
  );
}

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionTitleText}>{title}</Text>
      {action && onAction ? <Pressable onPress={onAction}><Text style={styles.action}>{action}</Text></Pressable> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 62, paddingHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center' },
  headerDark: { backgroundColor: colors.blue },
  backButton: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  titleWrap: { flex: 1, alignItems: 'center' },
  title: { color: colors.ink, fontFamily: fonts.bold, fontSize: 16 },
  subtitle: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11, marginTop: 2 },
  headerSpacer: { width: 38 },
  textLight: { color: colors.white },
  textLightMuted: { color: 'rgba(255,255,255,.7)' },
  sectionTitle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  sectionTitleText: { color: colors.ink, fontFamily: fonts.bold, fontSize: 18 },
  action: { color: colors.blue, fontFamily: fonts.medium, fontSize: 12 }
});
