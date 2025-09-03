"use client";
import React, { forwardRef } from "react";

const ProfitAndLossPrint = forwardRef(({ invoiceData }, ref) => {
  // প্রতি পেজে 15 টি রিপোর্ট
  const itemsPerPage = 15;
  const pages = [];
  for (let i = 0; i < invoiceData?.dateWiseReport?.length; i += itemsPerPage) {
    pages.push(invoiceData?.dateWiseReport?.slice(i, i + itemsPerPage));
  }

  return (
    <div ref={ref} className="text-gray-800 hidden print:block">
      {pages.map((itemsPage, pageIndex) => (
        <div
          key={pageIndex}
          className="max-w-[950px] mx-auto bg-white shadow-xl rounded-2xl p-6 mb-6 print:mb-0"
          style={{
            pageBreakAfter: pageIndex < pages.length - 1 ? "always" : "auto",
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-blue-600">
                {invoiceData?.brandName || "Selo POS"}
              </h1>
              <p className="text-sm text-gray-500">{invoiceData?.tagline}</p>
            </div>
            <div className="mt-2 md:mt-0 text-right">
              <h2 className="text-3xl font-bold tracking-wider">
                PROFIT & LOSS REPORT
              </h2>
              <p className="text-gray-500">Generated: {invoiceData?.date}</p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-gray-300 text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1 text-center">Date</th>
                  <th className="border px-2 py-1 text-right">Gross Sales</th>
                  <th className="border px-2 py-1 text-right">Net Sales</th>
                  <th className="border px-2 py-1 text-right">Purchases</th>
                  <th className="border px-2 py-1 text-right">Discount</th>
                  <th className="border px-2 py-1 text-right">Expense</th>
                  <th className="border px-2 py-1 text-right">Tax</th>
                  <th className="border px-2 py-1 text-right">Profit / Loss</th>
                </tr>
              </thead>
              <tbody>
                {itemsPage.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1 text-center">
                      {item.date}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {item.grossSales}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {item.netSales}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {item.purchases}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {item.discount}
                    </td>
                    <td className="border px-2 py-1 text-right">
                      {item.expenseAmount}
                    </td>
                    <td className="border px-2 py-1 text-right">{item.tax}</td>
                    <td
                      className={`border px-2 py-1 text-right font-semibold ${
                        item.profit < 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {item.profit < 0
                        ? `Loss ${Math.abs(item.profit)}`
                        : `Profit ${item.profit}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Overall Summary (last page only) */}
          {pageIndex === pages.length - 1 && (
            <div className="border-t pt-4 text-sm">
              <h3 className="text-lg font-bold mb-2">Overall Report Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className="p-2 border rounded">
                  <p className="font-semibold">Total Gross Sales</p>
                  <p>{invoiceData?.overallReport?.totalGrossSales}</p>
                </div>
                <div className="p-2 border rounded">
                  <p className="font-semibold">Total Net Sales</p>
                  <p>{invoiceData?.overallReport?.totalNetSales}</p>
                </div>
                <div className="p-2 border rounded">
                  <p className="font-semibold">Total Purchases</p>
                  <p>{invoiceData?.overallReport?.totalPurchases}</p>
                </div>
                <div className="p-2 border rounded">
                  <p className="font-semibold">Overall</p>
                  <p
                    className={`font-bold ${
                      invoiceData?.overallReport?.profit < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {invoiceData?.overallReport?.profit < 0
                      ? `Loss ${Math.abs(invoiceData?.overallReport?.profit)}`
                      : `Profit ${invoiceData?.overallReport?.profit}`}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center text-gray-600">
                <p className="text-blue-600 font-semibold">
                  {invoiceData?.terms || "Report generated by Selo POS"}
                </p>
                <p>Authorized Sign</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default ProfitAndLossPrint;
