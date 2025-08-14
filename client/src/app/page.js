"use client";
import { useRoutes } from "./hooks/RoutesHooks/useRoutes";
import Ecommerce from "./layouts/homepage/Ecommerce";
import Homepage from "./layouts/homepage/HomePage";
import PosLayout from "./layouts/posRoutes/PosLayout";

const Home = () => {
  const { isPos } = useRoutes();

  return isPos ? (
    <PosLayout>
      <Homepage />
    </PosLayout>
  ) : (
    <div>
      <Ecommerce />
    </div>
  );
};

export default Home;
