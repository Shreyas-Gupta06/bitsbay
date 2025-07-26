import React, { useState, useEffect } from "react";
import UserLayout from "./layout/userLayout";
import api from "../../api/axios"; // Import the API utility
import type { Listing } from "../../utils/common";

export default function MyListingsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    tags: string[];
    year: string;
    negotiable: boolean;
  }>({
    title: "",
    description: "",
    tags: [],
    year: "",
    negotiable: false,
  });
  const [charCount, setCharCount] = useState(0);
  const maxDescriptionLength = 200;
  const [listings, setListings] = useState<Listing[]>([]);
  const [deletePopup, setDeletePopup] = useState<{
    show: boolean;
    id: string | null;
  }>({ show: false, id: null });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get("/listings/");
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    if (name === "description") {
      setCharCount(value.length);
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTagSelection = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleYearSelection = (year: string) => {
    setFormData((prev) => ({
      ...prev,
      year,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (charCount > maxDescriptionLength || !formData.title || !formData.year) {
      alert("Listing couldn't be added. Please try again.");
      return;
    }

    try {
      // Fetch user profile data
      const profileResponse = await api.get("/auth/profile/");
      const { first_name, last_name, phone_number } = profileResponse.data;

      // Send POST request to add listing
      const postResponse = await api.post("/listings/", {
        name: `${first_name} ${last_name}`,
        phone: phone_number,
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
        year: formData.year,
        negotiable: formData.negotiable,
      });

      // Add the new listing to the list
      setListings((prev) => [...prev, postResponse.data]);

      alert("Listing successfully added!");
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Listing couldn't be added. Please try again.");
    }
  };

  const handleDelete = (id: string) => {
    setDeletePopup({ show: true, id });
  };

  const confirmDelete = () => {
    setListings((prev) =>
      prev.filter((listing) => listing.id !== deletePopup.id)
    );
    setDeletePopup({ show: false, id: null });
    alert("Listing deleted successfully!");
    // Simulate DELETE request
    // fetch(`/api/user/listings/${deletePopup.id}`, { method: 'DELETE' });
  };

  return (
    <UserLayout>
      <div className="listings-page bg-white">
        {/* Centered header section */}
        <div className="pt-4 flex flex-col items-center mt-16 ml-auto mr-auto w-full bg-white z-10">
          <h1 className="text-4xl font-bold mb-6.5">My Listings</h1>
          <button
            className="add-listing-btn bg-green-700 text-white px-6 py-3 rounded shadow-lg hover:bg-green-300 hover:text-black text-xl"
            onClick={() => setShowPopup(true)}
          >
            + Add Listing
          </button>
        </div>

        {/* Centered divider section */}
        <div className="my-6 flex items-center w-full mt-6 ml-auto mr-auto bg-white z-10">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-6 text-gray-500 text-2xl">●</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Listings section below divider */}
        <div className="relative mt-6 flex justify-center flex-wrap gap-4">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-[#f0f4f8] rounded-lg shadow-md p-3 sm:p-4 h-[250px] sm:h-[300px] overflow-hidden w-[300px] mx-2"
            >
              <div className="flex-1 overflow-hidden">
                <h2 className="text-[#123924] text-sm sm:text-md font-semibold">
                  {listing.title}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm overflow-hidden text-ellipsis line-clamp-6">
                  {listing.description.slice(0, 200)}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-0.5 sm:gap-1 mt-1">
                  {listing.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-200 text-green-800 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {listing.year && (
                    <span className="bg-blue-200 text-blue-800 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {listing.year}
                    </span>
                  )}
                  {listing.negotiable && (
                    <span className="bg-yellow-200 text-yellow-800 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      Negotiable
                    </span>
                  )}
                </div>
                <button
                  className="mt-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                  onClick={() => handleDelete(listing.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 no-scroll z-50">
            <div className="bg-gray-800 p-6 rounded shadow-lg text-white">
              <form onSubmit={handleSubmit}>
                <label className="block mb-4 text-lg text-white">
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full bg-gray-700 text-white"
                    required
                  />
                </label>
                <label className="block mb-4 text-lg text-white">
                  Description:
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength={maxDescriptionLength}
                    className="border rounded px-2 py-1 w-full bg-gray-700 text-white"
                    required
                  />
                  <p
                    className={
                      charCount > maxDescriptionLength
                        ? "text-red-500"
                        : "text-gray-300"
                    }
                  >
                    {charCount}/{maxDescriptionLength} characters
                  </p>
                </label>
                <div className="tags mb-4">
                  <p className="text-white">Select Tags:</p>
                  {[
                    "book",
                    "notes",
                    "slides",
                    "pyqs",
                    "all tables (thermo, pns)",
                    "lab coat",
                    "calculator",
                  ].map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      className={`px-2 py-1 rounded-full border mx-2 ${
                        formData.tags.includes(tag)
                          ? "bg-yellow-500 text-black"
                          : "bg-gray-700 text-white"
                      }`}
                      onClick={() => handleTagSelection(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="year-tags mb-4">
                  <p className="text-white">Select Year you are selling to:</p>
                  {["1st yr", "2nd yr", "3rd yr", "4th yr"].map((year) => (
                    <button
                      type="button"
                      key={year}
                      className={`px-2 py-1 rounded-full border mx-2 ${
                        formData.year === year
                          ? "bg-blue-300 text-black"
                          : "bg-gray-700 text-white"
                      }`}
                      onClick={() => handleYearSelection(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <label className="mb-4 text-lg text-white flex items-center">
                  Negotiable:
                  <input
                    type="checkbox"
                    name="negotiable"
                    checked={formData.negotiable}
                    onChange={handleInputChange}
                    className="ml-2 w-6 h-6 bg-gray-700 text-white mt-1"
                  />
                </label>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded bg-green-500 text-white text-lg ${
                    charCount > maxDescriptionLength ||
                    !formData.title ||
                    !formData.year
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-600"
                  }`}
                  disabled={
                    charCount > maxDescriptionLength ||
                    !formData.title ||
                    !formData.year
                  }
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="ml-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 text-lg"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {deletePopup.show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 no-scroll">
            <div className="bg-gray-800 p-6 rounded shadow-lg text-white">
              <p className="text-lg mb-4">Are you sure you want to delete?</p>
              <button
                className="px-4 py-2 rounded bg-green-500 text-white text-lg hover:bg-green-600"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="ml-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 text-lg"
                onClick={() => setDeletePopup({ show: false, id: null })}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
