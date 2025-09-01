"use client";
import React from "react";
import { useSupplierReportQuery } from "@/app/features/api/reports";
import { Table, Skeleton, Tag } from "antd";

const SuppliersReport = () => {
  const { data, isLoading } = useSupplierReportQuery();

  if (isLoading) {
    return <Skeleton active />;
  }

  const suppliers = data?.suppliers || [];

  // Table columns
  const columns = [
    {
      title: "Supplier Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Total Due",
      key: "totalDue",
      render: (_, record) => {
        const totalDue = record.purchases?.reduce(
          (acc, item) => acc + (item.due || 0),
          0
        );
        return (
          <span style={{ color: totalDue > 0 ? "red" : "green" }}>
            {totalDue}
          </span>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Suppliers Report</h2>
      <Table
        columns={columns}
        dataSource={suppliers}
        rowKey="id"
        bordered
        pagination={false}
      />
    </div>
  );
};

export default SuppliersReport;
