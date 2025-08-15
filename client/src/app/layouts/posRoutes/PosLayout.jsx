"use client";

import { useState } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const PosLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
        <main className="flex-1 bg-white p-6 overflow-auto">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PosLayout;
