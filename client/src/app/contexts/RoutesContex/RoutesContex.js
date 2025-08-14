"use client";
import { createContext, useState } from "react";

export const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
  const [isPos, setIsPos] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <RoutesContext.Provider value={{ isPos, setIsPos, loading, setLoading }}>
      {children}
    </RoutesContext.Provider>
  );
};
