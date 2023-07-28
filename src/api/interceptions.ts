/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const baseURL = 'https://api-samcash.rsib.cloud/api/v1';

export const axiosInstance = axios.create({
  baseURL,
});

interface OriginalRequest extends AxiosRequestConfig {
  _retry?: boolean;
}

// Interceptor to handle token expiration and refresh the token
axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError): Promise<any> => {
    const originalRequest: OriginalRequest = error.config || {};

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        await EncryptedStorage.setItem('samcash_access_token', newAccessToken);

        return await axiosInstance.request(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

async function refreshAccessToken() {
  try {
    const refreshToken = await EncryptedStorage.getItem('samcash_access_token');

    const response = await axios.post(`${baseURL}/customer/refresh`, {
      refreshToken,
    });

    return response.data.token;
  } catch (e) {
    throw new Error('Failed to retrieve access token');
  }
}
