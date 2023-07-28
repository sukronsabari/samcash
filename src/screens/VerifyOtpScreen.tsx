/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';
import { useState } from 'react';
import OtpInputField from '../components/OtpInputField';
import ButtonLarge from '../components/ButtonLarge';
import { useAuth } from '../context/AuthContext';
import { showAlert } from '../utils';
import { VerifyOtpScreenProps } from './ScreenType';

const { height } = Dimensions.get('window');

export default function VerifyOtpScreen({ navigation }: VerifyOtpScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '']);

  const { onVerifyOtp, onResendOtp, authState } = useAuth();
  const isDisable = otp.join('').length !== 4;

  const handleVerifyOtp = async () => {
    if (authState?.user?.id) {
      const result = await onVerifyOtp!({
        userId: authState.user.id,
        otpCode: otp.join(''),
      });

      if (result.status === 'failed') {
        showAlert({ title: result.status, message: result.message });
      }
    }
  };

  const handleResendOtp = async () => {
    if (authState.user?.id) {
      const result = await onResendOtp!({ userId: authState.user.id });

      if (result?.data) {
        showAlert({ title: 'Success', message: 'Otp berhasil diperbarui' });
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        extraHeight={80}>
        <View className="pt-14 flex-row items-center justify-center">
          <Image
            source={require('../assets/images/otp.png')}
            // style={{ height: height * 0.3 }}
            resizeMode="cover"
          />
        </View>
        <Text
          className="text-3xl mt-10 mb-1 text-center"
          style={{ fontFamily: 'Poppins-Bold' }}>
          Verifikasi OTP
        </Text>
        <Text
          className="text-center text-sm"
          style={{ fontFamily: 'Poppins-Regular' }}>
          We sent OTP code to verify your email
        </Text>
        <View className="mt-10 px-6">
          <OtpInputField otp={otp} setOtp={setOtp} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          className="mt-24"
          onPress={handleResendOtp}>
          <Text
            className="text-sm text-dark underline text-center"
            style={{ fontFamily: 'Poppins-Medium' }}>
            Resend OTP
          </Text>
        </TouchableOpacity>
        <View className="mt-8">
          <ButtonLarge
            disabled={isDisable}
            title="Verifikasi"
            handlePress={handleVerifyOtp}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
