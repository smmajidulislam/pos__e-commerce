"use client";

import InformationCard from "./InformationCard";
import { FaUser, FaChartLine, FaBell, FaCogs } from "react-icons/fa";
import InformationCardSkeleton from "./SkeltionInformation";
import { useGetFinnaceReportQuery } from "@/app/features/api/reports";

const Information = () => {
  const { data, isLoading } = useGetFinnaceReportQuery();

  // ডিফল্ট ভ্যালু যদি ডাটা না আসে
  const totals = data?.totals || {
    totalPurchaseDue: 0,
    totalSalesDue: 0,
    totalSalesAmount: 0,
    totalExpense: 0,
  };

  const informationData = [
    {
      icon: <FaUser className="text-xl text-white" />,
      title: "Total Purchase Due",
      description: totals.totalPurchaseDue,
      bg: "bg-gradient-to-r from-blue-400 to-purple-500",
    },
    {
      icon: <FaChartLine className="text-xl text-white" />,
      title: "Total Sales Due",
      description: totals.totalSalesDue,
      bg: "bg-gradient-to-r from-green-400 to-blue-500",
    },
    {
      icon: <FaBell className="text-xl text-white" />,
      title: "Total Sales Amount",
      description: totals.totalSalesAmount,
      bg: "bg-gradient-to-r from-pink-400 to-red-500",
    },
    {
      icon: <FaCogs className="text-xl text-white" />,
      title: "Total Expense Amount",
      description: totals.totalExpense,
      bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
  ];

  return (
    <div className="flex flex-wrap -mx-2 p-4">
      {informationData.map((item, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
          {isLoading ? (
            <InformationCardSkeleton />
          ) : (
            <InformationCard
              icon={item.icon}
              title={item.title}
              description={item.description}
              bg={item.bg}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Information;
