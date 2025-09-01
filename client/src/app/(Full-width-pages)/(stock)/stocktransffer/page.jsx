import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import StockManagement from "@/app/pages/(stock)/Stockadjust/StockManagement";

const page = () => {
  return (
    <>
      <PosLayout>
        <StockManagement />
      </PosLayout>
    </>
  );
};

export default page;
