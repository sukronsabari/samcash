import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from 'react-native-heroicons/outline';
import ButtonSmall from '../ButtonSmall';
import { COLORS } from '../../utils/constant';
import { SelectedWaste, Waste } from '../../api/apiResponseType';

type WasteCardProps = {
  wasteData: Waste;
  isWasteSelected: boolean;
  addToCart: (waste: Waste) => void;
  removeFromCart: (waste: Waste) => void;
};

export default function WasteCard({
  wasteData,
  isWasteSelected,
  addToCart,
  removeFromCart,
}: WasteCardProps) {
  return (
    <View className="border border-slate-300 rounded-lg overflow-hidden px-3 py-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row space-x-3 flex-1">
          <Image
            source={require('../../assets/images/sample-waste.png')}
            style={{ width: 60, height: 60 }}
            className="rounded-md"
          />
          <View>
            <View className="flex-row">
              <Text
                className="text-sm text-dark flex-shrink"
                style={{ fontFamily: 'Poppins-Medium' }}>
                {wasteData.product_name.length > 16
                  ? `${wasteData.product_name.slice(0, 15)}...`
                  : wasteData.product_name}
              </Text>
            </View>
            <Text
              className="text-xs text-primary"
              style={{ fontFamily: 'Poppins-Medium' }}>
              {wasteData.purchase_point} Point
            </Text>
          </View>
        </View>
        {isWasteSelected ? (
          <TouchableOpacity
            onPress={() => removeFromCart(wasteData)}
            className="bg-primary py-1 px-3 rounded-full">
            <Text
              className="text-white"
              style={{ fontFamily: 'Poppins-Regular', fontSize: 10 }}>
              Batalkan
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => addToCart(wasteData)}
            className="bg-primary py-1 px-3 rounded-full">
            <Text
              className="text-white"
              style={{ fontFamily: 'Poppins-Regular', fontSize: 10 }}>
              Tambah
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
