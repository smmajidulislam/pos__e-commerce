"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useGetStoresQuery } from "@/app/features/api/storeApi";
import { useGetWarehousesQuery } from "@/app/features/api/warehouseApi";
import { useGetSuppliersQuery } from "@/app/features/api/supplierApi";
import { useGetProductsQuery } from "@/app/features/api/productApi";
import { useGetAttributeValuesQuery } from "@/app/features/api/attributeApi";
import { useGetExpensesQuery } from "@/app/features/api/expenseApi";
import { useCreatePurchaseMutation } from "@/app/features/api/purchasesApi";
import { useGetWarrantiesQuery } from "@/app/features/api/warrantiesApi";
import sawal from "sweetalert2";

const Purchase = () => {
  const { register, handleSubmit, watch, reset } = useForm();

  // API Queries
  const { data: stores, isLoading: storesLoading } = useGetStoresQuery();
  const { data: warehouses, isLoading: warehousesLoading } =
    useGetWarehousesQuery();
  const { data: suppliers, isLoading: suppliersLoading } =
    useGetSuppliersQuery();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const { data: attributeValues, isLoading: attributeValuesLoading } =
    useGetAttributeValuesQuery();
  const { data: expenses, isLoading: expensesLoading } = useGetExpensesQuery();
  const { data: warranties } = useGetWarrantiesQuery();

  // API Mutations
  const [createPurchase, { isLoading }] = useCreatePurchaseMutation();

  // States
  const [paymentType, setPaymentType] = useState("payment");
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseDue, setPurchaseDue] = useState(0);
  const [purchaseKey, setPurchaseKey] = useState("");
  const [selectedWarrantyDays, setSelectedWarrantyDays] = useState(0); // New state for warranty days

  const inputClass =
    "border border-gray-300 rounded-md p-2 h-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";
  const labelClass = "block mb-1 font-semibold text-gray-700";

  const statuss = ["PENDING", "DELIVERED", "CANCELLED"];

  // Watching Form values
  const purchasePrice = watch("purchasePrice") || 0;
  const purchaseQuantity = watch("purchaseQuantity") || 0;
  const commission = watch("commission") || 0;
  const paymentQuantity = watch("paymentQuantity") || 0;

  // Helper: number to key
  const numberToKey = (num) => {
    const alphabet = "abcdefghij"; // 0-9
    return String(num)
      .split("")
      .map((digit) => alphabet[parseInt(digit, 10)])
      .join("");
  };

  // Auto calculation
  useEffect(() => {
    const calcTotal =
      Number(purchasePrice) * Number(purchaseQuantity) - Number(commission);
    const validTotal = calcTotal > 0 ? calcTotal : 0;
    setTotalPrice(validTotal);

    const calcDue = validTotal - Number(paymentQuantity);
    setPurchaseDue(calcDue > 0 ? calcDue : 0);

    // generate key from total price
    setPurchaseKey(numberToKey(validTotal));
  }, [purchasePrice, purchaseQuantity, commission, paymentQuantity]);

  const onSubmit = async (data) => {
    const payload = {
      storeId: data.store,
      warehouseId: data.warehouse,
      supplierId: data.supplier,
      productId: data.product,
      attributeValueId: data.attributeValue,
      warrantyId: data.warrantyId,
      warrantyDays: selectedWarrantyDays, // include days
      status: data.status,
      amount: Number(totalPrice),
      amountKey: purchaseKey,
      quantity: Number(purchaseQuantity),
      payment: Number(paymentQuantity),
      commission: Number(commission),
      due: Number(purchaseDue),
    };

    const response = await createPurchase(payload).unwrap();

    if (response) {
      sawal.fire("Success", "Purchase created successfully", "success");
      reset();
      setSelectedWarrantyDays(0); // reset warranty days
    }
  };

  // Dropdown render helper
  const renderOptions = (data, loading, placeholder) => {
    if (loading) return <option>Loading...</option>;
    return (
      <>
        <option value="">{placeholder}</option>
        {data?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </>
    );
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
            {renderOptions(stores?.stores, storesLoading, "Choose Store")}
          </select>
        </div>

        {/* Warehouse */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Warehouse</label>
          <select {...register("warehouse")} className={inputClass}>
            {renderOptions(
              warehouses?.warehouses,
              warehousesLoading,
              "Choose Warehouse"
            )}
          </select>
        </div>

        {/* Supplier */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Supplier</label>
          <select {...register("supplier")} className={inputClass}>
            {renderOptions(
              suppliers?.suppliers,
              suppliersLoading,
              "Choose Supplier"
            )}
          </select>
        </div>

        {/* Product */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Product</label>
          <select {...register("product")} className={inputClass}>
            {renderOptions(
              products?.products,
              productsLoading,
              "Choose Product"
            )}
          </select>
        </div>

        {/* Attribute Value */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Variant (Attribute Value)</label>
          <select {...register("attributeValue")} className={inputClass}>
            {attributeValuesLoading ? (
              <option>Loading...</option>
            ) : (
              <>
                <option value="">Choose Variant</option>
                {attributeValues?.attributeValues?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.value}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        {/* Warranty */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Warranty</label>
          <select
            {...register("warrantyId")}
            className={inputClass}
            onChange={(e) => {
              const selectedId = e.target.value;
              const warrantyItem = warranties?.warranty?.find(
                (w) => w.id === selectedId
              );
              setSelectedWarrantyDays(warrantyItem?.days || 0);
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

        {/* Display selected warranty days */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
          <label className={labelClass}>Warranty Days</label>
          <input
            type="number"
            value={selectedWarrantyDays}
            readOnly
            className={`${inputClass} bg-gray-100`}
          />
        </div>

        {/* Status */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
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
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>
                Single Variant Purchase Price
              </label>
              <input
                type="number"
                {...register("purchasePrice")}
                className={inputClass}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Purchase Quantity</label>
              <input
                type="number"
                {...register("purchaseQuantity")}
                className={inputClass}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Total Commission</label>
              <input
                type="number"
                {...register("commission")}
                className={inputClass}
              />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Total Price</label>
              <input
                type="number"
                value={totalPrice}
                readOnly
                className={`${inputClass} bg-gray-100`}
              />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Payment</label>
              <input
                type="number"
                {...register("paymentQuantity")}
                className={inputClass}
              />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Purchase Due</label>
              <input
                type="number"
                value={purchaseDue}
                readOnly
                className={`${inputClass} bg-gray-100`}
              />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
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
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Expense Category</label>
              <select {...register("expenseCategory")} className={inputClass}>
                {renderOptions(
                  expenses?.expenses,
                  expensesLoading,
                  "Choose Expense"
                )}
              </select>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <label className={labelClass}>Expense Amount</label>
              <input {...register("expenseAmount")} className={inputClass} />
            </div>
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
            disabled={isLoading}
            className={`px-6 py-3 rounded-md ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } !text-white`}
          >
            {isLoading ? "Saving..." : "Save Purchase"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Purchase;
