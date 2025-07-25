import { useState, useEffect } from "react";
import dummyListings from "../../utils/dummyData";
import UserLayout from "./layout/userLayout";
import { IonIcon } from "@ionic/react";
import { funnelOutline } from "ionicons/icons";

export default function ListingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(12); // 4 columns, 3 rows
      } else if (width >= 768) {
        setItemsPerPage(8); // 2 columns, 4 rows
      } else {
        setItemsPerPage(4); // 1 column, 4 rows
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const filteredListings =
    filter === "all"
      ? dummyListings
      : dummyListings.filter(
          (listing) =>
            listing.year &&
            listing.year.trim().toLowerCase() === filter.trim().toLowerCase()
        );

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <UserLayout>
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex items-center gap-2">
          <IonIcon icon={funnelOutline} className="w-6 h-6 text-[#123924]" />
          <span className="text-[#123924] font-medium">Filter:</span>
          <select
            value={filter}
            onChange={(e) => {
              console.log(`Selected filter: ${e.target.value}`);
              setFilter(e.target.value);
            }}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm text-[#123924]"
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
        {paginatedListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-[#f0f4f8] rounded-lg shadow-md p-3 sm:p-4 flex flex-col h-[250px] sm:h-[300px] overflow-hidden"
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
              <div className="mt-1 flex items-center gap-0.5 sm:gap-1">
                <span className="text-[#123924] text-[10px] sm:text-xs font-bold">
                  {listing.name}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1">
                <a
                  href={`https://api.whatsapp.com/send?phone=${listing.phone}`}
                  className="bg-green-500 text-white text-[10px] sm:text-xs font-medium hover:bg-green-600 flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 rounded-md"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-4 sm:w-5 h-4 sm:h-5"
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
        <button className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-800">
          {currentPage}
        </button>
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
