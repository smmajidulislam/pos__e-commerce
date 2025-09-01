"use client";

import { useState } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useTheme } from "@/app/hooks/theme/useThem";

const PosLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useTheme();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header setMobileSidebarOpen={setMobileSidebarOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        {/* Main Content */}
        <main
          className={`${
            isCollapsed ? "ml-16" : "ml-52"
          } flex-1 bg-white p-6 overflow-auto scroll-smooth`}
        >
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm min-h-[100%]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PosLayout;
