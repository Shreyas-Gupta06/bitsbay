import React, { useState, useEffect } from "react";
import UserLayout from "./layout/userLayout";
import api from "../../api/axios"; // Import the API utility
import { predefinedTags } from "../../utils/common";
import type { Listing } from "../../utils/common";

export default function MyListingsPage() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [addFormData, setAddFormData] = useState<{
    title: string;
    description: string;
    tags: string[];
    year: string;
    negotiable: boolean;
    price?: number;
  }>({
    title: "",
    description: "",
    tags: [],
    year: "",
    negotiable: false,
    price: undefined,
  });
  const [editFormData, setEditFormData] = useState<{
    id: string;
    title: string;
    description: string;
    tags: string[];
    year: string;
    negotiable: boolean;
    price?: number;
  }>({
    id: "",
    title: "",
    description: "",
    tags: [],
    year: "",
    negotiable: false,
    price: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [listings, setListings] = useState<Listing[]>([]);
  const [deletePopup, setDeletePopup] = useState<{
    show: boolean;
    id: string | null;
  }>({ show: false, id: null });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get(
          `/listings/my_listings/?page=${currentPage}`
        );
        const data = response.data;
        let listingsArray = [];
        if (Array.isArray(data)) {
          listingsArray = data;
        } else if (data && Array.isArray(data.results)) {
          listingsArray = data.results;
        } else if (data && typeof data === "object") {
          listingsArray = Object.keys(data)
            .filter((key) => key.startsWith("item_"))
            .map((key) => data[key]);
        }
        setListings(listingsArray);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        // console.error("Error fetching listings:", error);
        alert("An error occurred. Please logout and sign in again.");
      }
    };
    fetchListings();
  }, [currentPage]);

  const handleAddInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setAddFormData({
      ...addFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setEditFormData({
      ...editFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddTagSelection = (tag: string) => {
    setAddFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleEditTagSelection = (tag: string) => {
    setEditFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleAddYearSelection = (year: string) => {
    setAddFormData((prev) => ({
      ...prev,
      year,
    }));
  };

  const handleEditYearSelection = (year: string) => {
    setEditFormData((prev) => ({
      ...prev,
      year,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addFormData.title || !addFormData.year) {
      alert("Listing couldn't be added. Please try again.");
      return;
    }

    try {
      const payload: any = {
        title: addFormData.title,
        description: addFormData.description,
        tags: addFormData.tags.join(", "),
        year: addFormData.year,
        negotiable: addFormData.negotiable,
        price: addFormData.price,
      };

      const postResponse = await api.post("/listings/", payload);
      setListings((prev) => [...prev, postResponse.data]);
      alert("Listing successfully added!");
      setShowAddPopup(false);
      setAddFormData({
        title: "",
        description: "",
        tags: [],
        year: "",
        negotiable: false,
        price: undefined,
      });
      // Show loading animation and refresh after delay
      setIsRefreshing(true);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: any) {
      // Handle backend validation errors
      if (error.response && error.response.data && error.response.data.price) {
        const priceError = error.response.data.price[0];
        if (priceError.includes("greater than or equal to 0")) {
          alert("Price must be a positive value.");
        } else {
          alert("Invalid price format. Please enter a valid price.");
        }
      } else {
        alert("Listing couldn't be added. Please try again.");
      }
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
      // console.error("Error updating status:", error);
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
      setDeletePopup({ show: false, id: null });
      // Show loading animation and refresh after delay
      setIsRefreshing(true);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      // console.error("Error deleting listing:", error);
      alert("Failed to delete listing. Please try again.");
    }
    setDeletePopup({ show: false, id: null });
  };

  const handleEdit = (listing: Listing) => {
    // Ensure tags are properly parsed as an array
    const tagsArray = Array.isArray(listing.tags) 
      ? listing.tags 
      : typeof listing.tags === "string" 
        ? (listing.tags as string).split(",").map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
        : [];
        
    setEditFormData({
      id: listing.id,
      title: listing.title,
      description: listing.description,
      tags: tagsArray,
      year: listing.year,
      negotiable: listing.negotiable,
      price: listing.price,
    });
    setShowEditPopup(true);
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.title || !editFormData.year) {
      alert("Listing couldn't be updated. Please try again.");
      return;
    }

    try {
      const payload: any = {
        title: editFormData.title,
        description: editFormData.description,
        tags: editFormData.tags.join(", "),
        year: editFormData.year,
        negotiable: editFormData.negotiable,
        price: editFormData.price,
      };

      const response = await api.patch(`/listings/${editFormData.id}/`, payload);
      setListings((prev) =>
        prev.map((item) =>
          item.id === editFormData.id ? { ...item, ...response.data } : item
        )
      );
      alert("Listing updated successfully!");
      setShowEditPopup(false);
    } catch (error: any) {
      // Handle backend validation errors
      if (error.response && error.response.data && error.response.data.price) {
        const priceError = error.response.data.price[0];
        if (priceError.includes("greater than or equal to 0")) {
          alert("Price must be a positive value.");
        } else {
          alert("Invalid price format. Please enter a valid price.");
        }
      } else {
        alert("Listing couldn't be updated. Please try again.");
      }
    }
  };

  return (
    <UserLayout>
      <div className="listings-page bg-white">
        {/* Centered header section */}
        <div className="pt-4 flex flex-col items-center mt-16 ml-auto mr-auto w-full bg-white z-10">
          <h1 className="text-4xl font-bold mb-6.5">My Listings</h1>
          <button
            className="add-listing-btn bg-green-700 text-white px-6 py-3 rounded shadow-lg hover:bg-green-300 hover:text-black text-xl"
            onClick={() => setShowAddPopup(true)}
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
              <div className="absolute top-2 right-2 flex flex-col gap-2 z-0">
                {!deletePopup.show && (
                  <>
                    <button
                      className="px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 text-xs font-medium shadow-sm transition-colors"
                      onClick={() => handleDelete(listing.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs font-medium shadow-sm transition-colors"
                      onClick={() => handleEdit(listing)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>

              {/* Status control at top left */}
              {!deletePopup.show && (
                <div className="absolute top-2 left-2 z-0">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-0.5">
                    <label className="block text-[10px] text-gray-600 mb-0.5">
                      Status:
                    </label>
                    <select
                      value={listing.status || "available"}
                      onChange={(e) =>
                        handleStatusChange(listing.id, e.target.value)
                      }
                      className="px-1 py-0.5 rounded-md text-[10px] font-medium border cursor-pointer bg-gray-200"
                      style={{ maxHeight: "80px" }}
                    >
                      <option value="available" className="bg-gray-200">
                        Available
                      </option>
                      <option value="sold" className="bg-gray-200">
                        Sold
                      </option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-hidden flex flex-col mt-12">
                <h2 className="text-[#123924] text-lg sm:text-xl font-semibold flex items-center justify-between">
                  {listing.title}
                  {listing.price && (
                    <span className="text-black text-lg sm:text-xl font-medium flex items-center">
                      <span className="material-icons">₹</span>
                      {listing.price}
                    </span>
                  )}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm overflow-hidden break-words line-clamp-4 mb-2">
                  {listing.description.slice(0, 150)}
                </p>
                {/* Tags in one line */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {/* Tags */}
                  {(Array.isArray(listing.tags)
                    ? listing.tags
                    : typeof listing.tags === "string"
                    ? (listing.tags as string).split(",").map((t) => t.trim())
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
                        listing.status.toLowerCase() === "available"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {listing.status.charAt(0).toUpperCase() +
                        listing.status.slice(1)}
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

        {showAddPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 no-scroll z-50">
            <div className="bg-[#f0f4f8] p-6 rounded shadow-lg text-[#123924] max-w-[90%] max-h-[90%] overflow-auto">
              <form onSubmit={handleSubmit}>
                <label className="block mb-4 text-lg text-[#123924]">
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={addFormData.title}
                    onChange={handleAddInputChange}
                    className="border rounded px-2 py-1 w-full bg-white text-[#123924]"
                    required
                  />
                </label>
                <label className="block mb-4 text-lg text-[#123924]">
                  Description:
                  <textarea
                    name="description"
                    value={addFormData.description}
                    onChange={handleAddInputChange}
                    className="border rounded px-2 py-1 w-full bg-white text-[#123924]"
                    required
                  />
                </label>
                <label className="block mb-4 text-lg text-[#123924]">
                  Price (optional):
                  <input
                    type="number"
                    name="price"
                    value={addFormData.price || ""}
                    onChange={handleAddInputChange}
                    className="border rounded px-2 py-1 w-full bg-white text-[#123924]"
                  />
                </label>
                <div className="tags mb-6">
                  <p className="text-[#123924]">Select Tags:</p>
                  {predefinedTags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      className={`px-2 py-1 rounded-full border mx-2 mb-2 ${
                        addFormData.tags.includes(tag)
                          ? "bg-yellow-500 text-black"
                          : "bg-[#f0f4f8] text-[#123924]"
                      }`}
                      onClick={() => handleAddTagSelection(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="year-tags mb-6">
                  <p className="text-[#123924]">
                    Select Year you are selling to:
                  </p>
                  {["1st yr", "2nd yr", "3rd yr", "4th yr"].map((year) => (
                    <button
                      type="button"
                      key={year}
                      className={`px-2 py-1 rounded-full border mx-2 mb-2 ${
                        addFormData.year === year
                          ? "bg-blue-300 text-black"
                          : "bg-[#f0f4f8] text-[#123924]"
                      }`}
                      onClick={() => handleAddYearSelection(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <label className="mb-4 text-lg text-[#123924] flex items-center">
                  Negotiable:
                  <input
                    type="checkbox"
                    name="negotiable"
                    checked={addFormData.negotiable}
                    onChange={handleAddInputChange}
                    className="ml-2 w-6 h-6 bg-white text-[#123924] mt-1"
                  />
                </label>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded bg-green-500 text-white text-lg ${
                    !addFormData.title ||
                    !addFormData.year
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-600"
                  }`}
                  disabled={
                    !addFormData.title ||
                    !addFormData.year
                  }
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="ml-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 text-lg"
                  onClick={() => setShowAddPopup(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {showEditPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 no-scroll z-50">
            <div className="bg-[#f0f4f8] p-6 rounded shadow-lg text-[#123924] max-w-[90%] max-h-[90%] overflow-auto">
              <form onSubmit={handleSubmitEdit}>
                <label className="block mb-4 text-lg text-[#123924]">
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditInputChange}
                    className="border rounded px-2 py-1 w-full bg-white text-[#123924]"
                    required
                  />
                </label>
                <label className="block mb-4 text-lg text-[#123924]">
                  Description:
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditInputChange}
                    className="border rounded px-2 py-1 w-full bg-white text-[#123924]"
                    required
                  />
                </label>
                <label className="block mb-4 text-lg text-[#123924]">
                  Price (optional):
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price || ""}
                    onChange={handleEditInputChange}
                    className="border rounded px-2 py-1 w-full bg-white text-[#123924]"
                  />
                </label>
                <div className="tags mb-6">
                  <p className="text-[#123924]">Select Tags:</p>
                  {predefinedTags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      className={`px-2 py-1 rounded-full border mx-2 mb-2 ${
                        editFormData.tags.includes(tag)
                          ? "bg-yellow-500 text-black"
                          : "bg-[#f0f4f8] text-[#123924]"
                      }`}
                      onClick={() => handleEditTagSelection(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="year-tags mb-6">
                  <p className="text-[#123924]">
                    Select Year you are selling to:
                  </p>
                  {["1st yr", "2nd yr", "3rd yr", "4th yr"].map((year) => (
                    <button
                      type="button"
                      key={year}
                      className={`px-2 py-1 rounded-full border mx-2 mb-2 ${
                        editFormData.year === year
                          ? "bg-blue-300 text-black"
                          : "bg-[#f0f4f8] text-[#123924]"
                      }`}
                      onClick={() => handleEditYearSelection(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <label className="mb-4 text-lg text-[#123924] flex items-center">
                  Negotiable:
                  <input
                    type="checkbox"
                    name="negotiable"
                    checked={editFormData.negotiable}
                    onChange={handleEditInputChange}
                    className="ml-2 w-6 h-6 bg-white text-[#123924] mt-1"
                  />
                </label>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded bg-green-500 text-white text-lg ${
                    !editFormData.title ||
                    !editFormData.year
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-600"
                  }`}
                  disabled={
                    !editFormData.title ||
                    !editFormData.year
                  }
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="ml-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 text-lg"
                  onClick={() => setShowEditPopup(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {deletePopup.show && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 no-scroll z-50">
            <div className="bg-[#f0f4f8] p-6 rounded shadow-lg text-[#123924]">
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

        {/* Loading overlay during refresh */}
        {isRefreshing && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
              <p className="text-lg text-gray-700">Refreshing...</p>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
