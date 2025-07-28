import { useState, useEffect } from "react";
import api from "../../api/axios";
import UserLayout from "./layout/userLayout";
import { IonIcon } from "@ionic/react";
import { funnelOutline } from "ionicons/icons";
import type { Listing } from "../../utils/common";
import { predefinedTags } from "../../utils/common";

export default function ListingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get(`/listings/?page=${currentPage}`);
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

  const filteredListings = listings.filter((listing) => {
    const yearMatch =
      filter === "all" ||
      (listing.year &&
        listing.year.trim().toLowerCase() === filter.trim().toLowerCase());

    const statusMatch =
      statusFilter === "all" ||
      (listing.status &&
        listing.status.toLowerCase() === statusFilter.toLowerCase());

    return yearMatch && statusMatch;
  });

  const paginatedListings = filteredListings.map((listing) => {
    const matchedTags = predefinedTags.filter((tag) =>
      listing.tags.includes(tag)
    );
    return {
      ...listing,
      tags: matchedTags,
    };
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <UserLayout>
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <IonIcon
              icon={funnelOutline}
              className="w-4 h-4 text-[#123924] sm:w-6 sm:h-6"
            />
            <span className="text-[#123924] font-medium text-sm sm:text-base">
              Year Filter:
            </span>
            <select
              value={filter}
              onChange={(e) => {
                // console.log(`Selected filter: ${e.target.value}`);
                setFilter(e.target.value);
              }}
              className="border border-gray-300 rounded-md px-1 py-0.5 text-[10px] sm:text-xs text-[#123924] sm:px-2 sm:py-1"
            >
              <option value="all">All</option>
              <option value="1st yr">1st Year</option>
              <option value="2nd yr">2nd Year</option>
              <option value="3rd yr">3rd Year</option>
              <option value="4th yr">4th Year</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#123924] font-medium text-sm sm:text-base">
              Status Filter:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => {
                // console.log(`Selected status filter: ${e.target.value}`);
                setStatusFilter(e.target.value);
              }}
              className="border border-gray-300 rounded-md px-1 py-0.5 text-[10px] sm:text-xs text-[#123924] sm:px-2 sm:py-1"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      <main className="flex-1 bg-white px-4 py-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(250px,_auto)]">
        {paginatedListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-[#f0f4f8] rounded-lg shadow-md p-3 sm:p-4 flex flex-col h-[250px] sm:h-[300px] overflow-hidden"
          >
            <div className="flex-1 overflow-hidden">
              <h2 className="text-[#123924] text-sm sm:text-lg font-semibold">
                {listing.title}
              </h2>
              <p className="text-gray-600 text-xs sm:text-base overflow-hidden break-words line-clamp-6">
                {listing.description.slice(0, 200)}
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-0.5 sm:gap-2 mt-1">
                {listing.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-green-200 text-green-800 text-[10px] sm:text-sm px-1 sm:px-3 py-0.5 sm:py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {listing.year && (
                  <span className="bg-blue-200 text-blue-800 text-[10px] sm:text-sm px-1 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    {listing.year}
                  </span>
                )}
                {listing.negotiable && (
                  <span className="bg-yellow-200 text-yellow-800 text-[10px] sm:text-sm px-1 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    Negotiable
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-0.5 sm:gap-2">
                <span className="text-[#123924] text-[10px] sm:text-sm font-bold">
                  {listing.name}
                </span>
                {listing.status && (
                  <span
                    className={`text-[10px] sm:text-sm px-2 py-0.5 rounded-md font-medium shadow-sm ${
                      listing.status.toLowerCase() === "available"
                        ? "bg-green-700 text-white" // Slightly different green
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {listing.status.charAt(0).toUpperCase() +
                      listing.status.slice(1)}
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-1">
                <a
                  href={`https://api.whatsapp.com/send?phone=${listing.phone}`}
                  className="bg-green-500 text-white text-[10px] sm:text-sm font-medium hover:bg-green-600 flex items-center gap-1 px-2 sm:px-4 py-1 sm:py-2 rounded-md"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-4 sm:w-6 h-4 sm:h-6"
                  />
                  Contact {listing.phone} on WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </main>

      <div className="flex gap-2 mt-4 mb-4 justify-center items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
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
          onClick={() => handlePageChange(currentPage + 1)}
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
    </UserLayout>
  );
}
