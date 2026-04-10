import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import ScrollText from "@/components/ScrollText";
import Services from "@/components/Services";
import Metrics from "@/components/Metrics";
import Process from "@/components/Process";
import Tech from "@/components/Tech";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <BackgroundCanvas />
      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <div className="sec-divider" data-anim="line" />
        <About />
        <ScrollText />
        <div className="sec-divider" data-anim="line" />
        <Services />
        <Metrics />
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
