const InformationCard = ({ icon, title, description }) => {
  return (
    <div className="font-lato bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer h-40 w-full flex">
      <div className="flex items-center space-x-4 w-full">
        <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          <h2 className="text-lg sm:text-xl font-bold mb-1 text-dark truncate">
            {title}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base line-clamp-3 overflow-hidden">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
