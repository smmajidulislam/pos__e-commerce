"use client";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const products = Array(9).fill({
    name: "Product Name",
    price: 100,
    oldPrice: 120,
    image: "/assets/p-2.jpg",
  });

  return (
    <section className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">All Product</h2>
      <div className="flex flex-wrap justify-around gap-4">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}
