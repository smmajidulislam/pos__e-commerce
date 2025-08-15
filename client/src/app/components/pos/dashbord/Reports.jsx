// Information.jsx
import {
  FaUsers,
  FaTruck,
  FaFileInvoiceDollar,
  FaShoppingCart,
} from "react-icons/fa";
import InformationCardSkeleton from "./SkeltionInformation";
import ReportCard from "./ReportCard";

const informationData = [
  {
    icon: <FaUsers className="text-white text-2xl" />, // Customer icon updated
    title: "Customer",
    bg: "bg-gradient-to-l from-[#8A2BE2] to-[#FF69B4]",
    quantity: 0,
  },
  {
    icon: <FaTruck className="text-white text-2xl" />, // Supplier icon updated
    title: "Supplier",
    bg: "bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4]",
    quantity: 0,
  },
  {
    icon: <FaFileInvoiceDollar className="text-white text-2xl" />, // Purchase Invoices icon updated
    title: "Purchase Invoices",
    bg: "bg-gradient-to-r from-[#00FFFF] to-[#FF69B4]",
    quantity: 500000,
  },
  {
    icon: <FaShoppingCart className="text-white text-2xl" />, // Sales Invoices icon updated
    title: "Sales Invoices",
    bg: "bg-gradient-to-r from-blue-400 to-purple-500",
    quantity: 0,
  },
];

const Reports = () => {
  let isLoading;
  return (
    <>
      <div className="flex flex-wrap -mx-2 p-4">
        {informationData.map((item, index) =>
          isLoading ? (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <InformationCardSkeleton />
            </div>
          ) : (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <ReportCard
                icon={item.icon}
                title={item.title}
                quantity={item.quantity}
                bg={item.bg}
              />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Reports;
