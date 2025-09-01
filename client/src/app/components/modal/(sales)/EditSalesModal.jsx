"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useGetAttributeValuesQuery } from "@/app/features/api/attributeApi";
import { useGetCustomersQuery } from "@/app/features/api/customersApi";
import { useGetPurchasesQuery } from "@/app/features/api/purchasesApi";
import {
  useUpdateSaleMutation,
  useGetSaleByIdQuery,
} from "@/app/features/api/salesApi";
import { useUpdatePriceMutation } from "@/app/features/api/getPrice";
import sawal from "sweetalert2";

const EditSalesModal = ({ isOpen, setIsOpen, initialData, onSuccess }) => {
  const { data: customersData } = useGetCustomersQuery();
  const { data: attributeValuesData } = useGetAttributeValuesQuery();
  const { data: purchasesData } = useGetPurchasesQuery();

  const [getPrice, { isLoading: isPriceLoading }] = useUpdatePriceMutation();
  const [updateSale] = useUpdateSaleMutation();

  const customers = customersData?.customers || [];
  const purchases = purchasesData?.data || [];

  // fetch full sale by id
  const { data: saleDetails, isFetching } = useGetSaleByIdQuery(
    initialData?.id,
    {
      skip: !initialData?.id,
    }
  );

  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const [step, setStep] = useState(1);
  const [errorsInGetprice, setError] = useState(false);
  const [priceData, setPriceData] = useState({ amount: null, unitPrice: null });

  const discountType = watch("discountType");
  const discountValue = Number(watch("discountValue")) || 0;
  const selectedProduct = watch("product");
  const quantity = watch("quantity");
  const exchangeValue = watch("exchangeValue");
  const taxType = watch("taxType");
  const taxValue = Number(watch("taxValue")) || 0;
  const paymentAmount = Number(watch("paymentAmount")) || 0;
  const watchedSalesPrice = Number(watch("salesPrice")) || 0;

  // set default values when data is loaded
  useEffect(() => {
    if (saleDetails?.sale) {
      const s = saleDetails.sale;
      reset({
        customer: s.customerId || "",
        product: s.purchaseId || "",
        selectedVariant: s.variant?.value || "",
        variant: s.variantValueId || "",
        quantity: s.quantity || "",
        exchangeValue: s.exchangeCal || "",
        discountType: s.discountType?.toLowerCase() || "cash",
        discountValue: s.discount || "",
        taxType: s.taxType?.toLowerCase() || "cash",
        taxValue: s.tax || "",
        paymentAmount: s.salesPrice - s.due || "",
        salesPrice: s.salesPrice || "",
      });

      setPriceData({
        amount: s.price || null,
        unitPrice: s.unitPrice || null,
      });
    }
  }, [saleDetails, reset]);

  // update selected variant when product changes
  useEffect(() => {
    if (selectedProduct) {
      const purchase = purchases.find((p) => p.id === selectedProduct);
      setValue("selectedVariant", purchase?.attribute?.value || "");
    } else {
      setValue("selectedVariant", "");
    }
  }, [selectedProduct, purchases, setValue]);

  // Get Price Calculation
  const getPriceCalculation = async () => {
    try {
      const payload = {
        weight: Number(exchangeValue) || 0,
        calQ: Number(quantity) || 0,
        purchaseId: selectedProduct,
      };
      const response = await getPrice(payload).unwrap();
      setPriceData({
        amount: response.purchase?.amount || null,
        unitPrice: response.unitPrice || null,
      });
      setError(false);
      return true;
    } catch (error) {
      setPriceData({ amount: null, unitPrice: null });
      setError(true);
      sawal.fire(
        "Error!",
        error?.data?.message || "Failed to fetch price.",
        "error"
      );
      return false;
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        id: initialData.id,
        customerId: data.customer,
        purchaseId: data.product,
        variantValueId: data.variant,
        exchangeCal: Number(data.exchangeValue) || 0,
        quantity: Number(data.quantity) || 0,
        discountType: data.discountType?.toUpperCase() || "CASH",
        discount: discountValue,
        unitPrice: Number(priceData.unitPrice) || 0,
        salesPrice: watchedSalesPrice,
        taxType: taxType?.toUpperCase() || "CASH",
        tax: taxValue,
        price: priceData.amount || 0,
        due: watchedSalesPrice - paymentAmount,
      };

      const res = await updateSale(payload).unwrap();
      if (res.success) {
        sawal.fire("Success", "Sale updated successfully!", "success");
        setIsOpen(false);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      sawal.fire(
        "Error",
        error?.data?.message || "Failed to update sale.",
        "error"
      );
    }
  };

  if (!isOpen) return null;

  if (isFetching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Sale</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1 */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {/* Customer */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Customer</label>
                <select
                  {...register("customer")}
                  className="border p-2 rounded"
                >
                  <option value="">Select Customer</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.firstName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Product</label>
                <select {...register("product")} className="border p-2 rounded">
                  <option value="">Select Product</option>
                  {purchases.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.product.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Variant */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                  Selected Variant
                </label>
                <input
                  {...register("selectedVariant")}
                  readOnly
                  className="border p-2 rounded bg-gray-100"
                />
              </div>

              {/* Variant */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Variant</label>
                <select {...register("variant")} className="border p-2 rounded">
                  <option value="">Select Variant</option>
                  {attributeValuesData?.attributeValues?.map((attr) => (
                    <option key={attr.id} value={attr.id}>
                      {attr.value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  {...register("quantity")}
                  className="border p-2 rounded"
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <label className="text-sm font-medium mb-1">Exchange Value</label>
              <input
                type="number"
                {...register("exchangeValue")}
                className="border p-2 rounded w-full"
              />
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Amount</label>
                <input
                  value={priceData.amount ?? ""}
                  readOnly
                  className="border p-2 rounded w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Unit Price</label>
                <input
                  value={priceData.unitPrice ?? ""}
                  readOnly
                  className="border p-2 rounded w-full bg-gray-100"
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium">Discount</label>
                <div className="flex gap-2">
                  <select
                    {...register("discountType")}
                    className="border p-2 rounded"
                  >
                    <option value="cash">Cash</option>
                    <option value="percentage">Percentage (%)</option>
                  </select>
                  <input
                    type="number"
                    {...register("discountValue")}
                    className="border p-2 rounded flex-1"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium">Tax</label>
                <div className="flex gap-2">
                  <select
                    {...register("taxType")}
                    className="border p-2 rounded"
                  >
                    <option value="cash">Cash</option>
                    <option value="percentage">Percentage (%)</option>
                  </select>
                  <input
                    type="number"
                    {...register("taxValue")}
                    className="border p-2 rounded flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Sales Price</label>
                <input
                  type="number"
                  {...register("salesPrice")}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Payment Amount</label>
                <input
                  type="number"
                  {...register("paymentAmount")}
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Due</label>
                <input
                  value={(watchedSalesPrice - paymentAmount).toFixed(2)}
                  readOnly
                  className="border p-2 rounded bg-gray-100 w-full"
                />
              </div>
            </div>
          )}

          {/* Step Controls */}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Back
              </button>
            )}

            {step <= 2 ? (
              <button
                type="button"
                onClick={async () => {
                  if (step === 1) setStep(2);
                  else if (step === 2) {
                    const success = await getPriceCalculation();
                    if (success) setStep(3);
                  }
                }}
                disabled={isPriceLoading || errorsInGetprice}
                className="px-4 py-2 bg-green-600 !text-white rounded"
              >
                {isPriceLoading ? "Calculating..." : "Next"}
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 !text-white rounded"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSalesModal;
