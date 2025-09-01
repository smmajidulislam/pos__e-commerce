"use client";
import React, { useState, useEffect } from "react";
import { Table, Skeleton } from "antd";
import {
  useGetCustomerReportQuery,
  useGetCustomerDueQuery,
} from "@/app/features/api/reports";
import AddPayment from "@/app/components/modal/(sales)/AddPament";
import { FaMoneyBillWave } from "react-icons/fa";

const CustomersReport = () => {
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  // Fetch customer list
  const { data: customersData, isLoading: customersLoading } =
    useGetCustomerReportQuery();

  // RTK Query for individual customer due
  const { data: dueQueryData, isFetching: dueLoading } = useGetCustomerDueQuery(
    currentCustomerId,
    { skip: !currentCustomerId }
  );

  // Handle row click to show due
  const handleRowClick = (customer) => {
    if (currentCustomerId === customer.id) {
      setCurrentCustomerId(null);
    } else {
      setCurrentCustomerId(customer.id);
    }
  };

  // Set total pagination
  useEffect(() => {
    if (customersData?.customers) {
      setPagination((prev) => ({
        ...prev,
        total: customersData.customers.length,
      }));
    }
  }, [customersData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Due",
      key: "due",
      render: (_, record) => (
        <div
          onClick={() => handleRowClick(record)}
          className="cursor-pointer text-blue-600"
        >
          {dueLoading && currentCustomerId === record.id ? (
            <Skeleton.Input style={{ width: 50 }} active size="small" />
          ) : dueQueryData && currentCustomerId === record.id ? (
            <span className="text-red-600 font-bold">${dueQueryData.dues}</span>
          ) : (
            "Show Due"
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => {
            setSelectedSale({ salesId: record.id }); // salesId/customerId পাঠানো
            setIsPaymentOpen(true);
          }}
          className="text-green-600 hover:text-green-800"
        >
          <FaMoneyBillWave size={18} />
        </button>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Customers Report
      </h1>

      <Table
        columns={columns}
        dataSource={customersData?.customers || []}
        rowKey="id"
        pagination={pagination}
        loading={customersLoading}
        scroll={{ x: "max-content" }}
      />

      {/* Payment Modal */}
      <AddPayment
        isOpen={isPaymentOpen}
        setIsOpen={setIsPaymentOpen}
        initialData={selectedSale}
      />
    </div>
  );
};

export default CustomersReport;
