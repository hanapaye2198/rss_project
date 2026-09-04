import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '../theme';
import { FeedbackNotice, FeedbackTone, subscribeFeedback } from '../utils/feedback';

const toneStyles: Record<FeedbackTone, { color: string; soft: string; icon: keyof typeof Ionicons.glyphMap }> = {
  success: { color: '#2EAF72', soft: colors.greenSoft, icon: 'checkmark' },
  error: { color: '#D9505B', soft: '#FDECEF', icon: 'alert' },
  info: { color: colors.blue, soft: colors.blueSoft, icon: 'information' }
};

export function FeedbackHost() {
  const [notice, setNotice] = useState<FeedbackNotice | null>(null);

  useEffect(() => subscribeFeedback(setNotice), []);

  const dismiss = () => {
    const callback = notice?.onConfirm;
    setNotice(null);
    callback?.();
  };

  if (!notice) return null;
  const tone = toneStyles[notice.tone];

  return (
    <Modal visible transparent animationType="fade" onRequestClose={dismiss}>
      <Pressable style={styles.backdrop} onPress={dismiss}>
        <View style={styles.card} onStartShouldSetResponder={() => true}>
          <View style={[styles.icon, { backgroundColor: tone.soft }]}><Ionicons name={tone.icon} size={27} color={tone.color} /></View>
          <Text style={styles.title}>{notice.title}</Text>
          <Text style={styles.message}>{notice.message}</Text>
          <Pressable accessibilityRole="button" onPress={dismiss} style={({ pressed }) => [styles.button, { backgroundColor: tone.color }, pressed && styles.buttonPressed]}><Text style={styles.buttonText}>{notice.buttonText || 'Done'}</Text></Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(10,14,40,.48)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 340, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', padding: spacing.lg, shadowColor: '#11152E', shadowOpacity: .2, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 8 },
  icon: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  title: { color: colors.ink, fontFamily: fonts.bold, fontSize: 18, textAlign: 'center' },
  message: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 8 },
  button: { minHeight: 46, minWidth: 132, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  buttonPressed: { opacity: .78, transform: [{ scale: .98 }] },
  buttonText: { color: colors.white, fontFamily: fonts.bold, fontSize: 13 }
});
