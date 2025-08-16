"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const prod = [
    {
      id: 1,
      name: "Product 1",
      category: "Category A",
      price: 100,
      sku: "SKU001",
      itemCode: "IC001",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category B",
      price: 150,
      sku: "SKU002",
      itemCode: "IC002",
    },
  ];

  const handleSubmit = (data) => {
    console.log("Submitted data:", data);
  };
  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price) => `$${price}`,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      width: 150,
    },
    {
      title: "Item Code",
      dataIndex: "itemCode",
      key: "itemCode",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            className="text-blue-500 cursor-pointer"
            onClick={() => onEdit(record)}
          />
          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() => onDelete(record)}
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      {/* Filtering */}
      <div className="mb-4">
        <Filtering onSubmit={handleSubmit}>
          {(register) => (
            <>
              <div className="flex flex-wrap justify-center align-center w-full gap-4">
                <div className="w-1/6">
                  <input
                    {...register("product")}
                    placeholder="Product"
                    className="border border-gray-300 p-3 rounded w-full h-12"
                  />
                </div>
                <div className="w-1/6">
                  <input
                    {...register("brand")}
                    placeholder="Brand"
                    className="border border-gray-300 p-3 rounded w-full h-12"
                  />
                </div>
                <div className="w-1/6">
                  <input
                    {...register("category")}
                    placeholder="Category"
                    className="border border-gray-300 p-3 rounded w-full h-12"
                  />
                </div>
                <div className="w-1/6">
                  <input
                    {...register("Min-price")}
                    placeholder="Min-Price"
                    className="border border-gray-300 p-3 rounded w-full h-12"
                  />
                </div>
                <div className="w-1/6">
                  <input
                    {...register("Max-price")}
                    placeholder="Max-Price"
                    className="border border-gray-300 p-3 rounded w-full h-12"
                  />
                </div>
              </div>
            </>
          )}
        </Filtering>
      </div>
      <div className="flex justify-end m-2 gap-2">
        <button
          // onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <FaPrint className="mr-2" /> Print
        </button>

        <button
          // onClick={handlePdf}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <FaFilePdf className="mr-2" /> PDF
        </button>
      </div>

      {/* Filtering end */}
      <div className="mt-2 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={prod}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
          }}
          scroll={{ x: "max-content" }} // horizontal scroll only
        />
      </div>
    </>
  );
};

export default Products;
