"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useGetPurchasesQuery } from "@/app/features/api/purchasesApi";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/app/features/slice/posSlice";

const PosProducts = () => {
  const dispatch = useDispatch();
  const customerId = useSelector((state) => state.pos.customerId);
  const categoryId = useSelector((state) => state.pos.categoryId);
  const subCategoryId = useSelector((state) => state.pos.subCategoryId);
  const subSubCategoryId = useSelector((state) => state.pos.subSubCategoryId);
  const productId = useSelector((state) => state.pos.productId);
  console.log("==============>", subCategoryId);
  console.log("==============>", subSubCategoryId);
  console.log("==============>", productId);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // এখন categoryId dependency হিসেবে যাবে
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetPurchasesQuery(categoryId);

  // Track current image index for each product
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    if (productsData?.data) {
      setCurrentImages(productsData.data.map(() => 0));
    }
  }, [productsData]);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (productsData?.data) {
        setCurrentImages((prev) =>
          prev.map((index, i) => {
            const product = productsData.data[i];
            const imagesLength = product?.product?.images?.length || 1;
            return (index + 1) % imagesLength;
          })
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [productsData]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts =
    productsData?.data?.slice(indexOfFirst, indexOfLast) || [];
  const totalPages =
    Math.ceil(productsData?.data?.length / productsPerPage) || 0;

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Error fetching products
      </div>
    );
  if (!productsData?.data?.length)
    return <div className="p-4 text-center">No products found</div>;

  return (
    <div className="flex flex-col">
      {/* Products Grid */}
      <div className="flex flex-wrap justify-around gap-2 p-2 overflow-y-auto flex-1">
        {currentProducts.map((item, i) => {
          const product = item.product;
          const productImages = product?.images || [];
          const imageIndex = currentImages[indexOfFirst + i] || 0;

          return (
            <div
              key={item.id}
              className="w-56 bg-white rounded shadow p-2 flex-shrink-0 cursor-pointer border border-blue-400"
              onClick={() =>
                dispatch(
                  addProduct({
                    customerId,
                    purchaseId: item.id,
                    variantValueId: item.attributeValueId,
                    exchangeCal: 1.0,
                    unitPrice: item.amount,
                  })
                )
              }
            >
              {/* Auto Slider Image */}
              <div className="relative w-full h-32 mb-1 rounded overflow-hidden">
                <Image
                  src={productImages[imageIndex]?.url || "/images/default.jpg"}
                  alt={product?.name || "Product"}
                  fill
                  className="object-cover rounded"
                />
              </div>

              {/* Product Info */}
              <div className="text-gray-700 font-semibold text-sm">
                {product?.name}
              </div>
              <div className="text-blue-600 font-bold text-sm">
                ${item.amount || 0}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 p-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PosProducts;
