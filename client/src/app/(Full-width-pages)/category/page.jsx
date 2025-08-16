import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import Category from "@/app/pages/category/Category";
import React from "react";

const page = () => {
  return (
    <>
      <PosLayout>
        <Category />
      </PosLayout>
    </>
  );
};

export default page;
