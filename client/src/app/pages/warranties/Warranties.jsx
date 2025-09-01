"use client";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import sawal from "sweetalert2";
import {
  useGetWarrantiesQuery,
  useDeleteWarrantyMutation,
} from "@/app/features/api/warrantiesApi";
import EditWarrantiesModal from "@/app/components/modal/warranties/EditWarrantiesModal";
import WarrantiesModal from "@/app/components/modal/warranties/WarrantiesModal";

const Warranties = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: warranties, refetch } = useGetWarrantiesQuery();
  const [deleteWarranty] = useDeleteWarrantyMutation();

  // Delete function
  const handleDelete = async (record) => {
    const result = await sawal.fire({
      title: "Are you sure?",
      text: `Delete warranty "${record.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteWarranty(record.id).unwrap(); // API call
        sawal.fire("Deleted!", "Warranty has been deleted.", "success");
        refetch(); // Refresh table
      } catch (error) {
        sawal.fire("Error!", "Failed to delete warranty.", "error");
      }
    }
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    { title: "Name", dataIndex: "name", key: "name", width: 200 },
    { title: "Days", dataIndex: "days", key: "days", width: 100 },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setEditingData(record); // Set current item to edit
              setIsEditModalOpen(true); // Open edit modal
            }}
          />
          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(record)} // Delete item
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Add Modal */}
      <WarrantiesModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        refetch={refetch}
      />
      <Table
        columns={columns}
        dataSource={warranties?.warranty || []}
        rowKey={(record) => record.id}
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
      {/* Edit Modal */}
      <EditWarrantiesModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
        refetch={refetch}
      />
    </>
  );
};

export default Warranties;
