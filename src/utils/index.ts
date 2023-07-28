import { Alert } from 'react-native';

type ShowAlertProps = {
  title: string;
  message: string;
  handlePress?: () => void;
};
export const showAlert = ({
  title,
  message,
  handlePress = () => {},
}: ShowAlertProps) => {
  return Alert.alert(
    title.charAt(0).toUpperCase() + title.slice(1),
    message.charAt(0).toUpperCase() + message.slice(1),
    [
      {
        text: 'Ok',
        onPress: handlePress,
        style: 'default',
      },
    ],
  );
};
