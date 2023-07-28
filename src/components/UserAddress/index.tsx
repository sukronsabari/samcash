import { View, Text } from 'react-native';

type AddressProps = {
  name: string;
  phone: string;
  address: string;
  label?: string;
  showLabel?: boolean;
};

export default function UserAddress({
  name,
  phone,
  address,
  label = '',
  showLabel = true,
}: AddressProps) {
  return (
    <View>
      <View className="flex-row items-center space-x-2 mb-1">
        <Text
          className="text-dark text-sm"
          style={{ fontFamily: 'Poppins-Medium' }}>
          {name}
        </Text>
        <Text
          className="text-dark text-sm"
          style={{ fontFamily: 'Poppins-Medium' }}>
          •
        </Text>
        <Text
          className="text-dark text-sm"
          style={{ fontFamily: 'Poppins-Medium' }}>
          {phone}
        </Text>
      </View>
      <View className="flex-row">
        <Text
          className="text-dark text-xs flex-1 flex-wrap"
          style={{ fontFamily: 'Poppins-Regular' }}>
          {address}
        </Text>
      </View>
      {showLabel ? (
        <View className="absolute top-full mt-2">
          <View className="border border-primary py-1 px-3 rounded-sm">
            <Text
              className="text-primary text-center"
              style={{ fontFamily: 'Poppins-Regular', fontSize: 10 }}>
              {label}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
