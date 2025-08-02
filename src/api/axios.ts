import axios from 'axios';
import { BACKEND_URL } from '../utils/common';
import { logoutUser } from './logout'; // Ensure logoutUser is correctly imported and used

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔄 Request Interceptor — Attach access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
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
        const refreshToken = localStorage.getItem('refresh_token');
        const res = await axios.post(
          `${BACKEND_URL}/auth/token/refresh/`,
          { refresh: refreshToken } // Send refresh token in the body
        );

        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);

        originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (err) {
        const errorAny = err as any;
        if (errorAny.response) {
        }
        // Show alert before logging out
        if (window.confirm("Unauthorized access. Please login again.")) {
          logoutUser();
        }
        return Promise.reject(err);
      }
    }

    if (error.response) {
    } else {
    }

    return Promise.reject(error);
  }
);

export default api;
