import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  brand: {
    fontSize: 16,
    fontWeight: "bold",
  },
  invoiceInfo: {
    fontSize: 12,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#007bff",
    color: "white",
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total: {
    fontWeight: "bold",
  },
});

const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>{invoice.brandName}</Text>
        <Text style={styles.invoiceInfo}>Invoice: {invoice.invoiceNo}</Text>
        <Text style={styles.invoiceInfo}>Date: {invoice.date}</Text>
      </View>

      {/* Customer Info */}
      <View style={{ marginBottom: 20 }}>
        <Text>Invoice To: {invoice.customer.name}</Text>
        <Text>{invoice.customer.address}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>SL</Text>
          <Text style={styles.tableColHeader}>Item Description</Text>
          <Text style={styles.tableColHeader}>Price</Text>
          <Text style={styles.tableColHeader}>Qty</Text>
          <Text style={styles.tableColHeader}>KG/TON</Text> {/* Extra column */}
          <Text style={styles.tableColHeader}>Total</Text>
        </View>

        {/* Table Rows */}
        {invoice.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{index + 1}</Text>
            <Text style={styles.tableCol}>{item.description}</Text>
            <Text style={styles.tableCol}>${item.price.toFixed(2)}</Text>
            <Text style={styles.tableCol}>{item.qty}</Text>
            <Text style={styles.tableCol}>{item.kgTon}</Text> {/* Extra data */}
            <Text style={styles.tableCol}>
              ${(item.price * item.qty).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
        <Text style={styles.total}>Total: ${invoice.total.toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
