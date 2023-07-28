import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { DefaultProfile } from '../assets';
import ButtonList from '../components/ButtonList';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { onLogout } = useAuth();

  return (
    <SafeAreaView className="flex-1" style={{ paddingTop: 0 }}>
      <View className="flex-1 bg-white px-4">
        <View className="mt-10 flex-row items-center">
          <DefaultProfile width={70} height={70} />
          <View className="ml-3">
            <Text
              className="text-dark text-sm"
              style={{ fontFamily: 'Poppins-Medium' }}>
              Sukron Sabari
            </Text>
            <Text
              className="text-dark text-xs"
              style={{ fontFamily: 'Poppins-Regular' }}>
              sukronsabari11@gmail.com
            </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40, marginTop: 30 }}>
          <Text
            className="text-slate-500 text-xs pl-3"
            style={{ fontFamily: 'Poppins-Regular' }}>
            Menu
          </Text>
          <ButtonList text="Voucher Saya" />
          <ButtonList text="KodeReferral" />
          <ButtonList text="Riwayat Transaksi" />
          <ButtonList text="Alamat Saya" />
          <ButtonList text="Kebijakan Privasi" />
          <ButtonList text="Syarat dan Ketentuan" />
          <ButtonList text="Tentang Samcash" showBottomBorder={false} />
          <View className="mt-1">
            <TouchableOpacity
              onPress={onLogout}
              className="bg-primary mt-6 py-2 px-3 rounded-full w-2/5 self-center"
              activeOpacity={0.9}>
              <Text
                className="text-white text-sm text-center"
                style={{ fontFamily: 'Poppins-Regular' }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
