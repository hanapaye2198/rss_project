import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedbackHost } from './src/components/FeedbackHost';
import { AppNavigator } from './src/navigation/AppNavigator';
import { DemoProvider } from './src/state/DemoContext';
import { colors } from './src/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.webStage}>
        <View style={[styles.appFrame, Platform.OS === 'web' && styles.webAppFrame]}>
          <StatusBar style="light" />
          <DemoProvider>
            <AppNavigator />
            <FeedbackHost />
          </DemoProvider>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  webStage: { flex: 1, backgroundColor: '#263A2A' },
  appFrame: { flex: 1, width: '100%', backgroundColor: colors.background },
  webAppFrame: { maxWidth: 480, alignSelf: 'center', shadowColor: '#11152E', shadowOpacity: .22, shadowRadius: 28, shadowOffset: { width: 0, height: 0 }, elevation: 8 }
});
