"use client";
import React, { useState } from "react";
import Filtering from "@/app/components/filter/Filtering";
import { Table, Space, Skeleton } from "antd";
import { FaPrint, FaFilePdf, FaExchangeAlt } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/app/features/api/productApi";
import EditProductModal from "@/app/components/modal/editproduct/EditProductModal";
import ConvertNameModal from "@/app/components/converter/Converter";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  console.log(productsData);
  // Modal states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [convertProduct, setConvertProduct] = useState(null);

  const handleSubmit = (data) => {
    console.log("Filtering submitted:", data);
  };

  const onEdit = (record) => {
    setSelectedProduct(record);
    setIsEditOpen(true);
  };

  const onDelete = async (record) => {
    try {
      await deleteProduct(record.id).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const onConvert = (record) => {
    setConvertProduct(record);
    setIsConvertOpen(true);
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
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => record.category?.name || "-",
      width: 150,
    },
    {
      title: "Store",
      key: "store",
      render: (_, record) => record.store?.name || "-",
      width: 150,
    },
    {
      title: "Warehouse",
      key: "warehouse",
      render: (_, record) => record.warehouse?.name || "-",
      width: 150,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      width: 120,
    },
    {
      title: "Convert Name",
      key: "convert",
      width: 120,
      render: (_, record) => (
        <FaExchangeAlt
          className="text-green-600 cursor-pointer text-lg"
          onClick={() => onConvert(record)}
        />
      ),
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
            className={`text-red-500 cursor-pointer ${
              isDeleting ? "opacity-50" : ""
            }`}
            onClick={() => onDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      {/* Filtering */}
      <div className="mb-4">
        <Filtering onSubmit={handleSubmit}>
          {(register) => (
            <div className="flex flex-wrap justify-center gap-4">
              <div className="w-full sm:w-1/6">
                <input
                  {...register("product")}
                  placeholder="Product"
                  className="border border-gray-300 p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-full sm:w-1/6">
                <input
                  {...register("brand")}
                  placeholder="Brand"
                  className="border border-gray-300 p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-full sm:w-1/6">
                <input
                  {...register("category")}
                  placeholder="Category"
                  className="border border-gray-300 p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-full sm:w-1/6">
                <input
                  {...register("minPrice")}
                  placeholder="Min-Price"
                  className="border border-gray-300 p-3 rounded w-full h-12"
                />
              </div>
              <div className="w-full sm:w-1/6">
                <input
                  {...register("maxPrice")}
                  placeholder="Max-Price"
                  className="border border-gray-300 p-3 rounded w-full h-12"
                />
              </div>
            </div>
          )}
        </Filtering>
      </div>
      {/* Print/PDF buttons */}
      <div className="flex justify-end mb-2 gap-2">
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <FaPrint className="mr-2" /> Print
        </button>
        <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          <FaFilePdf className="mr-2" /> PDF
        </button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(pageSize)].map((_, i) => (
              <Skeleton active key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-red-500">Error loading products.</div>
        ) : (
          <Table
            columns={columns}
            dataSource={productsData?.products || []}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
            }}
            scroll={{ x: "max-content" }}
          />
        )}
      </div>
      {/* Edit Product Modal */}
      {isEditOpen && selectedProduct && (
        <EditProductModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          productData={selectedProduct}
        />
      )}
      {/* Convert Name Modal */}
      {isConvertOpen && convertProduct && (
        <ConvertNameModal
          isOpen={isConvertOpen}
          setIsOpen={setIsConvertOpen}
          productData={convertProduct}
        />
      )}
    </div>
  );
};

export default Products;
