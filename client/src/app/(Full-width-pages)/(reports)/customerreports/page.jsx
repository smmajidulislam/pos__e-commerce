import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import CustomersReport from "@/app/pages/(reports)/CustomersReport";

const page = () => {
  return (
    <PosLayout>
      <CustomersReport />
    </PosLayout>
  );
};

export default page;
