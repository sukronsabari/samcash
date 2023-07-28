/* eslint-disable react/no-unstable-nested-components */
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from './NavigationTypes';
import {
  ActivityIcon,
  ActivityIconActive,
  HistoryIcon,
  HistoryIconActive,
  HomeIcon,
  HomeIconActive,
  ProfileIcon,
  ProfileIconActive,
} from '../assets';

import HomeScreen from '../screens/HomeScreen';
import StatisticScreen from '../screens/StatisticScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../utils/constant';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const iconMap = {
  HomeTab: {
    default: <HomeIcon />,
    focused: <HomeIconActive />,
  },
  StatisticTab: {
    default: <ActivityIcon />,
    focused: <ActivityIconActive />,
  },
  HistoryTab: {
    default: <HistoryIcon />,
    focused: <HistoryIconActive />,
  },
  ProfileTab: {
    default: <ProfileIcon />,
    focused: <ProfileIconActive />,
  },
};

export default function HomeTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const icon = iconMap[route.name];

          return focused ? icon.focused : icon.default;
        },
        tabBarStyle: {
          padding: 8,
          height: 60,
          borderTopColor: 'white',

          shadowColor: 'rgba(0, 0, 0, 0.8)', // Warna bayangan
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 9, // Bayangan pada platform Android
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              className="mb-1 text-xs"
              style={[
                focused
                  ? { color: COLORS.primary }
                  : { color: COLORS.textDark },
                { fontFamily: 'Poppins-Regular' },
              ]}>
              {route.name.replace('Tab', '')}
            </Text>
          );
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="StatisticTab" component={StatisticScreen} />
      <Tab.Screen name="HistoryTab" component={HistoryScreen} />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
