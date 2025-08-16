import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import SubCategory from "@/app/pages/subcategory/SubCategory";
import React from "react";

const page = () => {
  return (
    <>
      <PosLayout>
        <SubCategory />
      </PosLayout>
    </>
  );
};

export default page;
