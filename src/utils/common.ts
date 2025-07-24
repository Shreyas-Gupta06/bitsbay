export const BACKEND_URL = "https://your-backend.com/api" // Replace with your actual backend

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
