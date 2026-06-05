import FuturisticNavbar from "../components/Navbar/FuturisticNavbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#010510]">
      <FuturisticNavbar />

      <div className="flex items-center justify-center h-screen">
        <h1 className="text-cyan-400 text-6xl font-bold">
          SHREYAS OS
        </h1>
      </div>
    </div>
  );
};

export default Home;