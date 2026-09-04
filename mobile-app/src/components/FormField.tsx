import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View } from 'react-native';
import { colors, fonts, spacing } from '../theme';

type FormFieldProps = TextInputProps & { label: string; rightIcon?: keyof typeof Ionicons.glyphMap; helper?: string };

export function FormField({ label, rightIcon, helper, style, editable = true, ...props }: FormFieldProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrap, !editable && styles.inputDisabled]}>
        <TextInput {...props} editable={editable} accessibilityLabel={props.accessibilityLabel || label} placeholderTextColor="#A3A8B7" selectionColor={colors.blue} style={[styles.input, Platform.OS === 'web' && webInputStyle, style as StyleProp<TextStyle>]} />
        {rightIcon ? <View pointerEvents="none"><Ionicons name={rightIcon} size={17} color={colors.muted} /></View> : null}
      </View>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

const webInputStyle = { outlineStyle: 'none', outlineWidth: 0, outlineColor: 'transparent' } as unknown as TextStyle;

type SelectFieldProps = { label: string; value?: string; options?: string[]; onChange?: (value: string) => void; onPress?: () => void; placeholder?: string };

export function SelectField({ label, value, options = [], onChange, onPress, placeholder = 'Select an option' }: SelectFieldProps) {
  const [visible, setVisible] = useState(false);
  const hasOptions = options.length > 0;
  const open = () => {
    if (hasOptions) {
      setVisible(true);
      return;
    }
    onPress?.();
  };

  const choose = (option: string) => {
    onChange?.(option);
    setVisible(false);
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`${label}: ${value || placeholder}`} onPress={open} style={({ pressed }) => [styles.inputWrap, pressed && styles.inputPressed]}><Text style={[styles.selectText, !value && styles.placeholder]}>{value || placeholder}</Text><Ionicons name="chevron-down" size={17} color={colors.muted} /></Pressable>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setVisible(false)}>
          <View style={styles.modalCard} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}><Text style={styles.modalTitle}>{label}</Text><Pressable accessibilityRole="button" accessibilityLabel="Close dropdown" onPress={() => setVisible(false)} style={styles.closeButton}><Ionicons name="close" size={20} color={colors.muted} /></Pressable></View>
            <ScrollView style={styles.optionsList} contentContainerStyle={styles.optionsContent} keyboardShouldPersistTaps="handled">
              {options.map((option) => <Pressable accessibilityRole="button" accessibilityState={{ selected: value === option }} key={option} onPress={() => choose(option)} style={({ pressed }) => [styles.option, value === option && styles.optionSelected, pressed && styles.optionPressed]}><Text style={[styles.optionText, value === option && styles.optionTextSelected]}>{option}</Text>{value === option ? <Ionicons name="checkmark-circle" size={19} color={colors.blue} /> : null}</Pressable>)}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  label: { color: colors.muted, fontFamily: fonts.medium, fontSize: 11, marginBottom: 7 },
  inputWrap: { minHeight: 47, borderWidth: 1, borderColor: colors.line, borderRadius: 10, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  input: { flex: 1, minWidth: 0, color: colors.ink, fontFamily: fonts.regular, fontSize: 13, paddingVertical: 10 },
  inputDisabled: { backgroundColor: '#F4F5F8' },
  selectText: { flex: 1, color: colors.ink, fontFamily: fonts.regular, fontSize: 13 },
  placeholder: { color: '#A3A8B7' },
  inputPressed: { borderColor: colors.blue, backgroundColor: '#FBFBFF' },
  helper: { marginTop: 5, color: colors.muted, fontSize: 10 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(14,16,47,.45)', justifyContent: 'center', padding: spacing.lg },
  modalCard: { maxHeight: '80%', borderRadius: 18, backgroundColor: colors.white, paddingTop: spacing.md, overflow: 'hidden' },
  modalHeader: { minHeight: 48, paddingHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.line },
  modalTitle: { color: colors.ink, fontFamily: fonts.bold, fontSize: 15 },
  closeButton: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  optionsList: { flexGrow: 0 },
  optionsContent: { padding: 10, gap: 5 },
  option: { minHeight: 47, borderRadius: 10, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionSelected: { backgroundColor: colors.blueSoft },
  optionPressed: { backgroundColor: '#F1F3FF' },
  optionText: { color: colors.ink, fontFamily: fonts.regular, fontSize: 13 },
  optionTextSelected: { color: colors.blue, fontFamily: fonts.bold }
});
