"use client";
import React, { useState } from "react";
import PosHeader from "@/app/components/pos/pos/PosHeader";
import PosProducts from "@/app/components/pos/pos/PosProducts";
import PosSearch from "@/app/components/pos/pos/PosSearch";
import PosSidebar from "@/app/components/pos/pos/PosSidebar";
import Link from "next/link";
import {
  FaHome,
  FaShoppingCart,
  FaClipboardList,
  FaBoxOpen,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const PosPageLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100 flex flex-col scrollbar-hide">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Main Area */}
        <div className="w-full md:w-5/7 flex flex-col border-r h-full">
          {/* Header */}
          <div className="flex-none w-full flex items-center justify-between">
            <PosHeader />
            {/* Hamburger icon only on mobile/tablet */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={24} />
            </button>
          </div>

          {/* Search */}
          <div className="flex-none min-h-[60px] w-full">
            <PosSearch />
          </div>

          {/* Products */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <PosProducts />
          </div>
        </div>

        {/* Sidebar for desktop */}
        <div className="hidden md:block w-2/7 h-full overflow-y-auto scrollbar-hide border-l">
          <PosSidebar />
        </div>
      </div>

      {/* Mobile Sidebar Overlay (Right Side) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div className="w-64 bg-white h-full shadow-lg p-4 relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            <PosSidebar />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="h-16 bg-white border-t border-gray-300 shadow-inner flex justify-around items-center flex-none">
        <Link
          href="/shop"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <FaHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/sales"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <FaShoppingCart size={24} />
          <span className="text-xs mt-1">Sales</span>
        </Link>

        <Link
          href="/purchase"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <FaClipboardList size={24} />
          <span className="text-xs mt-1">Purchase</span>
        </Link>

        <Link
          href="/saleslist"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <FaBoxOpen size={24} />
          <span className="text-xs mt-1">Order</span>
        </Link>
      </div>
    </div>
  );
};

export default PosPageLayout;
