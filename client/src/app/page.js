"use client";
import { useRoutes } from "./hooks/RoutesHooks/useRoutes";
import HomepageLayout from "./layouts/homepage/HomepageLayout";
import PosLayout from "./layouts/posRoutes/PosLayout";
const Home = () => {
  const { isPos } = useRoutes();
  return isPos ? <HomepageLayout /> : <PosLayout />;
};

export default Home;
