"use client";
import React, { useRef } from "react";
import PrintInvoice from "./prints/Print";
import PrintInvoicePurchases from "./prints/purchaseOrderPrint";
import PrintButton from "./prints/PrintButton";
import SalesListPrint from "./prints/saleslistPrint";
import CustomerReportPrint from "./prints/reports/CustomerReportPrints";
import LowStockReports from "./prints/reports/LowStockReportsPrints";
import ProfitAndLossPrint from "./prints/reports/ProfitAndLossPrint";
import PurchasesReportPrint from "./prints/reports/PurchaseReportPrint";
import SupplierReportPrint from "./prints/reports/SupplierReportPrint";
import SalesReportPrint from "./prints/reports/SalesReportPrint";

export default function Print({
  invoiceData,
  purchaseorder,
  saleslist,
  PurchasesReport,
  customerReport,
  lowStock,
  profit,
  SalesReport,
  SupplierReport,
}) {
  const printRef = useRef();

  let PrintComponent;

  switch (true) {
    case purchaseorder:
      PrintComponent = PrintInvoicePurchases;
      break;

    case saleslist:
      PrintComponent = SalesListPrint;
      break;
    case customerReport:
      PrintComponent = CustomerReportPrint;
      break;

    case lowStock:
      PrintComponent = LowStockReports;
      break;

    case profit:
      PrintComponent = ProfitAndLossPrint;
      break;

    case PurchasesReport:
      PrintComponent = PurchasesReportPrint;
      break;

    case SupplierReport:
      PrintComponent = SupplierReportPrint;
      break;

    case SalesReport:
      PrintComponent = SalesReportPrint;
      break;

    default:
      PrintComponent = PrintInvoice;
  }

  return (
    <div className="p-6">
      <PrintComponent ref={printRef} invoiceData={invoiceData} />
      <PrintButton printRef={printRef} />
    </div>
  );
}
