"use client";
import { useGetAttributeValuesQuery } from "@/app/features/api/attributeApi";
import { useGetCustomersQuery } from "@/app/features/api/customersApi";
import { useCreateSaleMutation } from "@/app/features/api/salesApi";
import { useGetPurchasesQuery } from "@/app/features/api/purchasesApi";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdatePriceMutation } from "@/app/features/api/getPrice";
import sawal from "sweetalert2";

const Sales = () => {
  const [errorsInGetprice, setError] = useState(false);
  const { data: customersData } = useGetCustomersQuery();
  const { data: attributeValuesData } = useGetAttributeValuesQuery();
  const { data: purchasesData } = useGetPurchasesQuery();
  const [getPrice, { isLoading: isPriceLoading }] = useUpdatePriceMutation();
  const [createSale] = useCreateSaleMutation();

  const customers = customersData?.customers || [];
  const purchases = purchasesData?.data || [];

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      customer: "",
      product: "",
      selectedVariant: "",
      variant: "",
      quantity: "",
      exchangeValue: "",
      discountType: "cash",
      discountValue: "",
      taxType: "cash",
      taxValue: "",
      paymentAmount: "",
      salesPrice: "",
    },
  });

  const [step, setStep] = useState(1);
  const [priceData, setPriceData] = useState({ amount: null, unitPrice: null });

  const selectedProduct = watch("product");
  const quantity = Number(watch("quantity")) || 0;
  const exchangeValue = Number(watch("exchangeValue")) || 0;
  const paymentAmount = Number(watch("paymentAmount")) || 0;
  const salesPrice = Number(watch("salesPrice")) || 0;

  // Selected Variant input update
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
        weight: exchangeValue,
        calQ: quantity,
        purchaseId: selectedProduct,
      };
      const response = await getPrice(payload).unwrap();
      setPriceData({
        amount: response.purchase?.amount || 0,
        unitPrice: response.unitPrice || 0,
      });
      setError(false);
      return true;
    } catch (error) {
      setPriceData({ amount: 0, unitPrice: 0 });
      setError(true);
      sawal.fire(
        "Error!",
        error?.data?.message || "Failed to fetch price.",
        "error"
      );
      return false;
    }
  };

  // Submit Sale
  const onSubmit = async (data) => {
    try {
      const salesPayload = {
        customerId: data.customer || "N/A",
        totalPayment: paymentAmount || 0,
        due: salesPrice - paymentAmount || 0,
        products: [
          {
            purchaseId: data.product || "N/A",
            variantValueId: data.variant || "N/A",
            quantity: quantity,
            unitPrice: priceData.unitPrice || 0,
            price: (priceData.unitPrice || 0) * quantity,
            salesPrice: salesPrice,
            discountType: "CASH",
            discount: Number(data.discountValue) || 0,
            taxType: "CASH",
            tax: Number(data.taxValue) || 0,
            exchangeCal: exchangeValue,
            couponCode: null,
          },
        ],
      };

      const response = await createSale(salesPayload).unwrap();
      if (response?.success) {
        sawal.fire("Success", "Sale Created Successfully", "success");
      }

      reset();
      setStep(1);
      setPriceData({ amount: null, unitPrice: null });
    } catch (error) {
      sawal.fire(
        "Error!",
        error?.data?.message || "Failed to create sale.",
        "error"
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-6">Sales Entry</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">Customer</label>
              <select
                {...register("customer")}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Customer</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">Product</label>
              <select
                {...register("product")}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Product</option>
                {purchases.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.product.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">
                Selected Variant
              </label>
              <input
                type="text"
                {...register("selectedVariant")}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">Variant</label>
              <select
                {...register("variant")}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Variant</option>
                {attributeValuesData?.attributeValues?.map((attr) => (
                  <option key={attr.id} value={attr.id}>
                    {attr.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                {...register("quantity")}
                placeholder="Quantity"
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">
              Exchange Value
            </label>
            <input
              type="number"
              {...register("exchangeValue")}
              placeholder="Enter Exchange Value"
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="text"
                value={priceData.amount ?? ""}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">
                Unit Price
              </label>
              <input
                type="text"
                value={priceData.unitPrice ?? ""}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">
                Sales Price
              </label>
              <input
                type="number"
                {...register("salesPrice")}
                placeholder="Enter Sales Price"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">
                Payment Amount
              </label>
              <input
                type="number"
                {...register("paymentAmount")}
                placeholder="Enter Payment Amount"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">Due</label>
              <input
                type="text"
                value={(salesPrice - paymentAmount).toFixed(2)}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>
          </div>
        )}

        {/* Step Controls */}
        <div
          className={`flex ${
            step === 1 ? "justify-end" : "justify-between"
          } mt-4`}
        >
          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                setStep((prev) => prev - 1);
                setError(false);
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Back
            </button>
          )}

          {step <= 2 ? (
            <button
              type="button"
              onClick={async () => {
                if (step === 1) setStep((prev) => prev + 1);
                else if (step === 2) {
                  const success = await getPriceCalculation();
                  if (success) setStep((prev) => prev + 1);
                }
              }}
              disabled={isPriceLoading || errorsInGetprice}
              className={`ml-auto px-4 py-2 rounded text-white ${
                isPriceLoading || errorsInGetprice
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isPriceLoading ? "Calculating..." : "Next"}
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 !text-white"
            >
              Confirm
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Sales;
