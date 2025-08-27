"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import sawal from "sweetalert2";
import { useCreateWarrantyMutation } from "@/app/features/api/warrantiesApi";

const WarrantiesModal = ({ isOpen, setIsOpen, refetch }) => {
  const [createWarranty] = useCreateWarrantyMutation();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        days: Number(data.days),
      };

      const res = await createWarranty(payload).unwrap();
      console.log(res);

      sawal.fire("Success!", "Warranty added successfully", "success");
      reset();
      setIsOpen(false);
      refetch();
    } catch (error) {
      console.log(error);
      sawal.fire("Error!", "Failed to add warranty", "error");
    }
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-green-500 !text-white rounded hover:bg-green-600"
      >
        <FaPlus className="mr-2" /> Add New Warranties
      </button>
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">Add New Warranties</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Enter warranty name"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              End Day
            </label>
            <input
              type="number"
              {...register("days", { required: true })}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
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
  );
};

export default WarrantiesModal;
