"use client";
import { Table, Tag } from "antd";

const ExpiredProducts = () => {
  // Table columns
  const columns = [
    {
      title: "Serial Number",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry",
      key: "expiry",
      render: (date) => (
        <Tag color="red" className="font-medium">
          {date}
        </Tag>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  // Sample data
  const data = [
    { key: "1", serial: 1, name: "Milk", expiry: "2025-07-10", quantity: 20 },
    { key: "2", serial: 2, name: "Cheese", expiry: "2025-07-05", quantity: 10 },
    { key: "3", serial: 3, name: "Yogurt", expiry: "2025-06-30", quantity: 15 },
    { key: "4", serial: 4, name: "Butter", expiry: "2025-07-01", quantity: 8 },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-4">Expired Products</h2>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default ExpiredProducts;
