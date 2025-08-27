"use client";
import { useUpdateSupplierMutation } from "@/app/features/api/supplierApi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const EditSupplier = ({ isOpen, setIsOpen, initialData }) => {
  const [updateSupplier] = useUpdateSupplierMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    if (initialData?.id || initialData?._id) {
      await updateSupplier({ id: initialData.id || initialData._id, ...data });
      Swal.fire("Success", "Supplier updated successfully", "success");
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Supplier</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter supplier name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter supplier email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone", { required: "Phone is required" })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter supplier phone"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSupplier;
