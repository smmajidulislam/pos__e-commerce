import React, { useState } from "react";

const ConvertNameModal = ({ isOpen, setIsOpen, productData }) => {
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [fromQty, setFromQty] = useState("");
  const [toQty, setToQty] = useState("");

  if (!isOpen) return null;

  const unitOptions = productData?.attributes || [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Convert Product Unit</h2>

        {/* Product Info */}
        <p>
          <b>Product:</b> {productData?.name}
        </p>
        <p>
          <b>SKU:</b> {productData?.sku}
        </p>
        <p>
          <b>Category:</b> {productData?.category?.name || "-"}
        </p>
        <p>
          <b>Store:</b> {productData?.store?.name || "-"}
        </p>

        {/* Conversion Fields */}
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {/* From Unit */}
            <div>
              <label className="block mb-1 font-medium">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Unit</option>
                {unitOptions.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.value}
                  </option>
                ))}
              </select>
            </div>

            {/* To Unit */}
            <div>
              <label className="block mb-1 font-medium">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select Unit</option>
                {unitOptions.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity Fields */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-1 font-medium">
                Exchange Calculation
              </label>
              <input
                type="number"
                value={fromQty}
                onChange={(e) => setFromQty(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Exchange Quantity
              </label>
              <input
                type="number"
                value={toQty}
                onChange={(e) => setToQty(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Close
          </button>
          <button
            onClick={() =>
              console.log({
                fromUnit, // selected id of "from"
                toUnit, // selected id of "to"
                fromQty,
                toQty,
                product: productData,
              })
            }
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConvertNameModal;
