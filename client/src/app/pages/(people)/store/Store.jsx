"use client";

import React, { useState } from "react";
import { Table, Space, Skeleton } from "antd";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import StoresModal from "@/app/components/modal/(people)/store/StoreModal";
import EditStoreModal from "@/app/components/modal/(people)/store/StoreEditModal";
import Filtering from "@/app/components/filter/Filtering";
import Swal from "sweetalert2";

import {
  useGetStoresQuery,
  useCreateStoreMutation,
  useDeleteStoreMutation,
} from "@/app/features/api/storeApi";

const Store = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // RTK Query hooks
  const { data, isLoading, isError, error } = useGetStoresQuery();
  const [createStore] = useCreateStoreMutation();

  const [deleteStore] = useDeleteStoreMutation();

  const stores = data?.stores || [];

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} active paragraph={{ rows: 1 }} />
        ))}
      </div>
    );
  }

  // Error SweetAlert
  if (isError) {
    Swal.fire({
      title: "Error",
      text: error?.data?.message || "Something went wrong",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  const handleSubmitFilter = (data) => {
    console.log("Filter data:", data);
  };

  // Add Store
  const handleAddStore = async (data) => {
    try {
      await createStore(data).unwrap();
      Swal.fire("Success", "Store created successfully", "success");
      setIsAddModalOpen(false);
    } catch (err) {
      Swal.fire(
        "Error",
        err?.data?.message || "Failed to create store",
        "error"
      );
    }
  };

  // Delete Store
  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete store "${record.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteStore(record.id).unwrap();
          Swal.fire("Deleted!", "Store has been deleted.", "success");
        } catch (err) {
          Swal.fire(
            "Error",
            err?.data?.message || "Failed to delete store",
            "error"
          );
        }
      }
    });
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    { title: "Store", dataIndex: "name", key: "name", width: 200 },
    {
      title: "Created",
      dataIndex: "reatedAt",
      key: "created",
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

  return (
    <div className="p-4">
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
          onSubmit={handleAddStore}
        />
      </div>

      {/* Edit Modal */}
      <EditStoreModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
      />

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={stores}
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
    </div>
  );
};

export default Store;
