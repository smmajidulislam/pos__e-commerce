"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useUpdateStoreMutation } from "@/app/features/api/storeApi";

const EditStoreModal = ({ isOpen, setIsOpen, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [updateStore] = useUpdateStoreMutation();

  // initial data fill
  useEffect(() => {
    if (initialData) {
      reset({ name: initialData.name });
    } else {
      reset({ name: "" });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    if (!initialData?.id) return;

    try {
      await updateStore({ id: initialData.id, ...data }).unwrap();
      Swal.fire("Success", "Store updated successfully", "success");
      setIsOpen(false);
    } catch (err) {
      Swal.fire(
        "Error",
        err?.data?.message || "Failed to update store",
        "error"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Store</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Store Name
            </label>
            <input
              {...register("name", { required: "Store name is required" })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStoreModal;
