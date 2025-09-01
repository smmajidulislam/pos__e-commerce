"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCreatePurchaseDuePaymentMutation } from "@/app/features/api/duePayment";

const AddPurchasePayment = ({ isOpen, setIsOpen, purchaseId }) => {
  const [addPurchasePayment] = useCreatePurchaseDuePaymentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      purchaseId: purchaseId || "",
      amount: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitting Payment:", data);

      await addPurchasePayment({
        purchaseId: data.purchaseId,
        amount: Number(data.amount),
      }).unwrap();

      Swal.fire("Success!", "Payment added successfully", "success");
      reset();
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to add payment", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Add Payment</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Hidden Purchase ID */}
          <input type="hidden" {...register("purchaseId")} value={purchaseId} />

          {/* Amount */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Amount
            </label>
            <input
              {...register("amount", { required: "Amount is required" })}
              type="number"
              placeholder="Enter amount"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.amount && (
              <span className="text-red-500 text-sm">
                {errors.amount.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPurchasePayment;
