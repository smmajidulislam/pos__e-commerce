"use client";

import { useEffect, useState } from "react";
import TopUtilityBar from "../header/TopUtilityBar";

export default function Header() {
  const [newsTop, setNewsTop] = useState(0);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsTop((prev) => (prev <= -30 ? 0 : prev - 15)); // Cycle through 3 items (0, -15, -30)
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <TopUtilityBar />
    </div>
  );
}
