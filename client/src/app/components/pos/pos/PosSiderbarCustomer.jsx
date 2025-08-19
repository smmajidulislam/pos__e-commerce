"use client";
import { useState } from "react";

const customers = [
  { id: 1, name: "Customer A" },
  { id: 2, name: "Customer B" },
  { id: 3, name: "Customer C" },
];

const PosSiderbarCustomer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [open, setOpen] = useState(false);

  // Filtered customers based on input
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(selectedCustomer.toLowerCase())
  );

  const handleSelect = (name) => {
    setSelectedCustomer(name);
    setOpen(false);
  };

  return (
    <div className="bg-white p-3 rounded shadow relative">
      <h3 className="font-bold mb-2">Customer</h3>
      <input
        type="text"
        placeholder="Search or Select Customer..."
        className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedCustomer}
        onChange={(e) => {
          setSelectedCustomer(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />

      {/* Dropdown */}
      {open &&
        selectedCustomer.trim() !== "" &&
        filteredCustomers.length > 0 && (
          <ul className="absolute top-16 left-3 right-3 bg-white border rounded shadow max-h-40 overflow-auto z-20">
            {filteredCustomers.map((c) => (
              <li
                key={c.id}
                onClick={() => handleSelect(c.name)}
                className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default PosSiderbarCustomer;
