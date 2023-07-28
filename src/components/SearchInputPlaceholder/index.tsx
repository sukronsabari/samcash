import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchIcon } from '../../assets';
import { SearchScreenNavigation } from '../../screens/ScreenType';

export default function SearchInputPlaceholder() {
  const navigation = useNavigation<SearchScreenNavigation>();

  return (
    <TouchableOpacity
      activeOpacity={1}
      className="flex-row items-center px-3 space-x-2 border border-slate-300 rounded-xl"
      onPress={() => navigation.navigate('Search')}>
      <SearchIcon width={25} height={25} strokeWidth={1} />
      <View className="flex-1" style={{ paddingVertical: 10 }}>
        <Text
          style={{ fontFamily: 'Poppins-Regular' }}
          className="text-slate-400 text-sm">
          Temukan mitra penukaran sampah
        </Text>
      </View>
    </TouchableOpacity>
  );
}
