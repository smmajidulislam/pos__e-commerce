// components/modal/category/SubCategoryModal.jsx
"use client";
import { useGetCategoriesQuery } from "@/app/features/api/categoryApi";
import { useCreateSubCategoryMutation } from "@/app/features/api/subCategoriesApi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const SubCategoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetCategoriesQuery();
  const [createSubCategory] = useCreateSubCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        categoryId: formData.categoryId, // selected parent category id
      };

      await createSubCategory(payload).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Sub Category created successfully",
      });

      reset();
      setIsOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Something went wrong",
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
        <FaPlus className="mr-2" /> Add New Sub Category
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

            <h2 className="text-xl font-bold mb-4">Add New Sub Category</h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              {/* Parent category select */}
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
                  <option value="">-- Select Parent Category --</option>
                  {data?.categories?.map((cat) => (
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
                  className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Sub Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SubCategoryModal;
