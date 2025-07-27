import React from "react";
import { logoutUser } from "../../../api/logout";
import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  createOutline,
  personOutline,
  logOutOutline,
  addOutline,
} from "ionicons/icons";

export default function UserLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <div
      className={`w-full min-h-screen flex flex-col font-[\'Intel One Mono\'] overflow-x-hidden ${className}`}
    >
      {/* Header */}
      <header className="w-full bg-[#123924] text-white flex items-center justify-between px-4 py-3">
        <a href="/user/home" className="text-2xl font-bold text-center">
          BITSbay
        </a>
        <button
          onClick={() => setDrawerOpen(true)}
          className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full text-black text-2xl touchable-opacity"
        >
          ☰
        </button>
      </header>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-10 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div
          className={`absolute inset-0 bg-[#fffacd] shadow-lg flex flex-col p-4 transition-transform duration-300 ${
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
          <nav className="mt-4 flex flex-col gap-4 text-lg">
            <a
              href="/user/home"
              className="text-black font-bold text-xl flex items-center gap-2"
            >
              <IonIcon icon={homeOutline} className="w-5 h-5" />
              Home
            </a>
            <hr className="border-gray-300 w-full" />
            <a
              href="/user/listings"
              className="text-black font-bold text-xl flex items-center gap-2"
            >
              <IonIcon icon={createOutline} className="w-5 h-5" />
              Listings
            </a>
            <hr className="border-gray-300 w-full" />
            <a
              href="/user/mylistings"
              className="text-black font-bold text-xl flex items-center gap-2"
            >
              <IonIcon icon={createOutline} className="w-5 h-5" />
              My Listings
            </a>
            <hr className="border-gray-300 w-full" />
            <a
              href="/user/profile"
              className="text-black font-bold text-xl flex items-center gap-2"
            >
              <IonIcon icon={personOutline} className="w-5 h-5" />
              Profile
            </a>
            <hr className="border-gray-300 w-full" />
            <div className="mt-0 text-left">
              <a
                href="#"
                onClick={logoutUser}
                className="bg-red-500 text-white font-bold text-lg px-4 py-2 rounded-md flex items-center gap-2 w-fit"
              >
                <IonIcon icon={logOutOutline} className="w-5 h-5" />
                Logout
              </a>
            </div>
            <hr className="border-gray-300 w-full" />
            <div className="mt-0 text-left">
              <a
                href="/user/developers"
                className="text-green-600 font-bold text-4xl flex items-center gap-2"
              >
                &lt;&gt;
                <span className="text-green-600 font-bold text-lg">
                  Developers
                </span>
              </a>
            </div>
          </nav>
          <footer className="mt-auto text-center text-black text-xl">
            Made with ❤️ by 2137
          </footer>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white px-4 py-6 flex flex-col items-center justify-center">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#123924] text-white text-center py-2">
        Made with ❤️ by 2137
      </footer>
    </div>
  );
}
