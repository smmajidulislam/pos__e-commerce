import ImageComponent from "./components/global/Image";
import HomePage from "./layouts/homepage/HomePage";

const Home = () => {
  return (
    <h1 className="text-3xl font-bold underline">
      <HomePage />
      {/*  internal images */}
      <ImageComponent
        src="assets/category-icons/icon-1.png"
        height="100"
        width="100"
        alt="image"
      />
      {/* external images */}
      <ImageComponent
        src={
          "https://res.cloudinary.com/dr3oohjeb/image/upload/v1754584112/qvd59fkwouwwv8719uc2.png"
        }
        height="100"
        width="100"
        isBase={true}
        alt="image"
      />
    </h1>
  );
};

export default Home;
