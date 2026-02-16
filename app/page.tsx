import Hero from "@/components/Hero";
import TypeInMotion from "@/components/TypeInMotion";
import RevealSection from "@/components/RevealSection";
import InteractSection from "@/components/InteractSection";
import ThemeShowcase from "@/components/ThemeShowcase";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <PageWrapper>
      <main id="main-content" className="relative">
        <Hero />
        <SectionDivider />
        <TypeInMotion />
        <SectionDivider />
        <RevealSection />
        <SectionDivider />
        <InteractSection />
        <SectionDivider />
        <ThemeShowcase />
        <SectionDivider />
        <CTASection />
        <Footer />
      </main>
    </PageWrapper>
  );
}
