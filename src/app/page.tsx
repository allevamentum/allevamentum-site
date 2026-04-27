import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import EngineeringSection from "@/components/EngineeringSection";
import ScrollText from "@/components/ScrollText";
import IndustriesSection from "@/components/IndustriesSection";
import BenefitsSection from "@/components/BenefitsSection";
import Process from "@/components/Process";
import Tech from "@/components/Tech";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <BackgroundCanvas />
      <Navbar />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Marquee />
        <EngineeringSection />
        <ScrollText />
        <div className="sec-divider" data-anim="line" />
        <IndustriesSection />
        <BenefitsSection />
        <Process />
        <div className="sec-divider" data-anim="line" />
        <Tech />
        <Contact />
        <Footer />
      </main>

      <ClientEffects />
    </>
  );
}
