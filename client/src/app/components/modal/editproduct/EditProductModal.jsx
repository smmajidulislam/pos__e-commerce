"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useGetStoresQuery } from "@/app/features/api/storeApi";
import { useGetWarehousesQuery } from "@/app/features/api/warehouseApi";
import { useGetCategoriesQuery } from "@/app/features/api/categoryApi";
import { useGetBrandsQuery } from "@/app/features/api/brandApi";
import { useGetAttributesQuery } from "@/app/features/api/attributeApi";
import { useUpdateProductMutation } from "@/app/features/api/productApi";
import { useAddProductImagesMutation } from "@/app/features/api/productImageApi";
import { useGetSubSubCategoriesQuery } from "@/app/features/api/subsubCategoriesApi";
import { useGetSubCategoriesQuery } from "@/app/features/api/subCategoriesApi";

const EditProductModal = ({ isOpen, setIsOpen, productData }) => {
  const { data: storeData } = useGetStoresQuery();
  const { data: wareHouseData } = useGetWarehousesQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: subCategoryData } = useGetSubCategoriesQuery();
  const { data: subSubCategoryData } = useGetSubSubCategoriesQuery();
  const { data: brandData } = useGetBrandsQuery();
  const { data: attributeValuesData } = useGetAttributesQuery();

  const [addProductImages] = useAddProductImagesMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState(
    productData?.attributes?.map((attr) => attr.id) || []
  );
  const [isAttrDropdownOpen, setIsAttrDropdownOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      store: productData?.storeId || "",
      warehouse: productData?.warehouseId || "",
      productName: productData?.name || "",
      sku: productData?.sku || "",
      slug: productData?.slug || "",
      category: productData?.categoryId || "",
      subCategory: productData?.subCategoryId || "",
      subSubCategory: productData?.subSubCategoryId || "",
      brand: productData?.brandId || "",
      quantityAlert: productData?.quantityAlert || 0,
      attributes: productData?.attributes?.map((a) => a.id) || [],
      price: productData?.price || "",
      description: productData?.description || "",
    },
  });

  useEffect(() => {
    if (productData?.images) setPreviewImages(productData.images);
  }, [productData]);

  // handle attributes
  const handleAttributeChange = (attrId) => {
    const updated = selectedAttributes.includes(attrId)
      ? selectedAttributes.filter((id) => id !== attrId)
      : [...selectedAttributes, attrId];
    setSelectedAttributes(updated);
    setValue("attributes", updated);
  };

  // form submit (details update)
  const onSubmitDetails = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.productName);
      formData.append("sku", data.sku);
      formData.append("slug", data.slug);
      formData.append("storeId", data.store);
      formData.append("warehouseId", data.warehouse);
      formData.append("categoryId", data.category);
      if (data.subCategory) formData.append("subCategoryId", data.subCategory);
      if (data.subSubCategory)
        formData.append("subSubCategoryId", data.subSubCategory);
      formData.append("brandId", data.brand);
      formData.append("quantityAlert", data.quantityAlert);
      formData.append("description", data.description);
      if (selectedAttributes.length > 0)
        selectedAttributes.forEach((id) =>
          formData.append("attributeValueIds[]", id)
        );
      if (data.price) formData.append("price", Number(data.price));

      await updateProduct({ id: productData.id, body: formData }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Product details updated successfully!",
      });
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update product details!",
      });
    }
  };

  const onSubmitImages = async (e) => {
    e.preventDefault();
    console.log(productData);

    try {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("images", file));

      // API call
      const res = await addProductImages({
        productId: productData.id,
        formData,
      }).unwrap();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    "border border-gray-300 rounded-md p-2 h-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";
  const labelClass = "block mb-1 font-semibold text-gray-700";

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-auto p-4">
      <div className="bg-white rounded-md w-full max-w-4xl p-6">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        {/* FORM 1: PRODUCT DETAILS */}
        <form
          onSubmit={handleSubmit(onSubmitDetails)}
          encType="multipart/form-data"
          className="flex flex-wrap -mx-2 mb-8 border-b pb-6"
        >
          {/* Store */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Store</label>
            <select
              {...register("store", { required: true })}
              className={inputClass}
            >
              <option value="">Choose</option>
              {storeData?.stores?.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          {/* Warehouse */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Warehouse</label>
            <select {...register("warehouse")} className={inputClass}>
              <option value="">Choose</option>
              {wareHouseData?.warehouses?.map((wh) => (
                <option key={wh.id} value={wh.id}>
                  {wh.name}
                </option>
              ))}
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
                onClick={() =>
                  setValue("sku", "SKU-" + Math.floor(Math.random() * 10000))
                }
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
              {categoryData?.categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Sub Category</label>
            <input
              {...register("subCategory")}
              placeholder="Enter Sub Category"
              className={inputClass}
            />
          </div>

          {/* Sub Sub Category */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Sub Sub Category</label>
            <input
              {...register("subSubCategory")}
              placeholder="Enter Sub Sub Category"
              className={inputClass}
            />
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

          {/* Brand */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Brand</label>
            <select {...register("brand")} className={inputClass}>
              <option value="">Choose</option>
              {brandData?.brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Attributes Dropdown */}
          <div className="w-full px-2 mb-4 relative">
            <label className={labelClass}>Attributes</label>
            <div
              className={`${inputClass} cursor-pointer flex justify-between items-center`}
              onClick={() => setIsAttrDropdownOpen((prev) => !prev)}
            >
              <span>
                {selectedAttributes.length > 0
                  ? attributeValuesData?.attributes
                      ?.flatMap((g) => g.values)
                      .filter((v) => selectedAttributes.includes(v.id))
                      .map((v) => v.value)
                      .join(", ")
                  : "Select Attributes"}
              </span>
              {isAttrDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {isAttrDropdownOpen && (
              <div className="absolute z-50 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-auto p-2 shadow-md">
                {attributeValuesData?.attributes?.map((attrGroup) => (
                  <div key={attrGroup.id} className="mb-2">
                    <p className="font-semibold text-gray-600">
                      {attrGroup.name}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {attrGroup.values?.map((val) => (
                        <label
                          key={val.id}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            value={val.id}
                            checked={selectedAttributes.includes(val.id)}
                            onChange={() => handleAttributeChange(val.id)}
                            className="h-4 w-4"
                          />
                          <span>{val.value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="w-full px-2 mb-4">
            <label className={labelClass}>Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter description"
              className="border border-gray-300 rounded-md p-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="w-full px-2 mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-400 !text-white px-6 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 !text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Update Details
            </button>
          </div>
        </form>

        {/* FORM 2: ONLY IMAGES */}
        <form onSubmit={onSubmitImages} encType="multipart/form-data">
          <div className="w-full px-2 mb-6">
            <label className={labelClass}>Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setImageFiles(files);
                setPreviewImages(files.map((f) => URL.createObjectURL(f)));
              }}
              className={inputClass}
            />
            <div className="flex mt-2 gap-2 flex-wrap">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <div className="w-full px-2 mt-6 flex justify-end gap-2">
            <button
              type="submit"
              className="bg-green-600 !text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Upload Images
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
