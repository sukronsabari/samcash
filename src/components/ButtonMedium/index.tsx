import { Text, TouchableOpacity } from 'react-native';

type ButtonMediumProps = {
  icon: React.ReactElement;
  text: string;
};

export default function ButtonMedium({ icon, text }: ButtonMediumProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-white border border-primary rounded-full py-3 px-5 flex-row items-center space-x-2">
      {icon}
      <Text
        className="text-primary text-sm"
        style={{ fontFamily: 'Poppins-Medium' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

type ButtonMediumPrimaryProps = {
  icon: React.ReactElement;
  text: string;
  handlePress: () => void;
};

function Primary({ icon, text, handlePress }: ButtonMediumPrimaryProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className="bg-primary rounded-full py-3 px-4 flex-row items-center space-x-2">
      {icon}
      <Text
        className="text-white text-sm"
        style={{ fontFamily: 'Poppins-Medium' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

ButtonMedium.Primary = Primary;
