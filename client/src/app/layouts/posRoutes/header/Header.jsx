"use client";

import { useTheme } from "@/app/hooks/theme/useThem";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaExpand } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Header = () => {
  const { isCollapsed, setIsCollapsed } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error(err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleProfileMenu = () => setProfileOpen((prev) => !prev);

  return (
    <header className="bg-white h-16 flex items-center shadow-sm border-b border-gray-200 px-4 sticky top-0 z-50 flex-wrap">
      {/* Left: Sidebar toggle + Logo */}
      <div
        className={`flex items-center transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="p-2 hover:bg-gray-200 rounded"
        >
          {isCollapsed ? (
            <IoIosArrowForward size={20} />
          ) : (
            <IoIosArrowBack size={20} />
          )}
        </button>

        {!isCollapsed && (
          <span className="ml-2 text-lg font-semibold">POS Dashboard</span>
        )}
      </div>

      {/* Middle: Input + Select + Button */}
      <div className="flex-1 flex items-center gap-2 mx-4">
        {/* Input - Left 1/3 */}
        <div className="flex-1 md:flex-3 lg:flex-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        {/* Select - Middle 1/3 */}
        <div className="flex-1">
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300">
            <option value="">Select POS</option>
            <option value="product">Product Management</option>
            <option value="sales">Sales</option>
            <option value="customer">Customer</option>
          </select>
        </div>
      </div>

      {/* Right: Fullscreen + Profile */}
      <div className="flex items-center gap-2 lg:gap-4 ml-auto">
        {/* Fullscreen button */}
        <button
          onClick={() => toggleFullscreen()}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <FaExpand size={18} />
        </button>

        {/* Profile with dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center gap-1 lg:gap-2 p-1 hover:bg-gray-200 rounded"
          >
            <Image
              src="/profile.jpg"
              width={32}
              height={32}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden md:block font-medium">John Doe</span>
            <FaEllipsisV className="hidden md:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-md z-50">
              <ul>
                <li
                  onClick={() => setProfileOpen(false)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </li>
                <li
                  onClick={() => setProfileOpen(false)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Settings
                </li>
                <li
                  onClick={() => setProfileOpen(false)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
