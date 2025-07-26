import { useEffect } from "react";
import campusImg from "../../assets/images/BITS-Pilani-campus-login.jpg";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleLoginButton = () => {
  useEffect(() => {
    const initializeGoogleLogin = async () => {
      try {
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
    // try {
    //   const backendResponse = await fetch("https://your-backend.com/auth/", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ token: idToken }),
    //   });

    //   const data = await backendResponse.json();
    //   console.log("Backend tokens:", data);

    //   // Store access/refresh token if needed
    // } catch (err) {
    //   console.error("Backend error:", err);
    // }
  };

  return <div id="google-login-button"></div>;
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
