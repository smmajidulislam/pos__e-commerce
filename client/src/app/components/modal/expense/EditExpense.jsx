"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useUpdateExpenseMutation } from "@/app/features/api/expenseApi";
import Swal from "sweetalert2";

const EditExpense = ({ isOpen, setIsOpen, initialData }) => {
  const [updateExpense] = useUpdateExpenseMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialData) {
      reset(initialData); // load existing data into form
    } else {
      reset({ name: "" });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    try {
      if (initialData?.id) {
        await updateExpense({
          id: initialData.id,
          name: data.name,
        }).unwrap();

        Swal.fire("Success", "Expense updated successfully", "success");
      }
      setIsOpen(false);
    } catch (error) {
      Swal.fire("Error", "Failed to update expense", "error");
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

        <h2 className="text-xl font-bold mb-4">Edit Expense</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Expense Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Expense Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter expense name"
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
              Update Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
