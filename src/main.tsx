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
import { isLoggedIn } from "./utils/common";
import LoginPage from "./app/(auth)/login";
import Home from "./app/(user)/home";
import Developers from "./app/(user)/developers";
import PhoneNumber from "./app/(user)/phone_num";
import Profile from "./app/(user)/profile";
import ListingsPage from "./app/(user)/listings";
import MyListingsPage from "./app/(user)/mylistings";

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
        <Route path="/user/mylistings" element={<MyListingsPage />} />
        {/* other protected routes */}
      </Route>
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
