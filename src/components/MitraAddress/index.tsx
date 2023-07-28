import { View, Text } from 'react-native';

type AddressProps = {
  name: string;
  address: string;
  status: 'Buka' | 'Tutup';
  times?: string;
};

export default function UserAddress({
  name,
  address,
  status,
  times,
}: AddressProps) {
  return (
    <View className="pb-16">
      <View className="flex-row items-center space-x-2 mb-1">
        <Text
          className="text-dark text-sm"
          style={{ fontFamily: 'Poppins-Medium' }}>
          {name}
        </Text>
      </View>
      <View className="flex-row">
        <Text
          className="text-dark text-xs flex-1 flex-wrap"
          style={{ fontFamily: 'Poppins-Regular' }}>
          {address}
        </Text>
      </View>

      <View className="absolute top-full mt-4">
        <View className="flex-row items-center space-x-3">
          <View
            className="border border-primary px-4 rounded-sm"
            style={{ paddingVertical: 1 }}>
            <Text
              className="text-primary text-center"
              style={{ fontFamily: 'Poppins-Medium', fontSize: 10 }}>
              {status}
            </Text>
          </View>

          <Text
            className="text-slate-500 text-sm"
            style={{ fontFamily: 'Poppins-Medium' }}>
            •
          </Text>
          <Text
            className="text-slate-500 text-xs"
            style={{ fontFamily: 'Poppins-Medium' }}>
            {times}
          </Text>
        </View>
      </View>
    </View>
  );
}
