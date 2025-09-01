"use client";
import React from "react";
import { useGetSalesQuery } from "@/app/features/api/salesApi";
import { Table, Skeleton, Tag } from "antd";

const SalesReport = () => {
  const { data, isLoading } = useGetSalesQuery();

  if (isLoading) {
    return <Skeleton active />;
  }

  const sales = data?.data || [];
  const pagination = data?.pagination || {};

  // Table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Customer Name",
      dataIndex: ["customer", "firstName"],
      key: "customerName",
    },
    {
      title: "Customer Email",
      dataIndex: ["customer", "email"],
      key: "customerEmail",
    },
    {
      title: "Variant",
      dataIndex: ["variant", "value"],
      key: "variant",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Sales Price",
      dataIndex: "salesPrice",
      key: "salesPrice",
    },
    {
      title: "Discount",
      key: "discount",
      render: (_, record) => (
        <span>
          {record.discountType}: {record.discountAmount}
        </span>
      ),
    },
    {
      title: "Tax",
      key: "tax",
      render: (_, record) => (
        <span>
          {record.taxType}: {record.tax}
        </span>
      ),
    },
    {
      title: "Final Amount",
      dataIndex: "finalAmount",
      key: "finalAmount",
      render: (value) => (
        <span style={{ fontWeight: "bold", color: "green" }}>{value}</span>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Sales Report</h2>
      <Table
        columns={columns}
        dataSource={sales}
        rowKey="id"
        bordered
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
        }}
      />
    </div>
  );
};

export default SalesReport;
