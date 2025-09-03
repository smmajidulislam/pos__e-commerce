"use client";
import React, { forwardRef } from "react";

const LowStockReportsPrints = forwardRef(({ invoiceData }, ref) => {
  // প্রতি পেজে ১০টা আইটেম
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
          className="max-w-[850px] mx-auto bg-white shadow-xl rounded-2xl p-6 mb-6 print:mb-0"
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
                LOW STOCK REPORT
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

          {/* Info */}
          {pageIndex === 0 && (
            <div className="mb-4">
              <p className="font-semibold text-base">Report:</p>
              <p>{invoiceData?.customer?.address}</p>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-gray-300 text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1 text-center">SL</th>
                  <th className="border px-2 py-1 text-left">Description</th>
                  <th className="border px-2 py-1 text-center">Qty</th>
                  <th className="border px-2 py-1 text-center">Unit</th>
                  <th className="border px-2 py-1 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {itemsPage.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1 text-center">{item.sl}</td>
                    <td className="border px-2 py-1">{item.description}</td>
                    <td className="border px-2 py-1 text-center">{item.qty}</td>
                    <td className="border px-2 py-1 text-center">
                      {item.unit}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer (last page only) */}
          {pageIndex === pages?.length - 1 && (
            <div className="mt-6 border-t pt-3 text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center">
              <div>
                <p className="font-semibold">Payment Info:</p>
                <p>Account: {invoiceData?.paymentInfo?.account}</p>
                <p>Bank: {invoiceData?.paymentInfo?.bank}</p>
                <p>Due Date: {invoiceData?.paymentInfo?.dueDate}</p>
              </div>
              <div className="text-right mt-3 md:mt-0">
                <p className="font-semibold">{invoiceData?.terms}</p>
                <p>Authorized Sign</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default LowStockReportsPrints;
