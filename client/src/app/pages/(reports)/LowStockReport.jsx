"use client";
import React from "react";
import { useLowStockReportSQuery } from "@/app/features/api/reports";
import { Table, Skeleton, Tag } from "antd";

const LowStockReport = () => {
  const { data, isLoading } = useLowStockReportSQuery();

  if (isLoading) {
    return <Skeleton active />;
  }

  const products = data?.lowStockProducts || [];

  // Table columns
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Alert Level",
      dataIndex: "quantityAlert",
      key: "quantityAlert",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        if (record.quantity < record.quantityAlert) {
          return <Tag color="red">Low Stock</Tag>;
        }
        return <Tag color="green">In Stock</Tag>;
      },
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Low Stock Report</h2>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="productId"
        bordered
        pagination={false}
      />
    </div>
  );
};

export default LowStockReport;
