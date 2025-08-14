// Information.jsx
import InformationCard from "./InformationCard";
import { FaUser, FaChartLine, FaBell, FaCogs } from "react-icons/fa";

const informationData = [
  {
    icon: <FaUser />,
    title: "User Management",
    description: "Manage all your users and their access levels easily.",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics",
    description: "View detailed analytics and reports for your business.",
  },
  {
    icon: <FaBell />,
    title: "Notifications",
    description: "Receive real-time notifications about important updates.",
  },
  {
    icon: <FaCogs />,
    title: "Settings",
    description: "Configure your account and system preferences quickly.",
  },
];

const Information = () => {
  return (
    <div className="flex flex-wrap -mx-2 p-4">
      {informationData.map((item, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4">
          <InformationCard
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        </div>
      ))}
    </div>
  );
};

export default Information;
