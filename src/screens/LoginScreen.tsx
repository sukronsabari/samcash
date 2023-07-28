import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview';
import { LoginScreenProps } from './ScreenType';
import TextInputField from '../components/TextInputField';
import PasswordInputField from '../components/PasswordInputField';
import ButtonLarge from '../components/ButtonLarge';
import { useAuth } from '../context/AuthContext';
import { showAlert } from '../utils';

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { onLogin, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState<boolean>();
  const [validPassword, setValidPassword] = useState<boolean>();
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  const checkEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const valid = checkEmail(value);
    if (!valid) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const valid = value.trim().length > 3;
    if (!valid) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  };

  const handleLogin = async () => {
    const result = await onLogin?.({ email, password });

    if (result) {
      if ('data' in result && result.data.is_verify === false) {
        showAlert({
          title: result.status,
          message: result.message,
          handlePress: () => navigation.navigate('VerifyOtp'),
        });
      } else {
        showAlert({
          title: result.status,
          message: result.message,
        });
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <KeyboardAwareScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        extraHeight={60}>
        <View className="pt-10 flex-row items-center justify-center">
          <Image
            source={require('../assets/images/character-login.png')}
            // style={{ height: height * 0.4 }}
            resizeMode="cover"
          />
        </View>
        <Text
          className="text-3xl mt-8 mb-5 text-dark font-bold"
          style={{ fontFamily: 'Poppins' }}>
          Login
        </Text>
        <View className="mb-3">
          <Text
            style={{ fontFamily: 'Poppins' }}
            className="text-dark text-sm mb-3">
            Email
          </Text>
          <TextInputField
            value={email}
            handleChange={handleEmailChange}
            placeholder="Email"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          {email.trim().length !== 0 && !validEmail ? (
            <Text
              style={{ fontFamily: 'Poppins' }}
              className="text-red-400 text-xs mt-1">
              Email tidak valid
            </Text>
          ) : null}
        </View>
        <View className="mb-3">
          <Text
            style={{ fontFamily: 'Poppins' }}
            className="text-dark text-sm mb-3">
            Password
          </Text>
          <PasswordInputField
            ref={passwordRef}
            password={password}
            handleChange={handlePasswordChange}
            placeholder="Password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {password.trim().length !== 0 && !validPassword ? (
            <Text
              style={{ fontFamily: 'Poppins' }}
              className="text-red-400 text-xs mt-1">
              Character password harus lebih dari 3
            </Text>
          ) : null}
        </View>
        <TouchableOpacity className="items-end" activeOpacity={0.8}>
          <Text
            className="text-primary underline text-sm"
            style={{ fontFamily: 'Poppins' }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View className="mt-8">
          <ButtonLarge
            disabled={!validEmail || !validPassword || isLoading}
            title="Login"
            handlePress={handleLogin}
          />
        </View>
        <View className="mt-8 flex-row justify-center items-center space-x-1">
          <Text className="text-dark text-sm" style={{ fontFamily: 'Poppins' }}>
            Belum punya akun?
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Register')}>
            <Text
              className="text-primary text-sm underline"
              style={{ fontFamily: 'Poppins' }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
