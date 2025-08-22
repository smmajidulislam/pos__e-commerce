"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useGetStoresQuery } from "@/app/features/api/storeApi";
import { useGetWarehousesQuery } from "@/app/features/api/warehouseApi";
import { useGetCategoriesQuery } from "@/app/features/api/categoryApi";
import { useGetBrandsQuery } from "@/app/features/api/brandApi";
import { useGetAttributesQuery } from "@/app/features/api/attributeApi";
import { useUpdateProductMutation } from "@/app/features/api/productApi";
import AttributeSelector from "@/app/components/product/AttributeSelector";

const EditProductModal = ({ isOpen, setIsOpen, productData }) => {
  const { data: storeData } = useGetStoresQuery();
  const { data: wareHouseData } = useGetWarehousesQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: brandData } = useGetBrandsQuery();
  const { data: attributeValuesData } = useGetAttributesQuery();

  const [updateProduct] = useUpdateProductMutation();
  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const attributeGroups = {};
  if (attributeValuesData?.attributes) {
    attributeValuesData.attributes.forEach((attrGroup) => {
      attributeGroups[attrGroup.name] = attrGroup.values || [];
    });
  }

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
      quantityAlert: productData?.quantityAlert || "",
      attributes: productData?.attributeValueIds || [],
      price: productData?.price || "",
      description: productData?.description || "",
    },
  });

  useEffect(() => {
    if (productData?.images) {
      setPreviewImages(productData.images); // assume URL array
    }
  }, [productData]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...(data.productName && { name: data.productName }),
        ...(data.description && { description: data.description }),
        ...(data.sku && { sku: data.sku }),
        ...(data.slug && { slug: data.slug }),
        ...(data.store && { storeId: data.store }),
        ...(data.warehouse && { warehouseId: data.warehouse }),
        ...(data.category && { categoryId: data.category }),
        ...(data.subCategory && { subCategoryId: data.subCategory }),
        ...(data.subSubCategory && { subSubCategoryId: data.subSubCategory }),
        ...(data.brand && { brandId: data.brand }),
        ...(data.attributes?.length > 0 && {
          attributeValueIds: data.attributes,
        }),
        ...(data.price ? { price: Number(data.price) } : {}),
        ...(data.quantityAlert
          ? { quantityAlert: Number(data.quantityAlert) }
          : {}),
        // images handling will depend on backend
      };

      await updateProduct({ id: productData.id, ...updatedData }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Product updated successfully!",
      });

      setIsOpen(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update product!",
      });
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap -mx-2"
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

          {/* Attribute Selector */}
          <AttributeSelector
            register={register}
            attributeGroups={attributeGroups}
          />

          {/* Images */}
          <div className="w-full px-2 mb-6">
            <label className={labelClass}>Images</label>
            <input
              type="file"
              {...register("images")}
              className={inputClass + " md:w-1/3 w-full"}
              multiple
              onChange={handleImageChange}
            />
            <div className="flex mt-2 gap-2">
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

          {/* Description */}
          <div className="w-full px-2 mb-4">
            <label className={labelClass}>Description</label>
            <textarea
              {...register("description")}
              placeholder="Please Enter Description"
              className="border border-gray-300 rounded-md p-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="w-full px-2 mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 !text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
