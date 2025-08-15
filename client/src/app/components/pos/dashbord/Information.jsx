// Information.jsx
import InformationCard from "./InformationCard";
import { FaUser, FaChartLine, FaBell, FaCogs } from "react-icons/fa";
import InformationCardSkeleton from "./SkeltionInformation";

const informationData = [
  {
    icon: <FaUser />,
    title: "Total Purcase Due",
    description: 0,
  },
  {
    icon: <FaChartLine />,
    title: "Total Sales Due",
    description: 0,
  },
  {
    icon: <FaBell />,
    title: "Total Sales Ammount",
    description: 0,
  },
  {
    icon: <FaCogs />,
    title: "Total Expense Amount",
    description: 0,
  },
];

const Information = () => {
  let isLoading;
  return (
    <>
      <div className="flex flex-wrap -mx-2 p-4">
        {informationData.map((item, index) =>
          isLoading ? (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <InformationCardSkeleton />
            </div>
          ) : (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
              <InformationCard
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Information;
