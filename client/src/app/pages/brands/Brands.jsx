"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf, FaPlus } from "react-icons/fa";
import BrandsModal from "@/app/components/modal/brands/BrandsModal";
import EditBrandsModal from "@/app/components/modal/brands/BrandsEditModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Brands = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

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

  const handleAddCategory = (data) => {
    console.log("Added Category:", data);
  };

  const handleEditCategory = (data) => {
    console.log("Edited Category:", data);
  };

  const handleDelete = (record) => {
    console.log("Deleted:", record);
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
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setEditingData(record);
              setIsEditModalOpen(true);
            }}
          />
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
      <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filtering */}
          <div className="flex-1">
            <Filtering onSubmit={handleSubmitFilter}>
              {(register) => (
                <div className="flex flex-wrap gap-4">
                  <div className="w-full sm:w-1/2 lg:w-1/3">
                    <input
                      {...register("category")}
                      placeholder="Search by Brands"
                      className="border border-gray-300 rounded-lg px-4 h-12 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    />
                  </div>
                </div>
              )}
            </Filtering>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 !text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition">
              <FaPrint /> Print
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 !text-white rounded-lg shadow hover:from-red-600 hover:to-red-700 transition">
              <FaFilePdf /> PDF
            </button>

            <BrandsModal
              isOpen={isAddModalOpen}
              setIsOpen={setIsAddModalOpen}
              onSubmit={handleAddCategory}
              posList={[{ id: 1, name: "POS 1" }]}
            />
          </div>
        </div>
      </div>

      {/* Add Category Modal */}

      {/* Edit Category Modal */}
      <EditBrandsModal
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
    </>
  );
};

export default Brands;
