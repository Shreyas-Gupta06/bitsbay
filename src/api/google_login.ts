// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { BACKEND_URL } from '@/utils/common';

// Store tokens in localStorage
// const storeTokens = (access: string, refresh: string) => {
//   localStorage.setItem('access_token', access);
//   localStorage.setItem('refresh_token', refresh);
// };

// Custom Google Auth function for use in login page
// export async function googleAuth(accessToken: string): Promise<{ success: boolean; errorMessage?: string }> {
//   try {
//     const res = await axios.post(
//       `${BACKEND_URL}/auth/`,
//       { token: accessToken },
//       { headers: { 'Content-Type': 'application/json' }, timeout: 7000 }
//     );
//     if (res.data?.tokens?.access && res.data?.tokens?.refresh) {
//       storeTokens(res.data.tokens.access, res.data.tokens.refresh);
//     }
//     return { success: true };
//   } catch (err: any) {
//     let message = 'Sign in failed.';
//     if (axios.isAxiosError(err)) {
//       if (err.code === 'ECONNABORTED') message = 'Request timed out.';
//       else if (!err.response) message = 'Network error.';
//       else if (err.response.status >= 500) message = 'Server error.';
//       else if (err.response.status === 401 || err.response.status === 400) message = 'Invalid credentials.';
//     }
//     return { success: false, errorMessage: message };
//   }
// }


