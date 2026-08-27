import { useRef } from "react";
import FuturisticNavbar from "../Components/Navbar/FuturisticNavbar";
import HackerHero from "../Components/Hero/HackerHero";
import ProfileSection from "../Components/Profile/ProfileSection";

const Home = () => {
  const profileRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    if (id === 'ai') {
      profileRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#010510]">
      <FuturisticNavbar onNavClick={scrollToSection} />
      <HackerHero />
      <div ref={profileRef}>
        <ProfileSection />
      </div>
    </div>
  );
};

export default Home;
