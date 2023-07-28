import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import WalletDasboard from '../components/WalletDasboard';
import ButtonMenu from '../components/ButtonMenu';
import SearchInputPlaceholder from '../components/SearchInputPlaceholder';

export default function HomeScreen() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingTop: 0,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-white px-4">
        <View className="my-6">
          <SearchInputPlaceholder />
        </View>
        {isLogged ? <WalletDasboard /> : <WalletDasboard.UserNotLogin />}

        <View className="mt-6 flex-row justify-between items-center">
          <ButtonMenu
            imageSource={require('../assets/images/location-menu.png')}
            text="Lokasi"
          />
          <ButtonMenu
            imageSource={require('../assets/images/jemput-menu.png')}
            text="Jemput"
          />
          <ButtonMenu
            imageSource={require('../assets/images/reward-menu.png')}
            text="Hadiah"
          />
          <ButtonMenu
            imageSource={require('../assets/images/leaderboard-menu.png')}
            text="Peringkat"
          />
        </View>

        <View className="mt-8">
          <Text
            className="text-sm text-dark"
            style={{
              fontFamily: 'Poppins-Medium',
            }}>
            Informasi Terbaru
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 10 }}
            data={[1, 2, 3, 4, 5]}
            // keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-secondary rounded-xl mr-4"
                style={{ width: 200, height: 150 }}>
                <Text className="hidden">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View className="mt-6">
          <Text
            className="text-sm text-dark"
            style={{
              fontFamily: 'Poppins-Medium',
            }}>
            Kenali Samcash lebih dekat
          </Text>
          <Text
            className="text-xs text-slate-500"
            style={{
              fontFamily: 'Poppins-Medium',
            }}>
            Biar makin akrab, yuk cek tips berikut!
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 10 }}
            data={[1, 2, 3, 4, 5]}
            // keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-secondary rounded-xl mr-4"
                style={{ width: 200, height: 150 }}>
                <Text className="hidden">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
