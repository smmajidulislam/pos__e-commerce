"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SalesChart() {
  const options = {
    chart: { id: "sales-bar", toolbar: { show: false } },
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
  };
  const series = [
    { name: "Sales", data: [30, 40, 35, 50, 60, 55, 70, 65, 80, 75, 90, 85] },
  ];

  return <Chart options={options} series={series} type="bar" height={300} />;
}
