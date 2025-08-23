"use client";
import { useGetProductsQuery } from "@/app/features/api/productApi";
import { useCreateCouponMutation } from "@/app/features/api/couponsApi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const AddCouponModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: products } = useGetProductsQuery();
  const [createCoupon] = useCreateCouponMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      // const payload = {
      //   code: data.code,
      //   discount: Number(data.discount),
      //   productId: data.productId,
      // };
      const d = {
        code: "WELCOME501",
        discount: 50,
        discountType: "FIXED",
        expiresAt: "2025-12-31T00:00:00.000Z",
        isActive: true,
        minimumPurchaseAmount: 500,
        productIds: [data.productId],
        // assignedById: "cmelgnnf30000ce7ixh3ru119",
      };

      // if (data.expiresAt) {
      //   payload.expiresAt = new Date(data.expiresAt).toISOString();
      // }
      // console.log(payload);
      const res = await createCoupon(d);

      console.log(res);
      Swal.fire("Success", "Coupon created successfully", "success");
      reset();
      setIsOpen(false);
    } catch (err) {
      Swal.fire(
        "Error",
        err?.data?.message || "Failed to create coupon",
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
        <FaPlus className="mr-2" /> Add Coupon
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

            <h2 className="text-xl font-bold mb-4">Add New Coupon</h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              {/* Coupon Code */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Coupon Code
                </label>
                <input
                  {...register("code", { required: "Code is required" })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter coupon code"
                />
                {errors.code && (
                  <span className="text-red-500 text-sm">
                    {errors.code.message}
                  </span>
                )}
              </div>

              {/* Discount */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Discount (%)
                </label>
                <input
                  type="number"
                  {...register("discount", {
                    required: "Discount is required",
                    min: { value: 0, message: "Minimum is 0" },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter discount"
                />
                {errors.discount && (
                  <span className="text-red-500 text-sm">
                    {errors.discount.message}
                  </span>
                )}
              </div>

              {/* Select Product */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Select Product
                </label>
                <select
                  {...register("productId", { required: "Select a product" })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Select Product --</option>
                  {products?.products?.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
                </select>
                {errors.productId && (
                  <span className="text-red-500 text-sm">
                    {errors.productId.message}
                  </span>
                )}
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="date"
                  {...register("expiresAt")}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      )}
    </>
  );
};

export default AddCouponModal;
