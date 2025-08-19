import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import Coupons from "@/app/pages/(coupons)/Coupons";

const page = () => {
  return (
    <>
      <PosLayout>
        <Coupons />
      </PosLayout>
    </>
  );
};

export default page;
