"use client";
import React, { useState, useEffect } from "react";
import Filtering from "@/app/components/filter/Filtering";
import { Table, Space, Spin } from "antd";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import EditPurchaseModal from "@/app/components/modal/(purchase)/purchaseEdit/EditPurchaseModal";
import {
  useGetPurchasesQuery,
  useDeletePurchaseMutation,
} from "@/app/features/api/purchasesApi";

const PurchaseOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: purchaseData, isLoading } = useGetPurchasesQuery();
  const [deletePurchase] = useDeletePurchaseMutation();

  useEffect(() => {
    if (purchaseData?.data) setProducts(purchaseData.data);
  }, [purchaseData]);

  const onEdit = (record) => {
    setSelectedProduct(record);
    setIsEditModalOpen(true);
  };

  const onDelete = async (record) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deletePurchase(record.id).unwrap();
        setProducts((prev) => prev.filter((p) => p.id !== record.id));
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete product.", "error");
      }
    }
  };

  const handleSubmitFilter = (data) => {
    console.log("Filter submitted:", data);
    // এখানে API call দিয়ে filter logic লাগাতে পারো
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    {
      title: "Product Name",
      key: "name",
      render: (_, record) => record.product?.name || "-",
      width: 200,
    },
    {
      title: "Store",
      key: "store",
      render: (_, record) => record.store?.name || "-",
      width: 150,
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) => {
        const payment = record.payment || 0;
        const due = record.due || 0;
        return `${payment + due}`;
      },
      width: 100,
    },
    {
      title: "Commision",
      key: "Commision",
      render: (_, record) => record.commission || "-",
      width: 150,
    },
    {
      title: "SKU",
      key: "sku",
      render: (_, record) => record.product?.sku || "-",
      width: 150,
    },
    {
      title: "Item Code",
      key: "itemCode",
      render: (_, record) => record.product?.itemCode || "-",
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
            onClick={() => onEdit(record)}
          />
          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() => onDelete(record)}
          />
        </Space>
      ),
    },
  ];
  console.log(selectedProduct);
  return (
    <>
      {/* Filtering */}
      <div className="mb-4">
        <Filtering onSubmit={handleSubmitFilter}>
          {(register) => (
            <div className="flex flex-wrap justify-center items-center w-full gap-4">
              <div className="w-1/6">
                <input
                  {...register("product")}
                  placeholder="Product"
                  className="border border-gray-300 p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-1/6">
                <input
                  {...register("brand")}
                  placeholder="Brand"
                  className="border border-gray-300 p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-1/6">
                <input
                  {...register("category")}
                  placeholder="Category"
                  className="border border-gray-300 p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-1/6">
                <input
                  {...register("Min-price")}
                  placeholder="Min-Price"
                  className="border border-gray-300 p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-1/6">
                <input
                  {...register("Max-price")}
                  placeholder="Max-Price"
                  className="border border-gray-300 p-3 rounded w-full h-12"
                />
              </div>
            </div>
          )}
        </Filtering>
      </div>

      {/* Print & PDF buttons */}
      <div className="flex justify-end m-2 gap-2">
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <FaPrint className="mr-2" /> Print
        </button>
        <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          <FaFilePdf className="mr-2" /> PDF
        </button>
      </div>

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={products}
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
          loading={isLoading}
        />
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedProduct && (
        <EditPurchaseModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          productData={selectedProduct}
        />
      )}
    </>
  );
};

export default PurchaseOrder;
