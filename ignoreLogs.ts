import { LogBox } from 'react-native';

export const ignoreLogs = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']);
} 