import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import ProfitAndLossReport from "@/app/pages/(reports)/ProfitAndLossReport";

const page = () => {
  return (
    <PosLayout>
      <ProfitAndLossReport />
    </PosLayout>
  );
};

export default page;
