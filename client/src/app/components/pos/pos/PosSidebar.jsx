"use client";
import React from "react";
import PosSiderbarCustomer from "./PosSiderbarCustomer";
import PosOrderProducts from "./PosOrderProducts";
import PosPayment from "./PosPayment";
import PosPaymentMethod from "./PosPaymentMethod";

const PosSidebar = () => {
  return (
    <div className="flex flex-col h-full min-h-0 p-2">
      {/* Scrollable top section */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto min-h-0">
        <PosSiderbarCustomer />
        <PosOrderProducts />
      </div>

      {/* Bottom fixed section */}
      <div className="flex flex-col gap-2 mt-2">
        <PosPayment />
        <PosPaymentMethod />

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition">
            Cancel
          </button>
          <button className="flex-1 bg-blue-500 !text-white py-2 rounded hover:bg-blue-600 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosSidebar;
