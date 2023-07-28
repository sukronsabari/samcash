import { Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../utils/constant';

type ButtonLargeProps = {
  title: string;
  handlePress: () => void;
  roundedFull?: boolean;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  disabled?: boolean;
  disabledBgColor?: string;
};

export default function ButtonLarge({
  title,
  handlePress,
  roundedFull,
  backgroundColor = COLORS.primary,
  color = 'white',
  borderColor = 'transparent',
  disabled = false,
  disabledBgColor = '#64748b',
}: ButtonLargeProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        backgroundColor: disabled ? disabledBgColor : backgroundColor,
        borderColor,
        borderWidth: 1,
      }}
      className={`w-full py-3 ${roundedFull ? 'rounded-full' : 'rounded-lg'}`}
      onPress={handlePress}
      activeOpacity={0.9}>
      <Text
        className="text-center text-sm"
        style={{ fontFamily: 'Poppins-Medium', color }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
