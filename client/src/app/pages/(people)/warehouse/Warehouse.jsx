// pages/Warehouse.jsx
"use client";

import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditWarehouseModal from "@/app/components/modal/(people)/warehouse/WarehouseEditModal";
import WareHouseModal from "@/app/components/modal/(people)/warehouse/WarehouseModal";
import {
  useGetWarehousesQuery,
  useDeleteWarehouseMutation,
} from "@/app/features/api/warehouseApi";
import { MyErrorSawal, MySuccessSawal } from "@/app/utils/Sawal";

const Warehouse = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // API থেকে warehouses load
  const {
    data: warehousesData,
    isLoading: isWarehousesLoading,
    isError: isWarehousesError,
  } = useGetWarehousesQuery();
  const [deleteWarehouse] = useDeleteWarehouseMutation();

  // Table-এর dataSource
  const dataSource = warehousesData?.warehouses || [];

  // Delete function
  const handleDelete = async (record) => {
    await deleteWarehouse(record.id);
    MySuccessSawal(true, 3000, `Deleted warehouse: ${record.name}`);
  };

  // Filter handler
  const handleSubmitFilter = (data) => {
    console.log("Filter data:", data);
  };

  // Table columns
  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    { title: "Warehouse", dataIndex: "name", key: "name", width: 200 },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (text) => new Date(text).toLocaleDateString(),
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

  // Error handling
  if (isWarehousesError) {
    MyErrorSawal(false, 3000, "Error loading warehouses");
  }

  return (
    <>
      {/* Filtering */}
      <div className="mb-4">
        <Filtering onSubmit={handleSubmitFilter}>
          {(register) => (
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <div className="w-4/6">
                <input
                  {...register("warehouse")}
                  placeholder="Warehouse"
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

        <WareHouseModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      </div>

      {/* Edit Modal */}
      <EditWarehouseModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
      />

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        {isWarehousesLoading ? (
          <div className="h-48 w-full bg-gray-200 animate-pulse rounded" />
        ) : (
          <Table
            columns={columns}
            dataSource={dataSource}
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
        )}
      </div>
    </>
  );
};

export default Warehouse;
