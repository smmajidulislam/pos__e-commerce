"use client";
import React, { forwardRef } from "react";

const PrintInvoice = forwardRef(({ invoiceData }, ref) => {
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const total = subtotal + subtotal * (invoiceData.tax / 100);

  // Page-wise split: 5 items per page
  const itemsPerPage = 5;
  const pages = [];
  for (let i = 0; i < invoiceData.items.length; i += itemsPerPage) {
    pages.push(invoiceData.items.slice(i, i + itemsPerPage));
  }

  return (
    <div ref={ref} className="text-gray-800">
      {pages.map((itemsPage, pageIndex) => (
        <div
          key={pageIndex}
          className="max-w-[850px] mx-auto bg-white shadow-xl rounded-2xl p-8 mb-10 print:mb-0"
          style={{
            pageBreakAfter: pageIndex < pages.length - 1 ? "always" : "auto",
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-blue-600">
                {invoiceData.brandName}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {invoiceData.tagline}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <h2 className="text-4xl font-bold tracking-wider">INVOICE</h2>
              <p className="text-gray-500 mt-1">Date: {invoiceData.date}</p>
            </div>
          </div>

          {/* Invoice Number */}
          {pageIndex === 0 && (
            <div className="flex justify-start mb-6">
              <span className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-full">
                Invoice # {invoiceData.invoiceNumber}
              </span>
            </div>
          )}

          {/* Customer Info */}
          {pageIndex === 0 && (
            <div className="mb-6">
              <p className="font-semibold text-lg mb-1">Invoice To:</p>
              <p>{invoiceData.customer.name}</p>
              <p>{invoiceData.customer.address}</p>
            </div>
          )}

          {/* Custom Table */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-center">SL</th>
                  <th className="border px-4 py-2 text-left">Description</th>
                  <th className="border px-4 py-2 text-center">Unit</th>
                  <th className="border px-4 py-2 text-right">Price</th>
                  <th className="border px-4 py-2 text-center">Qty</th>
                  <th className="border px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {itemsPage.map((item) => (
                  <tr key={item.sl} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 text-center">{item.sl}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2 text-center">
                      {item.unit}
                    </td>
                    <td className="border px-4 py-2 text-right">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2 text-center">{item.qty}</td>
                    <td className="border px-4 py-2 text-right">
                      ${(item.price * item.qty).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals (only on last page) */}
          {pageIndex === pages.length - 1 && (
            <div className="flex justify-end mb-6">
              <div className="w-full md:w-1/3 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Sub Total:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax:</span>
                  <span>{invoiceData.tax.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between bg-blue-600 text-white font-semibold p-2 rounded">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Info (only on last page) */}
          {pageIndex === pages.length - 1 && (
            <div className="mb-6">
              <p className="font-semibold text-lg mb-1">Payment Info:</p>
              <p>Account No: {invoiceData.paymentInfo.account}</p>
              <p>Bank: {invoiceData.paymentInfo.bank}</p>
              <p>Due Date: {invoiceData.paymentInfo.dueDate}</p>
            </div>
          )}

          {/* Terms (only on last page) */}
          {pageIndex === pages.length - 1 && (
            <div className="mb-6">
              <p className="font-semibold text-lg mb-1">Terms & Conditions:</p>
              <p className="text-gray-600">{invoiceData.terms}</p>
            </div>
          )}

          {/* Footer */}
          {pageIndex === pages.length - 1 && (
            <div className="flex flex-col md:flex-row justify-between items-center border-t pt-4 text-gray-600">
              <p className="text-blue-600 font-semibold mt-2 md:mt-0">
                Thank you for your business
              </p>
              <p className="mt-2 md:mt-0">Authorized Sign</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default PrintInvoice;
