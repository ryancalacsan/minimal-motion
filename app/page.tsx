import Hero from "@/components/Hero";
import TypeInMotion from "@/components/TypeInMotion";
import RevealSection from "@/components/RevealSection";
import InteractSection from "@/components/InteractSection";
import ThemeShowcase from "@/components/ThemeShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TypeInMotion />
      <RevealSection />
      <InteractSection />
      <ThemeShowcase />
      <Footer />
    </main>
  );
}
