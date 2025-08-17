"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Demo Data
const customerList = [
  { id: 1, name: "Customer One" },
  { id: 2, name: "Customer Two" },
  { id: 3, name: "Customer Three" },
];

const productList = [
  {
    id: 1,
    name: "12-M.M chari 6 Feet",
    company: "Abul khair steel Ltd",
    variants: ["6 Feet", "12 Feet", "18 Feet"],
  },
  {
    id: 2,
    name: "Rod 16-M.M",
    company: "BSRM Steel Ltd",
    variants: ["16-M.M", "20-M.M"],
  },
];

const Sales = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      customer: "",
      productName: "",
      variant: "",
      quantity: "",
      price: "",
      discountType: "",
      discountValue: "",
      tax: "",
      taxValue: "",
    },
  });

  const [customerSearch, setCustomerSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [productSearch, setProductSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const discountType = watch("discountType");
  const selectedTax = watch("tax");

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      discount: {
        type: data.discountType,
        value: data.discountValue,
      },
      tax: {
        type: data.tax,
        value: data.taxValue,
      },
    };
    console.log("Form Data:", finalData);

    reset();
    setSelectedCustomer(null);
    setSelectedProduct(null);
    setCustomerSearch("");
    setProductSearch("");
  };

  // Customer search
  const handleCustomerSearch = (value) => {
    setCustomerSearch(value);
    if (value.length > 0) {
      setFilteredCustomers(
        customerList.filter((c) =>
          c.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else setFilteredCustomers([]);
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerSearch(customer.name);
    setFilteredCustomers([]);
    setValue("customer", customer.name);
  };

  // Product search
  const handleProductSearch = (value) => {
    setProductSearch(value);
    if (value.length > 0) {
      setFilteredProducts(
        productList.filter((p) =>
          p.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else setFilteredProducts([]);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductSearch(product.name);
    setFilteredProducts([]);
    setValue("productName", product.name);
    setValue("company", product.company);
    setValue("variant", product.variants[0]);
  };

  const displayVariants = selectedProduct
    ? selectedProduct.variants
    : ["Select variant"];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-6">Sales Entry</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First Row: Customer + Product + Variant */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Customer */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Customer</label>
            <input
              type="text"
              placeholder="Search Customer"
              value={customerSearch}
              onChange={(e) => handleCustomerSearch(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
            />
            {filteredCustomers.length > 0 && (
              <ul className="absolute bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto z-10">
                {filteredCustomers.map((c) => (
                  <li
                    key={c.id}
                    onClick={() => handleSelectCustomer(c)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
            )}
            <input type="hidden" {...register("customer")} />
          </div>

          {/* Product */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Product</label>
            <input
              type="text"
              placeholder="Search Product"
              value={productSearch}
              onChange={(e) => handleProductSearch(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
            />
            {filteredProducts.length > 0 && (
              <ul className="absolute bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto z-10">
                {filteredProducts.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
            <input type="hidden" {...register("productName")} />
          </div>
          {/* Product */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Product key
            </label>
            <input
              type="text"
              placeholder="Product key"
              readOnly
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
            />

            <input type="hidden" {...register("productName")} />
          </div>

          {/* Variant */}
          <div>
            <label className="block text-sm font-medium mb-1">Variant</label>
            <select
              {...register("variant")}
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
              disabled={!selectedProduct}
            >
              {displayVariants.map((v, idx) => (
                <option key={idx} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Second Row: Quantity + Discount + Tax */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              {...register("quantity")}
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount
            </label>
            <div className="flex gap-2 sm:gap-3">
              <select
                {...register("discountType")}
                className="w-1/2 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:outline-none"
              >
                <option value="">Select Type</option>
                <option value="percentage">Percentage (%)</option>
                <option value="cash">Cash</option>
              </select>

              <input
                type="number"
                {...register("discountValue")}
                placeholder={
                  discountType === "percentage"
                    ? "Enter (%)"
                    : discountType === "cash"
                    ? "Enter Cash"
                    : "Enter discount"
                }
                className="w-1/2 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Tax */}
          <div>
            <label className="block text-sm font-medium mb-1">Tax</label>
            <div className="flex gap-2 sm:gap-3">
              <select
                {...register("tax")}
                className="w-1/2 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:outline-none"
              >
                <option value="">Select Type</option>
                <option value="withTax">Percentage (%)</option>
                <option value="withoutTax">Cash</option>
              </select>

              <input
                type="number"
                {...register("taxValue")}
                placeholder={
                  selectedTax === "withTax"
                    ? "Enter (%)"
                    : selectedTax === "withoutTax"
                    ? "Enter Cash"
                    : "Enter Tax"
                }
                className="w-1/2 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 !text-white rounded hover:bg-green-700 text-sm"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sales;
