"use client";
import React, { useRef } from "react";
import PrintInvoice from "./prints/Print";
import PrintButton from "./prints/PrintButton";

export default function Print(
  invoiceData = {
    brandName: "Selo Pos",
    tagline: "Tagline goes here",
    date: "01/02/2020",
    invoiceNumber: "2548",
    customer: {
      name: "Dwyane Clark",
      address: "24 Dummy Street Area, Location, Lorem Ipsum, 570002",
    },
    items: [
      {
        sl: 1,
        description: "Lorem Ipsum Dolor",
        price: 50,
        qty: 1,
        unit: "Kg",
      },
      {
        sl: 2,
        description: "Pellentesque id neque ligula",
        price: 20,
        qty: 3,
        unit: "Ton",
      },
      {
        sl: 3,
        description: "Interdum et malesuada fames",
        price: 10,
        qty: 2,
        unit: "Pieces",
      },
      {
        sl: 4,
        description: "Vivamus volutpat faucibus",
        price: 30,
        qty: 1,
        unit: "Kg",
      },
    ],
    tax: 0,
    paymentInfo: {
      account: "123 456 789",
      bank: "Your Bank Name",
      dueDate: "01/03/2020",
    },
    terms: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  }
) {
  const printRef = useRef();

  return (
    <div className="p-6">
      <PrintInvoice ref={printRef} invoiceData={invoiceData} />
      <PrintButton printRef={printRef} />
    </div>
  );
}
