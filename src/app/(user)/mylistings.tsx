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
  const maxDescriptionLength = 1000;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [listings, setListings] = useState<Listing[]>([]);
  const [deletePopup, setDeletePopup] = useState<{
    show: boolean;
    id: string | null;
  }>({ show: false, id: null });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get(`/listings/my_listings/?page=${currentPage}`);
        console.log("My Listings API response:", response.data); // <-- Added for debugging
        const data = response.data;
        let listingsArray = [];
        if (Array.isArray(data)) {
          listingsArray = data;
        } else if (data && Array.isArray(data.results)) {
          listingsArray = data.results;
        } else if (data && typeof data === "object") {
          listingsArray = Object.keys(data)
            .filter(key => key.startsWith("item_"))
            .map(key => data[key]);
        }
        setListings(listingsArray);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, [currentPage]);

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
      // Prepare payload according to API docs
      const payload: any = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.join(", "),
        year: formData.year,
        negotiable: formData.negotiable,
      };
      if ((formData as any).price) payload.price = parseInt((formData as any).price, 10);

      const postResponse = await api.post("/listings/", payload);
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/listings/${id}/`, { status: newStatus });
      setListings((prev) =>
        prev.map((listing) =>
          listing.id === id ? { ...listing, status: newStatus } : listing
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const confirmDelete = async () => {
    if (!deletePopup.id) return;
    try {
      await api.delete(`/listings/${deletePopup.id}/`);
      setListings((prev) =>
        prev.filter((listing) => listing.id !== deletePopup.id)
      );
      alert("Listing deleted successfully!");
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Failed to delete listing. Please try again.");
    }
    setDeletePopup({ show: false, id: null });
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
              className="bg-[#f0f4f8] rounded-lg shadow-md p-3 sm:p-4 h-[300px] sm:h-[350px] overflow-hidden w-[300px] mx-2 flex flex-col justify-between relative"
            >
              {/* Action buttons at top */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                {!deletePopup.show && (
                  <button
                    className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm font-medium shadow-sm transition-colors"
                    onClick={() => handleDelete(listing.id)}
                  >
                    Delete
                  </button>
                )}
              </div>

              {/* Status control at top left */}
              {!deletePopup.show && (
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                    <label className="block text-xs text-gray-600 mb-1">Status:</label>
                    <select
                      value={listing.status || 'available'}
                      onChange={(e) => handleStatusChange(listing.id, e.target.value)}
                      className={`px-2 py-1 rounded-md text-xs font-medium border-0 cursor-pointer ${
                        (listing.status || 'available').toLowerCase() === 'available'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                    </select>
                  </div>
                </div>
              )}
              <div className="flex-1 overflow-hidden flex flex-col mt-12">
                <h2 className="text-[#123924] text-sm sm:text-md font-semibold mb-1">
                  {listing.title}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm overflow-hidden text-ellipsis line-clamp-4 mb-2">
                  {listing.description.slice(0, 150)}
                </p>
                {/* Tags in one line */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {/* Tags */}
                  {(Array.isArray(listing.tags)
                    ? listing.tags
                    : typeof listing.tags === 'string'
                      ? (listing.tags as string).split(',').map((t) => t.trim())
                      : []
                  ).map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-green-200 text-green-800 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {/* Year */}
                  {listing.year && (
                    <span className="bg-blue-200 text-blue-800 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {listing.year}
                    </span>
                  )}
                  {/* Negotiable */}
                  {(listing.negotiable || listing.is_negotiable) && (
                    <span className="bg-yellow-200 text-yellow-800 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      Negotiable
                    </span>
                  )}
                </div>
                {/* Availability status in separate row */}
                {listing.status && (
                  <div className="flex justify-center mb-2">
                    <span 
                      className={`text-xs sm:text-sm px-3 py-1 rounded-lg font-semibold shadow-sm ${
                        listing.status.toLowerCase() === 'available' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </span>
                  </div>
                )}
              </div>
              {/* Email at the bottom */}
              {listing.email && (
                <div className="mt-2 flex items-center gap-1">
                  <span className="bg-purple-200 text-purple-800 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    {listing.email}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4 mb-4 justify-center items-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-green-500 text-white"
            }`}
          >
            ←
          </button>
          <span className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-800">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500"
                : "bg-green-500 text-white"
            }`}
          >
            →
          </button>
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
