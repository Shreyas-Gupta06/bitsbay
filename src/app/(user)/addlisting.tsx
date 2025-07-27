import React, { useState } from "react";
import UserLayout from "./layout/userLayout";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

interface AddListingForm {
  title: string;
  description: string;
  tags: string[];
  year: string;
  negotiable: boolean;
  price: string;
}

export default function AddListingPage() {
  const [formData, setFormData] = useState<AddListingForm>({
    title: "",
    description: "",
    tags: [],
    year: "",
    negotiable: false,
    price: "",
  });
  const [charCount, setCharCount] = useState(0);
  const maxDescriptionLength = 1000;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate ? useNavigate() : (() => {});

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
    if (
      charCount > maxDescriptionLength ||
      !formData.title ||
      !formData.year
    ) {
      alert("Listing couldn't be added. Please try again.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.join(", "),
        price: formData.price ? parseInt(formData.price) : undefined,
      };
      await api.post("/listings/", payload);
      alert("Listing successfully added!");
      navigate("/user/mylistings");
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Listing couldn't be added. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-lg mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Listing</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4 text-lg text-black">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </label>
          <label className="block mb-4 text-lg text-black">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={maxDescriptionLength}
              className="border rounded px-2 py-1 w-full"
              required
            />
            <p
              className={
                charCount > maxDescriptionLength
                  ? "text-red-500"
                  : "text-gray-500"
              }
            >
              {charCount}/{maxDescriptionLength} characters
            </p>
          </label>
          <label className="block mb-4 text-lg text-black">
            Price (optional):
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              min="0"
            />
          </label>
          <div className="tags mb-4">
            <p className="text-black">Select Tags:</p>
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
                className={`px-2 py-1 rounded-full border mx-2 mb-2 ${
                  formData.tags.includes(tag)
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => handleTagSelection(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="year-tags mb-4">
            <p className="text-black">Select Year you are selling to:</p>
            {["1st yr", "2nd yr", "3rd yr", "4th yr"].map((year) => (
              <button
                type="button"
                key={year}
                className={`px-2 py-1 rounded-full border mx-2 mb-2 ${
                  formData.year === year
                    ? "bg-blue-300 text-black"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => handleYearSelection(year)}
              >
                {year}
              </button>
            ))}
          </div>
          <label className="mb-4 text-lg text-black flex items-center">
            Negotiable:
            <input
              type="checkbox"
              name="negotiable"
              checked={formData.negotiable}
              onChange={handleInputChange}
              className="ml-2 w-6 h-6 mt-1"
            />
          </label>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded bg-green-500 text-white text-lg mt-4 ${
              charCount > maxDescriptionLength ||
              !formData.title ||
              !formData.year ||
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green-600"
            }`}
            disabled={
              charCount > maxDescriptionLength ||
              !formData.title ||
              !formData.year ||
              loading
            }
          >
            {loading ? "Adding..." : "Add Listing"}
          </button>
        </form>
      </div>
    </UserLayout>
  );
} 