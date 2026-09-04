import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedbackHost } from './src/components/FeedbackHost';
import { AppNavigator } from './src/navigation/AppNavigator';
import { DemoProvider } from './src/state/DemoContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <DemoProvider>
        <AppNavigator />
        <FeedbackHost />
      </DemoProvider>
    </SafeAreaProvider>
  );
}
