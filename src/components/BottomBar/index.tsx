import React from 'react';
import { Dimensions, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

type BottomBarProps = {
  children: React.ReactNode;
};

const { width } = Dimensions.get('window');

export default function BottomBar({ children }: BottomBarProps) {
  return (
    <View className="absolute bottom-0 left-0" style={{ height: 72, width }}>
      <Shadow
        startColor="rgba(0, 0, 0, 0.1)"
        offset={[0, 0]}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        {children}
      </Shadow>
    </View>
  );
}
