/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import { COLORS } from '../../utils/constant';

type PasswordInputFieldProps = {
  password: string;
  handleChange: (password: string) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitEditing?: () => void;
  onEndEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  placeholder?: string;
};
const PasswordInputField = forwardRef<TextInput, PasswordInputFieldProps>(
  (
    {
      password,
      handleChange,
      placeholder = '******',
      showPassword,
      setShowPassword,
      onSubmitEditing = () => {},
      onEndEditing = () => {},
    },
    ref,
  ) => {
    const toggleShowPassword = () => {
      setShowPassword((prev: boolean) => !prev);
    };

    return (
      <View className="px-3 flex-row justify-between items-center overflow-hidden rounded-xl border border-slate-300">
        <TextInput
          ref={ref}
          className="flex-1 py-2 text-dark text-sm"
          style={{ fontFamily: 'Poppins-Regular' }}
          placeholderTextColor={COLORS.placeholder}
          value={password}
          onChangeText={handleChange}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          onSubmitEditing={onSubmitEditing}
          onEndEditing={onEndEditing}
          cursorColor={COLORS.primary}
        />
        {!showPassword ? (
          <EyeIcon onPress={toggleShowPassword} color={COLORS.placeholder} />
        ) : (
          <EyeSlashIcon
            onPress={toggleShowPassword}
            color={COLORS.placeholder}
          />
        )}
      </View>
    );
  },
);

export default PasswordInputField;
