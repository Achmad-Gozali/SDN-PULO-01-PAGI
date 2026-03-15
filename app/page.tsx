import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import HeadmasterGreeting from "@/components/sections/HeadmasterGreeting";
import LatestNews from "@/components/sections/LatestNews";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Headmaster Greeting Section */}
      <HeadmasterGreeting />

      {/* Latest News / Mading Section */}
      <LatestNews />

      {/* Footer */}
      <Footer />
    </main>
  );
}
