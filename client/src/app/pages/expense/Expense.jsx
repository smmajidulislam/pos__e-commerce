"use client";
import Filtering from "@/app/components/filter/Filtering";
import React, { useState } from "react";
import { Table, Space } from "antd";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddExpense from "@/app/components/modal/expense/AddExpense";
import EditExpense from "@/app/components/modal/expense/EditExpense";

const Expense = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const expenses = [
    {
      id: 1,
      name: "Office Rent",
      category: "Rent",
      amount: 500,
      date: "2025-08-01",
    },
    {
      id: 2,
      name: "Stationery",
      category: "Office Supplies",
      amount: 150,
      date: "2025-08-05",
    },
  ];

  const handleSubmitFilter = (data) => {
    console.log("Filter data:", data);
  };

  const handleAddExpense = (data) => {
    console.log("Added Expense:", data);
  };

  const handleEditExpense = (data) => {
    console.log("Edited Expense:", data);
  };

  const handleDelete = (record) => {
    console.log("Deleted:", record);
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
      width: 60,
    },
    { title: "Expense Name", dataIndex: "name", key: "name", width: 200 },
    { title: "Category", dataIndex: "category", key: "category", width: 150 },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      render: (amount) => `$${amount}`,
    },
    { title: "Date", dataIndex: "date", key: "date", width: 120 },
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
      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1">
            <Filtering onSubmit={handleSubmitFilter}>
              {(register) => (
                <div className="flex flex-wrap gap-4">
                  <div className="w-full sm:w-1/2 lg:w-1/3">
                    <input
                      {...register("expenseName")}
                      placeholder="Search by Expense"
                      className="border border-gray-300 rounded-lg px-4 h-12 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    />
                  </div>
                </div>
              )}
            </Filtering>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="flex-1 sm:flex-none w-full sm:w-auto min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition">
              <FaPrint /> Print
            </button>

            <button className="flex-1 sm:flex-none w-full sm:w-auto min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:from-red-600 hover:to-red-700 transition">
              <FaFilePdf /> PDF
            </button>

            <div className="flex-1 sm:flex-none w-full sm:w-auto min-w-[120px]">
              <AddExpense
                isOpen={isAddModalOpen}
                setIsOpen={setIsAddModalOpen}
                onSubmit={handleAddExpense}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Expense Modal */}
      <EditExpense
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        initialData={editingData}
        onSubmit={handleEditExpense}
      />

      {/* Table */}
      <div className="mt-2 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={expenses}
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

export default Expense;
