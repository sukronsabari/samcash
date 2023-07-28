/* eslint-disable import/export */
export interface RegisterResponse {
  data: Data;
  status: string;
  message?: string;
}

export interface Data {
  user_id: number;
}

export interface LoginResponse {
  data: string;
  status: string;
}

export interface LoginResponseNeedVerifyOtp {
  status: string;
  message: string;
  data: {
    is_verify: boolean;
  };
}

export interface VerifyOtpResponse {
  data: Data;
  status: string;
}

export interface Data {
  access_token: string;
}

export interface GeneralErrorResponse {
  message: string;
  status: string;
}

// Nearby
export interface NearbyStoreResponse {
  current_page: number;
  data: NearbyStore[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface NearbyStore {
  address: string;
  address_detail: string;
  distance: Distance;
  id: number;
  is_delivery: number;
  is_open: number;
  is_pickup: number;
  latitude: string;
  longitude: string;
  name: string;
}

export interface Distance {
  formated: string;
  raw: number;
}

// Nearby Detail
export interface NearbyStoreDetailResponse {
  data: NearbyStoreDetail;
  status: string;
}

export interface NearbyStoreDetail {
  address: string;
  address_detail: string;
  contact_name: null;
  contact_phone: null;
  description: string;
  distance: Distance;
  email_notification: null;
  id: number;
  is_delivery: number;
  is_open: number;
  is_pickup: number;
  latitude: string;
  longitude: string;
  name: string;
  user_id: number;
}

export interface Distance {
  formated: string;
  raw: number;
}

export interface GetWasteResponse {
  current_page: number;
  data: Waste[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface Waste {
  category_id: number;
  id: number;
  is_available: string;
  mitra_id: number;
  product_code: string;
  product_image: null;
  product_name: string;
  purchase_point: string;
  unit_type: string;
}

export interface AddWasteToCartResponse {
  data: DataAddWasteToCart;
  option: Option;
  status: string;
}

export interface DataAddWasteToCart {
  message: string;
}

export interface Option {
  debug: Debug;
}

export interface Debug {
  cart_id: number;
  id: number;
  point: string;
  product_id: number;
  product_name: string;
}

export interface SelectedWaste extends Waste {
  quantity: number;
}
