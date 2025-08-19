"use client";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const PosOrderProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", qty: 1, price: 100 },
    { id: 2, name: "Product 2", qty: 2, price: 150 },
    { id: 3, name: "Product 3", qty: 2, price: 150 },
    { id: 5, name: "Product 4", qty: 2, price: 150 },
    { id: 6, name: "Product 4", qty: 2, price: 150 },
    { id: 7, name: "Product 4", qty: 2, price: 150 },
    { id: 8, name: "Product 4", qty: 2, price: 150 },
    { id: 9, name: "Product 4", qty: 2, price: 150 },
    { id: 10, name: "Product 4", qty: 2, price: 150 },
    { id: 11, name: "Product 4", qty: 2, price: 150 },
    { id: 12, name: "Product 4", qty: 2, price: 150 },
  ]);

  const handleQtyChange = (id, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Math.max(1, Number(value)) } : p
      )
    );
  };

  const handleIncrement = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  };

  const handleDecrement = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))
    );
  };

  const handleRemove = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-white p-1 rounded shadow overflow-y-auto scrollbar-hide max-h-[500px]">
      <h3 className="font-semibold mb-1 text-xs">Selected Products</h3>
      <table className="w-full text-left text-xs border-separate border-spacing-0">
        <thead>
          <tr className="border-b">
            <th className="py-0.5 px-1 w-5">SL</th>
            <th className="py-0.5 px-1">Product</th>
            <th className="py-0.5 px-1 w-20 text-center">Qty</th>
            <th className="py-0.5 px-1 w-5 text-center">Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} className="border-b">
              <td className="py-0.5 px-1">{i + 1}</td>
              <td className="py-0.5 px-1">{p.name}</td>
              <td className="py-0.5 px-1 text-center">
                <div className="flex justify-center items-center gap-1">
                  <button
                    onClick={() => handleDecrement(p.id)}
                    className="bg-gray-200 text-xs w-4 h-4 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={p.qty}
                    onChange={(e) => handleQtyChange(p.id, e.target.value)}
                    className="border p-0.5 w-10 rounded text-center text-xs"
                    min={1}
                  />
                  <button
                    onClick={() => handleIncrement(p.id)}
                    className="bg-gray-200 text-xs w-4 h-4 rounded"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="py-0.5 px-1 text-center">
                <div className="flex justify-center items-center h-full">
                  <FaTrash
                    className="text-red-500 cursor-pointer text-xs"
                    onClick={() => handleRemove(p.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PosOrderProducts;
