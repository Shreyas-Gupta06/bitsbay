export const isLoggedIn = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (accessToken && refreshToken) {
    return true;
  } else {
    return false;
  }
};

export const BACKEND_URL = "https://books.enspire2025.in/api";

export interface Listing {
  id: string;
  name: string;
  title: string;
  description: string;
  tags: string[];
  negotiable: boolean;
  is_negotiable: boolean;
  phone: string;
  year: string;
  email: string;
  status: string;
  price?: number; // Optional price field
}

export const predefinedTags = [
  "book",
  "notes",
  "slides",
  "pyqs",
  "all tables (thermo & pns)",
  "lab coat",
  "calculator",
];
