"use client";
import React from "react";
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
} from "react-icons/fa";

const PosPageLayout = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Main Area */}
        <div className="w-5/7 flex flex-col border-r h-full">
          {/* Header */}
          <div className="flex-none">
            <PosHeader />
          </div>

          {/* Search */}
          <div className="flex-none min-h-[60px]">
            <PosSearch />
          </div>

          {/* Products */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <PosProducts />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-2/7 h-full overflow-y-auto scrollbar-hide">
          <PosSidebar />
        </div>
      </div>

      {/* Footer */}
      <div className="h-16 bg-white border-t border-gray-300 shadow-inner flex justify-around items-center flex-none">
        <Link
          href="/shop"
          prefetch={false}
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <FaHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/sales"
          prefetch={false}
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <FaShoppingCart size={24} />
          <span className="text-xs mt-1">Sales</span>
        </Link>

        <Link
          href="/purchase"
          prefetch={false}
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <FaClipboardList size={24} />
          <span className="text-xs mt-1">Purchase</span>
        </Link>

        <Link
          href="/saleslist"
          prefetch={false}
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
