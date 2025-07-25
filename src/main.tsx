import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  useLocation,
  Routes,
  Route,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { isLoggedIn } from "./utils/common";
import LoginPage from "./app/(auth)/login";
import Home from "./app/(user)/home";
import Developers from "./app/(user)/developers";
import PhoneNumber from "./app/(user)/phone_num";
import Profile from "./app/(user)/profile";
import ListingsPage from "./app/(user)/listings";

// TODO: Replace with your actual Google OAuth Client ID
const GOOGLE_CLIENT_ID =
  "552439940086-tiavhovc9mrifs6v4hr82bup22nsi4do.apps.googleusercontent.com";

function App() {
  const location = useLocation();

  // Redirect logic
  if (location.pathname === "/") {
    return isLoggedIn() ? (
      <Navigate to="/user/home" />
    ) : (
      <Navigate to="/auth/login" />
    );
  }

  return (
    <Routes>
      {/* Auth Layout */}
      <Route>
        <Route path="/auth/login" element={<LoginPage />} />
      </Route>

      {/* App Layout (only after login) */}
      <Route>
        <Route path="/user/developers" element={<Developers />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/phone_num" element={<PhoneNumber />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/listings" element={<ListingsPage />} />
        {/* other protected routes */}
      </Route>
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
