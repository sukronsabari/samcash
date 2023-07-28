import React from 'react';
import { View, Text, ScrollView } from 'react-native';

type RowItemProps = {
  title: string;
  value: string | React.ReactElement;
};

export default function RowItem({ title, value }: RowItemProps) {
  return (
    <View className="flex-row items-center justify-between">
      <Text
        className="text-dark text-sm"
        style={{ fontFamily: 'Poppins-Medium', flexBasis: '50%' }}>
        {title}
      </Text>

      {typeof value === 'string' ? (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <Text
            className="text-dark text-sm text-right"
            style={{ fontFamily: 'Poppins-Regular' }}>
            {value}
          </Text>
        </ScrollView>
      ) : (
        value
      )}
    </View>
  );
}
