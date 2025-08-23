"use client";
import Link from "next/link";

export default function ProductCard({ name, price, oldPrice, image }) {
  return (
    <div className="rounded-xl w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 2xl:1/6 p-2 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 relative flex flex-col items-center justify-between h-[380px] border border-gray-200">
      <Link href={`/product/${name}`}>
        <div className="relative w-full flex flex-col items-center h-[350px]">
          {/* Sale Tag */}
          <span className="absolute -top-1 -left-1 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow z-20">
            On Sale
          </span>

          {/* Product Image */}
          <img
            src={image}
            alt={name}
            className="w-48 h-52 object-contain transform transition-transform duration-300 hover:scale-105 z-10 mt-4"
          />

          {/* Product Name */}
          <h3 className="mt-4 font-semibold text-gray-900 text-lg text-center">
            {name}
          </h3>

          {/* Price */}
          <p className="mt-2 text-red-600 font-bold text-lg text-center">
            Tk {price}{" "}
            <span className="line-through text-gray-400 text-sm ml-2">
              {oldPrice}
            </span>
          </p>
        </div>
      </Link>

      {/* Quick Add Button */}
      <button className="bg-orange-500 !text-white px-12 py-3 mt-5 rounded-full font-medium shadow hover:bg-orange-600 transition-colors duration-300 text-lg">
        Quick Add
      </button>
    </div>
  );
}
