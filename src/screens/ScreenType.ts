import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  HomeTabParamList,
  RootStackParamList,
} from '../routes/NavigationTypes';

/** Screen types */
type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'HomeTab'>,
  StackScreenProps<RootStackParamList, 'Home'>
>;
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;
type VerifyOtpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'VerifyOtp'
>;
type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
type MitraDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MitraDetail'
>;
type SelectOrderScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SelectOrder'
>;
type SetAddressScreeenProps = NativeStackScreenProps<
  RootStackParamList,
  'SetAddress'
>;
type SelectOrderMethodScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SelectOrderMethod'
>;
type OrderScreenProps = NativeStackScreenProps<RootStackParamList, 'Order'>;

/** Navigation types */
type SearchScreenNavigation = SearchScreenProps['navigation'];
type MitraDetailScreenNavigation = MitraDetailScreenProps['navigation'];

export type {
  HomeScreenProps,
  LoginScreenProps,
  RegisterScreenProps,
  VerifyOtpScreenProps,
  SearchScreenProps,
  MitraDetailScreenProps,
  SelectOrderScreenProps,
  SetAddressScreeenProps,
  SelectOrderMethodScreenProps,
  OrderScreenProps,
  MitraDetailScreenNavigation,
  SearchScreenNavigation,
};
