"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SubsubCategoryModal from "@/app/components/modal/subsubCategory/SubsubCategoryModal";
import SubsubEditCategoryModal from "@/app/components/modal/subsubCategory/SubsubEditCategoryModal";
import {
  useGetSubSubCategoriesQuery,
  useDeleteSubSubCategoryMutation,
} from "@/app/features/api/subsubCategoriesApi";
import Swal from "sweetalert2";

const SubsubCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const { data } = useGetSubSubCategoriesQuery();
  const subSubCategories = data?.subSubCategories || [];

  const [deleteSubSubCategory] = useDeleteSubSubCategoryMutation();

  const handleSubmitFilter = (data) => {
    console.log("Filter data:", data);
  };

  // DELETE handler
  const handleDelete = async (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete "${record.name}" permanently?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSubSubCategory(record.id).unwrap();
          Swal.fire(
            "Deleted!",
            "Sub Sub Category has been deleted.",
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Error",
            error?.data?.message || "Failed to delete Sub Sub Category",
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
    { title: "Sub Sub Category", dataIndex: "name", key: "name", width: 200 },
    {
      title: "Sub Category",
      dataIndex: ["subCategory", "name"],
      key: "subCategory",
      width: 200,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
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
      {/* Filter + Actions */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filtering */}
          <div className="flex-1">
            <Filtering onSubmit={handleSubmitFilter}>
              {(register) => (
                <div className="flex flex-wrap gap-4">
                  <div className="w-full sm:w-1/2 lg:w-1/3">
                    <input
                      {...register("search")}
                      placeholder="Search by Sub Sub Category"
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
              <SubsubCategoryModal
                isOpen={isAddModalOpen}
                setIsOpen={setIsAddModalOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      <SubsubEditCategoryModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
      />

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={subSubCategories}
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

export default SubsubCategory;
