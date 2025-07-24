import React, { useState } from "react";
import UserLayout from "./layout/userLayout";
import { logoutUser } from "../../api/logout";

export default function Profile() {
  // Dummy data for testing
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
  });
  const [phoneNumber, setPhoneNumber] = useState(profileData.phone);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNumber = phoneNumber.trim();
    const numericPhone = parseInt(trimmedNumber, 10);

    if (!isNaN(numericPhone) && trimmedNumber.length === 10) {
      setErrorMessage("");
      setSuccessMessage("New number saved successfully.");
      // Commented backend post logic
      // fetch("/api/update-phone", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ phone: numericPhone }),
      // });

      setProfileData({ ...profileData, phone: trimmedNumber });
    } else {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      setSuccessMessage("");
    }
  };

  return (
    <UserLayout className="no-scroll">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#123924]">Profile Page</h1>
        <p className="text-gray-600 text-lg mt-4">
          Manage your profile information here.
        </p>
      </div>
      <div className="w-full max-w-md mx-auto mt-8">
        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            Name:
          </label>
          <p className="text-gray-600 text-2xl font-semibold">
            {profileData.name}
          </p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            Email:
          </label>
          <p className="text-gray-600 text-2xl font-semibold">
            {profileData.email}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 text-xl font-bold mb-2">
            Phone Number:
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-600 text-xl"
            >
              Save
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm mt-2">{successMessage}</p>
          )}
        </form>
      </div>
    </UserLayout>
  );
}
