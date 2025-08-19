"use client";
import React from "react";

const PosSearch = () => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow">
      {/* Left side: Title */}
      <div className="text-lg font-semibold text-gray-700">Products</div>

      {/* Right side: Compact Search Input */}
      <div className="ml-4">
        <input
          type="text"
          placeholder="Product Search..."
          className="w-48 sm:w-64 border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default PosSearch;
