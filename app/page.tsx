import AppWrapper from "./AppWrapper";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <AppWrapper>
      <div className="bg-background">
        <HeroSection />
      </div>
    </AppWrapper>
  );
};

export default Home;
