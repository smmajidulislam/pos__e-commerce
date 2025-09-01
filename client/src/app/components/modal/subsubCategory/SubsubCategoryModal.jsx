// components/modal/category/SubsubCategoryModal.jsx
"use client";
import { useGetSubCategoriesQuery } from "@/app/features/api/subCategoriesApi";
import { useCreateSubSubCategoryMutation } from "@/app/features/api/subsubCategoriesApi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const SubsubCategoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // fetch all sub categories
  const { data } = useGetSubCategoriesQuery();
  const subCategories = data?.subCategories || [];

  const [createSubsubCategory] = useCreateSubSubCategoryMutation();

  // form submit handler
  const handleFormSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name, // category name input
        subCategoryId: formData.subCategoryId, // selected subCategoryId
      };

      await createSubsubCategory(payload).unwrap();
      Swal.fire("Success", "Sub Sub Category created successfully!", "success");

      reset();
      setIsOpen(false);
    } catch (error) {
      Swal.fire(
        "Error",
        error?.data?.message || "Failed to create Sub Sub Category",
        "error"
      );
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-green-500 !text-white rounded hover:bg-green-600"
      >
        <FaPlus className="mr-2" /> Add New Sub Sub Category
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

            <h2 className="text-xl font-bold mb-4">Add New Sub Sub Category</h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
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

              {/* Category Name */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Sub Sub Category Name
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
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

export default SubsubCategoryModal;
