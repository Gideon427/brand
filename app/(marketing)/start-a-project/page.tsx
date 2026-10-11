"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Field, TextInput, TextArea, Select } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/*  Keyframes                                                                  */
/* -------------------------------------------------------------------------- */

const ANIMATION_CSS = `
@keyframes sp-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes sp-shimmer {
  0%   { transform: translateX(-160%) skewX(-14deg); }
  100% { transform: translateX(360%) skewX(-14deg); }
}
@keyframes sp-dot-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.35; transform: scale(0.8); }
}
@keyframes sp-orb {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
  50%      { transform: translate(-30px, 30px) scale(1.1); opacity: 0.6; }
}
@keyframes sp-orb-b {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  50%      { transform: translate(40px, -30px) scale(1.15); opacity: 0.55; }
}
@keyframes sp-ring-pulse {
  0%   { transform: scale(1);   opacity: 0.55; }
  100% { transform: scale(2.2); opacity: 0; }
}
@keyframes sp-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-5px); }
}
@keyframes sp-spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
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

function useInView<T extends HTMLElement>(threshold = 0.1) {
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
/*  Live indicator chip                                                        */
/* -------------------------------------------------------------------------- */

function LiveChip({
  label,
  delay = 0,
  reduced,
}: {
  label: string;
  delay?: number;
  reduced: boolean;
}) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-2.5 py-0.5 text-[11px] font-medium text-orange-600 dark:text-orange-400">
      <span
        className="h-1.5 w-1.5 rounded-full bg-orange-500"
        style={{
          animation: reduced ? undefined : "sp-dot-blink 1.4s ease-in-out infinite",
          animationDelay: `${delay}s`,
        }}
      />
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function StartAProjectPage() {
  const reduced = useReducedMotion();

  const { ref: heroRef, inView: heroIn } = useInView<HTMLDivElement>(0.1);
  const { ref: formRef, inView: formIn } = useInView<HTMLFormElement>(0.08);

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
          style={{ animation: reduced ? undefined : "sp-orb 13s ease-in-out infinite" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-500/[0.07] blur-3xl"
          style={{ animation: reduced ? undefined : "sp-orb-b 16s ease-in-out infinite" }}
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
              eyebrow="Start a Project"
              title="Ready to build something?"
              description="Tell us what your business needs. We'll review it and take it from there."
            />
          </div>
        </div>
      </section>

      {/* ==================== FORM ==================== */}
      <section className="relative overflow-hidden py-20">
        {/* Ambient orbs on the sides */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 -translate-x-1/3 rounded-full bg-orange-500/[0.05] blur-3xl"
          style={{ animation: reduced ? undefined : "sp-orb 12s ease-in-out infinite" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-amber-500/[0.06] blur-3xl"
          style={{ animation: reduced ? undefined : "sp-orb-b 15s ease-in-out infinite" }}
        />

        <div className="relative mx-auto max-w-3xl px-6">
          <form
            ref={formRef}
            className="group/form relative"
            style={{
              opacity: formIn ? 1 : 0,
              transform: formIn ? "none" : "translateY(24px)",
              transition:
                "opacity 800ms ease-out 100ms, transform 800ms cubic-bezier(0.22,1,0.36,1) 100ms",
            }}
          >
            {/* Ambient orange glow behind the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10 opacity-60 blur-xl transition-opacity duration-500 group-hover/form:opacity-100"
              style={{ animation: reduced ? undefined : "sp-orb 10s ease-in-out infinite" }}
            />

            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow duration-500 hover:shadow-lg sm:p-10">
              {/* Shimmer sweep across the card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
              >
                <div
                  className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-400/[0.07] to-transparent"
                  style={{
                    animation: reduced ? undefined : "sp-shimmer 8s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Rotating conic highlight along the border */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-40"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(249,115,22,0.6) 10%, transparent 25%, transparent 65%, rgba(251,146,60,0.5) 78%, transparent 92%)",
                  animation: reduced ? undefined : "sp-spin-slow 14s linear infinite",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  maskComposite: "exclude",
                  padding: "1px",
                }}
              />

              {/* Heading + chips */}
              <div className="relative">
                <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight">
                  <span
                    className="inline-block h-2 w-2 rounded-full bg-orange-500"
                    style={{
                      animation: reduced ? undefined : "sp-dot-blink 1.6s ease-in-out infinite",
                    }}
                  />
                  Project brief
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Give us the essentials. We&apos;ll take it from there.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <LiveChip label="Reply within 24 hours" reduced={reduced} />
                  <LiveChip label="No lock-in" delay={0.4} reduced={reduced} />
                  <LiveChip label="Free scoping call" delay={0.8} reduced={reduced} />
                </div>
              </div>

              {/* Fields */}
              <div className="relative mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Your name">
                  <TextInput placeholder="Jane Doe" />
                </Field>
                <Field label="Business name">
                  <TextInput placeholder="North & Co." />
                </Field>
                <Field label="Email">
                  <TextInput type="email" placeholder="jane@north.co" />
                </Field>
                <Field label="Budget range">
                  <Select defaultValue="">
                    <option value="" disabled>
                      Select a range
                    </option>
                    <option>Under $5,000</option>
                    <option>$5,000 – $15,000</option>
                    <option>$15,000 – $50,000</option>
                    <option>$50,000+</option>
                    <option>Not sure yet</option>
                  </Select>
                </Field>
                <Field label="What do you need?" className="sm:col-span-2">
                  <Select defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>Website</option>
                    <option>Branding</option>
                    <option>Marketing</option>
                    <option>Lead Generation</option>
                    <option>E-commerce</option>
                    <option>Video</option>
                    <option>Content Marketing</option>
                    <option>Custom Systems</option>
                    <option>Multiple / not sure</option>
                  </Select>
                </Field>
                <Field
                  label="Tell us about the project"
                  className="sm:col-span-2"
                >
                  <TextArea
                    placeholder="What are you trying to achieve? What's getting in the way?"
                    className="min-h-[160px]"
                  />
                </Field>
                <Field label="Timeline" className="sm:col-span-2">
                  <Select defaultValue="">
                    <option value="" disabled>
                      Select a timeline
                    </option>
                    <option>As soon as possible</option>
                    <option>Within 1 month</option>
                    <option>1–3 months</option>
                    <option>3+ months</option>
                    <option>Just exploring</option>
                  </Select>
                </Field>
              </div>

              {/* Submit button with pulse ring */}
              <div className="relative mt-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-md border border-orange-500/40"
                  style={{
                    animation: reduced ? undefined : "sp-ring-pulse 2.6s ease-out infinite",
                  }}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="group/btn relative w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl"
                >
                  Submit project brief
                  <Send className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </Button>
              </div>

              <p className="relative mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 text-orange-500" />
                We&apos;ll get back to you within two business days.
                <Shield className="ml-1 h-3 w-3 text-orange-500" />
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}