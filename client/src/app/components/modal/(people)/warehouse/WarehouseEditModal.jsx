"use client";
import { useUpdateWarehouseMutation } from "@/app/features/api/warehouseApi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { MyErrorSawal } from "@/app/utils/Sawal"; // Optional: error alert

const EditWarehouseModal = ({ isOpen, setIsOpen, initialData }) => {
  const [updateWarehouse, { isLoading }] = useUpdateWarehouseMutation();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { warehouse: "" },
  });

  // Initial data set করা
  useEffect(() => {
    if (initialData) {
      reset({ warehouse: initialData.name || "" });
    } else {
      reset({ warehouse: "" });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    if (!initialData?.id) return;

    try {
      // API call
      const result = await updateWarehouse({
        id: initialData.id,
        name: data.warehouse,
      }).unwrap(); // RTK Query unwrap করে success/error handle

      console.log("Updated Warehouse:", result);
      setIsOpen(false); // Modal close
    } catch (err) {
      console.error("Update Error:", err);
      setApiError(err?.data?.message || "Error updating warehouse");
      MyErrorSawal(
        false,
        3000,
        err?.data?.message || "Error updating warehouse"
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

        <h2 className="text-xl font-bold mb-4">Edit Warehouse</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Warehouse Name
            </label>
            <input
              {...register("warehouse", {
                required: "Warehouse name is required",
              })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter warehouse name"
              disabled={isLoading} // loading এ disable
            />
            {errors.warehouse && (
              <span className="text-red-500 text-sm">
                {errors.warehouse.message}
              </span>
            )}
          </div>

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className={`bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Warehouse"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWarehouseModal;
