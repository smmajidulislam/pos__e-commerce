"use client";

import {
  FaUsers,
  FaTruck,
  FaFileInvoiceDollar,
  FaShoppingCart,
} from "react-icons/fa";
import InformationCardSkeleton from "./SkeltionInformation";
import ReportCard from "./ReportCard";
import { useGetDashboardQuery } from "@/app/features/api/reports";

const Reports = () => {
  const { data: dashboard, isLoading } = useGetDashboardQuery();

  // ডাটা থেকে কাউন্ট বের করা
  const counts = dashboard?.counts || {
    customers: 0,
    suppliers: 0,
    purchases: 0,
    sales: 0,
  };

  const informationData = [
    {
      icon: <FaUsers className="text-white text-2xl" />,
      title: "Customers",
      bg: "bg-gradient-to-l from-[#8A2BE2] to-[#FF69B4]",
      quantity: counts.customers,
      loading: isLoading,
    },
    {
      icon: <FaTruck className="text-white text-2xl" />,
      title: "Suppliers",
      bg: "bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4]",
      quantity: counts.suppliers,
      loading: isLoading,
    },
    {
      icon: <FaFileInvoiceDollar className="text-white text-2xl" />,
      title: "Purchase Invoices",
      bg: "bg-gradient-to-r from-[#00FFFF] to-[#FF69B4]",
      quantity: counts.purchases,
      loading: isLoading,
    },
    {
      icon: <FaShoppingCart className="text-white text-2xl" />,
      title: "Sales Invoices",
      bg: "bg-gradient-to-r from-blue-400 to-purple-500",
      quantity: counts.sales,
      loading: isLoading,
    },
  ];

  return (
    <div className="flex flex-wrap -mx-2 p-4">
      {informationData.map((item, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
          {item.loading ? (
            <InformationCardSkeleton />
          ) : (
            <ReportCard
              icon={item.icon}
              title={item.title}
              quantity={item.quantity}
              bg={item.bg}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Reports;
