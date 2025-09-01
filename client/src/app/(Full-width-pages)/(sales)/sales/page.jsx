import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import Sales from "@/app/pages/(sales)/sales/Sales";
import React from "react";

const page = () => {
  return (
    <PosLayout>
      <Sales />
    </PosLayout>
  );
};

export default page;
