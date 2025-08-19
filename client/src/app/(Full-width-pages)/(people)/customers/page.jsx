import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import Customers from "@/app/pages/(people)/customers/Customers";

const page = () => {
  return (
    <>
      <PosLayout>
        <Customers />
      </PosLayout>
    </>
  );
};

export default page;
