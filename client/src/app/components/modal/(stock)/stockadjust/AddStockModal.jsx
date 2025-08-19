// components/modal/category/CategoryModal.jsx
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";

const AddStockModal = ({ posList = [], onSubmit }) => {
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
        <FaPlus className="mr-2" /> Add New
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

            <h2 className="text-xl font-bold mb-4">Add New Brand</h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              {/* Purchase Ref */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Purchase Reference
                </label>
                <input
                  {...register("purchaseRef", {
                    required: "Purchase reference is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter purchase reference"
                />
                {errors.purchaseRef && (
                  <span className="text-red-500 text-sm">
                    {errors.purchaseRef.message}
                  </span>
                )}
              </div>

              {/* Buying Quantity */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Buying Quantity
                </label>
                <input
                  type="number"
                  {...register("buyingQty", {
                    required: "Buying quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter buying quantity"
                />
                {errors.buyingQty && (
                  <span className="text-red-500 text-sm">
                    {errors.buyingQty.message}
                  </span>
                )}
              </div>

              {/* Received Quantity */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Received Quantity
                </label>
                <input
                  type="number"
                  {...register("receivedQty", {
                    required: "Received quantity is required",
                    min: { value: 0, message: "Quantity cannot be negative" },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter received quantity"
                />
                {errors.receivedQty && (
                  <span className="text-red-500 text-sm">
                    {errors.receivedQty.message}
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

export default AddStockModal;
