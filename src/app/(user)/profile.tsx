import React, { useState, useEffect } from "react";
import UserLayout from "./layout/userLayout";
import api from "../../api/axios";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/auth/profile/");
        setProfileData(response.data);
        setPhoneNumber(response.data.phone_number);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setErrorMessage("Failed to load profile information.");
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNumber = phoneNumber.trim();
    const numericPhone = parseInt(trimmedNumber, 10);

    if (!isNaN(numericPhone) && trimmedNumber.length === 10) {
      setErrorMessage("");

      try {
        const response = await api.put("/auth/profile/", {
          phone_number: numericPhone,
        });

        if (response.data && response.data.phone_number === trimmedNumber) {
          setSuccessMessage("Phone number updated successfully.");
          setProfileData({ ...profileData, phone_number: trimmedNumber });
          setIsButtonDisabled(true); // Disable the button
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

  const handleAddListing = async (listingData) => {
    try {
      const profileResponse = await api.get("/auth/profile/");
      const { first_name, last_name, phone_number } = profileResponse.data;

      const response = await api.post("/listings/", {
        ...listingData,
        name: `${first_name} ${last_name}`,
        phone: phone_number,
      });

      alert("Listing added successfully!");
      setListings((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Listing couldn't be added. Please try again.");
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
          <p className="text-gray-600 text-lg font-semibold">
            {profileData.first_name} {profileData.last_name}
          </p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            Email:
          </label>
          <p className="text-gray-600 text-lg font-semibold">
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
              className={`font-bold px-6 py-3 rounded-md text-xl ${
                isButtonDisabled
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={isButtonDisabled}
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
