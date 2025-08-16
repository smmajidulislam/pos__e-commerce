import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import Purchase from "@/app/pages/(purchase)/purchase/Purchase";

const page = () => {
  return (
    <>
      <PosLayout>
        <Purchase />
      </PosLayout>
    </>
  );
};

export default page;
