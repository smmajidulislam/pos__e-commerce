"use client";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full shadow">
      {/* Top Bar */}
      <div className="bg-yellow-300 py-2 text-sm text-center">
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 px-2">
          <span className="text-gray-800">
            আমাদের যে কোনো পণ্য অর্ডার করতে চান বা
          </span>
          <span className="flex items-center justify-center gap-1 text-gray-800">
            <FaWhatsapp className="text-green-600" /> WhatsApp করুন:{" "}
            <b>+88000000</b>
          </span>
          <span className="flex items-center justify-center gap-1 text-gray-800">
            <FaPhone className="text-green-600" /> হেল্প লাইন: <b>000000000</b>
          </span>
        </div>
      </div>

      {/* Logo & Icons */}
      {/* Mobile Layout */}
      <div className="flex items-center justify-between px-4 py-3 sm:hidden">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-12 h-12" />
          <h1 className="text-xl font-bold text-green-700">COMPANY</h1>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-xl text-green-700">
          <FaSearch />
          <FaUser />
          <FaShoppingCart />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between px-6 py-3 ">
        {/* Left (Search) */}
        <div className="text-xl text-green-700">
          <FaSearch />
        </div>

        {/* Middle (Company Name) */}
        <h1 className="text-2xl font-bold text-green-700 text-center">
          COMPANY
        </h1>

        {/* Right (User + Cart) */}
        <div className="flex items-center gap-4 text-xl text-green-700">
          <FaUser />
          <FaShoppingCart />
        </div>
      </div>
    </header>
  );
}
