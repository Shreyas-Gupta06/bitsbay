import { useState, useEffect } from "react";
import dummyListings from "../../utils/dummyData";
import { logoutUser } from "../../api/logout";
import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  listOutline,
  personOutline,
  logOutOutline,
} from "ionicons/icons";
import UserLayout from "./layout/userLayout";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4);

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

  const totalPages = Math.ceil(dummyListings.length / itemsPerPage);
  const paginatedListings = dummyListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <UserLayout>
      <div className="w-full min-h-screen flex flex-col font-[\'Intel One Mono\'] overflow-x-hidden">
        {/* Drawer */}
        <div
          className={`fixed inset-0 z-10 transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div
            className={`absolute inset-0 bg-white shadow-lg flex flex-col p-6 transition-transform duration-300 ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDrawerOpen(false)}
              className="self-start text-gray-600 text-3xl touchable-opacity"
            >
              ✖
            </button>
            <nav className="mt-6 flex flex-col gap-5 text-xl">
              <a
                href="/user/home"
                className="text-black font-bold text-2xl flex items-center gap-2"
              >
                <IonIcon icon={homeOutline} className="w-6 h-6" />
                Home
              </a>
              <a
                href="#"
                className="text-black font-bold text-2xl flex items-center gap-2"
              >
                <IonIcon icon={listOutline} className="w-6 h-6" />
                My Listings
              </a>
              <a
                href="/user/profile"
                className="text-black font-bold text-2xl flex items-center gap-2"
              >
                <IonIcon icon={personOutline} className="w-6 h-6" />
                Profile
              </a>
              <div className="mt-3 text-left">
                <a
                  href="#"
                  onClick={logoutUser}
                  className="bg-red-500 text-white font-bold text-xl px-4 py-2 rounded-md flex items-center gap-2 w-fit"
                >
                  <IonIcon icon={logOutOutline} className="w-6 h-6" />
                  Logout
                </a>
              </div>
              <div className="mt-10 text-left">
                <a
                  href="/user/developers"
                  className="text-green-600 font-bold text-5xl flex items-center gap-2"
                >
                  &lt;&gt;
                  <span className="text-green-600 font-bold text-xl">
                    Developers
                  </span>
                </a>
              </div>
            </nav>
            <footer className="mt-auto text-center">
              <span className="text-500 text-2xl">Made with ❤️ by 2137</span>
            </footer>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-white px-4 py-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(250px,_auto)]">
          {paginatedListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-[#f0f4f8] rounded-lg shadow-md p-4 sm:p-6 flex flex-col h-[250px] sm:h-[300px]"
            >
              <div className="flex-1">
                <h2 className="text-[#123924] text-md sm:text-lg font-semibold">
                  {listing.title}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm overflow-hidden text-ellipsis line-clamp-6">
                  {listing.description}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-0.5 sm:gap-1 mt-1 sm:mt-2">
                  {listing.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-200 text-green-800 text-xs sm:text-sm px-1 sm:px-2 py-0.5 sm:py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {listing.year && (
                    <span className="bg-blue-200 text-blue-800 text-xs sm:text-sm px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {listing.year}
                    </span>
                  )}
                  {listing.negotiable && (
                    <span className="bg-yellow-200 text-yellow-800 text-xs sm:text-sm px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      Negotiable
                    </span>
                  )}
                </div>
                <div className="mt-1 sm:mt-2 flex items-center gap-0.5 sm:gap-1">
                  <span className="text-[#123924] text-xs sm:text-sm font-bold">
                    {listing.name}
                  </span>
                </div>
                <div className="mt-1 sm:mt-2 flex items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${listing.phone}`}
                    className="bg-green-500 text-white text-xs sm:text-sm font-medium hover:bg-green-600 flex items-center gap-0.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md"
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

        {/* Pagination */}
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
      </div>
    </UserLayout>
  );
}
