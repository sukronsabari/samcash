import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

type ButtonMenuProps = {
  imageSource: ImageSourcePropType;
  text: string;
  handlePress?: () => void;
};

export default function ButtonMenu({
  imageSource,
  text,
  handlePress,
}: ButtonMenuProps) {
  return (
    <TouchableOpacity className="items-center" onPress={handlePress}>
      <View className="p-3 bg-secondary rounded-md overflow-hidden items-center">
        <Image source={imageSource} style={{ width: 40, height: 40 }} />
      </View>
      <Text
        className="text-sm text-dark mt-1"
        style={{ fontFamily: 'Poppins-Regular' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
