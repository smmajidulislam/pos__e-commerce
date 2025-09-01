"use client";
import { useCreateSalesDuePaymentMutation } from "@/app/features/api/duePayment";
import React from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import swal from "sweetalert2";

const AddPayment = ({ isOpen, setIsOpen, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      salesId: initialData?.salesId || "",
      amount: "",
    },
  });
  const [createSalesDuePayment] = useCreateSalesDuePaymentMutation();

  const handleFormSubmit = async (data) => {
    data = { salesId: initialData?.salesId, amount: Number(data.amount) };
    console.log("Form Data:", data);
    const res = await createSalesDuePayment(data).unwrap();
    console.log(res);
    if (res?.message) {
      swal.fire("Success!", "Payment added successfully", "success");
    }

    reset();
    setIsOpen(false);
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

        <h2 className="text-xl font-bold mb-4">Add Payment</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Hidden SalesId */}
          <input type="hidden" {...register("salesId", { required: false })} />

          {/* Amount */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Amount
            </label>
            <input
              {...register("amount", { required: "Amount is required" })}
              type="number"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
            />
            {errors.amount && (
              <span className="text-red-500 text-sm">
                {errors.amount.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPayment;
