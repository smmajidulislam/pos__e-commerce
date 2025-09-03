"use client";
import React, { forwardRef } from "react";

const PurchasesReportPrint = forwardRef(({ invoiceData }, ref) => {
  const itemsPerPage = 10;
  const pages = [];
  for (let i = 0; i < invoiceData?.items?.length; i += itemsPerPage) {
    pages.push(invoiceData?.items?.slice(i, i + itemsPerPage));
  }

  return (
    <div ref={ref} className="text-gray-800 hidden print:block">
      {pages.map((itemsPage, pageIndex) => (
        <div
          key={pageIndex}
          className="max-w-[1000px] mx-auto bg-white shadow-xl rounded-2xl p-6 mb-6 print:mb-0"
          style={{
            pageBreakAfter: pageIndex < pages.length - 1 ? "always" : "auto",
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-blue-600">
                {invoiceData?.brandName}
              </h1>
              <p className="text-sm text-gray-500">{invoiceData?.tagline}</p>
            </div>
            <div className="mt-2 md:mt-0 text-right">
              <h2 className="text-3xl font-bold tracking-wider">
                PURCHASE REPORT
              </h2>
              <p className="text-gray-500">Date: {invoiceData?.date}</p>
            </div>
          </div>

          {/* Ref only first page */}
          {pageIndex === 0 && (
            <div className="flex justify-start mb-4">
              <span className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-full">
                Ref # {invoiceData?.invoiceNumber}
              </span>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-gray-300 text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1 text-center">SL</th>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Product</th>
                  <th className="border px-2 py-1">SKU</th>
                  <th className="border px-2 py-1">Store</th>
                  <th className="border px-2 py-1">Warehouse</th>
                  <th className="border px-2 py-1 text-center">Qty</th>
                  <th className="border px-2 py-1 text-right">Amount</th>
                  <th className="border px-2 py-1 text-right">Payment</th>
                  <th className="border px-2 py-1 text-right">Due</th>
                  <th className="border px-2 py-1 text-right">Commission</th>
                  <th className="border px-2 py-1 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {itemsPage.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1 text-center">{item.sl}</td>
                    <td className="border px-2 py-1">{item.date}</td>
                    <td className="border px-2 py-1">{item.productName}</td>
                    <td className="border px-2 py-1">{item.sku}</td>
                    <td className="border px-2 py-1">{item.store}</td>
                    <td className="border px-2 py-1">{item.warehouse}</td>
                    <td className="border px-2 py-1 text-center">
                      {item.quantity}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {item.amount}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {item.payment}
                    </td>
                    <td className="border px-2 py-1 text-right">{item.due}</td>
                    <td className="border px-2 py-1 text-right">
                      {item.commission}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer (last page only) */}
          {pageIndex === pages?.length - 1 && (
            <div className="flex flex-col md:flex-row justify-between items-center border-t pt-2 text-gray-600 text-sm">
              <p className="text-blue-600 font-semibold">
                {invoiceData?.terms}
              </p>
              <p>Authorized Sign</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default PurchasesReportPrint;
