export const isLoggedIn = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (accessToken && refreshToken) {
    console.log("Tokens are present.");
    return true;
  } else {
    console.log("Tokens are missing.");
    return false;
  }
};

export const BACKEND_URL = "http://shreyas.srijansahay05.in/api";

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
}

export const predefinedTags = [
  "book",
  "notes",
  "slides",
  "pyqs",
  "all tables (thermo, pns)",
  "lab coat",
  "calculator",
];
