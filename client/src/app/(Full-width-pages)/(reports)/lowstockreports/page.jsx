import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import LowStockReport from "@/app/pages/(reports)/LowStockReport";

const page = () => {
  return (
    <PosLayout>
      <LowStockReport />
    </PosLayout>
  );
};

export default page;
