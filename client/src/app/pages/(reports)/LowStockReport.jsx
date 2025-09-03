"use client";
import React from "react";
import { useLowStockReportSQuery } from "@/app/features/api/reports";
import { Table, Skeleton, Tag } from "antd";
import Print from "@/app/utils/Print";

const LowStockReport = () => {
  const { data, isLoading } = useLowStockReportSQuery();

  if (isLoading) {
    return <Skeleton active />;
  }

  const products = data?.lowStockProducts || [];

  // Table columns
  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => index + 1,
    },
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

  // InvoiceData dynamically বানানো
  const invoiceData = {
    brandName: "Selo Pos",
    tagline: "Inventory Management Report",
    date: new Date().toLocaleDateString(),
    invoiceNumber: "LS-" + new Date().getTime(),
    customer: {
      address: "Low Stock Report",
    },
    items: products.map((prod, index) => ({
      sl: index + 1,
      description: prod.productName,
      qty: prod.quantity,
      unit: "pcs",
      price: prod.quantityAlert,
    })),
    paymentInfo: {
      account: "123 456 789",
      bank: "Your Bank Name",
      dueDate: "01/03/2025",
    },
    terms: "Auto-generated Low Stock Report",
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Low Stock Report</h2>

      {/* Print button + hidden printable layout */}
      <Print invoiceData={invoiceData} lowStock />

      {/* On-screen Table */}
      <Table
        columns={columns}
        dataSource={products}
        rowKey="productId"
        bordered
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default LowStockReport;
