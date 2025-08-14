"use client";
import { useContext } from "react";
import { RoutesContext } from "../../contexts/RoutesContex/RoutesContex";

// Custom hook for easier usage
export const useRoutes = () => {
  const context = useContext(RoutesContext);

  if (!context) {
    throw new Error("usePos must be used within a PosProvider");
  }

  return context;
};
