"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import sawal from "sweetalert2";
import { useUpdateWarrantyMutation } from "@/app/features/api/warrantiesApi";

const EditWarrantiesModal = ({ isOpen, setIsOpen, initialData, refetch }) => {
  const [updateWarranty] = useUpdateWarrantyMutation();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ name: "", days: "" });
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      data.days = parseInt(data.days);
      await updateWarranty({ id: initialData.id, ...data });
      sawal.fire("Success!", "Warranty updated successfully", "success");
      setIsOpen(false);
      refetch();
    } catch (error) {
      sawal.fire("Error!", "Failed to update warranty", "error");
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

        <h2 className="text-xl font-bold mb-4">Edit Warranty</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Days
            </label>
            <input
              type="number"
              {...register("days", { required: true, valueAsNumber: true })}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
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

export default EditWarrantiesModal;
