import axios from 'axios';
import { BACKEND_URL } from '../utils/common';
import { logoutUser } from './logout'; // 🔁 Use centralized logout

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔄 Request Interceptor — Attach access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && config?.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Response Interceptor — Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post(
          `${BACKEND_URL}/auth/refresh-token/`,
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        logoutUser(); // ✅ call the centralized logout handler
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
