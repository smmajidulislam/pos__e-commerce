import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import StockAdjustment from "@/app/pages/(stock)/Stockadjust/StockAdjustment";

const page = () => {
  return (
    <>
      <PosLayout>
        <StockAdjustment />
      </PosLayout>
    </>
  );
};

export default page;
