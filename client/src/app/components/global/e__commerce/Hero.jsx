"use client";

export default function Hero() {
  return (
    <section className="w-full">
      {/* এখানে নিজের hero image src বসাও */}
      <img
        src="/assets/banner.jpg"
        alt="Hero Banner"
        className="w-full h-40 sm:h-60 md:h-80 lg:h-[400px] object-cover"
      />
    </section>
  );
}
