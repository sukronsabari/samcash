import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';
import {
  BuildingStorefrontIcon,
  MapPinIcon,
} from 'react-native-heroicons/outline';
import ButtonSmall from '../components/ButtonSmall';
import { COLORS } from '../utils/constant';
import UserAddress from '../components/UserAddress';
import ButtonVoucher from '../components/ButtonVoucher';
import MitraAddress from '../components/MitraAddress';
import RowItem from '../components/RowItem';
import BottomBar from '../components/BottomBar';
import ButtonLarge from '../components/ButtonLarge';
import { SelectOrderMethodScreenProps } from './ScreenType';

export default function SelectOrderMethodScreen({
  navigation,
}: SelectOrderMethodScreenProps) {
  const [orderMethod, setOrderMethod] = useState<
    'pesan-jemput' | 'setor-mitra'
  >('pesan-jemput');

  const name = 'Sukron Sabari';
  const phone = '082253784251';
  const address =
    'Jl. Bung Tomo Perumahan Keledang Mas Baru Block Bt. No 8, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, Kalimantan Timur 75242';

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 bg-white px-4"
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center space-x-4 mt-4">
          <View>
            <ButtonSmall
              text="Pesan Jemputan"
              handlePress={() => setOrderMethod('pesan-jemput')}
              backgroundColor={
                orderMethod === 'pesan-jemput' ? COLORS.primary : 'white'
              }
              color={orderMethod === 'pesan-jemput' ? 'white' : COLORS.primary}
            />
          </View>
          <View>
            <ButtonSmall
              text="Setor di Mitra"
              handlePress={() => setOrderMethod('setor-mitra')}
              backgroundColor={
                orderMethod === 'setor-mitra' ? COLORS.primary : 'white'
              }
              color={orderMethod === 'setor-mitra' ? 'white' : COLORS.primary}
            />
          </View>
        </View>
        <View>
          {orderMethod === 'pesan-jemput' ? (
            <View className="py-8 border-b border-b-neutral-100">
              <View className="flex-row items-center space-x-2">
                <MapPinIcon size={20} stroke={COLORS.placeholder} />
                <Text
                  className="text-sm text-slate-400"
                  style={{ fontFamily: 'Poppins-Regular' }}>
                  Titik penjemputan
                </Text>
              </View>
              <View className="mt-3 pl-5">
                <UserAddress
                  name={name}
                  phone={phone}
                  address={address}
                  showLabel={false}
                />
              </View>
            </View>
          ) : null}
          <View className="pt-8">
            <View className="flex-row items-center space-x-2">
              <BuildingStorefrontIcon size={20} stroke={COLORS.placeholder} />
              <Text
                className="text-sm text-slate-400"
                style={{ fontFamily: 'Poppins-Regular' }}>
                {orderMethod === 'pesan-jemput'
                  ? 'Alamat penjemput'
                  : 'Tempat penyetoran'}
              </Text>
            </View>
            <View className="mt-3 pl-5">
              <MitraAddress
                name="Bank Sampah Ramli Graha"
                address={address}
                status="Buka"
                times="08.00 - 17.00"
              />
            </View>
          </View>
        </View>
        <View className="mt-5">
          <ButtonVoucher handlePress={() => {}} />
        </View>
        <View className="mt-8">
          <Text
            className="text-dark text-sm mb-1"
            style={{ fontFamily: 'Poppins-Bold' }}>
            Rincian Pembayaran
          </Text>

          <View className="pl-3">
            <Text
              className="text-dark text-sm mb-1"
              style={{ fontFamily: 'Poppins-Medium' }}>
              Estimasi pendapatan
            </Text>
            <View className="pl-3">
              <View className="mb-1">
                <RowItem title="Non-Organik" value="Rp.3000" />
              </View>
              <View className="mb-1">
                <RowItem title="Organik" value="Rp.3000" />
              </View>
              <View className="mb-1">
                <RowItem title="Logam" value="Rp.3000" />
              </View>
            </View>
            <View className="mb-1">
              <RowItem title="Biaya penjemputan" value="Rp.5000" />
            </View>
            <View className="mb-1">
              <RowItem title="Diskon" value="Rp.0" />
            </View>
            <View className="mb-1">
              <RowItem title="Total" value="Rp. 15.000" />
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomBar>
        <View className="px-4 flex-row space-x-3">
          <View className="flex-1">
            <ButtonLarge
              title={orderMethod === 'pesan-jemput' ? 'Jemput' : 'Setor'}
              handlePress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Order' }],
                })
              }
              roundedFull
            />
          </View>
          {orderMethod === 'setor-mitra' && (
            <View className="flex-1">
              <ButtonLarge
                title="Cek Rute"
                backgroundColor="white"
                color={COLORS.primary}
                borderColor={COLORS.primary}
                handlePress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Order' }],
                  })
                }
                roundedFull
              />
            </View>
          )}
        </View>
      </BottomBar>
    </SafeAreaView>
  );
}
