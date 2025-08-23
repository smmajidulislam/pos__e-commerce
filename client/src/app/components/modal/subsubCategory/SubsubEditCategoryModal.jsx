// components/modal/subsubCategory/SubsubEditCategoryModal.jsx
"use client";
import { useGetSubCategoriesQuery } from "@/app/features/api/subCategoriesApi";
import { useUpdateSubSubCategoryMutation } from "@/app/features/api/subsubCategoriesApi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const SubsubEditCategoryModal = ({ isOpen, setIsOpen, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // fetch all sub categories (for dropdown)
  const { data } = useGetSubCategoriesQuery();
  const subCategories = data?.subCategories || [];

  const [updateSubsubCategory] = useUpdateSubSubCategoryMutation();

  // reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        subCategoryId: initialData.subCategoryId || "",
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (formData) => {
    try {
      const payload = {
        id: initialData.id,
        name: formData.name,
        subCategoryId: formData.subCategoryId,
      };

      await updateSubsubCategory(payload).unwrap();
      Swal.fire("Success", "Sub Sub Category updated successfully!", "success");

      setIsOpen(false);
    } catch (error) {
      Swal.fire(
        "Error",
        error?.data?.message || "Failed to update Sub Sub Category",
        "error"
      );
    }
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

        <h2 className="text-xl font-bold mb-4">Edit Sub Sub Category</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Select Sub Category */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Sub Category
            </label>
            <select
              {...register("subCategoryId", {
                required: "Sub Category is required",
              })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Sub Category --</option>
              {subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
            {errors.subCategoryId && (
              <span className="text-red-500 text-sm">
                {errors.subCategoryId.message}
              </span>
            )}
          </div>

          {/* Name input */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Sub Sub Category Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Enter Sub Sub Category name"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubsubEditCategoryModal;
