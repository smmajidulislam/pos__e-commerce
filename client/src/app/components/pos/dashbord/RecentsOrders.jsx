"use client";
import { useGetSalesQuery } from "@/app/features/api/salesApi";
import { Table, Skeleton } from "antd";

const RecentsOrders = () => {
  const { data, isLoading } = useGetSalesQuery();

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  const sales = data?.data || [];

  // Table columns
  const columns = [
    {
      title: "Serial Number",
      key: "serial",
      render: (_, __, index) => index + 1, // auto serial
    },
    {
      title: "Product Name",
      dataIndex: ["customer", "firstName"], // যদি Product Name variant.value তে থাকে
      key: "productName",
    },
    {
      title: "Price",
      dataIndex: "salesPrice",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`, // Dollar formatting
    },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
      <Table
        columns={columns}
        dataSource={sales}
        rowKey="id"
        bordered
        pagination={false}
      />
    </div>
  );
};

export default RecentsOrders;
