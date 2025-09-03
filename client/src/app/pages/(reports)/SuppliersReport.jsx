"use client";
import React from "react";
import { useSupplierReportQuery } from "@/app/features/api/reports";
import { Table, Skeleton } from "antd";
import Print from "@/app/utils/Print";

const SuppliersReport = () => {
  const { data, isLoading } = useSupplierReportQuery();

  if (isLoading) {
    return <Skeleton active />;
  }

  const suppliers = data?.suppliers || [];

  // Table columns
  const columns = [
    { title: "Supplier Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
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

  // ✅ invoiceData build for print
  const invoiceData = {
    brandName: "Selo Pos",
    tagline: "Supplier Report Management",
    date: new Date().toLocaleDateString(),
    invoiceNumber: "SUP-" + new Date().getTime(),
    items: suppliers.map((supplier, index) => {
      const totalDue = supplier.purchases?.reduce(
        (acc, item) => acc + (item.due || 0),
        0
      );

      return {
        sl: index + 1,
        name: supplier.name || "-",
        email: supplier.email || "-",
        phone: supplier.phone || "-",
        city: supplier.city || "-",
        country: supplier.country || "-",
        due: totalDue ?? 0,
      };
    }),
    terms: "This is a system-generated supplier report.",
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Suppliers Report
      </h2>

      {/* ✅ Print Button with Data */}
      <Print invoiceData={invoiceData} SupplierReport />

      {/* Table */}
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
