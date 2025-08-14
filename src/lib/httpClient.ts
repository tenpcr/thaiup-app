import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_ENDPOINT } from '@env';
import * as tokenUtils from './../utils/token.utils';
import { store } from './../redux/store';
import { logout } from './../redux/actions/authActions';

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
};

const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
});

// ================== Refresh Token Queue ==================

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(promise => {
    error ? promise.reject(error) : promise.resolve(token);
  });
  failedQueue = [];
};

// ================== Request Interceptor ==================

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await tokenUtils.getToken('access-token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ================== Response Interceptor ==================

api.interceptors.response.use(
  response => response,
  async (error: any) => {
    const originalRequest: any = error.config;

    console.log("Res Status: ", error.response)

    if (
      error.response?.status === 401 &&
      error.response?.data?.error_code === 'INVALID_OR_EXPIRED_TOKEN' &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await tokenUtils.getToken('refresh-token');

        if (!refreshToken) {
          store.dispatch(logout());
          return Promise.reject(error);
        }

        const { data } = await axios.post(
          `${API_ENDPOINT}/mobile/auth/refresh-token`,
          {
            refreshToken: `Bearer ${refreshToken}`,
          },
        );

        const newAccessToken = data?.data?.access_token;
        if (!newAccessToken) throw new Error('No access token returned');

        await tokenUtils.setToken('access-token', newAccessToken);

        console.log("newAccessToken ", newAccessToken )

        processQueue(null, newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export const httpClient = api;
