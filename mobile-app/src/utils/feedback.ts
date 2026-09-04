import { Alert, Platform } from 'react-native';

type AlertButton = { text?: string; onPress?: () => void };

export function showAlert(title: string, message: string, buttons?: AlertButton[]) {
  if (Platform.OS !== 'web') {
    Alert.alert(title, message, buttons);
    return;
  }

  if (typeof globalThis.alert === 'function') {
    globalThis.alert(`${title}\n\n${message}`);
  }

  buttons?.[buttons.length - 1]?.onPress?.();
}
