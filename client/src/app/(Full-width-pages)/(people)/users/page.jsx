import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import Users from "@/app/pages/(people)/users/Users";

const page = () => {
  return (
    <>
      <PosLayout>
        <Users />
      </PosLayout>
    </>
  );
};

export default page;
