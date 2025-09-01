"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useGetWarehousesQuery } from "@/app/features/api/warehouseApi";
import { useCreateStockExchangeMutation } from "@/app/features/api/stockExchangeApi";
import { useGetProductsQuery } from "@/app/features/api/productApi";

const AddStockTransffer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedAttributeValueId, setSelectedAttributeValueId] = useState(""); // attributeValueId রাখবো এখানে
  const [fromWarehouseName, setFromWarehouseName] = useState(""); // warehouse name দেখানোর জন্য
  const [createStockExchange] = useCreateStockExchangeMutation();

  const { data: warehouseData } = useGetWarehousesQuery();
  const { data: productdata } = useGetProductsQuery();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const selectedProductId = watch("productId");

  // যখন product change হবে তখন attribute আর warehouse সেট হবে
  useEffect(() => {
    if (selectedProductId) {
      const product = productdata?.products?.find(
        (p) => p.id === selectedProductId
      );
      if (product) {
        const attr = product?.attributes?.[0];
        setSelectedAttribute(attr?.value || "");
        setSelectedAttributeValueId(attr?.id || ""); // এখানে attributeValueId সেট করছি
        setFromWarehouseName(product?.warehouse?.name || "");
      }
    } else {
      setSelectedAttribute("");
      setSelectedAttributeValueId("");
      setFromWarehouseName("");
    }
  }, [selectedProductId, productdata]);

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);

      const product = productdata?.products?.find(
        (p) => p.id === data.productId
      );

      const payload = {
        productId: data.productId,
        attributeValueId: selectedAttributeValueId, // এখন সঠিকভাবে valueId যাচ্ছে
        transferQty: Number(data.transferQty),
        fromWarehouseId: product?.warehouseId, // product থেকে warehouseId নিচ্ছে
        toWarehouseId: data.toWarehouseId,
      };

      console.log("Payload:", payload); // Debug দেখার জন্য

      const response = await createStockExchange(payload).unwrap();
      console.log("Stock Transfer Created:", response);
      reset();
      setIsOpen(false);
    } catch (err) {
      console.error("Form Submission Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <FaPlus className="mr-2" /> Add New Transfer
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-4">Add New Transfer</h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              {/* Product Select */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Product
                </label>
                <select
                  {...register("productId", {
                    required: "Product is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Product</option>
                  {productdata?.products?.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {errors.productId && (
                  <span className="text-red-500 text-sm">
                    {errors.productId.message}
                  </span>
                )}
              </div>

              {/* Attribute (Readonly) */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Attribute
                </label>
                <input
                  value={selectedAttribute}
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* From Warehouse (Readonly) */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  From Warehouse
                </label>
                <input
                  value={fromWarehouseName}
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
                />
              </div>

              {/* To Warehouse */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  To Warehouse
                </label>
                <select
                  {...register("toWarehouseId", {
                    required: "To warehouse is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Destination Warehouse</option>
                  {warehouseData?.warehouses?.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
                {errors.toWarehouseId && (
                  <span className="text-red-500 text-sm">
                    {errors.toWarehouseId.message}
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  {...register("transferQty", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter quantity"
                />
                {errors.transferQty && (
                  <span className="text-red-500 text-sm">
                    {errors.transferQty.message}
                  </span>
                )}
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStockTransffer;
