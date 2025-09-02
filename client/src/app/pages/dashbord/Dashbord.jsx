"use client";
import SalesChart from "@/app/components/pos/dashbord/Charts";
import ExpiredProducts from "@/app/components/pos/dashbord/ExpiredProducts";
import Information from "@/app/components/pos/dashbord/Information";
import RecentsOrders from "@/app/components/pos/dashbord/RecentsOrders";
import Reports from "@/app/components/pos/dashbord/Reports";
import { useUser } from "@/app/utils/saveUser/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashbord = () => {
  const { loading, user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [loading, user]);
  return (
    <div>
      <Information />
      <Reports />
      <div className="flex flex-wrap">
        <div className=" w-full md:w-2/3 lg:w-2/3">
          <SalesChart />
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3">
          <RecentsOrders />
        </div>
      </div>
      <ExpiredProducts />
    </div>
  );
};

export default Dashbord;
