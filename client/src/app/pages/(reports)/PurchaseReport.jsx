"use client";
import React from "react";
import { useGetPurchasesQuery } from "@/app/features/api/purchasesApi";
import { Table, Skeleton, Tag } from "antd";

const PurchaseReport = () => {
  const { data, isLoading } = useGetPurchasesQuery();

  if (isLoading) {
    return <Skeleton active />;
  }

  const purchases = data?.data || [];

  // Table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
      responsive: ["xs", "sm", "md", "lg", "xl"], // সব স্ক্রিনে show করবে
    },
    {
      title: "Product Name",
      dataIndex: ["product", "name"],
      key: "productName",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "SKU",
      dataIndex: ["product", "sku"],
      key: "sku",
      responsive: ["md", "lg", "xl"], // শুধু ট্যাব/ডেস্কটপে show করবে
    },
    {
      title: "Store",
      dataIndex: ["store", "name"],
      key: "store",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Warehouse",
      dataIndex: ["warehouse", "name"],
      key: "warehouse",
      responsive: ["lg", "xl"], // শুধু বড় স্ক্রিনে show
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Due",
      dataIndex: "due",
      key: "due",
      render: (value) => (
        <span style={{ color: value > 0 ? "red" : "green" }}>{value}</span>
      ),
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      responsive: ["lg", "xl"], // শুধু বড় স্ক্রিনে
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "PENDING" ? "orange" : "green"}>{status}</Tag>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];

  return (
    <div className="p-2 sm:p-4 md:p-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        Purchases Report
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <Table
          columns={columns}
          dataSource={purchases}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5, responsive: true }}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default PurchaseReport;
