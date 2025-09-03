"use client";
import React, { useState, useEffect } from "react";
import { Table, Skeleton } from "antd";
import {
  useGetCustomerReportQuery,
  useGetCustomerDueQuery,
} from "@/app/features/api/reports";
import AddPayment from "@/app/components/modal/(sales)/AddPament";
import { FaMoneyBillWave } from "react-icons/fa";
import Print from "@/app/utils/Print";

const CustomersReport = () => {
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
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
      render: (text, record) => (
        <span className="font-medium text-gray-800">{`${record.firstName} ${record.lastName}`}</span>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      responsive: ["lg", "xl"],
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
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => {
            setSelectedSale({ customerId: record.id });
            setIsPaymentOpen(true);
          }}
          className="text-green-600 hover:text-green-800 transition-colors"
          title="Add Payment"
        >
          <FaMoneyBillWave size={18} />
        </button>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];

  // DataSource বানানো
  const dataSource = customersData?.customers || [];

  // invoiceData বানানো (প্রিন্টের জন্য)
  const invoiceData = {
    brandName: "Selo POS",
    tagline: "Sales Management Report",
    date: new Date().toLocaleDateString(),
    invoiceNumber: "SL-" + new Date().getTime(),
    customer: {
      address: "Customers Report",
    },
    items: dataSource.map((cust, index) => ({
      sl: index + 1,
      name: `${cust.firstName} ${cust.lastName}`,
      email: cust.email,
      phone: cust.phone,
      city: cust.city,
      country: cust.country,
      due: cust.due ?? 0,
    })),
    terms: "Thank you!",
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
          Customers Report
        </h1>
        <div>
          <Print invoiceData={invoiceData} customerReport />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 overflow-hidden">
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} customers`,
          }}
          loading={customersLoading}
          scroll={{ x: "max-content" }}
        />
      </div>

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
