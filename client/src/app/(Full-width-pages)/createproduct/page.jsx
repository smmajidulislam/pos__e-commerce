"use client";
import AttributeSelector from "@/app/components/product/AttributeSelector";
import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useGetStoresQuery } from "@/app/features/api/storeApi";
import { useGetWarehousesQuery } from "@/app/features/api/warehouseApi";
import { useGetCategoriesQuery } from "@/app/features/api/categoryApi";
import { useGetBrandsQuery } from "@/app/features/api/brandApi";
import { useGetAttributesQuery } from "@/app/features/api/attributeApi";
import { useCreateProductMutation } from "@/app/features/api/productApi";
import { useGetSubSubCategoriesQuery } from "@/app/features/api/subsubCategoriesApi";
import { useGetSubCategoriesQuery } from "@/app/features/api/subCategoriesApi";

const Page = () => {
  // API calls
  const { data: storeData } = useGetStoresQuery();
  const { data: wareHouseData } = useGetWarehousesQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: brandData } = useGetBrandsQuery();
  const { data: attributeValuesData } = useGetAttributesQuery();
  const { data: subCategoryData } = useGetSubCategoriesQuery();
  const { data: subSubCategoryData } = useGetSubSubCategoriesQuery();

  const [createProduct] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Attribute groups
  const attributeGroups = {};
  if (attributeValuesData?.attributes) {
    attributeValuesData.attributes.forEach((attrGroup) => {
      attributeGroups[attrGroup.name] = attrGroup.values || [];
    });
  }

  const onSubmit = async (data) => {
    try {
      const productData = {
        name: data.productName || "",
        description: data.description || "",
        sku: data.sku || "",
        slug: data.slug || "",
        storeId: data.store || "",
        warehouseId: data.warehouse || "",
        categoryId: data.category || "",
        subCategoryId: data.subCategory || "",
        subSubCategoryId: data.subSubCategory || "",
        brandId: data.brand || "",
        attributeValueIds: Array.isArray(data.attributes)
          ? data.attributes
          : data.attributes
          ? [data.attributes]
          : [],
        price: data.price ? Number(data.price) : 0,
        itemCode: data.itemCode || "",
        quantityAlert: data.quantityAlert ? Number(data.quantityAlert) : 0,
        manufacturedDate: data.manufacturedDate
          ? new Date(data.manufacturedDate).toISOString()
          : undefined,
        expiryDate: data.expiryOn
          ? new Date(data.expiryOn).toISOString()
          : undefined,
      };

      await createProduct(productData).unwrap();
      reset();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product created successfully!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.data?.message || "Failed to create product!",
      });
    }
  };

  const inputClass =
    "border border-gray-300 rounded-md p-2 h-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";
  const labelClass = "block mb-1 font-semibold text-gray-700";

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
                onClick={() =>
                  setValue("sku", "SKU-" + Math.floor(Math.random() * 10000))
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 !text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Generate
              </button>
            </div>
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
                onClick={() =>
                  setValue(
                    "itemCode",
                    "ITEM-" + Math.floor(Math.random() * 10000)
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 !text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Generate
              </button>
            </div>
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

          {/* Expiry Date */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Expiry Date</label>
            <input
              type="date"
              {...register("expiryOn")}
              className={inputClass}
            />
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
            <select {...register("subCategory")} className={inputClass}>
              <option value="">Choose</option>
              {subCategoryData?.subCategories?.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Sub Category */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Sub Sub Category</label>
            <select {...register("subSubCategory")} className={inputClass}>
              <option value="">Choose</option>
              {subSubCategoryData?.subSubCategories?.map((subSub) => (
                <option key={subSub.id} value={subSub.id}>
                  {subSub.name}
                </option>
              ))}
            </select>
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

          {/* Quantity Alert */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label className={labelClass}>Quantity Alert</label>
            <input
              type="number"
              {...register("quantityAlert")}
              className={inputClass}
            />
          </div>

          {/* Attribute Selector */}
          <AttributeSelector
            register={register}
            attributeGroups={attributeGroups}
          />

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

          {/* Submit */}
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
