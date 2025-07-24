import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import campusImg from "../../assets/images/BITS-Pilani-campus-login.jpg";
import googleLogo from "../../assets/images/google_logo.png";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async () => {
      setError(null);
      window.location.href = "/user/phone_num";
    },
  });

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

        <button
          onClick={() => {
            setError(null);
            googleLogin();
          }}
          className="flex items-center gap-3 bg-white text-[#184434] font-semibold px-6 py-3 text-[clamp(0.9rem,1.2vw,1.1rem)] rounded-lg shadow-md hover:opacity-90 active:scale-95 transition-transform duration-150"
        >
          <img src={googleLogo} alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
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
