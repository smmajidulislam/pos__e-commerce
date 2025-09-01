import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import Permissions from "@/app/pages/(people)/Permissions/Permissions";

const page = () => {
  return (
    <>
      <PosLayout>
        <Permissions />
      </PosLayout>
    </>
  );
};

export default page;
