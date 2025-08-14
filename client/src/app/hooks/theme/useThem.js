"use client";
import { ThemContext } from "@/app/contexts/theme/them";
import { useContext } from "react";

// Custom hook for easier usage
export const useTheme = () => {
  const context = useContext(ThemContext);

  if (!context) {
    throw new Error("Theme must be used within a Theme");
  }

  return context;
};
