"use client";
import { useDispatch, useSelector } from "react-redux";
import { updateQty, removeProduct } from "@/app/features/slice/posSlice";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const PosOrderProducts = () => {
  const { products } = useSelector((state) => state.pos);
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-1 rounded shadow overflow-y-auto max-h-[500px]">
      <h3 className="font-semibold mb-1 text-xs">Selected Products</h3>
      <table className="w-full text-left text-xs border-separate border-spacing-0">
        <thead>
          <tr className="border-b">
            <th className="py-0.5 px-1 w-5">SL</th>
            <th className="py-0.5 px-1">Product</th>
            <th className="py-0.5 px-1 w-24 text-center">Qty</th>
            <th className="py-0.5 px-1 w-5 text-center">Remove</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((p, i) => (
            <tr key={p.purchaseId} className="border-b">
              <td className="py-0.5 px-1">{i + 1}</td>
              <td className="py-0.5 px-1">{p.name || "Product"}</td>
              <td className="py-0.5 px-1 text-center">
                <div className="flex justify-center items-center gap-1">
                  <button
                    className="p-1 bg-gray-200 rounded"
                    onClick={() =>
                      dispatch(
                        updateQty({
                          purchaseId: p.purchaseId,
                          quantity: Math.max(1, p.quantity - 1),
                        })
                      )
                    }
                  >
                    <FaMinus size={10} />
                  </button>
                  <input
                    type="number"
                    value={p.quantity}
                    onChange={(e) =>
                      dispatch(
                        updateQty({
                          purchaseId: p.purchaseId,
                          quantity: Number(e.target.value),
                        })
                      )
                    }
                    className="border p-0.5 w-10 rounded text-center text-xs"
                    min={1}
                  />
                  <button
                    className="p-1 bg-gray-200 rounded"
                    onClick={() =>
                      dispatch(
                        updateQty({
                          purchaseId: p.purchaseId,
                          quantity: p.quantity + 1,
                        })
                      )
                    }
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
              </td>
              <td className="py-0.5 px-1 text-center">
                <FaTrash
                  className="text-red-500 cursor-pointer text-xs"
                  onClick={() => dispatch(removeProduct(p.purchaseId))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PosOrderProducts;
