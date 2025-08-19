"use client";
import { useCreateStoreMutation } from "@/app/features/api/storeApi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const StoresModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createStore] = useCreateStoreMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      const result = await createStore(data).unwrap();
      // Success message
      Swal.fire({
        icon: "success",
        title: "Store Created",
        text: `Store "${result.name}" has been created successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
      setIsOpen(false);
    } catch (err) {
      // Error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.data?.message || "Failed to create store",
      });
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-green-500 !text-white rounded hover:bg-green-600"
      >
        <FaPlus className="mr-2" /> Add New Store
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

            <h2 className="text-xl font-bold mb-4">Add New Store</h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              {/* Store Name */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Store Name
                </label>
                <input
                  {...register("name", {
                    required: "Store name is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter store name"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StoresModal;
