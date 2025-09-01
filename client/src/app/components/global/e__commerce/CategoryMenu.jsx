"use client";

export default function CategoryMenu() {
  const categories = [
    "Electronics",
    "Fashion",
    "Beauty",
    "Home & Living",
    "Sports",
    "Groceries",
    "Books",
    "Toys & Games",
  ];

  return (
    <nav className="hidden md:flex justify-between items-center px-10 h-24 bg-orange-50 text-lg font-semibold text-black-700">
      {categories.map((cat, i) => (
        <span
          key={i}
          className="relative cursor-pointer hover:text-orange-900
          after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[4px] after:w-0 after:bg-yellow-400 
          after:transition-all after:duration-300 after:-translate-x-1/2 
          hover:after:w-full"
        >
          {cat}
        </span>
      ))}
    </nav>
  );
}
