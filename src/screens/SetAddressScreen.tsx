import { useMemo, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';
import { PlusCircleIcon } from 'react-native-heroicons/outline';
import { COLORS } from '../utils/constant';
import BottomBar from '../components/BottomBar';
import ButtonLarge from '../components/ButtonLarge';
import { SetAddressScreeenProps } from './ScreenType';
import UserAddress from '../components/UserAddress';

export default function SetAddressScreen({
  navigation,
}: SetAddressScreeenProps) {
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        value:
          'Jl. Bung Tomo Perumahan Keledang Mas Baru Block Bt. No 8, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, Kalimantan Timur 75242',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const name = 'Sukron Sabari';
  const phone = '082253784251';
  const address =
    'Jl. Bung Tomo Perumahan Keledang Mas Baru Block Bt. No 8, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, Kalimantan Timur 75242';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="space-y-3 px-4">
        <View className="mt-4 flex-row items-start space-x-2 border-b border-b-slate-100 pb-14">
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={{
              width: 40,
              height: 40,
              // borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <View className="flex-1">
            <UserAddress
              name="Sukron Sabari"
              address={address}
              phone={phone}
              label="Utama"
            />
          </View>

          <View>
            <TouchableOpacity>
              <Text
                className="text-primary text-sm text-center"
                style={{ fontFamily: 'Poppins-Medium' }}>
                Ubah
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddAddress')}
        activeOpacity={0.7}
        className="py-2 mt-2 flex-row items-center justify-center space-x-2">
        <PlusCircleIcon size={28} stroke={COLORS.primary} />
        <Text
          className="text-primary text-sm text-center"
          style={{ fontFamily: 'Poppins-Medium' }}>
          Tambah Alamat Baru
        </Text>
      </TouchableOpacity>
      <BottomBar>
        <View className="px-4">
          <ButtonLarge
            title="Selanjutnya"
            handlePress={() => navigation.navigate('SelectOrderMethod')}
            roundedFull
          />
        </View>
      </BottomBar>
    </SafeAreaView>
  );
}
