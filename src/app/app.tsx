import { Navigate, useLocation, Routes, Route } from "react-router-dom";
import { isLoggedIn } from "../utils/common";
import LoginPage from "./(auth)/login";
import Home from "./(user)/home";
import Developers from "./(user)/developers"; // Import the Developers component
import PhoneNumber from "./(user)/phone_num";
import Profile from "./(user)/profile";
import ListingsPage from "./(user)/listings";

export default function App() {
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
