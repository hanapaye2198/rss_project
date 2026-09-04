import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts } from '../theme';

export function PrimaryButton({ title, onPress, icon, disabled = false, style }: { title: string; onPress: () => void; icon?: keyof typeof Ionicons.glyphMap; disabled?: boolean; style?: ViewStyle }) {
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, disabled && styles.disabled, pressed && !disabled && styles.pressed, style]}>
      {icon ? <Ionicons name={icon} size={18} color={colors.white} /> : null}
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

export function OutlineButton({ title, onPress }: { title: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.outline, pressed && styles.outlinePressed]}><Text style={styles.outlineLabel}>{title}</Text></Pressable>;
}

const styles = StyleSheet.create({
  button: { minHeight: 50, borderRadius: 12, backgroundColor: colors.blue, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 22 },
  label: { color: colors.white, fontFamily: fonts.bold, fontSize: 14 },
  disabled: { opacity: .45 },
  pressed: { transform: [{ scale: .98 }], backgroundColor: colors.blueDark },
  outline: { minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: colors.blue, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  outlineLabel: { color: colors.blue, fontFamily: fonts.bold, fontSize: 13 },
  outlinePressed: { backgroundColor: colors.blueSoft }
});
