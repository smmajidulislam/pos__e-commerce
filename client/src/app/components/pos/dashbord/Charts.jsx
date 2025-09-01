"use client";

import React from "react";
import { useChatDataQuery } from "@/app/features/api/reports";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";

// ApexCharts dynamically import
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SalesChart() {
  const { data, isLoading } = useChatDataQuery();

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton active title paragraph={{ rows: 6 }} />
      </div>
    );
  }

  // Extract API data
  const salesData = data?.sales?.data || [];
  const salesName = data?.sales?.name || "Sales";

  // Chart options
  const options = {
    chart: {
      id: "sales-bar",
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    fill: { opacity: 1 },
    tooltip: {
      y: { formatter: (val) => `${val}৳` },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: { bar: { columnWidth: "70%" } },
        },
      },
    ],
  };

  // Chart series from API
  const series = [{ name: salesName, data: salesData }];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        {salesName} Report (Monthly)
      </h2>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
}
