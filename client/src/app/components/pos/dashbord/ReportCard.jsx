const ReportCard = ({ icon, title, quantity }) => {
  return (
    <div className="font-lato bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[160px] w-full flex items-center space-x-4">
      {/* Icon wrapper */}
      <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full flex items-center justify-center text-3xl shadow-inner flex-shrink-0">
        {icon}
      </div>

      {/* Text content */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold mb-2 text-dark">{title}</h2>
        <p className="text-gray-500 text-sm sm:text-base font-medium">
          {quantity}
        </p>
      </div>
    </div>
  );
};

export default ReportCard;
