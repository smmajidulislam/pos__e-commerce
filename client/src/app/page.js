"use client";
import Homepage from "./(Full-width-pages)/homepage/HomePage";
import { useRoutes } from "./hooks/RoutesHooks/useRoutes";

const Home = () => {
  const { isPos } = useRoutes();

  return isPos ? <Homepage /> : <div>hello</div>;
};

export default Home;
