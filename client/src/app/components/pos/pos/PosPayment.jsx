"use client";
import { useState } from "react";

const PosPayment = () => {
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [cash, setCash] = useState(0);

  const subtotal = 500; // Example
  const total = subtotal - discount + (subtotal * tax) / 100;
  const due = total - cash;

  return (
    <div className="bg-white p-2 rounded shadow text-xs">
      <h3 className="font-semibold mb-1">Payment</h3>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount (%):</span>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="border p-0.5 w-16 rounded text-xs"
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Tax (%):</span>
          <input
            type="number"
            value={tax}
            onChange={(e) => setTax(Number(e.target.value))}
            className="border p-0.5 w-16 rounded text-xs"
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Paid:</span>
          <input
            type="number"
            value={cash}
            onChange={(e) => setCash(Number(e.target.value))}
            className="border p-0.5 w-16 rounded text-xs"
          />
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>${total}</span>
        </div>
        <div className="flex justify-between font-semibold text-red-500">
          <span>Due:</span>
          <span>${due}</span>
        </div>
      </div>
    </div>
  );
};

export default PosPayment;
