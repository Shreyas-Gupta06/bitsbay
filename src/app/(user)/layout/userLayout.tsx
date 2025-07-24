import React from "react";
import { logoutUser } from "../../../api/logout";
import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  listOutline,
  personOutline,
  logOutOutline,
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
        <h1 className="text-2xl font-bold text-center">BITSbay</h1>
        <button
          onClick={() => setDrawerOpen(true)}
          className="text-white text-2xl touchable-opacity"
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
          <nav className="mt-6 flex flex-col gap-6 text-xl">
            <a
              href="/user/home"
              className="text-black font-bold text-2xl flex items-center gap-2"
            >
              <IonIcon icon={homeOutline} className="w-6 h-6" />
              Home
            </a>
            <a
              href="/user/listings"
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
            <div className="mt-0 text-left">
              <a
                href="#"
                onClick={logoutUser}
                className="bg-red-500 text-white font-bold text-xl px-4 py-2 rounded-md flex items-center gap-2 w-fit"
              >
                <IonIcon icon={logOutOutline} className="w-6 h-6" />
                Logout
              </a>
            </div>
            <div className="mt-0 text-left">
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
