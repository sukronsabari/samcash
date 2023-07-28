import { Text, TouchableOpacity } from 'react-native';

type ButtonListProps = {
  text: string;
  handlePress?: () => void;
  showBottomBorder?: boolean;
};
export default function ButtonList({
  text,
  handlePress,
  showBottomBorder = true,
}: ButtonListProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`py-5 border-b ${
        showBottomBorder ? 'border-b-neutral-100' : 'border-b-transparent'
      }`}
      activeOpacity={0.8}>
      <Text
        className="text-dark text-sm pl-3"
        style={{ fontFamily: 'Poppins-Medium' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
