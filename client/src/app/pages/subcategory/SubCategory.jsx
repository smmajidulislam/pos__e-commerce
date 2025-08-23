"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space } from "antd";
import sawal from "sweetalert2";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import AddCategoryModal from "@/app/components/modal/subCategory/SubCategoryModal";
import EditCategoryModal from "@/app/components/modal/subCategory/SubEditCategoryModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useGetSubCategoriesQuery,
  useDeleteSubCategoryMutation,
} from "@/app/features/api/subCategoriesApi";

const SubCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const { data } = useGetSubCategoriesQuery();
  const subCategories = data?.subCategories || [];

  const handleSubmitFilter = (data) => {
    console.log("Filter data:", data);
  };

  const handleDelete = async (record) => {
    try {
      await deleteSubCategory(record.id);
      sawal.fire("Deleted!", "Sub Category has been deleted.", "success");
    } catch (error) {
      sawal.fire(
        "Error",
        error?.data?.message || "Failed to delete Sub Category",
        "error"
      );
    }
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    {
      title: "Sub Category",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Parent Category",
      dataIndex: "category",
      key: "category",
      width: 200,
      render: (category) => category?.name || "-",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, "0");
        const month = d
          .toLocaleString("en-US", { month: "short" })
          .toUpperCase();
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      },
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
                      placeholder="Search by Sub Category"
                      className="border border-gray-300 rounded-lg px-4 h-12 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    />
                  </div>
                </div>
              )}
            </Filtering>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 !text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition">
              <FaPrint /> Print
            </button>

            <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 !text-white rounded-lg shadow hover:from-red-600 hover:to-red-700 transition">
              <FaFilePdf /> PDF
            </button>

            <div className="flex-1 min-w-[120px]">
              <AddCategoryModal
                isOpen={isAddModalOpen}
                setIsOpen={setIsAddModalOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      <EditCategoryModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
      />

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={subCategories}
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

export default SubCategory;
