/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import { useEffect, useState } from 'react';
import { COLORS } from '../utils/constant';
import WasteTag from '../components/WasteTag';
import ButtonSmall from '../components/ButtonSmall';
import { LocationBoxIcon, NavigationIcon, TurnRightIcon } from '../assets';
import PhotoList from '../components/PhotoList';
import ButtonMedium from '../components/ButtonMedium';
import { MitraDetailScreenProps } from './ScreenType';
import BottomBar from '../components/BottomBar';
import api from '../api';
import { NearbyStoreDetail } from '../api/apiResponseType';

const { width, height } = Dimensions.get('window');

export default function MitraDetailScreen({
  route,
  navigation,
}: MitraDetailScreenProps) {
  const [mitraDetail, setMitraDetail] = useState<NearbyStoreDetail>(
    {} as NearbyStoreDetail,
  );
  const { mitraId, latitude, longitude } = route.params;
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

  const getNearbyStoreDetail = async () => {
    const result = await api.getNearbyStoreDetail({
      id: mitraId,
      latitude,
      longitude,
    });

    if (result?.data) {
      setMitraDetail(result.data);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (mitraId && latitude && longitude) {
        await getNearbyStoreDetail();
      }
    }

    fetchData();
  }, [mitraId, latitude, longitude, getNearbyStoreDetail]);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          paddingTop: 0,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}>
        {/* headers */}
        <View
          className="absolute z-10 w-full px-4 flex-row items-center justify-between mt-4"
          style={{ top: 0 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            className="items-center justify-center rounded-full bg-white"
            style={{ width: 40, height: 40 }}>
            <ChevronLeftIcon size={28} stroke={COLORS.textDark} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.8}
            className="items-center justify-center rounded-full bg-white"
            style={{ width: 40, height: 40 }}>
            <MagnifyingGlassIcon size={28} stroke={COLORS.textDark} />
          </TouchableOpacity>
        </View>

        <View>
          <Image
            source={require('../assets/images/backdrop.png')}
            style={{ width, resizeMode: 'cover' }}
          />
          <LinearGradient
            colors={['transparent', '#ffffff']}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
        <View className="-mt-6 px-4 mb-4">
          <Text
            className="text-dark text-xl"
            style={{ fontFamily: 'Poppins-Bold' }}>
            {mitraDetail?.name}
          </Text>
          <View className="flex-row items-end justify-between">
            <Text
              className="text-slate-400 text-sm flex-shrink"
              style={{ fontFamily: 'Poppins-Regular' }}>
              {mitraDetail?.address}
            </Text>
            <View
              className="py-1 px-2 rounded-md w-2/12 self-end"
              style={{
                backgroundColor:
                  mitraDetail?.is_open === 1
                    ? COLORS.secondary
                    : COLORS.lightRed,
              }}>
              <Text
                style={{
                  color:
                    mitraDetail?.is_open === 1
                      ? COLORS.primary
                      : COLORS.darkRed,
                  fontSize: 10,
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'center',
                }}>
                {mitraDetail?.is_open === 1 ? 'Buka' : 'Tutup'}
              </Text>
            </View>
          </View>
          <Text
            className="text-slate-400 text-sm mb-5 mt-1"
            style={{ fontFamily: 'Poppins-Regular' }}>
            {mitraDetail?.distance?.raw === 0
              ? '1 km'
              : `${mitraDetail?.distance?.raw}km`}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dataSampah.map(item => (
              <View className="mr-2" key={item.id}>
                <WasteTag tag={item.name} />
              </View>
            ))}
          </ScrollView>
          <View className="mt-8 flex-row items-center space-x-4">
            <View>
              <ButtonSmall.WithIconPrimary
                text="Rute"
                icon={
                  <TurnRightIcon
                    width={20}
                    height={20}
                    fill={COLORS.secondary}
                  />
                }
              />
            </View>
            <View>
              <ButtonSmall.WithIconSecondary
                text="Mulai"
                icon={<NavigationIcon width={20} height={20} />}
              />
            </View>
          </View>
          <View className="mt-10">
            <Text
              className="text-dark text-base mb-2"
              style={{ fontFamily: 'Poppins-Bold' }}>
              Photos
            </Text>
            <PhotoList />
          </View>
          <View className="mt-6">
            <Text
              className="text-dark text-base mb-2"
              style={{ fontFamily: 'Poppins-Bold' }}>
              Photos
            </Text>
            <Text
              className="text-dark text-sm"
              style={{ fontFamily: 'Poppins-Regular' }}>
              {mitraDetail?.description}
            </Text>
          </View>
          <View className="mt-6">
            <Text
              className="text-dark text-base mb-2"
              style={{ fontFamily: 'Poppins-Bold' }}>
              Buka pada hari
            </Text>
            <Text
              className="text-dark text-sm"
              style={{ fontFamily: 'Poppins-Regular' }}>
              Minggu 10.00 - 12.00
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomBar>
        <View className="items-end bg-white px-4">
          <ButtonMedium.Primary
            handlePress={() =>
              navigation.navigate('SelectOrder', {
                mitraId: 16,
              })
            }
            text="Lanjutkan"
            icon={<LocationBoxIcon width={20} height={20} />}
          />
        </View>
      </BottomBar>
    </SafeAreaView>
  );
}
