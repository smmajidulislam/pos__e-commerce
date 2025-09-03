"use client";
import React, { useState, useEffect } from "react";
import Filtering from "@/app/components/filter/Filtering";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf, FaMoneyBillWave } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import EditPurchaseModal from "@/app/components/modal/(purchase)/purchaseEdit/EditPurchaseModal";
import AddPurchasePayment from "@/app/components/modal/(purchase)/AddPurchasesModal";
import {
  useGetPurchasesQuery,
  useDeletePurchaseMutation,
} from "@/app/features/api/purchasesApi";
import Print from "@/app/utils/Print";

const PurchaseOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Payment Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

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

  const handleMakePayment = (record) => {
    setPaymentData(record);
    setIsPaymentModalOpen(true);
  };

  const handleSubmitFilter = (data) => {
    console.log("Filter submitted:", data);
  };
  // invoiceData generate from API data
  const invoiceData = {
    brandName: "Selo Pos",
    tagline: "Purchase Order Report",
    date: new Date().toLocaleDateString(),
    invoiceNumber: "INV-" + Date.now(),
    customer: {
      name: "Admin",
      address: "Purchase List",
    },
    items:
      products?.map((record, index) => ({
        sl: index + 1,
        productName: record.product?.name || "-",
        store: record.store?.name || "-",
        price: (record.payment || 0) + (record.due || 0),
        due: record.due || 0,
        commission: record.commission || "-",
        sku: record.product?.sku || "-",
        itemCode: record.product?.itemCode || "-",
      })) || [],
    terms: "Thank you for your business!",
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
      title: "Due",
      key: "due",
      render: (_, record) => record.due || 0,
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
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            className="text-blue-500 cursor-pointer"
            onClick={() => onEdit(record)}
          />
          <FaMoneyBillWave
            className="text-green-500 cursor-pointer"
            size={18}
            onClick={() => handleMakePayment(record)}
          />
          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() => onDelete(record)}
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
      <div className="flex justify-end mb-2 gap-2">
        <Print invoiceData={invoiceData} purchaseorder />
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

      {/* Payment Modal */}
      {isPaymentModalOpen && paymentData && (
        <AddPurchasePayment
          isOpen={isPaymentModalOpen}
          setIsOpen={setIsPaymentModalOpen}
          purchaseId={paymentData.id}
        />
      )}
    </>
  );
};

export default PurchaseOrder;
