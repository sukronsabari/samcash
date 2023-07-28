/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { RootStackParamList } from './NavigationTypes';

import HomeTabNavigation from './HomeTabNavigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import SearchScreen from '../screens/SearchScreen';
import MitraDetailScreen from '../screens/MitraDetailScreen';

import { COLORS } from '../utils/constant';
import SelectOrderScreen from '../screens/SelectOrderScreen';
import SetAddressScreen from '../screens/SetAddressScreen';
import SelectOrderMethodScreen from '../screens/SelectOrderMethodScreen';
import OrderScreen from '../screens/OrderScreen';
import DetailOrderScreen from '../screens/DetailOrderScreen';
import { useAuth } from '../context/AuthContext';
import AddAddressScreen from '../screens/AddAddressScreen';

const { Screen, Navigator } = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      <Navigator>
        {authState?.authenticated !== null && !authState.authenticated ? (
          <>
            <Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Screen
              name="VerifyOtp"
              component={VerifyOtpScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Screen
              name="Home"
              component={HomeTabNavigation}
              options={{ headerShown: false }}
            />

            <Screen
              name="Search"
              component={SearchScreen}
              options={{
                headerShown: false,
              }}
            />
            <Screen
              name="MitraDetail"
              component={MitraDetailScreen}
              options={{
                headerShown: false,
              }}
            />
            <Screen
              name="SelectOrder"
              component={SelectOrderScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <ChevronLeftIcon
                    size={28}
                    color={COLORS.textDark}
                    stroke={COLORS.textDark}
                    onPress={() => navigation.goBack()}
                  />
                ),
                headerTitle: 'Pilih Setoran',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Medium',
                  fontSize: 16,
                },
                headerShadowVisible: false,
              })}
            />
            <Screen
              name="SetAddress"
              component={SetAddressScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <ChevronLeftIcon
                    size={28}
                    color={COLORS.textDark}
                    stroke={COLORS.textDark}
                    onPress={() => navigation.goBack()}
                  />
                ),
                headerTitle: 'Pilih Alamat',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Medium',
                  fontSize: 16,
                },
                headerShadowVisible: false,
              })}
            />
            <Screen
              name="SelectOrderMethod"
              component={SelectOrderMethodScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <ChevronLeftIcon
                    size={28}
                    color={COLORS.textDark}
                    stroke={COLORS.textDark}
                    onPress={() => navigation.goBack()}
                  />
                ),
                headerTitle: 'Metode Setor',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Medium',
                  fontSize: 16,
                },
                headerShadowVisible: false,
              })}
            />
            <Screen
              name="Order"
              component={OrderScreen}
              options={{ headerShown: false }}
            />
            <Screen
              name="DetailOrder"
              component={DetailOrderScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <ChevronLeftIcon
                    size={28}
                    color={COLORS.textDark}
                    stroke={COLORS.textDark}
                    onPress={() =>
                      navigation.canGoBack()
                        ? navigation.goBack()
                        : navigation.replace('Home')
                    }
                  />
                ),
                headerTitle: 'Detail Setoran',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Medium',
                  fontSize: 16,
                },
                headerShadowVisible: false,
              })}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
}
