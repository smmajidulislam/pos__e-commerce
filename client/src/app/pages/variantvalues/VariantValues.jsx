"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space, Tag } from "antd";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { EditOutlined } from "@ant-design/icons";
import {
  useDeleteAttributeValueMutation,
  useGetAttributesQuery,
} from "@/app/features/api/attributeApi";
import VariantValuesModal from "@/app/components/modal/variantvalues/VariantValuesModal";
import EditVariantValuesModal from "@/app/components/modal/variantvalues/EditVariantValuesModal";

const VariantsValues = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // API hooks
  const { data, isLoading } = useGetAttributesQuery();
  const [deleteAttribute] = useDeleteAttributeValueMutation();
  console.log("API Data:", data);

  // attributes array
  const attributes = data?.attributes || [];

  // Filter submit
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
    {
      title: "Attribute Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Values",
      dataIndex: "values",
      key: "values",
      render: (values) =>
        values?.length > 0 ? (
          values.map((val) => (
            <Tag key={val.id} color="blue">
              {val.value}
            </Tag>
          ))
        ) : (
          <span className="text-gray-400 italic">No values</span>
        ),
    },
    {
      title: "Values Count",
      dataIndex: "values",
      key: "valuesCount",
      render: (values) => values?.length || 0,
      width: 120,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }); // 👉 e.g. 20 Aug 2025
      },
      width: 150,
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
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filtering */}
          <div className="flex-1">
            <Filtering onSubmit={handleSubmitFilter}>
              {(register) => (
                <div className="flex flex-wrap gap-4">
                  <div className="w-full sm:w-1/2 lg:w-1/3">
                    <input
                      {...register("name")}
                      placeholder="Search by Attribute Name"
                      className="border border-gray-300 rounded-lg px-4 h-12 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    />
                  </div>
                </div>
              )}
            </Filtering>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 !text-white rounded-lg shadow hover:bg-blue-700 transition">
              <FaPrint /> Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 !text-white rounded-lg shadow hover:bg-red-700 transition">
              <FaFilePdf /> PDF
            </button>
            <VariantValuesModal
              isOpen={isAddModalOpen}
              setIsOpen={setIsAddModalOpen}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditVariantValuesModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
      />

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={attributes}
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

export default VariantsValues;
