"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Dummy Data
const customerList = [
  { id: 1, name: "Customer One" },
  { id: 2, name: "Customer Two" },
  { id: 3, name: "Customer Three" },
];

const productList = [
  { id: 1, name: "12-M.M chari 6 Feet", company: "Abul Khair Steel Ltd" },
  { id: 2, name: "Rod 16-M.M", company: "BSRM Steel Ltd" },
];

const Sales = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      customer: "",
      productName: "",
      company: "",
      variant: "",
      exchangeValue: "",
      quantity: "",
      discountType: "",
      discountValue: "",
      tax: "",
      taxValue: "",
      paymentOption: "cash",
      paymentAmount: "",
      dueAmount: "",
    },
  });

  const [step, setStep] = useState(1);
  const [customerSearch, setCustomerSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [productSearch, setProductSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const discountType = watch("discountType");
  const selectedTax = watch("tax");
  const paymentOption = watch("paymentOption");

  const variantOptions = ["Ton", "Kg"];

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
  };

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      discount: { type: data.discountType, value: data.discountValue },
      tax: { type: data.tax, value: data.taxValue },
    };
    console.log("Form Data:", finalData);
    reset();
    setSelectedCustomer(null);
    setSelectedProduct(null);
    setCustomerSearch("");
    setProductSearch("");
    setStep(1);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-6">Sales Entry</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Customer */}
            <div className="relative flex flex-col">
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
            <div className="relative flex flex-col">
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
              <input type="hidden" {...register("company")} />
            </div>

            {/* Variant */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">Variant</label>
              <select
                {...register("variant")}
                className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
              >
                {variantOptions.map((v, idx) => (
                  <option key={idx} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                {...register("quantity")}
                placeholder="Quantity"
                className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">
              Exchange Value
            </label>
            <input
              type="number"
              {...register("exchangeValue")}
              placeholder="Enter Exchange Value"
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Discount */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium mb-2 sm:mb-0 sm:w-1/3">
                Discount
              </label>
              <div className="flex flex-1 gap-2">
                <select
                  {...register("discountType")}
                  className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:outline-none"
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
                  className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Tax */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 col-span-1 sm:col-span-1">
              <label className="block text-sm font-medium mb-2 sm:mb-0 sm:w-1/3">
                Tax
              </label>
              <div className="flex flex-1 gap-2">
                <select
                  {...register("tax")}
                  className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:outline-none"
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
                  className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Payment / Due */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium mb-2 sm:mb-0 sm:w-1/3">
                Payment Type
              </label>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="cash"
                      {...register("paymentOption")}
                      defaultChecked
                      className="form-radio text-green-600"
                    />
                    Cash
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="due"
                      {...register("paymentOption")}
                      className="form-radio text-green-600"
                    />
                    Due
                  </label>
                </div>

                {paymentOption === "cash" && (
                  <input
                    type="number"
                    {...register("paymentAmount")}
                    placeholder="Enter Payment Amount"
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
                  />
                )}

                {paymentOption === "due" && (
                  <div className="space-y-2">
                    <input
                      type="number"
                      {...register("paymentAmount")}
                      placeholder="Enter Payment Amount"
                      className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
                    />
                    <input
                      type="number"
                      {...register("dueAmount")}
                      placeholder="Enter Due Amount"
                      className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-200 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step Controls */}
        <div
          className={`flex ${
            step === 1 ? "justify-end" : "justify-between"
          } mt-4`}
        >
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm text-black"
            >
              Back
            </button>
          )}

          {step <= 3 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="ml-auto px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-sm !text-white"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm !text-white"
            >
              Confirm
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Sales;
