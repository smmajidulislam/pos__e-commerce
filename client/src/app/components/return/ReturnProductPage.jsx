"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateReturnSalesMutation,
  useCreateReturnPurchaseMutation,
} from "@/app/features/api/returnProductApi";
import { useGetSalesQuery } from "@/app/features/api/salesApi";
import { useGetPurchasesQuery } from "@/app/features/api/purchasesApi";
import sawal from "sweetalert2";

const ReturnProductPage = () => {
  const [returnType, setReturnType] = useState("purchase");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [createReturnSales] = useCreateReturnSalesMutation();
  const [createReturnPurchase] = useCreateReturnPurchaseMutation();
  const { data: sales } = useGetSalesQuery();
  const { data: purchases } = useGetPurchasesQuery();

  // watch purchaseId / salesId
  const selectedPurchaseId = watch("purchaseId");
  const selectedSalesId = watch("salesId");

  // find selected purchase
  const selectedPurchase =
    purchases?.data?.find((item) => item.id === selectedPurchaseId) || null;

  // find selected sales
  const selectedSales =
    sales?.data?.find((item) => item.id === selectedSalesId) || null;

  // update purchase values
  useEffect(() => {
    if (selectedPurchase) {
      setValue("amount", Number(selectedPurchase.amount) || 0);
      setValue("quantity", Number(selectedPurchase.quantity) || 0);
    }
  }, [selectedPurchase, setValue]);

  // update sales values
  useEffect(() => {
    if (selectedSales) {
      setValue("salesPrice", Number(selectedSales.amount) || 0);
      setValue("quantity", Number(selectedSales.quantity) || 0);
    }
  }, [selectedSales, setValue]);

  const handleFormSubmit = async (data) => {
    const payload = {
      ...data,
      amount: data.amount ? Number(data.amount) : undefined,
      quantity: data.quantity ? Number(data.quantity) : undefined,
    };

    if (returnType === "sales") {
      console.log("➡️ Sales Payload:", payload);
      await createReturnSales(payload).unwrap();
    }
    if (returnType === "purchase") {
      const res = await createReturnPurchase(payload).unwrap();
      if (res?.success) {
        sawal.fire("Success!", "Return created successfully", "success");
      } else {
        sawal.fire("Error!", "Failed to  return", "error");
      }
    }
    reset();
  };

  return (
    <div className="p-6">
      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => {
            setReturnType("purchase");
            reset();
          }}
          className={`px-4 py-2 rounded ${
            returnType === "purchase"
              ? "bg-blue-600 !text-white"
              : "bg-gray-200"
          }`}
        >
          Purchase Return
        </button>
        <button
          onClick={() => {
            setReturnType("sales");
            reset();
          }}
          className={`px-4 py-2 rounded ${
            returnType === "sales" ? "bg-blue-600 !text-white" : "bg-gray-200"
          }`}
        >
          Sales Return
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">
          {returnType === "sales" ? "Sales Return" : "Purchase Return"} Form
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {returnType === "purchase" && (
            <>
              {/* Purchase Select */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Select Purchase
                </label>
                <select
                  {...register("purchaseId", {
                    required: "Purchase ID is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">-- Select Purchase --</option>
                  {purchases?.data?.map((purchase) => (
                    <option key={purchase.id} value={purchase.id}>
                      {purchase.product?.name} (Qty: {purchase.quantity})
                    </option>
                  ))}
                </select>
                {errors.purchaseId && (
                  <span className="text-red-500 text-sm">
                    {errors.purchaseId.message}
                  </span>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  {...register("amount")}
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  {...register("quantity")}
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                />
              </div>
            </>
          )}

          {returnType === "sales" && (
            <>
              {/* Sales Select */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Select Sales
                </label>
                <select
                  {...register("salesId", {
                    required: "Sales ID is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">-- Select Sales --</option>
                  {sales?.data?.map((sale) => (
                    <option key={sale.id} value={sale.id}>
                      {sale.product?.name} (Qty: {sale.quantity})
                    </option>
                  ))}
                </select>
                {errors.salesId && (
                  <span className="text-red-500 text-sm">
                    {errors.salesId.message}
                  </span>
                )}
              </div>

              {/* Sales Price */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Sales Price
                </label>
                <input
                  type="number"
                  {...register("salesPrice")}
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  {...register("quantity")}
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                />
              </div>
            </>
          )}

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

export default ReturnProductPage;
