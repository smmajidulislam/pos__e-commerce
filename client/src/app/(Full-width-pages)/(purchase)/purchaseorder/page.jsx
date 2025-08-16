import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import PurchaseOrder from "@/app/pages/(purchase)/purchaseorder/PurchaseOrder";

const page = () => {
  return (
    <>
      <PosLayout>
        <PurchaseOrder />
      </PosLayout>
    </>
  );
};

export default page;
