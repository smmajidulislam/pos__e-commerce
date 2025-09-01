"use client";
import { useLowStockReportSQuery } from "@/app/features/api/reports";
import { Table, Tag, Skeleton } from "antd";

const LowStockProducts = () => {
  const { data, isLoading } = useLowStockReportSQuery();

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  const products = data?.lowStockProducts || [];

  // Table columns
  const columns = [
    {
      title: "Serial Number",
      dataIndex: "serial",
      key: "serial",
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
      render: (qty, record) => (
        <Tag
          color={qty < record.quantityAlert ? "red" : "green"}
          className="font-medium"
        >
          {qty}
        </Tag>
      ),
    },
    {
      title: "Quantity Alert",
      dataIndex: "quantityAlert",
      key: "quantityAlert",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-4">Low Stock Products</h2>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="purchaseId"
        bordered
        pagination={false}
      />
    </div>
  );
};

export default LowStockProducts;
