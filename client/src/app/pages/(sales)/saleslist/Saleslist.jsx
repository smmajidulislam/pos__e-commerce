"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditSalesModal from "@/app/components/modal/(sales)/EditSalesModal";
import {
  useGetSalesQuery,
  useDeleteSaleMutation,
  useUpdateSaleMutation,
} from "@/app/features/api/salesApi";
import sawal from "sweetalert2";
import Print from "@/app/utils/Print";

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

  // Table dataSource
  const dataSource = sales.map((sale) => ({
    key: sale.id,
    id: sale.id,
    customerName: sale.customer?.firstName || "N/A",
    product: sale.purchase?.product?.name || "N/A",
    category: sale.purchase?.product?.category?.name || "N/A",
    quantity: sale.quantity,
    salesPrice: sale.salesPrice,
    due: sale.due,
    tax: sale.tax,
    discount: sale.discount,
    unitPrice: sale.unitPrice,
    price: sale.price,
    ...sale,
  }));

  // InvoiceData for printing (Table এর dataSource থেকে আসবে)
  const invoiceData = {
    brandName: "Selo POS",
    tagline: "Sales Management Report",
    date: new Date().toLocaleDateString(),
    invoiceNumber: "SL-" + new Date().getTime(),
    customer: {
      address: "Sales List Report",
    },
    items: dataSource.map((sale, index) => ({
      sl: index + 1,
      customerName: sale.customerName,
      product: sale.product,
      category: sale.category,
      quantity: sale.quantity,
      unitPrice: sale.unitPrice,
      price: sale.price,
      salesPrice: sale.salesPrice,
      discount: sale.discount,
      tax: sale.tax,
      due: sale.due,
    })),
    terms: "Thank you!",
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
      dataIndex: "customerName",
      key: "customerName",
      width: 200,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      width: 100,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
    },
    {
      title: "Sales Price",
      dataIndex: "salesPrice",
      key: "salesPrice",
      width: 120,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: 100,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      width: 100,
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

      {/* Print Button */}
      <div className="flex justify-end mb-2 gap-2">
        <Print invoiceData={invoiceData} saleslist />
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
