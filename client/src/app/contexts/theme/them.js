"use client";
import { createContext, useState } from "react";

export const ThemContext = createContext();

export const ThemProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [loading, setLoading] = useState(false);

  return (
    <ThemContext.Provider
      value={{ isCollapsed, setIsCollapsed, loading, setLoading }}
    >
      {children}
    </ThemContext.Provider>
  );
};
