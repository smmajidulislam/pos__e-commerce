import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import Suppliers from "@/app/pages/(people)/suppliers/Suppliers";

const page = () => {
  return (
    <>
      <PosLayout>
        <Suppliers />
      </PosLayout>
    </>
  );
};

export default page;
