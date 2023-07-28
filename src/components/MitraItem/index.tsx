import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WasteTag from '../WasteTag';
import { MitraDetailScreenNavigation } from '../../screens/ScreenType';
import PhotoList from '../PhotoList';
import { COLORS } from '../../utils/constant';

type MitraItemProps = {
  id: number;
  name: string;
  address: string;
  distance: string;
  isOpen: number;
  latitude: string;
  longitude: string;
};
export default function MitraItem({
  id,
  name,
  address,
  distance,
  isOpen,
  latitude,
  longitude,
}: MitraItemProps) {
  const dataSampah = [
    {
      id: 1,
      name: 'Botol Plastik',
    },
    {
      id: 2,
      name: 'Alumunium',
    },
    {
      id: 3,
      name: 'Besi Bekas',
    },
    {
      id: 34,
      name: 'Koran',
    },
  ];

  const navigation = useNavigation<MitraDetailScreenNavigation>();

  return (
    <View className="mb-4">
      <View className="p-5 border border-slate-300 bg-white rounded-lg overflow-hidden">
        <PhotoList />
        <TouchableOpacity
          activeOpacity={1}
          className="mb-5"
          onPress={() =>
            navigation.navigate('MitraDetail', {
              mitraId: id,
              latitude,
              longitude,
            })
          }>
          <>
            <Text
              className="mt-6 text-dark text-base"
              style={{ fontFamily: 'Poppins-Bold' }}>
              {name}
            </Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-1 flex-1">
                <Text
                  className="text-slate-400 text-xs"
                  style={{ fontFamily: 'Poppins-Regular' }}
                  numberOfLines={1}>
                  {address.length > 25 ? `${address.slice(0, 25)}...` : address}
                </Text>
                <Text
                  className="text-slate-400 text-xs"
                  style={{ fontFamily: 'Poppins-Regular' }}>
                  •
                </Text>
                <Text
                  className="text-slate-400 text-xs"
                  style={{ fontFamily: 'Poppins-Regular' }}
                  numberOfLines={1}>
                  {distance}
                </Text>
              </View>
              <View>
                <View
                  className="py-1 px-2 rounded-md"
                  style={{
                    backgroundColor:
                      isOpen === 1 ? COLORS.secondary : COLORS.lightRed,
                  }}>
                  <Text
                    style={{
                      color: isOpen === 1 ? COLORS.primary : COLORS.darkRed,
                      fontSize: 10,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {isOpen === 1 ? 'Buka' : 'Tutup'}
                  </Text>
                </View>
              </View>
            </View>
          </>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dataSampah.map((item, index) => (
            <View className="mr-2" key={item.id}>
              <WasteTag tag={item.name} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

// <TouchableOpacity
//   className="rounded-full border border-primary p-2"
//   activeOpacity={0.7}
// >
//   <TurnRightIcon
//     width={20}
//     height={20}
//     fill={COLORS.primary}
//     color={COLORS.primary}
//   />
// </TouchableOpacity>;
