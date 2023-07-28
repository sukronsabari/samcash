/* eslint-disable consistent-return */
import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, { AxiosError } from 'axios';
import { axiosInstance } from '../api/interceptions';
import { apiCall } from '../api';
import {
  GeneralErrorResponse,
  LoginResponse,
  LoginResponseNeedVerifyOtp,
  RegisterResponse,
  VerifyOtpResponse,
} from '../api/apiResponseType';
import Loading from '../components/Loading';
import ProgressBarLoading from '../components/ProgressBar';

type AuthState = {
  accessToken: string | null;
  user: {
    id: number | null;
  };
  authenticated: boolean | null;
};
type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

type LoginParams = {
  email: string;
  password: string;
};
type VerifyOtp = {
  userId: number;
  otpCode: string;
};
type AuthProps = {
  isLoading: boolean;
  authState: AuthState;
  onLogin: ({
    email,
    password,
  }: LoginParams) => Promise<
    LoginResponseNeedVerifyOtp | GeneralErrorResponse | undefined
  >;
  onRegister: ({
    name,
    email,
    password,
  }: RegisterParams) => Promise<RegisterResponse | GeneralErrorResponse>;
  onVerifyOtp: ({ userId, otpCode }: VerifyOtp) => Promise<any>;
  onResendOtp: ({ userId }: { userId: number }) => Promise<any>;
  onLogout: () => Promise<any>;
};

const AuthContext = createContext<AuthProps>({} as AuthProps);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactElement }) {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    user: {
      id: null,
    },
    authenticated: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    checkAuthenticationStatus();
    setIsLoading(false);
  }, []);

  const checkAuthenticationStatus = async () => {
    const accessToken = await EncryptedStorage.getItem('samcash_access_token');
    const userId = await EncryptedStorage.getItem('user_id');

    if (accessToken) {
      // eslint-disable-next-line no-console
      console.log(accessToken);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      setAuthState(prev => ({
        ...prev,
        accessToken,
        authenticated: true,
      }));

      if (userId) {
        setAuthState(prev => ({
          ...prev,
          user: {
            id: parseInt(userId, 10),
          },
        }));
      }
    } else {
      setAuthState(prev => ({
        ...prev,
        authenticated: false,
      }));
    }
  };

  async function register({
    name,
    email,
    password,
  }: RegisterParams): Promise<RegisterResponse | GeneralErrorResponse> {
    try {
      setIsLoading(true);
      const response: RegisterResponse = await apiCall({
        method: 'POST',
        endpoint: '/auth/register',
        data: {
          name,
          email,
          password,
        },
      });

      await EncryptedStorage.setItem(
        'user_id',
        response.data.user_id.toString(),
      );

      setAuthState({
        accessToken: null,
        user: {
          id: response.data.user_id,
        },
        authenticated: false,
      });
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (axios.isAxiosError(axiosError)) {
        if (axiosError.response) {
          return axiosError.response.data as GeneralErrorResponse;
        }
      }

      return {
        status: 'failed',
        message: 'Periksa Koneksi Internet Anda',
      } as GeneralErrorResponse;
    } finally {
      setIsLoading(false);
    }
  }

  const login = useCallback(async ({ email, password }: LoginParams) => {
    try {
      setIsLoading(true);
      const response: LoginResponse = await apiCall({
        method: 'POST',
        endpoint: '/auth/login',
        data: {
          email,
          password,
        },
      });

      const accessToken = response.data;

      await EncryptedStorage.setItem('samcash_access_token', accessToken);

      console.log('Berhasil login');
      setAuthState(prev => ({
        ...prev,
        accessToken,
        authenticated: true,
      }));
    } catch (error) {
      const axiosError = error as AxiosError<
        GeneralErrorResponse | LoginResponseNeedVerifyOtp
      >;

      if (axios.isAxiosError(axiosError)) {
        if (axiosError.response) {
          const responseData = axiosError.response.data;

          // Check if the error response is of type LoginResponseNeedVerifyOtp
          if (
            'data' in responseData &&
            responseData?.data?.is_verify !== undefined
          ) {
            const data: LoginResponseNeedVerifyOtp = {
              status: responseData.status,
              message: responseData.message,
              data: {
                is_verify: responseData.data.is_verify,
              },
            };
            return data;
          }
          const data: GeneralErrorResponse = {
            status: responseData.status,
            message: responseData.message,
          };

          return data;
        }
      }

      return {
        status: 'failed',
        message: 'Terjadi Kesalahan',
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function verifyOtp({ userId, otpCode }: VerifyOtp) {
    try {
      setIsLoading(true);
      const response = await apiCall({
        method: 'POST',
        endpoint: '/auth/verifikasi-otp',
        data: {
          user_id: userId,
          otp_code: otpCode,
        },
      });

      console.log(response);

      if (response.data.accessToken) {
        setAuthState(prev => ({
          ...prev,
          accessToken: response.data.accessToken,
          authenticated: true,
        }));
      }
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axios.isAxiosError(axiosError)) {
        if (axiosError.response && axiosError.response?.data) {
          const data = axiosError.response.data as GeneralErrorResponse;

          return {
            status: data.status,
            message: data.message,
          };
        }
      }

      return {
        status: 'failed',
        message: 'Terjadi Kesalahan',
      } as GeneralErrorResponse;
    } finally {
      setIsLoading(false);
    }
  }

  async function resendOtp({ userId }: { userId: number }) {
    try {
      setIsLoading(true);
      const response = await apiCall({
        method: 'POST',
        endpoint: '/auth/resend-otp',
        data: {
          user_id: userId,
        },
      });

      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      setIsLoading(true);
      setAuthState({
        accessToken: null,
        user: {
          id: null,
        },
        authenticated: false,
      });

      await EncryptedStorage.removeItem('samcash_access_token');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const value: AuthProps = useMemo(
    () => ({
      isLoading,
      authState,
      onLogout: logout,
      onLogin: login,
      onRegister: register,
      onVerifyOtp: verifyOtp,
      onResendOtp: resendOtp,
    }),
    [authState, login, isLoading],
  );

  if (authState.authenticated === null) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {isLoading && <ProgressBarLoading />}
      {children}
    </AuthContext.Provider>
  );
}
