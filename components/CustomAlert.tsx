import { Alert } from 'react-native'
import strings from '../assets/locales/Localization';

export const createTwoButtonAlert = (title: string, message: string, onOkPress?: () => void, onCancelPress?: () => void) => {
  Alert.alert(
    title, 
    message, 
    [
      {
        text: strings.cancel,
        onPress: onCancelPress || (() => console.log('Cancel Pressed')),
        style: 'cancel',
      },
      {
        text: strings.ok,
        onPress: onOkPress || (() => console.log('OK Pressed')),
      },
    ],
    { cancelable: true }
  );
};
