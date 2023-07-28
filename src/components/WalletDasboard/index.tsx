import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  DepositIcon,
  PointIcon,
  ProfileIconLarge,
  WalletHistoryIcon,
} from '../../assets';

export default function WalletDasboard() {
  return (
    <View className="flex-row items-center justify-between bg-primary rounded-xl p-4 overflow-hidden">
      <View className="p-4 rounded-xl bg-white justify-center">
        <Text
          className="text-xs text-dark"
          style={{ fontFamily: 'Poppins-Regular' }}>
          Saldo saat ini
        </Text>
        <Text
          className="text-base text-dark"
          style={{ fontFamily: 'Poppins-Bold' }}>
          Rp. 200.000
        </Text>
      </View>
      <View className="flex-row space-x-4 mr-2">
        <TouchableOpacity className="items-center">
          <DepositIcon width={40} height={40} />
          <Text
            className="text-white text-xs mt-1"
            style={{ fontFamily: 'Poppins-Regular' }}>
            Deposit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <WalletHistoryIcon width={40} height={40} />
          <Text
            className="text-white text-xs mt-1"
            style={{ fontFamily: 'Poppins-Regular' }}>
            Riwayat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <PointIcon width={40} height={40} />
          <Text
            className="text-white text-xs mt-1"
            style={{ fontFamily: 'Poppins-Regular' }}>
            Point
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function UserNotLogin() {
  return (
    <View className="flex-row items-center justify-center bg-secondary rounded-xl p-5 space-x-2 overflow-hidden">
      <ProfileIconLarge width={45} height={45} />
      <View>
        <Text
          className="text-base text-dark"
          style={{ fontFamily: 'Poppins-Medium' }}>
          Login
        </Text>
        <Text
          className="text-xs text-primary"
          style={{ fontFamily: 'Poppins-Regular' }}>
          Untuk menggunakan layanan dari samcash
        </Text>
      </View>
    </View>
  );
}

WalletDasboard.UserNotLogin = UserNotLogin;
