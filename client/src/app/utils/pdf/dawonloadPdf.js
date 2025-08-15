import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../components/InvoicePDF";

const invoiceData = {
  brandName: "Brand Name",
  invoiceNo: "5248",
  date: "01/02/2020",
  customer: {
    name: "Dwyane Clark",
    address: "24 Dummy Street Area, Location, Lorem Ipsum",
  },
  items: [
    { description: "Lorem Ipsum Dolor", price: 50, qty: 1, kgTon: "5kg" },
    {
      description: "Pellentesque id neque ligula",
      price: 20,
      qty: 3,
      kgTon: "15kg",
    },
    {
      description: "Interdum et malesuada fames",
      price: 10,
      qty: 2,
      kgTon: "2kg",
    },
    {
      description: "Vivamus volutpat faucibus",
      price: 90,
      qty: 1,
      kgTon: "10kg",
    },
  ],
  total: 220,
};

const InvoicePage = () => {
  return (
    <div style={{ padding: 50 }}>
      <PDFDownloadLink
        document={<InvoicePDF invoice={invoiceData} />}
        fileName="invoice.pdf"
      >
        {({ loading }) =>
          loading ? "Loading document..." : "Download Invoice PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default InvoicePage;
