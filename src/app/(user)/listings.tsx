import React, { useState } from "react";
import UserLayout from "./layout/userLayout";

const ListingsPage = () => {
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
  const maxDescriptionLength = 240;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (charCount > maxDescriptionLength || !formData.title || !formData.year) {
      return;
    }
    // Simulate POST request (commented out)
    // fetch('/api/listings', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    //   headers: { 'Content-Type': 'application/json' },
    // });
    alert("Listing successfully posted!");
    setShowPopup(false);
  };

  return (
    <UserLayout className="no-scroll">
      <div className="listings-page bg-white">
        <div className="pt-4 flex flex-col items-start">
          <h1 className="text-4xl font-bold mb-6.5">My Listings</h1>
          <button
            className="add-listing-btn bg-green-700 text-white px-6 py-3 rounded shadow-lg hover:bg-green-300 hover:text-black text-xl ml-4.5 "
            onClick={() => setShowPopup(true)}
          >
            + Add Listing
          </button>
        </div>

        <div className="my-12 flex items-center w-full">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-6 text-gray-500 text-2xl">●</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 no-scroll">
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
      </div>
    </UserLayout>
  );
};

export default ListingsPage;
