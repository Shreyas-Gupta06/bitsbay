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
      console.log("Request being made:");
      console.log("Access token attached:", accessToken);
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
        console.log("Refresh token being sent:", refreshToken);
        const res = await axios.post(
          `${BACKEND_URL}auth/token/refresh/`,
          { refresh: refreshToken } // Send refresh token in the body
        );

        console.log("Response from token refresh:", res.data);
        const newAccessToken = res.data.access_token;
        localStorage.setItem('access_token', newAccessToken);
        console.log("New access token stored:", newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        console.log("Retrying original request with new access token:", originalRequest);
        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        const errorAny = err as any;
        if (errorAny.response) {
          console.error('Backend refresh error response:', errorAny.response.data);
        }
        logoutUser(); // ✅ call the centralized logout handler
        return Promise.reject(err);
      }
    }

    if (error.response) {
      console.error('Backend API error:', error.response.data);
    } else {
      console.error('API error:', error);
    }

    return Promise.reject(error);
  }
);

export default api;
