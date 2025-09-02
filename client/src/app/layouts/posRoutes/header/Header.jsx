"use client";
import { useGetStoresQuery } from "@/app/features/api/storeApi";
import { useTheme } from "@/app/hooks/theme/useThem";
import { MyErrorSawal } from "@/app/utils/Sawal";
import useStoreToken from "@/app/utils/storetoken/saveStoeToken";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaExpand } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useUser } from "@/app/utils/saveUser/user";
const Header = () => {
  const { isCollapsed, setIsCollapsed } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { user } = useUser();

  const { data, isLoading, isError } = useGetStoresQuery();

  // useStoreToken hook
  const {
    store: selectedStore,
    save: saveStore,
    loading: tokenLoading,
  } = useStoreToken();
  const [errorMessage, setErrorMessage] = useState("");

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(console.error);
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(console.error);
    }
  };

  const toggleProfileMenu = () => setProfileOpen((prev) => !prev);

  // Store change handler
  const handleStoreChange = (storeObj) => {
    if (!storeObj) return;
    saveStore(storeObj);
    setErrorMessage(""); // clear error on selection
  };

  // Initial validation: token matches available stores
  useEffect(() => {
    if (!tokenLoading && data?.stores) {
      if (selectedStore) {
        const matched = data.stores.find((s) => s.id === selectedStore.id);
        if (!matched) MyErrorSawal(true, 15000, "Please select a store");
      } else {
        MyErrorSawal(true, 15000, "Please select a store");
      }
    }
  }, [tokenLoading, data, selectedStore]);

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

      {/* Middle: Input + Select */}
      <div className="flex-1 flex items-center gap-2 mx-4">
        {/* Search Input */}
        <div className="flex-1 md:flex-3 lg:flex-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        {/* Select POS Stores */}
        <div className="flex-1">
          {isLoading || tokenLoading ? (
            <div className="h-12 w-full bg-gray-200 animate-pulse rounded-md" />
          ) : (
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
              value={selectedStore?.id || ""}
              onChange={(e) => {
                const storeId = e.target.value;
                const storeObj = data?.stores?.find((s) => s.id === storeId);
                handleStoreChange(storeObj);
              }}
            >
              <option value="">Select POS</option>
              {isError && <option>Error loading stores</option>}
              {data?.stores?.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>
      </div>

      {/* Right: Fullscreen + Profile */}
      <div className="flex items-center gap-2 lg:gap-4 ml-auto">
        <button
          onClick={toggleFullscreen}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <FaExpand size={18} />
        </button>

        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center gap-1 lg:gap-2 p-1 hover:bg-gray-200 rounded"
          >
            <span className="hidden md:block font-medium">{user?.name}</span>
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
