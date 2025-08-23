"use client";
import { useUpdateSubCategoryMutation } from "@/app/features/api/subCategoriesApi";
import { useGetCategoriesQuery } from "@/app/features/api/categoryApi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import sawal from "sweetalert2";

const SubEditCategoryModal = ({ isOpen, setIsOpen, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.categories || [];

  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();

  useEffect(() => {
    if (initialData) {
      reset({
        categoryId: initialData.categoryId || initialData.category?.id || "",
        name: initialData.name || "",
      });
    } else {
      reset({ categoryId: "", name: "" });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (formData) => {
    try {
      await updateSubCategory({
        id: initialData.id,
        name: formData.name,
        categoryId: formData.categoryId,
      }).unwrap();

      sawal.fire("Success!", "Sub Category updated successfully", "success");
      setIsOpen(false);
    } catch (error) {
      sawal.fire(
        "Error",
        error?.data?.message || "Failed to update Sub Category",
        "error"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Sub Category</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Parent Category */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Parent Category
            </label>
            <select
              {...register("categoryId", {
                required: "Parent category is required",
              })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Parent Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className="text-red-500 text-sm">
                {errors.categoryId.message}
              </span>
            )}
          </div>

          {/* Sub Category Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Sub Category Name
            </label>
            <input
              {...register("name", {
                required: "Sub category name is required",
              })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter sub category name"
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
              disabled={isLoading}
              className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Sub Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubEditCategoryModal;
