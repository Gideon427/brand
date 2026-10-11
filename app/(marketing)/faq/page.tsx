import { faqCategories } from "@/lib/faq";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata = {
  title: "FAQ — Brandoria",
  description: "Common questions about working with Brandoria.",
};

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions before you start?"
            description="Everything you might want to know before working with us."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-16">
            {faqCategories.map((cat) => (
              <div key={cat.title}>
                <h2 className="text-xl font-bold tracking-tight">
                  {cat.title}
                </h2>
                <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
                  {cat.items.map((item) => (
                    <details
                      key={item.q}
                      className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4">
                        <span className="font-medium tracking-tight">
                          {item.q}
                        </span>
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-4 text-muted-foreground">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}