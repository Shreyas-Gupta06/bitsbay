// src/api/logout.js
import { googleLogout } from '@react-oauth/google';

export const logoutUser = () => {
  try {
    // Clear any local tokens (localStorage, zustand, etc.)
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');

    // Call Google logout (clears Google session)
    googleLogout();

    // Optionally, redirect to login page
    window.location.href = '/auth/login';
  } catch (err) {
    console.error('Logout failed:', err);
  }
};
