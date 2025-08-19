"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

const EditStokModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  initialData,
  posList = [],
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ categoryName: "", posId: "" });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    if (onSubmit) onSubmit(data);
    setIsOpen(false);
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

        <h2 className="text-xl font-bold mb-4">Edit Category</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Category Name
            </label>
            <input
              {...register("categoryName", {
                required: "Category is required",
              })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.categoryName && (
              <span className="text-red-500 text-sm">
                {errors.categoryName.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Select POS
            </label>
            <select
              {...register("posId", { required: "Please select a POS" })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select POS</option>
              {posList.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.name}
                </option>
              ))}
            </select>
            {errors.posId && (
              <span className="text-red-500 text-sm">
                {errors.posId.message}
              </span>
            )}
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStokModal;
