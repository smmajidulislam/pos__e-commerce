"use client";
import { useState } from "react";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
} from "react-icons/fa";

const methods = [
  { name: "Cash", icon: <FaMoneyBillWave /> },
  { name: "Mobile", icon: <FaMobileAlt /> },
  { name: "Card", icon: <FaCreditCard /> },
  { name: "Bank", icon: <FaUniversity /> },
];

const PosPaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState("");

  return (
    <div className="bg-white p-2 rounded shadow text-center text-xs">
      <h3 className="font-semibold mb-2">Payment Method</h3>
      <div className="flex justify-center items-center gap-1 overflow-x-auto">
        {methods.map((m) => (
          <button
            key={m.name}
            className={`flex items-center justify-center p-2 rounded border transition-colors duration-200 text-blue-600 text-base ${
              selectedMethod === m.name
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white border-gray-300 hover:bg-blue-100"
            }`}
            onClick={() => setSelectedMethod(m.name)}
          >
            <span className="text-xl">{m.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PosPaymentMethod;
