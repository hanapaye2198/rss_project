import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, fonts, spacing } from '../theme';

type FormFieldProps = TextInputProps & { label: string; rightIcon?: keyof typeof Ionicons.glyphMap; helper?: string };

export function FormField({ label, rightIcon, helper, ...props }: FormFieldProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput {...props} placeholderTextColor="#A3A8B7" style={styles.input} />
        {rightIcon ? <Ionicons name={rightIcon} size={17} color={colors.muted} /> : null}
      </View>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

export function SelectField({ label, value, onPress, placeholder = 'Select an option' }: { label: string; value?: string; onPress: () => void; placeholder?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.inputWrap, pressed && styles.inputPressed]}><Text style={[styles.selectText, !value && styles.placeholder]}>{value || placeholder}</Text><Ionicons name="chevron-down" size={17} color={colors.muted} /></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  label: { color: colors.muted, fontFamily: fonts.medium, fontSize: 11, marginBottom: 7 },
  inputWrap: { minHeight: 47, borderWidth: 1, borderColor: colors.line, borderRadius: 10, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  input: { flex: 1, color: colors.ink, fontFamily: fonts.regular, fontSize: 13, paddingVertical: 10 },
  selectText: { flex: 1, color: colors.ink, fontFamily: fonts.regular, fontSize: 13 },
  placeholder: { color: '#A3A8B7' },
  inputPressed: { borderColor: colors.blue, backgroundColor: '#FBFBFF' },
  helper: { marginTop: 5, color: colors.muted, fontSize: 10 }
});
