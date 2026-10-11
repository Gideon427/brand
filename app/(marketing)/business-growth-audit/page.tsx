"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Sparkles, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Field, TextInput, TextArea, Select } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const auditAreas = [
  "Your business",
  "Your customers",
  "Your products",
  "Your revenue",
  "Your online presence",
  "Your acquisition",
  "Your operations",
  "Your goals",
];

const steps = [
  {
    title: "Tell us about your business",
    desc: "A short form covering customers, products, revenue and where you want to go.",
    icon: Sparkles,
  },
  {
    title: "We review the bigger picture",
    desc: "We look at how the pieces fit together and where the biggest opportunities are.",
    icon: Clock,
  },
  {
    title: "You get a clear next step",
    desc: "A written report with a prioritised set of recommendations. No obligation.",
    icon: Shield,
  },
];

/* -------------------------------------------------------------------------- */
/*  Keyframes                                                                  */
/* -------------------------------------------------------------------------- */

const ANIMATION_CSS = `
@keyframes ga-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ga-shimmer {
  0%   { transform: translateX(-160%) skewX(-14deg); }
  100% { transform: translateX(360%) skewX(-14deg); }
}
@keyframes ga-dot-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.35; transform: scale(0.8); }
}
@keyframes ga-orb {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
  50%      { transform: translate(-30px, 30px) scale(1.1); opacity: 0.6; }
}
@keyframes ga-orb-b {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  50%      { transform: translate(40px, -30px) scale(1.15); opacity: 0.55; }
}
@keyframes ga-ring-pulse {
  0%   { transform: scale(1);   opacity: 0.55; }
  100% { transform: scale(2.2); opacity: 0; }
}
@keyframes ga-check-pop {
  0%   { transform: scale(0); opacity: 0; }
  60%  { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes ga-spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes ga-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-5px); }
}
`;

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                      */
/* -------------------------------------------------------------------------- */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null) as React.RefObject<T | null>;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* -------------------------------------------------------------------------- */
/*  Step card                                                                  */
/* -------------------------------------------------------------------------- */

function StepCard({
  step,
  index,
  active,
  reduced,
}: {
  step: (typeof steps)[number];
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  const Icon = step.icon;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(24px)",
        transition: `opacity 700ms ease-out ${index * 130}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 130}ms, border-color 300ms, box-shadow 300ms, translate 300ms`,
      }}
    >
      {/* Soft orange tint on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] via-transparent to-orange-500/[0.08] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Shimmer sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <div
          className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-400/[0.12] to-transparent opacity-0 group-hover:opacity-100"
          style={{
            animation: reduced ? undefined : "ga-shimmer 1.8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Step number + icon row */}
      <div className="relative flex items-center justify-between">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-orange-500">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
            style={{
              animation: reduced ? undefined : "ga-dot-blink 1.8s ease-in-out infinite",
              animationDelay: `${index * 0.3}s`,
            }}
          />
          Step 0{index + 1}
        </p>

        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 ring-1 ring-inset ring-orange-500/20 transition-transform duration-500 group-hover:[transform:rotate(360deg)]">
          <Icon className="h-4 w-4 text-orange-500 transition-transform duration-700 group-hover:[transform:rotate(-360deg)]" />
        </div>
      </div>

      <p className="relative mt-3 text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-orange-500">
        {step.title}
      </p>
      <p className="relative mt-2 text-sm text-muted-foreground">{step.desc}</p>

      {/* Subtle bottom progress bar */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700 group-hover:w-full"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Checklist item                                                             */
/* -------------------------------------------------------------------------- */

function ChecklistItem({
  label,
  index,
  active,
  reduced,
}: {
  label: string;
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <li
      className="group flex items-start gap-3"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateX(-10px)",
        transition: `opacity 600ms ease-out ${index * 80}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
      }}
    >
      <span className="relative mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
        {/* Pulse ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-orange-500/20 opacity-0 group-hover:opacity-100"
          style={{
            animation: reduced ? undefined : "ga-ring-pulse 1.8s ease-out infinite",
          }}
        />
        <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 ring-1 ring-inset ring-orange-500/20 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:ring-orange-500">
          <Check
            className="h-3 w-3 transition-transform duration-300 group-hover:scale-110"
            strokeWidth={3}
          />
        </span>
      </span>
      <span className="text-sm transition-colors duration-300 group-hover:text-foreground">
        {label}
      </span>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form card                                                                  */
/* -------------------------------------------------------------------------- */

function AuditForm({ reduced }: { reduced: boolean }) {
  const { ref, inView } = useInView<HTMLFormElement>(0.08);

  return (
    <form
      ref={ref}
      className="lg:col-span-3"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition:
          "opacity 800ms ease-out 200ms, transform 800ms cubic-bezier(0.22,1,0.36,1) 200ms",
      }}
    >
      <div className="group/form relative">
        {/* Soft orange glow behind the card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10 opacity-60 blur-xl transition-opacity duration-500 group-hover/form:opacity-100"
          style={{ animation: reduced ? undefined : "ga-orb 10s ease-in-out infinite" }}
        />

        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow duration-500 hover:shadow-lg">
          {/* Shimmer sweep */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
          >
            <div
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-400/[0.07] to-transparent"
              style={{
                animation: reduced ? undefined : "ga-shimmer 8s ease-in-out infinite",
              }}
            />
          </div>

          <div className="relative">
            <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <span
                className="inline-block h-2 w-2 rounded-full bg-orange-500"
                style={{
                  animation: reduced ? undefined : "ga-dot-blink 1.6s ease-in-out infinite",
                }}
              />
              Start your audit
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Takes about 5 minutes. We&apos;ll get back to you within 24
             hours.
            </p>

            {/* Live chip row */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-2.5 py-0.5 text-[11px] font-medium text-orange-600 dark:text-orange-400">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-orange-500"
                  style={{
                    animation: reduced ? undefined : "ga-dot-blink 1.4s ease-in-out infinite",
                  }}
                />
                Free
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-2.5 py-0.5 text-[11px] font-medium text-orange-600 dark:text-orange-400">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-orange-500"
                  style={{
                    animation: reduced ? undefined : "ga-dot-blink 1.4s ease-in-out infinite",
                    animationDelay: "0.4s",
                  }}
                />
                No obligation
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-2.5 py-0.5 text-[11px] font-medium text-orange-600 dark:text-orange-400">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-orange-500"
                  style={{
                    animation: reduced ? undefined : "ga-dot-blink 1.4s ease-in-out infinite",
                    animationDelay: "0.8s",
                  }}
                />
                Reply within 24 hours
              </span>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Your name">
                <TextInput placeholder="Jane Doe" />
              </Field>
              <Field label="Business name">
                <TextInput placeholder="North & Co." />
              </Field>
              <Field label="Email">
                <TextInput type="email" placeholder="jane@north.co" />
              </Field>
              <Field label="Website">
                <TextInput placeholder="northandco.co.uk" />
              </Field>
              <Field label="Monthly revenue">
                <Select defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>Under $5,000</option>
                  <option>$5,000 – $20,000</option>
                  <option>$20,000 – $50,000</option>
                  <option>$50,000+</option>
                </Select>
              </Field>
              <Field label="Industry">
                <TextInput placeholder="Professional services" />
              </Field>
              <Field label="What do you sell?" className="sm:col-span-2">
                <TextArea placeholder="Briefly describe your products or services." />
              </Field>
              <Field
                label="What do you want to focus on next?"
                className="sm:col-span-2"
              >
                <TextArea placeholder="More customers, better conversion, a new website, etc." />
              </Field>
            </div>

            {/* Submit button with pulse ring */}
            <div className="relative mt-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-md border border-orange-500/40"
                style={{
                  animation: reduced ? undefined : "ga-ring-pulse 2.6s ease-out infinite",
                }}
              />
              <Button
                type="submit"
                size="lg"
                className="group/btn relative w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl"
              >
                Start Business Audit
                <Sparkles className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
              </Button>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              We&apos;ll never share your information. Ever.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function BusinessGrowthAuditPage() {
  const reduced = useReducedMotion();

  /* Hero */
  const { ref: heroRef, inView: heroIn } = useInView<HTMLDivElement>(0.1);

  /* Steps */
  const { ref: stepsRef, inView: stepsIn } = useInView<HTMLDivElement>(0.12);

  /* Checklist */
  const { ref: listRef, inView: listIn } = useInView<HTMLUListElement>(0.15);

  /* No-obligation card */
  const { ref: noRef, inView: noIn } = useInView<HTMLDivElement>(0.2);

  return (
    <>
      <style>{ANIMATION_CSS}</style>

      {/* ==================== HERO ==================== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-border bg-muted/20 py-20"
      >
        {/* Ambient orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-orange-500/[0.07] blur-3xl"
          style={{ animation: reduced ? undefined : "ga-orb 13s ease-in-out infinite" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-500/[0.07] blur-3xl"
          style={{ animation: reduced ? undefined : "ga-orb-b 16s ease-in-out infinite" }}
        />

        {/* Faint grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(circle at 50% 50%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, black 30%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "none" : "translateY(18px)",
              transition:
                "opacity 800ms ease-out, transform 800ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <SectionHeading
              eyebrow="Business Growth Audit"
              title="Not sure what your business needs next?"
              description="Tell us about your business, your customers, what you're selling and where you want to go. We'll look at the bigger picture and show you what we think you should focus on next."
            />
          </div>
        </div>
      </section>

      {/* ==================== STEPS ==================== */}
      <section ref={stepsRef} className="relative overflow-hidden py-16">
        {/* Soft orange glow on the left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-500/[0.05] blur-3xl"
          style={{ animation: reduced ? undefined : "ga-orb 12s ease-in-out infinite" }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <StepCard
                key={s.title}
                step={s}
                index={i}
                active={stepsIn}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FORM + WHAT'S COVERED ==================== */}
      <section className="relative overflow-hidden border-t border-border py-20">
        {/* Ambient orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-amber-500/[0.05] blur-3xl"
          style={{ animation: reduced ? undefined : "ga-orb-b 15s ease-in-out infinite" }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-5">
          {/* Left: what we look at */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight">
              What we look at
            </h2>
            <p className="mt-4 text-muted-foreground">
              Eight areas that affect each other. We cover all of them so the
              recommendations actually fit together.
            </p>

            <ul ref={listRef} className="mt-8 space-y-3">
              {auditAreas.map((area, i) => (
                <ChecklistItem
                  key={area}
                  label={area}
                  index={i}
                  active={listIn}
                  reduced={reduced}
                />
              ))}
            </ul>

            <div
              ref={noRef}
              className="group relative mt-10 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-orange-500/40 hover:shadow-md"
              style={{
                opacity: noIn ? 1 : 0,
                transform: noIn ? "none" : "translateY(18px)",
                transition: `opacity 700ms ease-out 500ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 500ms, border-color 300ms, box-shadow 300ms`,
              }}
            >
              {/* Shimmer sweep */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
              >
                <div
                  className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-400/[0.1] to-transparent"
                  style={{
                    animation: reduced ? undefined : "ga-shimmer 6s ease-in-out infinite",
                  }}
                />
              </div>

              <div className="relative flex items-start gap-3">
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-orange-500/15"
                    style={{
                      animation: reduced ? undefined : "ga-ring-pulse 2.4s ease-out infinite",
                    }}
                  />
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 ring-1 ring-inset ring-orange-500/20">
                    <Shield className="h-4 w-4 text-orange-500" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-tight">
                    No obligation
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You&apos;ll receive a written report. Whether you work with
                    us after is completely up to you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <AuditForm reduced={reduced} />
        </div>
      </section>
    </>
  );
}