type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  VerifyOtp: undefined;
  Search: undefined;
  MitraDetail: { mitraId: number; latitude: string; longitude: string };
  SelectOrder: { mitraId: number };
  SetAddress: undefined;
  SelectOrderMethod: undefined;
  Order: undefined;
  DetailOrder: undefined;
  AddAddress: undefined;
};

type HomeTabParamList = {
  HomeTab: undefined;
  StatisticTab: undefined;
  HistoryTab: undefined;
  ProfileTab: undefined;
};

export type { RootStackParamList, HomeTabParamList };
