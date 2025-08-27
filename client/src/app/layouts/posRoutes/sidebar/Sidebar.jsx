"use client";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaTags,
  FaShoppingCart,
  FaChartBar,
  FaCog,
  FaUndo,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { useTheme } from "@/app/hooks/theme/useThem";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt size={20} />, link: "/shop" },
  {
    label: "Products",
    icon: <MdOutlineShoppingBag size={20} />,
    subItems: [
      { label: "Product", link: "/product" },
      { label: "Create Product", link: "/createproduct" },
      { label: "Category", link: "/category" },
      { label: "Sub Category", link: "/subcategory" },
      { label: "Sub Sub Category", link: "/subsubcategory" },
      { label: "Brands", link: "/brands" },
      { label: "Variants List", link: "/variants" },
      { label: "Variants Values", link: "/variantvalues" },
      { label: "Warranties", link: "/warranties" },
    ],
  },
  {
    label: "Stock",
    icon: <FaTachometerAlt size={20} />,
    subItems: [
      { label: "Stock Adjustment", link: "/stockadjustment" },
      { label: "Stock Transfer", link: "/stocktransffer" },
    ],
  },
  {
    label: "Purchase",
    icon: <FaChartBar size={20} />,
    subItems: [
      { label: "Purchase", link: "/purchase" },
      { label: "Purchase Order", link: "/purchaseorder" },
    ],
  },

  {
    label: "Return Product",
    icon: <FaUndo size={20} />,
    link: "/return",
  },
  {
    label: "Sales",
    icon: <FaShoppingCart size={20} />,
    subItems: [
      { label: "Sales", link: "/sales" },
      { label: "Pos", link: "/pos" },
      { label: "Sales list", link: "/saleslist" },
    ],
  },
  {
    label: "Coupons",
    icon: <FaTags size={20} />,
    subItems: [{ label: "Manage Coupons", link: "/coupons" }],
  },
  {
    label: "People",
    icon: <FaTags size={20} />,
    subItems: [
      { label: "Customers", link: "/customers" },
      { label: "Suppliers", link: "/suppliers" },
      { label: "Users", link: "/users" },
      { label: "Roles", link: "/roles" },
      { label: "Permissions", link: "/permissions" },
      { label: "Store", link: "/store" },
      { label: "Warehouses", link: "/warehouses" },
    ],
  },
  { label: "Expense", icon: <FaMoneyBillAlt size={20} />, link: "/expense" },
  {
    label: "Reports",
    icon: <FaTags size={20} />,
    subItems: [
      { label: "Sales Report", link: "/salesreports" },
      { label: "Purchase Report", link: "/purchasereports" },
      { label: "Low Stock Report", link: "/lowstockreports" },
      { label: "Supplier Report", link: "/supplierreports" },
      { label: "Customer Report", link: "/customerreports" },
      { label: "Profit & Loss Report", link: "/profitlossreports" },
    ],
  },
  { label: "Settings", icon: <FaCog size={20} />, link: "/settings" },
];

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState("");
  const [activeSub, setActiveSub] = useState("");
  const { isCollapsed, setIsCollapsed } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = (label) =>
    setOpenMenu((prev) => (prev === label ? "" : label));

  const setActiveSubItem = (label) => {
    setActiveSub(label);
    setMobileOpen(false); // Mobile e item select hole close
  };

  return (
    <>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseEnter={() => !mobileOpen && setIsCollapsed(false)}
        onMouseLeave={() => !mobileOpen && setIsCollapsed(true)}
        className={`bg-gray-100 text-black shadow-lg fixed top-16 left-0 h-screen z-50 transition-all duration-300 ${
          mobileOpen ? "w-full" : isCollapsed ? "w-16" : "w-56"
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto p-3">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="flex justify-between items-center w-full px-3 py-2 hover:bg-gray-200 rounded-lg transition-all duration-200"
                    >
                      <span className="flex items-center gap-3">
                        <span>{item.icon}</span>
                        {(mobileOpen || !isCollapsed) && (
                          <span className="font-medium">{item.label}</span>
                        )}
                      </span>
                      {(mobileOpen || !isCollapsed) &&
                        (openMenu === item.label ? (
                          <IoIosArrowDown size={16} />
                        ) : (
                          <IoIosArrowForward size={16} />
                        ))}
                    </button>

                    {openMenu === item.label &&
                      (mobileOpen || !isCollapsed) && (
                        <ul className="text-sm mt-1 ml-5 space-y-1">
                          {item.subItems.map((sub, subIndex) => (
                            <li
                              key={subIndex}
                              className="relative flex items-center gap-2"
                            >
                              {/* Dot indicator */}
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  activeSub === sub.label
                                    ? "bg-yellow-500"
                                    : "bg-gray-400"
                                }`}
                              ></span>
                              <Link
                                href={sub.link}
                                className={`block py-1 px-2 rounded hover:bg-gray-200 transition-all duration-200 ${
                                  activeSub === sub.label
                                    ? "text-yellow-500 font-semibold"
                                    : "text-gray-800"
                                }`}
                                onClick={() => setActiveSubItem(sub.label)}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </>
                ) : (
                  <Link
                    href={item.link}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-200 rounded-lg transition-all duration-200"
                    onClick={() => mobileOpen && setMobileOpen(false)}
                  >
                    <span>{item.icon}</span>
                    {(mobileOpen || !isCollapsed) && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 sm:hidden p-3 bg-white shadow-lg rounded-lg"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        <HiOutlineMenu size={28} />
      </button>
    </>
  );
};

export default Sidebar;
