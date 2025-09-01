"use client";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf, FaPlus } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddSuppliers from "@/app/components/modal/(people)/supplier/AddSuppliers";
import EditSupplier from "@/app/components/modal/(people)/supplier/EditSupplier";
import {
  useDeleteSupplierMutation,
  useGetSuppliersQuery,
} from "@/app/features/api/supplierApi";
import Swal from "sweetalert2";

const Suppliers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const { data: suppliers, isLoading } = useGetSuppliersQuery();
  const [deleteSupplier] = useDeleteSupplierMutation();

  // Delete Supplier with confirmation
  const handleDelete = async (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete supplier "${record.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSupplier(record.id).unwrap();
          Swal.fire("Deleted!", "Supplier has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete supplier.", "error");
        }
      }
    });
  };

  // Table columns
  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    { title: "Supplier Name", dataIndex: "name", key: "name", width: 200 },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    { title: "Phone", dataIndex: "phone", key: "phone", width: 150 },
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
      {/* Action Buttons */}
      <div className="flex justify-end m-2 gap-2">
        <button className="flex items-center px-4 py-2 bg-blue-500 !text-white rounded hover:bg-blue-600">
          <FaPrint className="mr-2" /> Print
        </button>

        <button className="flex items-center px-4 py-2 bg-red-500 !text-white rounded hover:bg-red-600">
          <FaFilePdf className="mr-2" /> PDF
        </button>
        {/* Add Supplier Modal */}
        <AddSuppliers isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      </div>

      {/* Edit Supplier Modal */}
      <EditSupplier
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
      />

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={suppliers?.suppliers || []}
          loading={isLoading}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: suppliers?.count || 0,
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

export default Suppliers;
