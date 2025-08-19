"use client";
import { useUpdateAttributeValueMutation } from "@/app/features/api/attributeApi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

const EditVariantValuesModal = ({ isOpen, setIsOpen, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [updateAttribute] = useUpdateAttributeValueMutation();

  useEffect(() => {
    if (initialData) {
      reset({
        id: initialData.id,
        name: initialData.name || "",
      });
    } else {
      reset({ id: "", name: "" });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    try {
      await updateAttribute({ id: data.id, name: data.name }).unwrap();
      setIsOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
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

        <h2 className="text-xl font-bold mb-4">Edit Variant</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Hidden ID (for update) */}
          <input type="hidden" {...register("id")} />

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Variant Name
            </label>
            <input
              {...register("name", {
                required: "Variant name is required",
              })}
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
              Update Variant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVariantValuesModal;
