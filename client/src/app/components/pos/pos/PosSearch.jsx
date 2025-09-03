"use client";
import React, { useState, useMemo } from "react";
import { useGetProductsQuery } from "@/app/features/api/productApi";
import { useDispatch } from "react-redux";
import { setProductId } from "@/app/features/slice/posSlice";

const PosSearch = () => {
  const [selectedProduct, setSelectedProduct] = useState("null");
  const { data, isLoading, isError } = useGetProductsQuery();
  const dispatch = useDispatch();

  // product list বানানো
  const products = useMemo(() => {
    if (!data?.products) return [];
    return [
      { id: "null", name: "All Products" },
      ...data.products.map((p) => ({
        id: p.id,
        name: p.name,
      })),
    ];
  }, [data]);

  const handleChange = (e) => {
    setSelectedProduct(e.target.value);
    dispatch(setProductId(e.target.value));
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center bg-white rounded shadow">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500 bg-white rounded shadow">
        Error loading products
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow">
      {/* Left side: Title */}
      <div className="text-lg font-semibold text-gray-700">Products</div>

      {/* Right side: Product Select */}
      <div className="ml-4">
        <select
          value={selectedProduct}
          onChange={handleChange}
          className="w-48 sm:w-64 border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
        >
          {products.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PosSearch;
