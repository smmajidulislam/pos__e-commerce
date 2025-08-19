import PosLayout from "@/app/layouts/posRoutes/PosLayout";
import Expense from "@/app/pages/expense/Expense";

const page = () => {
  return (
    <PosLayout>
      <Expense />
    </PosLayout>
  );
};

export default page;
