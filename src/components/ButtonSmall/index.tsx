import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../utils/constant';

type ButtonSmallProps = {
  text: string;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  handlePress?: () => void;
  isDisable?: boolean;
};

export default function ButtonSmall({
  text,
  backgroundColor = COLORS.primary,
  color = 'white',
  borderColor = COLORS.primary,
  handlePress,
  isDisable = false,
}: ButtonSmallProps) {
  return (
    <TouchableOpacity
      disabled={isDisable}
      activeOpacity={0.9}
      className="rounded-full px-4 py-2 border"
      style={{
        backgroundColor: isDisable ? COLORS.placeholder : backgroundColor,
        borderColor: isDisable ? COLORS.placeholder : borderColor,
      }}
      onPress={handlePress}>
      <Text
        className="text-center text-sm"
        style={{ fontFamily: 'Poppins-Regular', color }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

type ButtonSmallWithIconProps = {
  icon: React.ReactElement;
  text: string;
};

function WithIconPrimary({ icon, text }: ButtonSmallWithIconProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-primary border border-primary rounded-full py-2 px-4 flex-row items-center space-x-2">
      {icon}
      <Text
        className="text-white text-sm"
        style={{ fontFamily: 'Poppins-Medium' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

function WithIconSecondary({ icon, text }: ButtonSmallWithIconProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-white border border-primary rounded-full py-2 px-4 flex-row items-center space-x-2">
      {icon}
      <Text
        className="text-primary text-sm"
        style={{ fontFamily: 'Poppins-Medium' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

ButtonSmall.WithIconPrimary = WithIconPrimary;
ButtonSmall.WithIconSecondary = WithIconSecondary;
