import { Hero } from "@/components/marketing/hero";
import { BusinessDiagram } from "@/components/marketing/business-diagram";
import { ServicesGrid } from "@/components/marketing/services-grid";
import { ResultsSection } from "@/components/marketing/results-section";
import { GrowthNumbers } from "@/components/marketing/growth-numbers";
import { FeaturedWork } from "@/components/marketing/featured-work";
import { CtaSection } from "@/components/marketing/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BusinessDiagram />
      <ServicesGrid />
      <ResultsSection />
      <GrowthNumbers />
      <FeaturedWork />
      <CtaSection />
    </>
  );
}