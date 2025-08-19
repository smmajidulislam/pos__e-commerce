"use client";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf, FaPlus } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import Filtering from "@/app/components/filter/Filtering";
import AddCategoryModal from "@/app/components/modal/category/CategoryModal";
import EditCategoryModal from "@/app/components/modal/category/EditCategoryModal";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/app/features/api/categoryApi";
import { MySuccessSawal, MyErrorSawal } from "@/app/utils/Sawal";

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const { data, refetch, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  // Filtering handler
  const handleSubmitFilter = (filterData) => {
    console.log("Filter data:", filterData);
  };

  // Delete handler
  const handleDelete = async (record) => {
    try {
      await deleteCategory(record.id).unwrap();
      MySuccessSawal(true, 2000, "Category deleted successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      MyErrorSawal(true, 2000, "Failed to delete category!");
    }
  };

  // Date formatter
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    { title: "Category", dataIndex: "name", key: "name", width: 200 },

    {
      title: "Products",
      key: "productCount",
      width: 120,
      render: (_, record) => record.product?.length || 0,
    },
    {
      title: "Sub-categories",
      key: "subCategoriesCount",
      width: 140,
      render: (_, record) => record.subCategories?.length || 0,
    },
    {
      title: "Created At",
      key: "createdAt",
      width: 150,
      render: (_, record) => formatDate(record.createdAt),
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
      {/* Filter + Action Buttons */}
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
                      placeholder="Search by Category"
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
                onSuccess={refetch}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          initialData={editingData}
          onSuccess={refetch}
        />
      )}

      {/* Categories Table */}
      <div className="mt-2 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={data?.categories || []}
          rowKey="id"
          loading={isLoading}
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

export default Category;
