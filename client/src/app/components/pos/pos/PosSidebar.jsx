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
      </div>
    </div>
  );
};

export default PosSidebar;
