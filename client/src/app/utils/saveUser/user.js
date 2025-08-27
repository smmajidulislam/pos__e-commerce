"use client";
import { useState, useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LocalStorage থেকে User লোড করা
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // User Save করা
  const saveUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // User Remove করা (Logout এর জন্য)
  const removeUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, saveUser, removeUser, loading };
};
