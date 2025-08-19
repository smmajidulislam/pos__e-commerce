// utils/useStoreToken.js
"use client";
import { useState, useEffect } from "react";

const useStoreToken = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true); // loading state

  // Initial load: localStorage থেকে store load করা
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selectedStore");
      if (stored) setStore(JSON.parse(stored));
    }
    setLoading(false); // load complete
  }, []);

  // Store set করার ফাংশন
  const save = (newStore) => {
    if (!newStore) return;
    setStore(newStore);
    localStorage.setItem("selectedStore", JSON.stringify(newStore));
  };

  // Store remove করার ফাংশন
  const remove = () => {
    setStore(null);
    localStorage.removeItem("selectedStore");
  };

  return { store, save, remove, loading };
};

export default useStoreToken;
