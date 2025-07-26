import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function PhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNumber = phoneNumber.trim();
    const numericPhone = parseInt(trimmedNumber, 10);

    if (!isNaN(numericPhone) && trimmedNumber.length === 10) {
      setErrorMessage("");

      try {
        const response = await api.put("/auth/profile/", {
          phone_number: numericPhone, // Send phone number as an integer
        });

        if (
          response.data &&
          response.data.phone_number === trimmedNumber &&
          response.data.id &&
          response.data.email
        ) {
          navigate("/user/home");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("Error updating phone number:", error);
        setErrorMessage("Failed to update phone number. Please try again.");
      }
    } else {
      setErrorMessage("Please enter a valid 10-digit phone number.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col font-[\'Intel One Mono\'] overflow-x-hidden">
      {/* Header */}
      <header className="w-full bg-[#123924] text-white flex items-center justify-between px-4 py-3">
        <h1 className="text-2xl font-bold text-center">BITSbay</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-white px-4 py-6 flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Enter your WhatsApp registered phone number:
          </label>
          <input
            id="phone"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white font-bold text-lg px-4 py-2 rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#123924] text-white text-center py-2">
        Made with ❤️ by 2137
      </footer>
    </div>
  );
}
