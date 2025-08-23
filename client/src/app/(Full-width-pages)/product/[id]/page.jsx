"use client";

import { useState } from "react";

const images = ["/assets/p-1.jpg", "/assets/p-2.jpg", "/assets/p-3.jpg"];

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-full flex flex-wrap p-6 bg-white rounded-lg shadow-sm">
      {/* Left: Thumbnails + Main Image */}
      <div className="w-full md:w-1/2 flex flex-wrap">
        {/* Thumbnails */}
        <div
          className="
            flex gap-3 mr-0 md:mr-4 
            w-full md:w-20 
            overflow-x-auto md:overflow-y-auto 
            md:flex-wrap
            md:max-h-[520px]
            scrollbar-hide
          "
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 object-contain border rounded-md cursor-pointer transition hover:scale-105 
                ${
                  selectedImage === img
                    ? "border-2 border-orange-500"
                    : "border-gray-300"
                }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex justify-center items-center mt-4 md:mt-0 px-4">
          <img
            src={selectedImage}
            alt="Selected Product"
            className="w-full h-[320px] md:h-[520px] object-contain border rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Organic Spirulina Powder 250 gm
        </h1>

        <p className="text-xl font-semibold text-red-600 mb-4">Tk 1,200.00</p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button className="w-full bg-black !text-white py-3 rounded-md font-medium hover:bg-gray-800 transition">
            Add to Cart
          </button>
          <button className="w-full bg-orange-500 !text-white py-3 rounded-md font-medium hover:bg-orange-600 transition">
            ক্যাশ অন ডেলিভারিতে অর্ডার করুন
          </button>
          <button className="w-full bg-yellow-400 text-black py-3 rounded-md font-medium hover:bg-yellow-500 transition">
            Pay Online
          </button>
          <button className="w-full bg-purple-600 !text-white py-3 rounded-md font-medium hover:bg-purple-700 transition">
            Chat with Us
          </button>
          <button className="w-full bg-green-600 !text-white py-3 rounded-md font-medium hover:bg-green-700 transition">
            WhatsApp Us
          </button>
        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন: <br />
            📞 +8801321208940 <br />
            📞 হটলাইন: 09642-929929
          </p>
        </div>
      </div>
    </div>
  );
}
