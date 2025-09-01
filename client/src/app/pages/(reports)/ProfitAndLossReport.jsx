"use client";
import React from "react";
import { useGetProfitAndLossQuery } from "@/app/features/api/reports";
import { Table, Skeleton, Card, Row, Col } from "antd";

const ProfitAndLossReport = () => {
  const { data, isLoading } = useGetProfitAndLossQuery();

  if (isLoading) {
    return <Skeleton active />;
  }

  const dateWiseReport = data?.data?.dateWiseReport || [];
  const overallReport = data?.data?.overallReport || {};

  // Table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Gross Sales",
      dataIndex: "grossSales",
      key: "grossSales",
    },
    {
      title: "Net Sales",
      dataIndex: "netSales",
      key: "netSales",
    },
    {
      title: "Purchases",
      dataIndex: "purchases",
      key: "purchases",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Expense",
      dataIndex: "expenseAmount",
      key: "expenseAmount",
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "Profit / Loss",
      dataIndex: "profit",
      key: "profit",
      render: (value) => {
        if (value < 0) {
          return <span style={{ color: "red" }}>Loss {Math.abs(value)}</span>;
        } else {
          return <span style={{ color: "green" }}>Profit {value}</span>;
        }
      },
    },
  ];

  return (
    <div className="p-4">
      {/* Overall Report Summary */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card title="Total Gross Sales">
            {overallReport?.totalGrossSales}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Net Sales">{overallReport?.totalNetSales}</Card>
        </Col>
        <Col span={6}>
          <Card title="Total Purchases">{overallReport?.totalPurchases}</Card>
        </Col>
        <Col span={6}>
          <Card title="Overall">
            {overallReport?.profit < 0 ? (
              <span style={{ color: "red", fontWeight: "bold" }}>
                Loss {Math.abs(overallReport?.profit)}
              </span>
            ) : (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Profit {overallReport?.profit}
              </span>
            )}
          </Card>
        </Col>
      </Row>

      {/* Date Wise Table */}
      <Table
        columns={columns}
        dataSource={dateWiseReport}
        rowKey="date"
        bordered
        pagination={false}
      />
    </div>
  );
};

export default ProfitAndLossReport;
