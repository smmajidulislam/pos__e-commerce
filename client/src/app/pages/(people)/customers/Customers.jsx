"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space, Spin } from "antd";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import sawal from "sweetalert2";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddCustomerModal from "@/app/components/modal/(people)/customer/AddCustomerModal";
import EditCustomerModal from "@/app/components/modal/(people)/customer/EditCustomerModal";
import {
  useGetCustomersQuery,
  useDeleteCustomerMutation,
} from "@/app/features/api/customersApi";

const Customers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const { data, isLoading, refetch, error } = useGetCustomersQuery();
  console.log(error);
  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleSubmitFilter = (data) => {
    console.log("Filter data:", data);
  };

  const handleAddCustomer = async (customerData) => {
    // Call API to add customer
    console.log("Added Customer:", customerData);
    refetch(); // Refresh table
  };

  const handleDelete = async (record) => {
    sawal
      .fire({
        title: "Are you sure?",
        text: `Delete customer "${record.firstName} ${record.lastName}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteCustomer(record.id);
            sawal.fire("Deleted!", "Customer has been deleted.", "success");
            refetch(); // Refresh table
          } catch (error) {
            sawal.fire("Error!", "Failed to delete customer.", "error");
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
    {
      title: "Customer Name",
      key: "name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
      width: 200,
    },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    { title: "Phone", dataIndex: "phone", key: "phone", width: 150 },
    {
      title: "Address",
      key: "address",
      render: (_, record) =>
        `${record.address}, ${record.city}, ${record.zip}, ${record.country}`,
      width: 250,
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

        <AddCustomerModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          onSubmit={handleAddCustomer}
        />
      </div>

      {/* Edit Customer Modal */}
      {editingData && (
        <EditCustomerModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          initialData={editingData}
        />
      )}

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={data?.customers || []}
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

export default Customers;
