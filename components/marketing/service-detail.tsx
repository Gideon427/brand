"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

type Service = {
  slug: string;
  tagline: string;
  title: string;
  description: string;
  longDescription: string;
  outcomes: { value: string; label: string }[];
  deliverables: string[];
  process: { title: string; desc: string }[];
};

const ANIMATION_CSS = `
@keyframes sd-shimmer {
  0%   { transform: translateX(-160%) skewX(-14deg); }
  100% { transform: translateX(360%) skewX(-14deg); }
}
@keyframes sd-dot-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.35; transform: scale(0.8); }
}
@keyframes sd-orb {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
  50%      { transform: translate(-30px, 30px) scale(1.1); opacity: 0.6; }
}
@keyframes sd-orb-b {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  50%      { transform: translate(40px, -30px) scale(1.15); opacity: 0.55; }
}
@keyframes sd-ring-pulse {
  0%   { transform: scale(1);   opacity: 0.55; }
  100% { transform: scale(2.2); opacity: 0; }
}
@keyframes sd-pop {
  0%   { opacity: 0; transform: scale(0.9) translateY(8px); filter: blur(4px); }
  60%  { opacity: 1; transform: scale(1.02) translateY(0); filter: blur(0); }
  100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
}
@keyframes sd-spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
`;

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
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* -------------------------------------------------------------------------- */
/*  Small reusable reveal                                                     */
/* -------------------------------------------------------------------------- */

function Reveal({
  children,
  delay = 0,
  y = 18,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Outcome card — value pops in with scale+blur                              */
/* -------------------------------------------------------------------------- */

function OutcomeCard({
  outcome,
  index,
  active,
  reduced,
}: {
  outcome: { value: string; label: string };
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(22px)",
        transition: `opacity 700ms ease-out ${index * 130}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 130}ms, border-color 300ms, box-shadow 300ms, translate 300ms`,
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
            animation: reduced ? undefined : "sd-shimmer 5s ease-in-out infinite",
            animationDelay: `${index * 400}ms`,
          }}
        />
      </div>

      {/* Pulse ring behind the value */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-10 h-20 w-20 rounded-full bg-orange-500/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ animation: reduced ? undefined : "sd-ring-pulse 2.4s ease-out infinite" }}
      />

      <p
        className="relative text-4xl font-bold tabular-nums text-orange-500"
        style={
          active
            ? {
                animation: reduced
                  ? undefined
                  : `sd-pop 800ms cubic-bezier(0.22,1,0.36,1) ${index * 130 + 250}ms both`,
              }
            : undefined
        }
      >
        {outcome.value}
      </p>
      <p className="relative mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {outcome.label}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Deliverable list item                                                     */
/* -------------------------------------------------------------------------- */

function Deliverable({
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
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-orange-500/20 opacity-0 group-hover:opacity-100"
          style={{ animation: reduced ? undefined : "sd-ring-pulse 1.8s ease-out infinite" }}
        />
        <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 ring-1 ring-inset ring-orange-500/20 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:ring-orange-500">
          <Check className="h-3 w-3 transition-transform duration-300 group-hover:scale-110" strokeWidth={3} />
        </span>
      </span>
      <span className="transition-colors duration-300 group-hover:text-foreground">{label}</span>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Process step                                                              */
/* -------------------------------------------------------------------------- */

function ProcessStep({
  step,
  index,
  active,
  reduced,
}: {
  step: { title: string; desc: string };
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(22px)",
        transition: `opacity 700ms ease-out ${index * 120}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 120}ms, border-color 300ms, box-shadow 300ms, translate 300ms`,
      }}
    >
      {/* Orange tint on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] via-transparent to-orange-500/[0.08] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-center justify-between">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-500">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
            style={{
              animation: reduced ? undefined : "sd-dot-blink 1.8s ease-in-out infinite",
              animationDelay: `${index * 0.3}s`,
            }}
          />
          0{index + 1}
        </p>
        {/* Rotating number ring */}
        <div
          className="relative flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-inset ring-orange-500/20 transition-transform duration-700 group-hover:rotate-180"
        >
          <span className="text-[10px] font-bold text-orange-500">
            {index + 1}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full ring-1 ring-orange-500/30"
            style={{ animation: reduced ? undefined : "sd-ring-pulse 3s ease-out infinite" }}
          />
        </div>
      </div>

      <p className="relative mt-3 text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-orange-500">
        {step.title}
      </p>
      <p className="relative mt-2 text-sm text-muted-foreground">{step.desc}</p>

      {/* Bottom progress bar */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700 group-hover:w-full"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export function ServiceDetail({
  service,
  others,
}: {
  service: Service;
  others: Service[];
}) {
  const reduced = useReducedMotion();

  const { ref: heroRef, inView: heroIn } = useInView<HTMLDivElement>(0.1);
  const { ref: outcomesRef, inView: outcomesIn } = useInView<HTMLDivElement>(0.12);
  const { ref: deliverablesRef, inView: deliverablesIn } = useInView<HTMLUListElement>(0.15);
  const { ref: processRef, inView: processIn } = useInView<HTMLDivElement>(0.1);
  const { ref: othersRef, inView: othersIn } = useInView<HTMLDivElement>(0.1);

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
          style={{ animation: reduced ? undefined : "sd-orb 13s ease-in-out infinite" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-500/[0.07] blur-3xl"
          style={{ animation: reduced ? undefined : "sd-orb-b 16s ease-in-out infinite" }}
        />

        {/* Faint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "none" : "translateY(18px)",
              transition: "opacity 800ms ease-out, transform 800ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <Link
              href="/services"
              className="group mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-orange-500"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              All services
            </Link>

            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-orange-500">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
                style={{ animation: reduced ? undefined : "sd-dot-blink 1.6s ease-in-out infinite" }}
              />
              {service.tagline}
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {service.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="/start-a-project"
                size="lg"
                className="group/btn bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
              <Button
                href="/business-growth-audit"
                variant="outline"
                size="lg"
                className="group/btn2 transition-all duration-300 hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400"
              >
                Get a growth audit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OUTCOMES ==================== */}
      <section ref={outcomesRef} className="relative overflow-hidden py-16">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {service.outcomes.map((o, i) => (
              <OutcomeCard
                key={o.label}
                outcome={o}
                index={i}
                active={outcomesIn}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OVERVIEW + DELIVERABLES ==================== */}
      <section className="relative overflow-hidden border-t border-border py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-amber-500/[0.05] blur-3xl"
          style={{ animation: reduced ? undefined : "sd-orb-b 15s ease-in-out infinite" }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Overview" title="What this looks like" />
            <p className="mt-6 text-lg text-muted-foreground">
              {service.longDescription}
            </p>
          </Reveal>

          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-orange-500">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
                style={{ animation: reduced ? undefined : "sd-dot-blink 1.8s ease-in-out infinite" }}
              />
              Deliverables
            </p>
            <ul ref={deliverablesRef} className="space-y-3">
              {service.deliverables.map((d, i) => (
                <Deliverable
                  key={d}
                  label={d}
                  index={i}
                  active={deliverablesIn}
                  reduced={reduced}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== PROCESS ==================== */}
      <section className="relative overflow-hidden border-t border-border bg-muted/20 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-orange-500/[0.05] blur-3xl"
          style={{ animation: reduced ? undefined : "sd-orb 12s ease-in-out infinite" }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="A clear four-step process" />
          </Reveal>

          <div ref={processRef} className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={i}
                active={processIn}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OTHER SERVICES ==================== */}
      <section className="relative overflow-hidden py-20">
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading eyebrow="More" title="Other services" />
          </Reveal>

          <div ref={othersRef} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-md"
                style={{
                  opacity: othersIn ? 1 : 0,
                  transform: othersIn ? "none" : "translateY(18px)",
                  transition: `opacity 600ms ease-out ${i * 100}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${i * 100}ms, border-color 300ms, box-shadow 300ms, translate 300ms`,
                }}
              >
                {/* Shimmer sweep on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
                >
                  <div
                    className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-400/[0.12] to-transparent opacity-0 group-hover:opacity-100"
                    style={{ animation: reduced ? undefined : "sd-shimmer 1.8s ease-in-out infinite" }}
                  />
                </div>

                <p className="relative font-semibold tracking-tight transition-colors duration-300 group-hover:text-orange-500">
                  {s.title}
                </p>
                <p className="relative mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {s.description}
                </p>
                <span className="relative mt-3 inline-flex items-center gap-1 text-xs font-medium text-orange-500 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explore
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}