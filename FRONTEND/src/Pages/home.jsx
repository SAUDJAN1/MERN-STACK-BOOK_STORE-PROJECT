import Hero from "../Components/Home/Hero";
import RecentlyAdded from "../Components/Home/RecentlyAdded";

const Home = () => {
  return (
    <>
      <div className="bg-zinc-900 text-white px-10 py-8">
        <Hero />
        <RecentlyAdded />
      </div>
    </>
  );
};

export default Home;
