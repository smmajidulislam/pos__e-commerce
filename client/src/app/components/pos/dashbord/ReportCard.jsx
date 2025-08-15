"use client";

import { useEffect, useState } from "react";

const ReportCard = ({ icon, title, quantity = 0, bg, duration = 5000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(quantity);
    const incrementTime = 50;
    const steps = duration / incrementTime;
    const incrementValue = end / steps;

    const interval = setInterval(() => {
      start += incrementValue;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(Math.ceil(start)); // smoother increment
    }, incrementTime);

    return () => clearInterval(interval);
  }, [quantity, duration]);

  // Format number with commas
  const formattedCount = count.toLocaleString();

  return (
    <div
      className={`font-lato ${bg} p-5 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[160px] w-full flex items-center space-x-4`}
    >
      <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full flex items-center justify-center text-3xl shadow-inner flex-shrink-0">
        {icon}
      </div>

      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold mb-2 text-black">
          {title}
        </h2>
        <p className="text-black text-2xl sm:text-base font-medium">
          {formattedCount}
        </p>
      </div>
    </div>
  );
};

export default ReportCard;
