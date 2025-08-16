"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Purchase = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [paymentType, setPaymentType] = useState("payment"); // default payment

  const inputClass =
    "border border-gray-300 rounded-md p-2 h-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";
  const labelClass = "block mb-1 font-semibold text-gray-700";

  const units = ["Pcs", "Ban", "Bag", "Taka", "Ven"]; // Unit options
  const statuss = ["Pending", "Delivered", "Cancelled"];

  const onSubmit = (data) => {
    console.log("Product Data:", data);
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-2">New Purchase</h1>
      <p className="mb-6 text-gray-600">Create new purchase</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap -mx-2">
        {/* Store */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Store</label>
          <select {...register("store")} className={inputClass}>
            <option value="">Choose Store</option>
          </select>
        </div>

        {/* Warehouse */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Warehouse</label>
          <select {...register("warehouse")} className={inputClass}>
            <option value="">Choose Warehouse</option>
          </select>
        </div>

        {/* Product Name */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Product Name</label>
          <input
            {...register("productName", { required: true })}
            className={inputClass}
          />
          {errors.productName && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>
        {/* Unit Name (select field) */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Unit Name</label>
          <select {...register("unitName")} className={inputClass}>
            <option value="">Select Unit</option>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        {/* Status (select field) */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Unit Name</label>
          <select {...register("status")} className={inputClass}>
            <option value="">Select Status</option>
            {statuss?.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Radio Buttons */}
        <div className="flex gap-6 mb-4 w-full px-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="payment"
              checked={paymentType === "payment"}
              onChange={() => setPaymentType("payment")}
            />
            Payment
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="expense"
              checked={paymentType === "expense"}
              onChange={() => setPaymentType("expense")}
            />
            Expense
          </label>
        </div>

        {/* Payment Fields */}
        {paymentType === "payment" && (
          <>
            {/* Purchase Price */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Purchase Amount</label>
              <input {...register("purchasePrice")} className={inputClass} />
            </div>
            {/* Purchase Price secrect key*/}
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Purchase Secrect Key</label>
              <input
                {...register("purchasePriceSecret")}
                className={inputClass}
              />
            </div>

            {/* Purchase Quantity */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Purchase Quantity</label>
              <input {...register("purchaseQuantity")} className={inputClass} />
            </div>

            {/* Payment Quantity */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Payment </label>
              <input {...register("paymentQuantity")} className={inputClass} />
            </div>

            {/* Commission */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Commission</label>
              <input {...register("commission")} className={inputClass} />
            </div>
          </>
        )}

        {/* Expense Fields */}
        {paymentType === "expense" && (
          <>
            {/* Expense Category (select field) */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Expense Category</label>
              <select {...register("expenseCategory")} className={inputClass}>
                <option value="">Select Category</option>
                <option value="salary">Salary</option>
                <option value="rent">Rent</option>
                <option value="utility">Utility</option>
                <option value="misc">Miscellaneous</option>
              </select>
            </div>

            {/* Expense Amount */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Expense Amount</label>
              <input {...register("expenseAmount")} className={inputClass} />
            </div>

            {/* Expense Notes / Details */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Notes / Details</label>
              <input
                {...register("expenseNotes")}
                className={inputClass}
                placeholder="Enter notes or details"
              />
            </div>
          </>
        )}

        {/* Submit */}
        <div className="w-full px-2 mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 !text-white px-6 py-4 rounded-md hover:bg-blue-700"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Purchase;
