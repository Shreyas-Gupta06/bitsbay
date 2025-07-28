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

  function ProtectedRoute({ children }: { children: React.ReactNode }) {
    return isLoggedIn() ? children : <Navigate to="/auth/login" />;
  }

  return (
    <Routes>
      {/* Auth Layout */}
      <Route>
        <Route path="/auth/login" element={<LoginPage />} />
      </Route>

      {/* App Layout (only after login) */}
      <Route>
        <Route
          path="/user/developers"
          element={
            <ProtectedRoute>
              <Developers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/phone_num"
          element={
            <ProtectedRoute>
              <PhoneNumber />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/listings"
          element={
            <ProtectedRoute>
              <ListingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/mylistings"
          element={
            <ProtectedRoute>
              <MyListingsPage />
            </ProtectedRoute>
          }
        />
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
