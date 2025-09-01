import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import PurchaseReport from "@/app/pages/(reports)/PurchaseReport";

const page = () => {
  return (
    <PosLayout>
      <PurchaseReport />
    </PosLayout>
  );
};

export default page;
