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
  { label: "Dashboard", icon: <FaTachometerAlt />, link: "/" },
  {
    label: "Products",
    icon: <MdOutlineShoppingBag />,
    subItems: [
      { label: "Product", link: "/product" },
      { label: "Create Product", link: "/createproduct" },
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
      { label: "Sales Summary", link: "/reports/sales-summary" },
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
                      <span className="flex items-center gap-3 text-lg">
                        <span className="text-xl">{item.icon}</span>
                        {(mobileOpen || !isCollapsed) && (
                          <span className="font-medium">{item.label}</span>
                        )}
                      </span>
                      {(mobileOpen || !isCollapsed) &&
                        (openMenu === item.label ? (
                          <IoIosArrowDown className="text-lg" />
                        ) : (
                          <IoIosArrowForward className="text-lg" />
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
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-200 rounded-lg text-lg transition-all duration-200"
                    onClick={() => mobileOpen && setMobileOpen(false)}
                  >
                    <span className="text-xl">{item.icon}</span>
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
