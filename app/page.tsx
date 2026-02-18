import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";
import TypeInMotion from "@/components/TypeInMotion";
import RevealSection from "@/components/RevealSection";
import TextStrokeSection from "@/components/TextStrokeSection";
import InteractSection from "@/components/InteractSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ThemeShowcase from "@/components/ThemeShowcase";
import AbstractVisuals from "@/components/AbstractVisuals";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <PageWrapper>
      <main id="main-content" className="relative">
        <Hero />
        <MarqueeTicker />
        <TypeInMotion />
        <SectionDivider />
        <RevealSection />
        <SectionDivider />
        <TextStrokeSection />
        <SectionDivider />
        <InteractSection />
        <SectionDivider />
        <HorizontalScrollSection />
        <SectionDivider />
        <ThemeShowcase />
        <SectionDivider />
        <AbstractVisuals />
        <SectionDivider />
        <CTASection />
        <Footer />
      </main>
    </PageWrapper>
  );
}
