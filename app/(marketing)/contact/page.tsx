import { Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Field, TextInput, TextArea } from "@/components/ui/field";

export const metadata = {
  title: "Contact — Brandoria",
  description: "Get in touch with the Brandoria team.",
};

const details = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@brandoria.co",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "United Kingdom · Working worldwide",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within two business days",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk."
            description="Questions, projects, or just want to say hello — we'd love to hear from you."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Other ways to reach us
            </h2>
            <ul className="mt-8 space-y-6">
              {details.map((d) => {
                const Icon = d.icon;
                return (
                  <li key={d.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{d.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {d.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 rounded-2xl border border-border bg-card p-6">
              <p className="font-semibold tracking-tight">Not sure where to start?</p>
              <p className="mt-2 text-sm text-muted-foreground">
                The Business Growth Audit is a good first step. No obligation.
              </p>
              <Button
                href="/business-growth-audit"
                variant="outline"
                size="sm"
                className="mt-4"
              >
                Start an audit
              </Button>
            </div>
          </div>

          <form className="lg:col-span-3">
            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name">
                  <TextInput placeholder="Jane Doe" />
                </Field>
                <Field label="Email">
                  <TextInput type="email" placeholder="jane@north.co" />
                </Field>
                <Field label="Subject" className="sm:col-span-2">
                  <TextInput placeholder="What's this about?" />
                </Field>
                <Field label="Message" className="sm:col-span-2">
                  <TextArea
                    placeholder="Tell us what's on your mind."
                    className="min-h-[180px]"
                  />
                </Field>
              </div>
              <Button type="submit" size="lg" className="mt-8 w-full">
                Send message
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}