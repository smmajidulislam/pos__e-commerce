"use client";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaTags,
  FaShoppingCart,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { useTheme } from "@/app/hooks/theme/useThem";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
  {
    label: "Products",
    icon: <MdOutlineShoppingBag />,
    subItems: [
      { label: "Product", link: "/product" },
      { label: "Create Product", link: "/product/create" },
      { label: "Category", link: "/category" },
      { label: "Sub Category", link: "/subcategory" },
      { label: "Brands", link: "/brands" },
      { label: "Units", link: "/units" },
      { label: "Variants List", link: "/variants" },
      { label: "Warranties", link: "/warranties" },
    ],
  },
  {
    label: "Stock",
    icon: <FaTachometerAlt />,
    subItems: [
      { label: "Stock Adjustment", link: "/stock-adjustment" },
      { label: "Stock Transfer", link: "/stock-transfer" },
    ],
  },
  {
    label: "Purchase",
    icon: <FaChartBar />,
    subItems: [
      { label: "Purchase", link: "/purchase" },
      { label: "Purchase Order", link: "/purchase-order" },
      { label: "Purchase Return", link: "/purchase-return" },
    ],
  },
  {
    label: "Sales",
    icon: <FaShoppingCart />,
    subItems: [
      { label: "Sales", link: "/sales" },
      { label: "Sales Return", link: "/sales-return" },
      { label: "Pos", link: "/pos" },
    ],
  },
  {
    label: "Coupons",
    icon: <FaTags />,
    subItems: [{ label: "Manage Coupons", link: "/coupons" }],
  },
  {
    label: "People",
    icon: <FaTags />,
    subItems: [
      { label: "Customers", link: "/customers" },
      { label: "Suppliers", link: "/suppliers" },
      { label: "Users", link: "/users" },
      { label: "Roles", link: "/roles" },
      { label: "Permissions", link: "/permissions" },
      { label: "Branches", link: "/branches" },
      { label: "Warehouses", link: "/warehouses" },
    ],
  },
  {
    label: "Reports",
    icon: <FaTags />,
    subItems: [
      { label: "Sales Report", link: "/reports/sales" },
      { label: "Purchase Report", link: "/reports/purchase" },
      { label: "Selles Report", link: "/reports/sales-summary" },
      { label: "Low Stock Report", link: "/reports/low-stock" },
      { label: "Supplier Report", link: "/reports/supplier" },
      { label: "Customer Report", link: "/reports/customer" },
      { label: "Profit & Loss Report", link: "/reports/profit-loss" },
    ],
  },
  { label: "Settings", icon: <FaCog />, link: "/settings" },
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
        className={`bg-gray-100 text-black shadow-md fixed top-16 left-0 h-screen z-50 transition-all duration-300 ${
          mobileOpen ? "w-full" : isCollapsed ? "w-16" : "w-52"
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto p-2">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="flex justify-between items-center w-full px-2 py-1 hover:bg-gray-200 rounded"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 flex items-center justify-center">
                          {item.icon}
                        </span>
                        {(mobileOpen || !isCollapsed) && (
                          <span>{item.label}</span>
                        )}
                      </span>
                      {(mobileOpen || !isCollapsed) &&
                        (openMenu === item.label ? (
                          <IoIosArrowDown />
                        ) : (
                          <IoIosArrowForward />
                        ))}
                    </button>

                    {openMenu === item.label &&
                      (mobileOpen || !isCollapsed) && (
                        <ul className="text-sm mt-1 ml-3 space-y-1">
                          {item.subItems.map((sub, subIndex) => (
                            <li key={subIndex} className="relative pl-5">
                              <Link
                                href={sub.link}
                                className={`block cursor-pointer py-1 ${
                                  activeSub === sub.label
                                    ? "text-yellow-500 font-semibold"
                                    : "text-black"
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
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded"
                    onClick={() => mobileOpen && setMobileOpen(false)}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      {item.icon}
                    </span>
                    {(mobileOpen || !isCollapsed) && <span>{item.label}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 sm:hidden p-2 bg-white shadow rounded"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        <HiOutlineMenu size={24} />
      </button>
    </>
  );
};

export default Sidebar;
