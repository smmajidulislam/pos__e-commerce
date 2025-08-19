"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf, FaMoneyBillWave } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddPament from "@/app/components/modal/(sales)/AddPament";
import EditSalesModal from "@/app/components/modal/(sales)/EditSalesModal";

const Saleslist = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

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

  const handleSubmitFilter = (data) => {
    console.log("Filter data:", data);
  };

  const handleEditCategory = (data) => {
    console.log("Edited Category:", data);
  };

  const handleDelete = (record) => {
    console.log("Deleted:", record);
  };

  const handleMakePayment = (record) => {
    setPaymentData(record);
    setIsPaymentModalOpen(true);
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    { title: "Category", dataIndex: "name", key: "name", width: 200 },
    { title: "Pos", dataIndex: "category", key: "category", width: 150 },
    {
      title: "Qty",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price) => `$${price}`,
    },
    {
      title: "Action",
      key: "action",
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          {/* Edit Icon */}
          <EditOutlined
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setEditingData(record);
              setIsEditModalOpen(true);
            }}
          />

          {/* Payment Icon */}
          <FaMoneyBillWave
            className="text-green-500 cursor-pointer"
            size={18}
            onClick={() => handleMakePayment(record)}
          />

          {/* Delete Icon */}
          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Filtering */}
      <div className="mb-4">
        <Filtering onSubmit={handleSubmitFilter}>
          {(register) => (
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <div className="w-1/5">
                <input
                  {...register("product")}
                  placeholder="Product"
                  className="border p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-1/5">
                <input
                  {...register("brand")}
                  placeholder="Brand"
                  className="border p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-1/6">
                <input
                  {...register("category")}
                  placeholder="Category"
                  className="border p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-1/6">
                <input
                  {...register("min-price")}
                  placeholder="min-Price"
                  className="border p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-1/6">
                <input
                  {...register("max-price")}
                  placeholder="max-Price"
                  className="border p-3 rounded w-full h-12"
                />
              </div>
            </div>
          )}
        </Filtering>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end m-2 gap-2">
        <button className="flex items-center px-4 py-2 bg-blue-500 !text-white rounded hover:bg-blue-600">
          <FaPrint className="mr-2" /> Print
        </button>

        <button className="flex items-center px-4 py-2 bg-red-500 !text-white rounded hover:bg-red-600">
          <FaFilePdf className="mr-2" /> PDF
        </button>
      </div>

      {/* Edit Sales Modal */}
      <EditSalesModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
        onSubmit={handleEditCategory}
        posList={[
          { id: 1, name: "POS 1" },
          { id: 2, name: "POS 2" },
        ]}
      />

      {/* Table */}
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
          scroll={{ x: "max-content" }}
        />
      </div>
      {isPaymentModalOpen && (
        <AddPament
          isOpen={isPaymentModalOpen}
          setIsOpen={setIsPaymentModalOpen}
          initialData={editingData}
          onSubmit={handleMakePayment}
        />
      )}
    </>
  );
};

export default Saleslist;
