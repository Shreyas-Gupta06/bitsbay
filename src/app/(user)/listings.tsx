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

    return yearMatch;
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
      <div className="flex justify-center items-center mb-4 px-4">
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
              setFilter(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm text-[#123924] sm:px-3 sm:py-2"
          >
            <option value="all">All</option>
            <option value="1st yr">1st Year</option>
            <option value="2nd yr">2nd Year</option>
            <option value="3rd yr">3rd Year</option>
            <option value="4th yr">4th Year</option>
          </select>
        </div>
      </div>

      <main className="flex-1 bg-white px-4 py-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(250px,_auto)]">
        {paginatedListings.map((listing, index) => (
          <div
            key={listing.id}
            className={`rounded-lg shadow-md p-3 sm:p-4 flex flex-col ${
              window.innerWidth > 768 ? "h-[450px]" : "h-[500px]"
            } overflow-hidden ${
              index % 2 === 0 ? "bg-[#deeaf7]" : "bg-[#c5dafc]"
            }`}
          >
            <div className="flex-1 overflow-hidden">
              <h2 className="text-[#123924] text-lg sm:text-xl font-semibold flex items-center justify-between">
                {listing.title}
                {listing.price && (
                  <span className="text-black text-lg sm:text-xl font-medium flex items-center">
                    <span className="material-icons">₹</span>
                    {listing.price}
                  </span>
                )}
              </h2>
              <p
                className={`text-gray-600 ${
                  window.innerWidth > 768
                    ? "text-xs sm:text-base"
                    : listing.description.length < 150
                    ? "text-lg"
                    : listing.description.length < 200
                    ? "text-base"
                    : "text-sm"
                } overflow-hidden break-words`}
              >
                {listing.description}
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                {listing.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`bg-green-200 text-green-800 ${
                      window.innerWidth > 768
                        ? "text-[12px] px-3 py-1"
                        : "text-[14px] px-3 py-1"
                    } rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
                {listing.year && (
                  <span
                    className={`bg-blue-200 text-blue-800 ${
                      window.innerWidth > 768
                        ? "text-[12px] px-3 py-1"
                        : "text-[14px] px-3 py-1"
                    } rounded-full`}
                  >
                    {listing.year}
                  </span>
                )}
                {listing.negotiable && (
                  <span
                    className={`bg-yellow-200 text-yellow-800 ${
                      window.innerWidth > 768
                        ? "text-[12px] px-3 py-1"
                        : "text-[14px] px-3 py-1"
                    } rounded-full`}
                  >
                    Negotiable
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[#123924] text-sm sm:text-base font-medium">
                  {listing.name}
                </span>
                <span
                  className={`${
                    listing.status === "available"
                      ? "bg-green-800 text-white"
                      : "bg-red-200 text-red-800"
                  } ${
                    window.innerWidth > 768
                      ? "text-[12px] px-3 py-1"
                      : "text-[14px] px-3 py-1"
                  } rounded-full`}
                >
                  {listing.status === "available" ? "Available" : "Sold"}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <a
                  href={`https://api.whatsapp.com/send?phone=91${listing.phone}`}
                  className="bg-green-500 text-white text-sm sm:text-base font-medium hover:bg-green-600 flex items-center justify-center gap-2 px-3 py-2 rounded-md"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-5 h-5"
                  />
                  Chat with +91{listing.phone}
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
