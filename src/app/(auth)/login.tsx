import { useEffect } from "react";
import campusImg from "../../assets/images/BITS-Pilani-campus-login.jpg";
import { BACKEND_URL } from "../../utils/common";
import axios from "axios";

declare global {
  interface Window {
    google: any;
  }
}

const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-jssdk")) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-jssdk";
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Google script"));
    document.body.appendChild(script);
  });
};

const GoogleLoginButton = () => {
  useEffect(() => {
    const initializeGoogleLogin = async () => {
      try {
        await loadGoogleScript();

        if (!window.google) {
          console.error("Google Identity Services script not loaded.");
          return;
        }

        window.google.accounts.id.initialize({
          client_id:
            "552439940086-tiavhovc9mrifs6v4hr82bup22nsi4do.apps.googleusercontent.com", // Replace with your actual client ID
          callback: handleCredentialResponse,
        });

        const buttonContainer = document.getElementById("google-login-button");
        if (buttonContainer && buttonContainer.childElementCount === 0) {
          window.google.accounts.id.renderButton(buttonContainer, {
            theme: "outline",
            size: "large",
          });
        }
      } catch (error) {
        console.error("Error during Google login initialization:", error);
      }
    };

    initializeGoogleLogin();
  }, []);

  const handleCredentialResponse = async (response: any) => {
    const idToken = response.credential;
    console.log("ID Token from Google:", idToken);

    try {
      const backendResponse = await axios.post(`${BACKEND_URL}/auth/google/`, {
        id_token: idToken,
      });

      const data = backendResponse.data;
      console.log("Backend tokens:", data);

      if (
        data.refresh &&
        data.access &&
        typeof data.has_phone_number === "boolean"
      ) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        console.log("Tokens stored in localStorage", data);

        if (data.has_phone_number) {
          window.location.href = "/user/home";
        } else {
          window.location.href = "/user/phone_num";
        }
      } else {
        throw new Error("Invalid response from backend");
      }
    } catch (err: any) {
      console.error("Backend error:", err);

      const errorContainer = document.getElementById("error-message");
      if (errorContainer) {
        if (!navigator.onLine) {
          errorContainer.textContent =
            "No internet connection. Please check your network.";
        } else if (err.response && err.response.status >= 500) {
          errorContainer.textContent = "Server error. Please try again later.";
        } else {
          errorContainer.textContent =
            "An unexpected error occurred. Please try again.";
        }
        errorContainer.style.color = "red";
      }
    }
  };

  return (
    <div>
      <div id="google-login-button"></div>
      <div id="error-message" style={{ marginTop: "10px" }}></div>
    </div>
  );
};

export default function LoginPage() {
  return (
    <div className='w-full min-h-screen bg-[#184434] flex flex-col justify-between items-center font-["Intel One Mono"]'>
      {/* Top Image */}
      <div className="w-full h-[60vh] max-h-[60vh] overflow-hidden rounded-b-[2.5rem]">
        <img
          src={campusImg}
          alt="BITS Pilani Campus"
          className="w-full h-full object-cover object-top rounded-b-[2.5rem]"
          draggable={false}
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-2xl px-6 py-6 flex flex-col items-center text-center gap-6">
        <h1 className="text-white font-extrabold tracking-wide text-[clamp(1.8rem,4vw,3rem)] leading-snug">
          Welcome to <span className="text-white">BITSbay</span>
        </h1>
        <p className="text-gray-200 text-[clamp(1rem,2.2vw,1.25rem)] leading-relaxed">
          Your one stop solution for everything in Pilani
        </p>

        <GoogleLoginButton />
      </div>

      {/* Footer */}
      <div
        className="w-full pb-2 text-center text-white text-sm relative"
        style={{ top: "-10px" }}
      >
        Made with ❤️ by 2137
      </div>
    </div>
  );
}
