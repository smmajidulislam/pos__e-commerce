"use client";
import { Table } from "antd";

const RecentsOrders = () => {
  // Table columns
  const columns = [
    {
      title: " Number",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`, // Dollar formatting
    },
  ];

  // Sample data
  const data = [
    { key: "1", serial: 1, name: "Product A", price: 25.5 },
    { key: "2", serial: 2, name: "Product B", price: 40 },
    { key: "3", serial: 3, name: "Product C", price: 15.75 },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default RecentsOrders;
