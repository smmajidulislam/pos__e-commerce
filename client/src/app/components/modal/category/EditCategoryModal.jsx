"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useUpdateCategoryMutation } from "@/app/features/api/categoryApi";
import { MySuccessSawal, MyErrorSawal } from "@/app/utils/Sawal";

const EditCategoryModal = ({ isOpen, setIsOpen, initialData, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
      });
    } else {
      reset({ name: "", posId: "" });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    if (!initialData?.id) return;
    try {
      await updateCategory({
        id: initialData.id,
        name: data.name,
      }).unwrap();

      MySuccessSawal(true, 2000, "Category updated successfully!");
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      MyErrorSawal(true, 2000, "Failed to update category!");
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

        <h2 className="text-xl font-bold mb-4">Edit Category</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Category Name
            </label>
            <input
              {...register("name", { required: "Category is required" })}
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
              disabled={isLoading}
              className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
