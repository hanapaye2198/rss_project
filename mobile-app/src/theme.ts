import { Platform } from 'react-native';

export const colors = {
  blue: '#1010E9',
  blueDark: '#070779',
  blueSoft: '#E9EEFF',
  ink: '#161A2F',
  muted: '#7A8091',
  line: '#E5E7EE',
  background: '#F7F8FB',
  white: '#FFFFFF',
  yellow: '#FFC814',
  green: '#39C687',
  greenSoft: '#E2F8EC',
  purple: '#A65EE7',
  orange: '#FF995A',
  red: '#E85F65'
} as const;

export const fonts = {
  regular: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
  medium: Platform.select({ ios: 'System', android: 'sans-serif-medium', default: 'System' }),
  bold: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' })
};

export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 } as const;
