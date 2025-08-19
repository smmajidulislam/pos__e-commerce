// components/modal/category/CategoryModal.jsx
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";

const AddStockTransffer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    if (onSubmit) onSubmit(data);
    reset();
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-green-500 !text-white rounded hover:bg-green-600"
      >
        <FaPlus className="mr-2" /> Add New Transfer
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-4">Add New Transfer</h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              {/* Product Name */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Product Name
                </label>
                <input
                  {...register("productName", {
                    required: "Product name is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter product name"
                />
                {errors.productName && (
                  <span className="text-red-500 text-sm">
                    {errors.productName.message}
                  </span>
                )}
              </div>
              {/* From */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  From
                </label>
                <input
                  {...register("from", {
                    required: "From field is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter source"
                />
                {errors.from && (
                  <span className="text-red-500 text-sm">
                    {errors.from.message}
                  </span>
                )}
              </div>

              {/* To */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  To
                </label>
                <input
                  {...register("to", {
                    required: "To field is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter destination"
                />
                {errors.to && (
                  <span className="text-red-500 text-sm">
                    {errors.to.message}
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  {...register("qty", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter quantity"
                />
                {errors.qty && (
                  <span className="text-red-500 text-sm">
                    {errors.qty.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStockTransffer;
