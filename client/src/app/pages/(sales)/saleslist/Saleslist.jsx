"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditSalesModal from "@/app/components/modal/(sales)/EditSalesModal";
import {
  useGetSalesQuery,
  useDeleteSaleMutation,
  useUpdateSaleMutation,
} from "@/app/features/api/salesApi";
import sawal from "sweetalert2";

const Saleslist = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // RTK Query hooks
  const { data: salesData, refetch } = useGetSalesQuery({
    page: currentPage,
    limit: pageSize,
  });
  const [deleteSale] = useDeleteSaleMutation();
  const [updateSale] = useUpdateSaleMutation();

  const sales = salesData?.data || [];
  const totalSales = salesData?.pagination?.total || 0;

  const handleSubmitFilter = (data) => {
    console.log("Filter data:", data);
  };
  const handleEdit = async (data) => {
    try {
      const response = await updateSale({
        id: editingData.id,
        ...data,
      }).unwrap();
      if (response.success) {
        sawal.fire("Success", "Sale updated successfully!", "success");
        setIsEditModalOpen(false);
        refetch();
      }
    } catch (error) {
      sawal.fire(
        "Error",
        error?.data?.message || "Failed to update sale.",
        "error"
      );
    }
  };

  const handleDelete = async (record) => {
    try {
      const response = await deleteSale(record.id).unwrap();
      if (response.success) {
        sawal.fire("Success", "Sale deleted successfully!", "success");
        refetch();
      }
    } catch (error) {
      sawal.fire(
        "Error",
        error?.data?.message || "Failed to delete sale.",
        "error"
      );
    }
  };

  // Map RTK query data to table columns
  const dataSource = sales.map((sale) => ({
    key: sale.id,
    id: sale.id,
    customerName: sale.customer?.firstName || "N/A",
    product: sale.purchase?.product?.name || "N/A",
    category: sale.purchase?.product?.category?.name || "N/A",
    quantity: sale.quantity,
    salesPrice: sale.salesPrice,
    due: sale.due,
    ...sale,
  }));

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: 200,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Sales Price",
      dataIndex: "salesPrice",
      key: "salesPrice",
      width: 150,
    },

    {
      title: "Action",
      key: "action",
      width: 160,
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
      </div>

      {/* Edit Sales Modal */}
      <EditSalesModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
        onSubmit={handleEdit}
      />

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalSales,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
};

export default Saleslist;
