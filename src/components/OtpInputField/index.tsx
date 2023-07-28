/* eslint-disable react/no-array-index-key */
/* eslint-disable no-return-assign */
import React, { useRef } from 'react';
import {
  View,
  TextInput,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from 'react-native';
import { COLORS } from '../../utils/constant';

type OtpInputFieldProps = {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function OtpInputField({ otp, setOtp }: OtpInputFieldProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (value: string, index: number) => {
    if (value.length > 1) {
      return;
    }

    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-between">
      {otp.map((value, index) => (
        <TextInput
          key={index}
          value={value}
          style={{ width: 60, height: 60, fontFamily: 'Poppins-Bold' }}
          className="text-dark border-2 border-slate-400 rounded-md text-lg text-center"
          cursorColor={COLORS.primary}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => handleChangeText(text, index)}
          ref={ref => (inputRefs.current[index] = ref)}
          onKeyPress={event => handleKeyPress(event, index)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
}
