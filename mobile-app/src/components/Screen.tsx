import { PropsWithChildren, ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  footer?: ReactNode;
}>;

export function Screen({ children, scroll = true, contentStyle, backgroundColor = colors.background, footer }: ScreenProps) {
  const content = scroll ? (
    <ScrollView style={[styles.flex, styles.scrollSurface]} contentContainerStyle={[styles.scrollContent, contentStyle]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : <View style={[styles.flex, contentStyle]}>{children}</View>;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.safeArea, { backgroundColor }]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.flex}>{content}{footer}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  scrollSurface: { backgroundColor: colors.background },
  scrollContent: { width: '100%', paddingBottom: 28 }
});
