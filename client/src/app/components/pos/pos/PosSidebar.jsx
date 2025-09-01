"use client";
import { useSelector, useDispatch } from "react-redux";
import PosSiderbarCustomer from "./PosSiderbarCustomer";
import PosOrderProducts from "./PosOrderProducts";
import PosPayment from "./PosPayment";
import PosPaymentMethod from "./PosPaymentMethod";
import { resetOrder, setCustomer } from "@/app/features/slice/posSlice";
import sawal from "sweetalert2";
import { useCreateSaleMutation } from "@/app/features/api/salesApi";

const PosSidebar = () => {
  const dispatch = useDispatch();
  const pos = useSelector((state) => state.pos);
  const [createSales] = useCreateSaleMutation();

  const handleSubmit = async () => {
    const { customerId, products, discount, discountType, tax, taxType, cash } =
      pos;

    if (!products.length) {
      return sawal.fire({ icon: "error", title: "No product found" });
    }
    if (!customerId) {
      return sawal.fire({ icon: "error", title: "No customer selected" });
    }

    const subtotal = products.reduce((sum, p) => sum + p.price, 0);
    const total = subtotal - discount + (subtotal * tax) / 100;
    const due = total - cash;

    const payload = {
      customerId,
      totalPayment: cash,
      due,
      products: products.map((p) => ({
        purchaseId: p.purchaseId,
        variantValueId: p.variantValueId,
        quantity: p.quantity,
        unitPrice: p.unitPrice,
        price: p.price,
        salesPrice:
          p.unitPrice * p.quantity -
          (p.discount || 0) +
          (p.taxType === "PERCENTAGE"
            ? (p.unitPrice * p.quantity * (p.tax || 0)) / 100
            : p.tax || 0),
        discountType: p.discountType,
        discount: p.discount,
        taxType: p.taxType,
        tax: p.tax,
        exchangeCal: p.exchangeCal,
        couponCode: null,
      })),
    };

    try {
      const res = await createSales(payload).unwrap();
      console.log(payload);
      console.log(res);
      if (res.success) {
        dispatch(resetOrder());
        sawal.fire("Success", "Sale created successfully!", "success");
      }
    } catch (error) {
      sawal.fire(
        "Error",
        error?.data?.message || "Failed to create sale",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 p-2">
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto min-h-0">
        <PosSiderbarCustomer />
        <PosOrderProducts />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <PosPayment />
        <PosPaymentMethod />

        <div className="flex gap-2">
          <button
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
            onClick={() => dispatch(resetOrder())}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-blue-500 !text-white py-2 rounded hover:bg-blue-600 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosSidebar;
