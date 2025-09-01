"use client";
import { useState } from "react";
import { useGetCustomersQuery } from "@/app/features/api/customersApi";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "@/app/features/slice/posSlice";

const PosSiderbarCustomer = () => {
  const dispatch = useDispatch();
  const selectedCustomerId = useSelector((state) => state.pos.customerId);

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const { data: customerData, isLoading } = useGetCustomersQuery();
  const customers = customerData?.customers || [];

  const filteredCustomers = customers.filter((c) =>
    `${c.firstName} ${c.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSelect = (customer) => {
    dispatch(setCustomer(customer.id));
    setSearchTerm(`${customer.firstName} ${customer.lastName}`);
    setOpen(false);
  };

  return (
    <div className="bg-white p-3 rounded shadow relative">
      <h3 className="font-bold mb-2">Customer</h3>
      <input
        type="text"
        placeholder="Search or Select Customer..."
        className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />

      {open && (
        <ul className="absolute top-16 left-3 right-3 bg-white border rounded shadow max-h-40 overflow-auto z-20">
          {isLoading && <li className="px-2 py-1">Loading...</li>}
          {!isLoading && filteredCustomers.length === 0 && (
            <li className="px-2 py-1 text-gray-500">No customers found</li>
          )}
          {filteredCustomers.map((c) => (
            <li
              key={c.id}
              onClick={() => handleSelect(c)}
              className={`px-2 py-1 hover:bg-blue-100 cursor-pointer ${
                selectedCustomerId === c.id ? "bg-blue-200" : ""
              }`}
            >
              {c.firstName} {c.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PosSiderbarCustomer;
