/* eslint-disable no-useless-catch */
import { axiosInstance } from './interceptions';
import {
  NearbyStoreDetailResponse,
  NearbyStoreResponse,
  GetWasteResponse,
  AddWasteToCartResponse,
} from './apiResponseType';

type ApiCallProps = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  headers?: object;
  params?: object;
  data?: object;
};

export const apiCall = async ({
  method = 'GET',
  endpoint,
  headers = {},
  params = {},
  data = {},
}: ApiCallProps): Promise<any> => {
  const options = {
    method,
    url: endpoint,
    params,
    data,
    headers,
  };

  try {
    const response = await axiosInstance.request(options);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

const api = (() => {
  interface NearbyStoreParams {
    longitude: number | string;
    latitude: number | string;
  }

  interface NearbyStoreDetailParams extends NearbyStoreParams {
    id: number;
  }

  interface AddAddressParams extends NearbyStoreDetailParams {
    address: string;
    addressDetail: string;
    isDefault: number;
  }

  interface UpdateAddressParams extends AddAddressParams {
    id: number;
  }

  interface AvailableWasteListParams {
    mitraId: number;
    categoryId: number;
  }

  interface AddWasteToCartParams {
    mitraId: number;
    productId: number;
  }

  async function getNearbyStore({ latitude, longitude }: NearbyStoreParams) {
    try {
      const response: NearbyStoreResponse = await apiCall({
        method: 'GET',
        endpoint: '/customer/nearby-store',
        params: {
          latitude,
          longitude,
        },
      });

      return response;
    } catch (error) {
      return {} as NearbyStoreResponse;
    }
  }

  async function getNearbyStoreDetail({
    id,
    latitude,
    longitude,
  }: NearbyStoreDetailParams) {
    try {
      const response: NearbyStoreDetailResponse = await apiCall({
        method: 'GET',
        endpoint: `/customer/nearby-store/show/${id}`,
        params: {
          latitude,
          longitude,
        },
      });

      return response;
    } catch (error) {
      return {} as NearbyStoreDetailResponse;
    }
  }

  async function addAddress({
    address,
    addressDetail,
    latitude,
    longitude,
    isDefault,
  }: AddAddressParams) {
    try {
      const response = await apiCall({
        method: 'POST',
        endpoint: '/customer/address/store',
        data: {
          address,
          addressDetail,
          latitude,
          longitude,
          isDefault,
        },
      });

      return response;
    } catch (error) {
      return {};
    }
  }

  async function updateAddress({
    id,
    address,
    addressDetail,
    latitude,
    longitude,
    isDefault,
  }: UpdateAddressParams) {
    try {
      const response = await apiCall({
        method: 'POST',
        endpoint: `/customer/address/store/${id}`,
        headers: {
          accept: 'application/json',
        },
        data: {
          address,
          addressDetail,
          latitude,
          longitude,
          isDefault,
        },
      });

      return response;
    } catch (error) {
      return {};
    }
  }

  async function getAvailableWasteList({
    mitraId,
    categoryId,
  }: AvailableWasteListParams): Promise<GetWasteResponse | undefined> {
    try {
      const response: GetWasteResponse = await apiCall({
        method: 'GET',
        endpoint: '/general/product',
        params: {
          mitra_id: mitraId,
          category_id: categoryId,
        },
      });

      return response;
    } catch (error) {
      return {} as GetWasteResponse;
    }
  }

  async function addWasteToCart({
    mitraId,
    productId,
  }: AddWasteToCartParams): Promise<AddWasteToCartResponse | undefined> {
    try {
      const response = await apiCall({
        method: 'GET',
        endpoint: '/customer/cart/store',
        params: {
          mitra_id: mitraId,
          product_id: productId,
        },
      });

      return response;
    } catch (error) {
      return {} as AddWasteToCartResponse;
    }
  }

  return {
    getNearbyStore,
    getNearbyStoreDetail,
    getAvailableWasteList,
    addWasteToCart,
    addAddress,
    updateAddress,
  };
})();

export default api;
