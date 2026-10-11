import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";
import { ServicesGrid } from "@/components/marketing/services-grid";

export const metadata = {
  title: "Services — Brandoria",
  description:
    "Websites, branding, marketing, lead generation, ecommerce and custom systems.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Services"
            title="What can we build for you?"
            description="Start with one thing or let us help you put the bigger picture together."
          />
        </div>
      </section>

      <ServicesGrid />

      <CtaSection />
    </>
  );
}