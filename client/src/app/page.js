"use client";
import Homepage from "./(Full-width-pages)/homepage/HomePage";
import { useRoutes } from "./hooks/RoutesHooks/useRoutes";
import PosLayout from "./layouts/posRoutes/PosLayout";

const Home = () => {
  const { isPos } = useRoutes();

  return isPos ? (
    <PosLayout>
      <Homepage />
    </PosLayout>
  ) : (
    <div>hello</div>
  );
};

export default Home;
