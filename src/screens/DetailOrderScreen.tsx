import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { BuildingStorefrontIcon } from 'react-native-heroicons/outline';
import { useState } from 'react';
import RowItem from '../components/RowItem';
import { COLORS } from '../utils/constant';
import MitraAddress from '../components/MitraAddress';
import BottomBar from '../components/BottomBar';
import ButtonLarge from '../components/ButtonLarge';
import OrderedWaste from '../components/OrderedWaste';

function StatusOrder({ status }: { status: 'waiting' | 'process' | 'done' }) {
  const variant = {
    waiting: {
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      title: 'Menunggu Konfirmasi',
    },
    process: {
      backgroundColor: '#ffedd5',
      color: '#f97316',
      title: 'Diproses',
    },
    done: {
      backgroundColor: COLORS.secondary,
      color: COLORS.primary,
      title: 'Diterima',
    },
  };

  const { backgroundColor, color, title } = variant[status];

  return (
    <View className="py-1 px-2" style={{ backgroundColor }}>
      <Text style={{ fontFamily: 'Poppins-Medium', color, fontSize: 10 }}>
        {title}
      </Text>
    </View>
  );
}

export default function DetailOrderScreen() {
  const idJemput = 'ID1234567';
  const [status, setStatus] = useState<'waiting' | 'process' | 'done'>('done');

  const name = 'Bank Sampah Ramli Graha';
  const address =
    'Jl. Bung Tomo Perumahan Keledang Mas Baru Block Bt. No 8, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, Kalimantan Timur 75242';

  const date = new Date().toLocaleString('id-ID');

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        <View className="px-4">
          <View style={{ marginBottom: 8 }}>
            <RowItem title="Nomor penjemputan" value={idJemput} />
          </View>
          <View style={{ marginBottom: 8 }}>
            <RowItem title="Status" value={<StatusOrder status={status} />} />
          </View>
          <View style={{ marginBottom: 8 }}>
            <RowItem title="Metode Setor" value="Pesan penjemputan" />
          </View>
          <View style={{ marginBottom: 8 }}>
            <RowItem title="Tanggal" value={date} />
          </View>
        </View>

        <View className="pb-8 border-b-4 border-b-neutral-100 px-4">
          <View className="mt-8">
            <View className="flex-row items-center space-x-2">
              <BuildingStorefrontIcon size={24} stroke={COLORS.textDark} />
              <Text
                className="text-sm text-dark"
                style={{ fontFamily: 'Poppins-Regular' }}>
                Alamat Mitra
              </Text>
            </View>
            <View className="mt-3 pl-5">
              <MitraAddress
                name={name}
                address={address}
                status="Buka"
                times="08.00 - 17.00"
              />
            </View>
          </View>
        </View>
        {/* <View className="mt-8">
          <View className="flex-row items-center space-x-2">
            <MapPinIcon size={24} stroke={COLORS.textDark} />
            <Text
              className="text-sm text-dark"
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              Alamat Mitra
            </Text>
          </View>
          <View className="mt-3 pl-5">
            <MitraAddress
              name={name}
              address={address}
              status="Buka"
              times="08.00 - 17.00"
            />
          </View>
        </View> */}
        <View className="mt-6 px-4">
          <View className="mb-3">
            <OrderedWaste name="Sisa Sayuran" quantity={2} point={200} />
          </View>
          <View className="mb-3">
            <OrderedWaste name="Serbuk Kayu" quantity={3} point={100} />
          </View>
        </View>
        <View className="mt-6 px-4">
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

      {status !== 'process' ? (
        <BottomBar>
          <View className="px-4 flex-row space-x-3">
            <View className="flex-1">
              <ButtonLarge
                title="Batalkan Setoran"
                handlePress={() => {}}
                roundedFull
              />
            </View>
          </View>
        </BottomBar>
      ) : null}
    </SafeAreaView>
  );
}
