"use client";
import CollectionCard from "./CollectionCard";

export default function CollectionList() {
  const collections = Array(8).fill({
    name: "Collection Name",
    image: "/assets/p-2.jpg",
  });

  return (
    <section className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Collection</h2>
      <div className="flex flex-wrap justify-center gap-x-16 gap-y-4">
        {collections.map((c, i) => (
          <CollectionCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}
