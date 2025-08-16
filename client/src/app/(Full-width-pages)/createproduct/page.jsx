"use client";
import AttributeSelector from "@/app/components/product/AttributeSelector";
import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [previewImages, setPreviewImages] = useState([]);

  const onSubmit = (data) => {
    console.log("Product Data:", data);
  };

  const inputClass =
    "border border-gray-300 rounded-md p-2 h-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";
  const labelClass = "block mb-1 font-semibold text-gray-700";

  const attributeGroups = {
    Weight: ["kg", "Ton"],
    Unit: ["Pcs", "Ban", "Bag", "Taka", "Ven"],
    Length: ["Feet", "Meter", "Square Feet", "Roll"],
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  return (
    <PosLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-2">New Product</h1>
        <p className="mb-6 text-gray-600">Create new Product</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap -mx-2"
        >
          {/* Store */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Store</label>
            <select {...register("store")} className={inputClass}>
              <option value="">Choose</option>
            </select>
          </div>

          {/* Warehouse */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Warehouse</label>
            <select {...register("warehouse")} className={inputClass}>
              <option value="">Choose</option>
            </select>
          </div>

          {/* Product Name */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Product Name</label>
            <input
              {...register("productName", { required: true })}
              className={inputClass}
            />
            {errors.productName && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          {/* Slug */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Slug</label>
            <input {...register("slug")} className={inputClass} />
          </div>

          {/* SKU */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>SKU</label>
            <div className="relative flex">
              <input
                {...register("sku")}
                placeholder="Enter SKU"
                className={`${inputClass} pr-24`}
              />
              <button
                type="button"
                onClick={() => {
                  const generatedSKU =
                    "SKU-" + Math.floor(Math.random() * 10000);
                  setValue("sku", generatedSKU);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 !text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Category</label>
            <select {...register("category")} className={inputClass}>
              <option value="">Choose</option>
            </select>
          </div>

          {/* Sub Category */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Sub Category</label>
            <select {...register("subCategory")} className={inputClass}>
              <option value="">Choose</option>
            </select>
          </div>

          {/* Sub Sub Category */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Sub Sub Category</label>
            <select {...register("subSubCategory")} className={inputClass}>
              <option value="">Choose</option>
            </select>
          </div>

          {/* Brand */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Brand</label>
            <select {...register("brand")} className={inputClass}>
              <option value="">Choose</option>
              <option value="General">General</option>
              <option value="Attribute">Attribute</option>
              <option value="Weight">Weight</option>
            </select>
          </div>

          {/* Item Code */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Item Code</label>
            <div className="relative flex">
              <input
                {...register("itemCode")}
                placeholder="Enter Item Code"
                className={`${inputClass} pr-24`}
              />
              <button
                type="button"
                onClick={() => {
                  const generatedCode =
                    "ITEM-" + Math.floor(Math.random() * 10000);
                  setValue("itemCode", generatedCode);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 
             bg-blue-600  !text-white 
             px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Quantity Alert */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Quantity Alert</label>
            <input
              type="number"
              {...register("quantityAlert")}
              className={inputClass}
            />
          </div>

          {/* Manufactured Date */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Manufactured Date</label>
            <input
              type="date"
              {...register("manufacturedDate")}
              className={inputClass}
            />
          </div>

          {/* Expiry On */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Expiry On</label>
            <input
              type="date"
              {...register("expiryOn")}
              className={inputClass}
            />
          </div>

          {/* Attribute - grouped checkboxes */}
          <AttributeSelector
            register={register}
            attributeGroups={attributeGroups}
          />

          {/* Images */}
          <div className="w-full px-2 mb-6">
            <label className={labelClass}>Images</label>
            <div className="flex flex-col md:flex-row gap-4">
              {/* File Input */}
              <input
                type="file"
                {...register("images")}
                className={inputClass + " md:w-1/3 w-full"}
                multiple
                onChange={handleImageChange}
              />

              {/* Preview Images (Always Visible) */}
              <div className="flex-1 border border-dashed border-gray-400 rounded-md p-3">
                {previewImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {previewImages.map((src, index) => (
                      <div
                        key={index}
                        className="relative w-full h-32 border rounded overflow-hidden group"
                      >
                        {/* Image */}
                        <img
                          src={src}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = previewImages.filter(
                              (_, i) => i !== index
                            );
                            setPreviewImages(updated);
                          }}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                    No images selected
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="w-full px-2 mb-4">
            <label className={labelClass}>Description</label>
            <textarea
              {...register("description")}
              placeholder="Please Enter Description (Max 60 characters)"
              maxLength={60}
              className="border border-gray-300 rounded-md p-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full px-2 mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 !text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </PosLayout>
  );
};

export default Page;
