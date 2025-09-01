"use client";
import React from "react";
import handlePrint from "./PrintInvoice";
import { FaPrint } from "react-icons/fa";

export default function PrintButton({ printRef }) {
  return (
    <div className="text-center mt-4">
      <button
        onClick={() => handlePrint(printRef)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
      >
        <FaPrint />
      </button>
    </div>
  );
}
