// src/app/utils/handlePrint.js
const handlePrint = (printRef) => {
  if (!printRef?.current) return;
  const printContents = printRef.current.innerHTML;
  const newWindow = window.open("", "", "width=800,height=900");
  newWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="bg-gray-100 p-10">${printContents}</body>
      </html>
    `);
  newWindow.document.close();
  newWindow.print();
};

export default handlePrint;
