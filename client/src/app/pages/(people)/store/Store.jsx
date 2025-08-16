"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf, FaPlus } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditStoreModal from "@/app/components/modal/(people)/store/StoreEditModal";
import StoresModal from "@/app/components/modal/(people)/store/StoreModal";

const Store = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const prod = [
    {
      id: 1,
      name: "Gulshan Store",
      category: "29-MAY-2023", // Created তারিখ
      price: 1000,
      sku: "ST001",
      itemCode: "IC001",
    },
    {
      id: 2,
      name: "Banani Super Shop",
      category: "29-MAY-2023",
      price: 1500,
      sku: "ST002",
      itemCode: "IC002",
    },
    {
      id: 3,
      name: "Dhanmondi Mart",
      category: "29-MAY-2023",
      price: 1200,
      sku: "ST003",
      itemCode: "IC003",
    },
    {
      id: 4,
      name: "Mirpur Mega Store",
      category: "29-MAY-2023",
      price: 1800,
      sku: "ST004",
      itemCode: "IC004",
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
    { title: "Store", dataIndex: "name", key: "name", width: 200 },
    { title: "Created", dataIndex: "category", key: "category", width: 150 },

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
      {/* Filtering */}
      <div className="mb-4">
        <Filtering onSubmit={handleSubmitFilter}>
          {(register) => (
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <div className="w-4/6">
                <input
                  {...register("store")}
                  placeholder="Store"
                  className="border p-3 rounded w-full h-12"
                />
              </div>

              <div className="w-1/6">
                <button
                  type="submit"
                  className="w-full h-12 bg-blue-500 !text-white rounded hover:bg-blue-600"
                >
                  Search
                </button>
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

        <StoresModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          onSubmit={handleAddCategory}
          posList={[{ id: 1, name: "POS 1" }]}
        />
      </div>

      {/* Add Category Modal */}

      {/* Edit Category Modal */}
      <EditStoreModal
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

export default Store;
