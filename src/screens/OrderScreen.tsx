/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, SafeAreaView, BackHandler } from 'react-native';

import { useEffect } from 'react';
import { OrderSuccessIcon } from '../assets';
import ButtonLarge from '../components/ButtonLarge';
import { COLORS } from '../utils/constant';
import { OrderScreenProps } from './ScreenType';

export default function OrderScreen({ navigation }: OrderScreenProps) {
  const handleBackPress = () => {
    navigation.navigate('Home'); // Navigasi kembali ke HomeScreen
    return true; // Keluar dari OrderScreen
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove(); // Bersihkan listener saat komponen di-unmount
  }, [handleBackPress]);

  return (
    <SafeAreaView className="flex-1">
      <View
        className="flex-1 bg-white items-center justify-center px-4"
        style={{ paddingTop: 0 + 16 }}>
        <OrderSuccessIcon width={100} height={100} />
        <Text
          className="text-dark text-sm"
          style={{ fontFamily: 'Poppins-Medium' }}>
          Order Berhasil Dibuat
        </Text>
        <Text
          className="text-dark text-sm mt-8 text-center"
          style={{ fontFamily: 'Poppins-Regular' }}>
          Penjemputan Anda sudah kami tindaklanjuti. Mohon tunggu konfirmasi
          dari mitra.
        </Text>
        <View className="w-full mt-6">
          <ButtonLarge
            roundedFull
            title="Lihat Detail"
            backgroundColor={COLORS.secondary}
            color={COLORS.primary}
            handlePress={() => navigation.replace('DetailOrder')}
          />
        </View>
        <View className="w-full mt-4">
          <ButtonLarge
            title="Setor Lagi"
            roundedFull
            handlePress={() => {}}
            backgroundColor="white"
            color={COLORS.primary}
            borderColor={COLORS.primary}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
