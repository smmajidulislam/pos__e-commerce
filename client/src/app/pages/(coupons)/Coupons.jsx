"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space, Spin } from "antd";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddCuponModal from "@/app/components/modal/(stock)/stockadjust/AddStockModal";
import EditCuponModal from "@/app/components/modal/(stock)/stockadjust/EditStokModal";

import {
  useGetCouponsQuery,
  useDeleteCouponMutation,
} from "@/app/features/api/couponsApi";

const Coupons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [filters, setFilters] = useState({});
  const { data: couponsData } = useGetCouponsQuery();
  console.log(couponsData);

  // RTK Query hooks
  const {
    data: coupons,
    isLoading,
    refetch,
  } = useGetCouponsQuery({
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    ...filters,
  });

  const [deleteCoupon] = useDeleteCouponMutation();

  const handleSubmitFilter = (data) => {
    setFilters(data);
    setCurrentPage(1);
  };

  const handleDelete = async (record) => {
    try {
      await deleteCoupon(record.id);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    { title: "Code", dataIndex: "code", key: "code", width: 200 },
    { title: "Discount", dataIndex: "discount", key: "discount", width: 150 },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      width: 200,
    },
    {
      title: "Expires At",
      dataIndex: "expiresAt",
      key: "expiresAt",
      width: 180,
      render: (date) => new Date(date).toLocaleDateString(),
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
              <div className="w-1/4">
                <input
                  {...register("code")}
                  placeholder="Coupon Code"
                  className="border p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-1/4">
                <input
                  {...register("minDiscount")}
                  placeholder="Min Discount"
                  type="number"
                  className="border p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-1/4">
                <input
                  {...register("maxDiscount")}
                  placeholder="Max Discount"
                  type="number"
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

        {/* Add Coupon Modal */}
        <AddCuponModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      </div>

      {/* Edit Coupon Modal */}
      <EditCuponModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
      />

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={coupons?.data || []}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: coupons?.total || 0,
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

export default Coupons;
