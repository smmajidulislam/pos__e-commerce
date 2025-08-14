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

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, link: "#" },
  {
    label: "Products",
    icon: <MdOutlineShoppingBag />,
    subItems: [
      { label: "Product", link: "#" },
      { label: "Create Product", link: "#" },
      { label: "Category", link: "#" },
      { label: "Sub Category", link: "#" },
      { label: "Brands", link: "#" },
      { label: "Units", link: "#" },
      { label: "Variants List", link: "#" },
      { label: "Warranties", link: "#" },
    ],
  },
  {
    label: "Stock",
    icon: <FaTachometerAlt />,
    subItems: [
      { label: "Stock Adjustment", link: "#" },
      { label: "Stock Transfer", link: "#" },
    ],
  },
  {
    label: "Purchase",
    icon: <FaChartBar />,
    subItems: [
      { label: "Purchase", link: "#" },
      { label: "Purchase Order", link: "#" },
      { label: "Purchase Return", link: "#" },
    ],
  },
  {
    label: "Sales",
    icon: <FaShoppingCart />,
    subItems: [
      { label: "Sales", link: "#" },
      { label: "Sales Return", link: "#" },
      { label: "Pos", link: "#" },
    ],
  },
  {
    label: "Coupons",
    icon: <FaTags />,
    subItems: [{ label: "Manage Coupons", link: "#" }],
  },
  {
    label: "People",
    icon: <FaTags />,
    subItems: [
      { label: "Customers", link: "#" },
      { label: "Suppliers", link: "#" },
      { label: "Users", link: "#" },
      { label: "Roles", link: "#" },
      { label: "Permissions", link: "#" },
      { label: "Branches", link: "#" },
      { label: "Warehouses", link: "#" },
    ],
  },
  {
    label: "Reports",
    icon: <FaTags />,
    subItems: [
      { label: "Sales Report", link: "#" },
      { label: "Purchase Report", link: "#" },
      { label: "Selles Report", link: "#" },
      { label: "Low Stock Report", link: "#" },
      { label: "Supplier Report", link: "#" },
      { label: "Customer Report", link: "#" },
      { label: "Profit & Loss Report", link: "#" },
    ],
  },
  { label: "Settings", icon: <FaCog />, link: "#" },
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
        className={`
          bg-gray-100 h-screen text-black shadow-md p-2 overflow-y-auto transition-all duration-300
          fixed sm:relative z-50
          ${mobileOpen ? "w-full left-0" : "left-[-100%] sm:left-0"}
          ${!mobileOpen && isCollapsed ? "w-16 sm:w-16" : "w-52"}
        `}
      >
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
                      {/* Show text on desktop if not collapsed OR mobileOpen */}
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

                  {openMenu === item.label && (mobileOpen || !isCollapsed) && (
                    <ul className="text-sm mt-1 ml-3 space-y-1">
                      {item.subItems.map((sub, subIndex) => (
                        <li
                          key={subIndex}
                          className={`relative pl-5 cursor-pointer before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-yellow-500 ${
                            activeSub === sub.label
                              ? "text-yellow-500 font-semibold"
                              : "text-black"
                          }`}
                          onClick={() => setActiveSubItem(sub.label)}
                        >
                          {sub.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  href={item.link}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded"
                  onClick={() => mobileOpen && setMobileOpen(false)}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                  </span>
                  {(mobileOpen || !isCollapsed) && <span>{item.label}</span>}
                </a>
              )}
            </li>
          ))}
        </ul>
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
