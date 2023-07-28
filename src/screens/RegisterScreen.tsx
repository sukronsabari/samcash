import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RegisterScreenProps } from './ScreenType';
import TextInputField from '../components/TextInputField';
import PasswordInputField from '../components/PasswordInputField';
import ButtonLarge from '../components/ButtonLarge';
import { useAuth } from '../context/AuthContext';
import { showAlert } from '../utils';

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const referralCodeRef = useRef<TextInput>(null);

  const { onRegister } = useAuth();

  const handleRegister = async () => {
    const result = await onRegister?.({
      name: fullname,
      email,
      password,
    });

    if (result) {
      showAlert({
        title: result.status,
        message:
          result.status === 'success'
            ? 'Anda berhasil Registrasi'
            : result?.message || '',
        handlePress:
          result.status === 'success'
            ? () => navigation.replace('Login')
            : () => {},
      });
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAwareScrollView
        // className="flex-1"
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        extraHeight={60}>
        <GestureHandlerRootView className="flex-1">
          <ScrollView
            className="flex-1 bg-white px-4"
            contentContainerStyle={{ paddingBottom: 40 }}>
            {/* <View className="pt-10 flex-row items-center justify-center">
              <Image
                source={require('../assets/images/character-register.png')}
                resizeMode="cover"
              />
            </View> */}
            <Text
              className="text-3xl mt-6 mb-5 pt-10 text-dark"
              style={{ fontFamily: 'Poppins-Bold' }}>
              Register
            </Text>
            <View className="mb-3">
              <Text
                style={{ fontFamily: 'Poppins-Regular' }}
                className="text-dark text-sm mb-3">
                Fullname
              </Text>
              <TextInputField
                value={fullname}
                handleChange={value => setFullname(value)}
                placeholder="Fullname"
                onSubmitEditing={() => emailRef.current?.focus()}
              />
            </View>
            <View className="mb-3">
              <Text
                style={{ fontFamily: 'Poppins-Regular' }}
                className="text-dark text-sm mb-3">
                Email
              </Text>
              <TextInputField
                ref={emailRef}
                value={email}
                handleChange={value => setEmail(value)}
                placeholder="Email"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>
            <View className="mb-3">
              <Text
                style={{ fontFamily: 'Poppins-Regular' }}
                className="text-dark text-sm mb-3">
                Password
              </Text>
              <PasswordInputField
                ref={passwordRef}
                password={password}
                handleChange={(value: string) => setPassword(value)}
                placeholder="Password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onSubmitEditing={() => referralCodeRef.current?.focus()}
              />
            </View>
            <View className="mb-3">
              <Text
                style={{ fontFamily: 'Poppins-Regular' }}
                className="text-dark text-sm mb-3">
                Referral Code (Opsional)
              </Text>
              <TextInputField
                ref={referralCodeRef}
                value={referralCode}
                handleChange={value => setReferralCode(value)}
              />
            </View>
            <View className="mt-8">
              <ButtonLarge title="Register" handlePress={handleRegister} />
            </View>
            <View className="mt-8 flex-row justify-center items-center space-x-1">
              <Text
                className="text-dark text-sm"
                style={{ fontFamily: 'Poppins-Regular' }}>
                Sudah punya akun?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Login')}>
                <Text
                  className="text-primary text-sm underline"
                  style={{ fontFamily: 'Poppins-Medium' }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
