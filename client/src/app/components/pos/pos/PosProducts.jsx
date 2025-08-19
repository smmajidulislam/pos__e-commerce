"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Demo Product Data
const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: 120,
    category: "Electronics",
    subcategory: "Wearables",
    images: [
      "/images/product1-1.jpg",
      "/images/product1-2.jpg",
      "/images/product1-3.jpg",
    ],
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 80,
    category: "Shoes",
    subcategory: "Sports",
    images: [
      "/images/product2-1.jpg",
      "/images/product2-2.jpg",
      "/images/product2-3.jpg",
    ],
  },
  {
    id: 3,
    name: "Leather Bag",
    price: 150,
    category: "Fashion",
    subcategory: "Accessories",
    images: [
      "/images/product3-1.jpg",
      "/images/product3-2.jpg",
      "/images/product3-3.jpg",
    ],
  },
  {
    id: 4,
    name: "Leather Bag 2",
    price: 150,
    category: "Fashion",
    subcategory: "Accessories",
    images: [
      "/images/product3-1.jpg",
      "/images/product3-2.jpg",
      "/images/product3-3.jpg",
    ],
  },
  {
    id: 5,
    name: "Leather Bag 3",
    price: 150,
    category: "Fashion",
    subcategory: "Accessories",
    images: [
      "/images/product3-1.jpg",
      "/images/product3-2.jpg",
      "/images/product3-3.jpg",
    ],
  },
  {
    id: 6,
    name: "Leather Bag 4",
    price: 150,
    category: "Fashion",
    subcategory: "Accessories",
    images: [
      "/images/product3-1.jpg",
      "/images/product3-2.jpg",
      "/images/product3-3.jpg",
    ],
  },
  {
    id: 7,
    name: "Smart Watch 2",
    price: 120,
    category: "Electronics",
    subcategory: "Wearables",
    images: [
      "/images/product1-1.jpg",
      "/images/product1-2.jpg",
      "/images/product1-3.jpg",
    ],
  },
  {
    id: 8,
    name: "Running Shoes 2",
    price: 80,
    category: "Shoes",
    subcategory: "Sports",
    images: [
      "/images/product2-1.jpg",
      "/images/product2-2.jpg",
      "/images/product2-3.jpg",
    ],
  },
  {
    id: 9,
    name: "Leather Bag 5",
    price: 150,
    category: "Fashion",
    subcategory: "Accessories",
    images: [
      "/images/product3-1.jpg",
      "/images/product3-2.jpg",
      "/images/product3-3.jpg",
    ],
  },
  {
    id: 10,
    name: "Leather Bag 6",
    price: 150,
    category: "Fashion",
    subcategory: "Accessories",
    images: [
      "/images/product3-1.jpg",
      "/images/product3-2.jpg",
      "/images/product3-3.jpg",
    ],
  },
];

const PosProducts = () => {
  const [currentImages, setCurrentImages] = useState(products.map(() => 0));
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // প্রতি পেজে কত product দেখাবে

  // Auto change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) =>
        prev.map((index, i) => (index + 1) % products[i].images.length)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="flex flex-col h-full ">
      {/* Products Grid */}
      <div className="flex flex-wrap justify-around gap-2 p-2 overflow-y-auto flex-1">
        {currentProducts.map((product, i) => (
          <div
            key={product.id}
            className="w-56 bg-white rounded shadow p-2 flex-shrink-0 cursor-pointer border border-blue-400"
          >
            <div className="relative w-full h-32 mb-1 rounded overflow-hidden">
              <Image
                src={product.images[currentImages[indexOfFirst + i]]}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="text-gray-700 font-semibold text-sm">
              {product.name}
            </div>
            <div className="text-xs text-gray-500">{product.category}</div>
            <div className="text-[10px] text-gray-400">
              {product.subcategory}
            </div>
            <div className="text-blue-600 font-bold text-sm">
              ${product.price}
            </div>
          </div>
        ))}
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
