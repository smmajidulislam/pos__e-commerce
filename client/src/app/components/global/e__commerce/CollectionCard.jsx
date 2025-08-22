"use client";
export default function CollectionCard({ name, image }) {
  return (
    <div
      className="w-full sm:w-1/3 md:w-1/3 lg:w-1/4 
                    border-t-1 border-l-1 border-r-1 border-yellow-400 
                    border-b-0 
                    rounded-md p-3 text-center shadow-sm 
                    hover:shadow-md transition bg-white h-[250px] cursor-pointer"
    >
      <img src={image} alt={name} className="w-28 h-52 mx-auto" />
      <h3 className="mt-2 font-semibold">{name}</h3>
    </div>
  );
}
