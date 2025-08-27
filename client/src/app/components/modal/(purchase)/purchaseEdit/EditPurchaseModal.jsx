"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import sawal from "sweetalert2";
import { useUpdatePurchaseMutation } from "@/app/features/api/purchasesApi";
import { useGetStoresQuery } from "@/app/features/api/storeApi";
import { useGetWarehousesQuery } from "@/app/features/api/warehouseApi";
import { useGetSuppliersQuery } from "@/app/features/api/supplierApi";
import { useGetProductsQuery } from "@/app/features/api/productApi";
import { useGetAttributeValuesQuery } from "@/app/features/api/attributeApi";

const EditPurchaseModal = ({ isOpen, setIsOpen, productData }) => {
  const { register, handleSubmit, reset, watch } = useForm();

  // API Queries
  const { data: stores } = useGetStoresQuery();
  const { data: warehouses } = useGetWarehousesQuery();
  const { data: suppliers } = useGetSuppliersQuery();
  const { data: products } = useGetProductsQuery();
  const { data: attributeValues } = useGetAttributeValuesQuery();

  const [updatePurchase, { isLoading }] = useUpdatePurchaseMutation();

  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseDue, setPurchaseDue] = useState(0);
  const [purchaseKey, setPurchaseKey] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const inputClass =
    "border border-gray-300 rounded-md p-2 h-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";
  const labelClass = "block mb-1 font-semibold text-gray-700";

  const statuss = ["PENDING", "DELIVERED", "CANCELLED"];

  const purchasePrice = watch("purchasePrice") || 0;
  const purchaseQuantity = watch("purchaseQuantity") || 0;
  const commission = watch("commission") || 0;
  const paymentQuantity = watch("paymentQuantity") || 0;

  // সংখ্যা থেকে key বানানো
  const numberToKey = (num) => {
    const alphabet = "abcdefghij";
    return String(num)
      .split("")
      .map((digit) => alphabet[parseInt(digit, 10)])
      .join("");
  };

  // productData এলে ফর্ম reset
  useEffect(() => {
    if (productData) {
      reset({
        store: productData.storeId,
        warehouse: productData.warehouseId,
        supplier: productData.supplierId,
        product: productData.productId,
        attributeValue: productData.attributeValueId,
        status: productData.status,
        purchasePrice:
          productData.amount && productData.quantity > 0
            ? productData.amount / productData.quantity
            : 0,
        purchaseQuantity: productData.quantity,
        commission: productData.commission,
        paymentQuantity: productData.payment,
      });

      setTotalPrice(productData.amount || 0);
      setPurchaseDue(productData.due || 0);
      setPurchaseKey(
        productData.amountKey || numberToKey(productData.amount || 0)
      );
      setIsEdited(false);
    }
  }, [productData, reset]);

  // user input edit হলে calculation হবে
  useEffect(() => {
    // check if user edited any value
    if (
      purchasePrice !== (productData?.amount / productData?.quantity || 0) ||
      purchaseQuantity !== (productData?.quantity || 0) ||
      commission !== (productData?.commission || 0) ||
      paymentQuantity !== (productData?.payment || 0)
    ) {
      setIsEdited(true);
    }
  }, [
    purchasePrice,
    purchaseQuantity,
    commission,
    paymentQuantity,
    productData,
  ]);

  const onSubmit = async (data) => {
    const payload = {
      storeId: data.store,
      warehouseId: data.warehouse,
      supplierId: data.supplier,
      productId: data.product,
      attributeValueId: data.attributeValue,
      status: data.status,
      amount: Number(totalPrice),
      amountKey: purchaseKey,
      quantity: Number(purchaseQuantity),
      payment: Number(paymentQuantity),
      commission: Number(commission),
      due: Number(purchaseDue),
    };

    try {
      await updatePurchase({ id: productData.id, payload }).unwrap();
      sawal.fire("Success", "Purchase updated successfully", "success");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      sawal.fire("Error", "Failed to update purchase", "error");
    }
  };

  if (!isOpen) return null;

  const renderOptions = (data, placeholder, labelKey = "name") => (
    <>
      <option value="">{placeholder}</option>
      {data?.map((item) => (
        <option key={item.id} value={item.id}>
          {item[labelKey] || item.value}
        </option>
      ))}
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Edit Purchase</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap -mx-2 gap-2"
        >
          {/* Store */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Store</label>
            <select {...register("store")} className={inputClass}>
              {renderOptions(stores?.stores, "Choose Store", "name")}
            </select>
          </div>

          {/* Warehouse */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Warehouse</label>
            <select {...register("warehouse")} className={inputClass}>
              {renderOptions(
                warehouses?.warehouses,
                "Choose Warehouse",
                "name"
              )}
            </select>
          </div>

          {/* Supplier */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Supplier</label>
            <select {...register("supplier")} className={inputClass}>
              {renderOptions(suppliers?.suppliers, "Choose Supplier", "name")}
            </select>
          </div>

          {/* Product */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Product</label>
            <select {...register("product")} className={inputClass}>
              {renderOptions(products?.products, "Choose Product", "name")}
            </select>
          </div>

          {/* Attribute Value */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Variant</label>
            <select {...register("attributeValue")} className={inputClass}>
              {renderOptions(
                attributeValues?.attributeValues,
                "Choose Variant",
                "value"
              )}
            </select>
          </div>

          {/* Status */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Status</label>
            <select {...register("status")} className={inputClass}>
              <option value="">Select Status</option>
              {statuss.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Purchase Price */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Purchase Price</label>
            <input
              type="number"
              {...register("purchasePrice")}
              className={inputClass}
            />
          </div>

          {/* Quantity */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Quantity</label>
            <input
              type="number"
              {...register("purchaseQuantity")}
              className={inputClass}
            />
          </div>

          {/* Commission */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Commission</label>
            <input
              type="number"
              {...register("commission")}
              className={inputClass}
            />
          </div>

          {/* Total */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Total Amount</label>
            <input
              type="number"
              value={totalPrice}
              readOnly
              className={`${inputClass} bg-gray-100`}
            />
          </div>

          {/* Payment */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Payment</label>
            <input
              type="number"
              {...register("paymentQuantity")}
              className={inputClass}
            />
          </div>

          {/* Due */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Due</label>
            <input
              type="number"
              value={purchaseDue}
              readOnly
              className={`${inputClass} bg-gray-100`}
            />
          </div>

          {/* Key */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className={labelClass}>Purchase Key</label>
            <input
              type="text"
              value={purchaseKey}
              readOnly
              className={`${inputClass} bg-gray-100`}
            />
          </div>

          {/* Buttons */}
          <div className="w-full px-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-md !text-white ${
                isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Saving..." : "Update Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPurchaseModal;
