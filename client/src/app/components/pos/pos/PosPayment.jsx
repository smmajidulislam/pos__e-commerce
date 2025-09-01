"use client";
import { useDispatch, useSelector } from "react-redux";
import { setDiscount, setTax, setCash } from "@/app/features/slice/posSlice";

const PosPayment = () => {
  const dispatch = useDispatch();
  const { products, discount, tax, cash } = useSelector((state) => state.pos);

  const subtotal = products.reduce((sum, p) => sum + p.price, 0);
  const total = subtotal - discount + (subtotal * tax) / 100;
  const due = total - cash;

  return (
    <div className="bg-white p-2 rounded shadow text-xs">
      <h3 className="font-semibold mb-1">Payment</h3>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount:</span>
          <input
            type="number"
            value={discount}
            onChange={(e) => dispatch(setDiscount(Number(e.target.value)))}
            className="border p-0.5 w-16 rounded text-xs"
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Tax (%):</span>
          <input
            type="number"
            value={tax}
            onChange={(e) => dispatch(setTax(Number(e.target.value)))}
            className="border p-0.5 w-16 rounded text-xs"
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Paid:</span>
          <input
            type="number"
            value={cash}
            onChange={(e) => dispatch(setCash(Number(e.target.value)))}
            className="border p-0.5 w-16 rounded text-xs"
          />
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>${total}</span>
        </div>
        <div className="flex justify-between font-semibold text-red-500">
          <span>Due:</span>
          <span>${due}</span>
        </div>
      </div>
    </div>
  );
};

export default PosPayment;
