"use client";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useUpdatePurchaseMutation } from "@/app/features/api/purchasesApi";

// API hooks
import { useGetStoresQuery } from "@/app/features/api/storeApi";
import { useGetWarehousesQuery } from "@/app/features/api/warehouseApi";
import { useGetSuppliersQuery } from "@/app/features/api/supplierApi";
import { useGetProductsQuery } from "@/app/features/api/productApi";
import { useGetAttributeValuesQuery } from "@/app/features/api/attributeApi";
import { useGetExpensesQuery } from "@/app/features/api/expenseApi";
import { useGetWarrantiesQuery } from "@/app/features/api/warrantiesApi";
import sawal from "sweetalert2";

const EditPurchaseModal = ({ isOpen, setIsOpen, productData }) => {
  const { register, handleSubmit, reset, setValue, control } = useForm();
  const [updatePurchase, { isLoading }] = useUpdatePurchaseMutation();
  const [paymentType, setPaymentType] = useState("payment");
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseDue, setPurchaseDue] = useState(0);
  const [purchaseKey, setPurchaseKey] = useState("");
  const [selectedWarrantyDays, setSelectedWarrantyDays] = useState(0);

  // API Queries
  const { data: stores } = useGetStoresQuery();
  const { data: warehouses } = useGetWarehousesQuery();
  const { data: suppliers } = useGetSuppliersQuery();
  const { data: products } = useGetProductsQuery();
  const { data: attributeValues } = useGetAttributeValuesQuery();
  const { data: expenses } = useGetExpensesQuery();
  const { data: warranties } = useGetWarrantiesQuery();

  const inputClass =
    "border border-gray-300 rounded-md p-2 h-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";
  const labelClass = "block mb-1 font-semibold text-gray-700";
  const statusOptions = ["PENDING", "DELIVERED", "CANCELLED"];

  // Reset form whenever productData changes
  useEffect(() => {
    if (productData) {
      reset({
        store: productData.store?.id || "",
        warehouse: productData.warehouse?.id || "",
        supplier: productData.supplierId || "",
        product: productData.productId || "",
        attributeValue: productData.attributeValueId || "",
        status: productData.status || "PENDING",
        purchasePrice: productData.amount || 0,
        purchaseQuantity: productData.quantity || 0,
        commission: productData.commission || 0,
        paymentQuantity: productData.payment || 0,
        totalPrice: productData.amount || 0,
        purchaseDue: productData.due || 0,
        purchaseKey: productData.amountKey || "",
        warrantyId: productData.warrantyId || "",
        expenseCategory: productData.expenseCategoryId || "",
        expenseAmount: productData.expenseAmount || 0,
        expenseNotes: productData.expenseNotes || "",
      });
      setSelectedWarrantyDays(productData.warrantyDays || 0);
      setPaymentType(productData.paymentQuantity > 0 ? "payment" : "expense");
    }
  }, [productData, reset]);

  if (!isOpen || !productData) return null;

  // Watch for live calculation
  const purchasePrice = useWatch({ control, name: "purchasePrice" }) || 0;
  const purchaseQuantity = useWatch({ control, name: "purchaseQuantity" }) || 0;
  const commission = useWatch({ control, name: "commission" }) || 0;
  const paymentQuantity = useWatch({ control, name: "paymentQuantity" }) || 0;

  useEffect(() => {
    const calcTotal =
      Number(purchasePrice) * Number(purchaseQuantity) - Number(commission);
    const validTotal = calcTotal > 0 ? calcTotal : 0;
    const calcDue = validTotal - Number(paymentQuantity);
    setTotalPrice(validTotal);
    setPurchaseDue(calcDue > 0 ? calcDue : 0);

    // Generate key
    const alphabet = "abcdefghij";
    const key = String(validTotal)
      .split("")
      .map((d) => alphabet[parseInt(d, 10)] || "")
      .join("");
    setPurchaseKey(key);

    setValue("totalPrice", validTotal);
    setValue("purchaseDue", calcDue > 0 ? calcDue : 0);
    setValue("purchaseKey", key);
  }, [purchasePrice, purchaseQuantity, commission, paymentQuantity, setValue]);

  // Render options safely
  const renderOptions = (
    data,
    placeholder,
    valueKey = "id",
    labelKey = "name"
  ) => {
    if (!data) return <option value="">Loading...</option>;
    return (
      <>
        <option value="">{placeholder}</option>
        {data.map((item) => (
          <option key={item[valueKey]} value={item[valueKey]}>
            {item[labelKey]}
          </option>
        ))}
      </>
    );
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        id: productData.id,
        storeId: data.store || null,
        warehouseId: data.warehouse || null,
        supplierId: data.supplier || null,
        productId: data.product || null,
        attributeValueId: data.attributeValue || null,
        warrantyId: data.warrantyId || null,
        warrantyDays: selectedWarrantyDays,
        status: data.status || "PENDING",
        amount: Number(totalPrice),
        amountKey: purchaseKey,
        quantity: Number(purchaseQuantity),
        payment: Number(paymentQuantity),
        commission: Number(commission),
        due: Number(purchaseDue),
        expenseCategoryId: data.expenseCategory || null,
        expenseAmount: Number(data.expenseAmount || 0),
        expenseNotes: data.expenseNotes || "",
      };

      const res = await updatePurchase(payload).unwrap();
      if (res?.success) {
        sawal.fire("Success!", "Purchase updated successfully", "success");
      }
      setIsOpen(false);
    } catch (err) {
      sawal.fire(
        "Error!",
        err?.data?.message || "Failed to update purchase",
        "error"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 md:p-6 rounded-md w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Edit Purchase</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Store */}
          <div>
            <label className={labelClass}>Store</label>
            <select
              {...register("store")}
              className={inputClass}
              defaultValue={productData.store?.id || ""}
            >
              {renderOptions(stores?.stores, "Choose Store")}
            </select>
          </div>

          {/* Warehouse */}
          <div>
            <label className={labelClass}>Warehouse</label>
            <select
              {...register("warehouse")}
              className={inputClass}
              defaultValue={productData.warehouse?.id || ""}
            >
              {renderOptions(warehouses?.warehouses, "Choose Warehouse")}
            </select>
          </div>

          {/* Supplier */}
          <div>
            <label className={labelClass}>Supplier</label>
            <select
              {...register("supplier")}
              className={inputClass}
              defaultValue={productData.supplierId || ""}
            >
              {renderOptions(suppliers?.suppliers, "Choose Supplier")}
            </select>
          </div>

          {/* Product */}
          <div>
            <label className={labelClass}>Product</label>
            <select
              {...register("product")}
              className={inputClass}
              defaultValue={productData.productId || ""}
            >
              {renderOptions(products?.products, "Choose Product")}
            </select>
          </div>

          {/* Variant */}
          <div>
            <label className={labelClass}>Variant</label>
            <select
              {...register("attributeValue")}
              className={inputClass}
              defaultValue={productData.attributeValueId || ""}
            >
              {renderOptions(
                attributeValues?.attributeValues,
                "Choose Variant",
                "id",
                "value"
              )}
            </select>
          </div>

          {/* Warranty */}
          <div>
            <label className={labelClass}>Warranty</label>
            <select
              {...register("warrantyId")}
              className={inputClass}
              defaultValue={productData.warrantyId || ""}
              onChange={(e) => {
                const w = warranties?.warranty?.find(
                  (w) => w.id === e.target.value
                );
                setSelectedWarrantyDays(w?.days || 0);
              }}
            >
              <option value="">Choose Warranty</option>
              {warranties?.warranty?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div>
            <label className={labelClass}>Warranty Days</label>
            <input
              type="number"
              value={selectedWarrantyDays}
              readOnly
              className={`${inputClass} bg-gray-100`}
            />
          </div> */}

          {/* Status */}
          <div>
            <label className={labelClass}>Status</label>
            <select
              {...register("status")}
              className={inputClass}
              defaultValue={productData.status || "PENDING"}
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Payment / Expense Toggle */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex gap-6 mb-4">
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
              <div>
                <label className={labelClass}>Purchase Price</label>
                <input
                  type="number"
                  {...register("purchasePrice")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Quantity</label>
                <input
                  type="number"
                  {...register("purchaseQuantity")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Commission</label>
                <input
                  type="number"
                  {...register("commission")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Total Price</label>
                <input
                  type="number"
                  value={totalPrice}
                  readOnly
                  className={`${inputClass} bg-gray-100`}
                />
              </div>
              <div>
                <label className={labelClass}>Payment</label>
                <input
                  type="number"
                  {...register("paymentQuantity")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Purchase Due</label>
                <input
                  type="number"
                  value={purchaseDue}
                  readOnly
                  className={`${inputClass} bg-gray-100`}
                />
              </div>
              <div>
                <label className={labelClass}>Purchase Key</label>
                <input
                  type="text"
                  value={purchaseKey}
                  readOnly
                  className={`${inputClass} bg-gray-100`}
                />
              </div>
            </>
          )}

          {/* Expense Fields */}
          {paymentType === "expense" && (
            <>
              <div>
                <label className={labelClass}>Expense Category</label>
                <select
                  {...register("expenseCategory")}
                  className={inputClass}
                  defaultValue={productData.expenseCategoryId || ""}
                >
                  {renderOptions(expenses?.expenses, "Choose Expense")}
                </select>
              </div>
              <div>
                <label className={labelClass}>Expense Amount</label>
                <input
                  type="number"
                  {...register("expenseAmount")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Notes</label>
                <input
                  type="text"
                  {...register("expenseNotes")}
                  placeholder="Notes / Details"
                  className={inputClass}
                />
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end gap-2 mt-4">
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
              className={`px-4 py-2 rounded-md bg-blue-600 !text-white hover:bg-blue-700 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Updating..." : "Update Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPurchaseModal;
