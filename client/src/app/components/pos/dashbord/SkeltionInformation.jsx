// InformationCardSkeleton.jsx
const InformationCardSkeleton = () => {
  return (
    <div
      className="bg-white p-4 rounded-2xl shadow-md h-40 w-full flex animate-pulse"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center space-x-4 w-full">
        {/* icon placeholder */}
        <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0" />

        {/* text placeholders */}
        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-full bg-gray-200 rounded mb-1" />
          <div className="h-4 w-11/12 bg-gray-200 rounded mb-1" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default InformationCardSkeleton;
