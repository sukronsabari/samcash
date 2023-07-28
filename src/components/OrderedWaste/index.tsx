import { View, Text, Image } from 'react-native';

type OrderedWasteProps = {
  name: string;
  quantity: number;
  point: number;
};

export default function OrderedWaste({
  name,
  point,
  quantity,
}: OrderedWasteProps) {
  return (
    <View className="flex-row justify-between items-center pb-4">
      <View className="flex-row items-center space-x-3">
        <Image
          source={require('../../assets/images/sample-waste.png')}
          className="rounded-md"
          style={{ width: 100, height: 70 }}
        />
        <View>
          <Text
            className="text-sm text-dark"
            style={{ fontFamily: 'Poppins-Medium' }}>
            {name}
          </Text>
          <Text
            className="text-sm text-dark"
            style={{ fontFamily: 'Poppins-Regular' }}>
            {quantity}kg
          </Text>
        </View>
      </View>
      <View>
        <Text
          className="text-sm text-dark"
          style={{ fontFamily: 'Poppins-Medium' }}>
          {point} poin
        </Text>
      </View>
    </View>
  );
}
