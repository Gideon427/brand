"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/*  Keyframes                                                                  */
/* -------------------------------------------------------------------------- */

const ANIMATION_CSS = `
@keyframes cta-fade-up {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes cta-orb-a {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
  50%      { transform: translate(-30px, 30px) scale(1.15); opacity: 0.85; }
}
@keyframes cta-orb-b {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  50%      { transform: translate(40px, -40px) scale(1.2); opacity: 0.9; }
}
@keyframes cta-orb-c {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  50%      { transform: translate(-20px, -25px) scale(1.1); opacity: 0.75; }
}
@keyframes cta-gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
@keyframes cta-shimmer {
  0%   { transform: translateX(-160%) skewX(-14deg); }
  100% { transform: translateX(360%) skewX(-14deg); }
}
@keyframes cta-spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes cta-dot-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.85); }
}
@keyframes cta-pulse-ring {
  0%   { transform: scale(0.9); opacity: 0.6; }
  100% { transform: scale(2.4); opacity: 0; }
}
@keyframes cta-arrow-bob {
  0%, 100% { transform: translateX(0); }
  50%      { transform: translateX(5px); }
}
@keyframes cta-sparkle {
  0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.9; }
  50%      { transform: rotate(20deg) scale(1.15); opacity: 1; }
}
@keyframes cta-grid-drift {
  from { background-position: 0 0; }
  to   { background-position: 40px 40px; }
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

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function CtaSection() {
  const reduced = useReducedMotion();

  return (
    <section className="py-24">
      <style>{ANIMATION_CSS}</style>

      <div className="mx-auto max-w-7xl px-6">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-20 text-white shadow-2xl sm:px-16"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #ea580c 0%, #f97316 35%, #fb923c 50%, #f97316 65%, #ea580c 100%)",
            backgroundSize: "200% 200%",
            animation: reduced ? undefined : "cta-gradient-shift 14s ease-in-out infinite",
          }}
        >
          {/* Subtle drifting grid overlay — adds texture without noise */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(circle at 50% 50%, black 40%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 50%, black 40%, transparent 75%)",
              animation: reduced ? undefined : "cta-grid-drift 12s linear infinite",
            }}
          />

          {/* Rotating conic glow — a faint highlight sweeping the panel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[40%] opacity-30"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.5) 40deg, transparent 80deg, transparent 200deg, rgba(255,220,180,0.4) 240deg, transparent 280deg)",
              animation: reduced ? undefined : "cta-spin-slow 18s linear infinite",
            }}
          />

          {/* Drifting orbs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-white/20 blur-3xl"
            style={{ animation: reduced ? undefined : "cta-orb-a 11s ease-in-out infinite" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 right-20 h-96 w-96 rounded-full bg-black/20 blur-3xl"
            style={{ animation: reduced ? undefined : "cta-orb-b 14s ease-in-out infinite" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl"
            style={{ animation: reduced ? undefined : "cta-orb-c 12s ease-in-out infinite" }}
          />

          {/* Continuous shimmer sweep across the panel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
          >
            <div
              className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                animation: reduced ? undefined : "cta-shimmer 7s ease-in-out infinite",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            {/* Eyebrow chip */}
            <p
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur"
              style={{
                opacity: 1,
                animation: reduced ? undefined : "cta-fade-up 700ms ease-out both",
              }}
            >
              <Sparkles
                className="h-3.5 w-3.5"
                style={{
                  animation: reduced ? undefined : "cta-sparkle 3s ease-in-out infinite",
                }}
              />
              Business Growth Audit
            </p>

            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{
                opacity: 1,
                animation: reduced ? undefined : "cta-fade-up 800ms ease-out 100ms both",
              }}
            >
              Not sure what your business needs next?
            </h2>

            <p
              className="mt-4 text-lg text-white/90"
              style={{
                opacity: 1,
                animation: reduced ? undefined : "cta-fade-up 800ms ease-out 200ms both",
              }}
            >
              Start with a Business Growth Audit. Tell us about your business,
              your customers, what you&apos;re selling and where you want to go.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-3"
              style={{
                opacity: 1,
                animation: reduced ? undefined : "cta-fade-up 800ms ease-out 320ms both",
              }}
            >
              {/* Primary button with pulse ring + arrow bob */}
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-md border border-white/60"
                  style={{ animation: reduced ? undefined : "cta-pulse-ring 2.6s ease-out infinite" }}
                />
                <Button
                  href="/business-growth-audit"
                  variant="outline"
                  size="lg"
                  className="group/cta relative border-white/30 bg-white text-orange-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
                >
                  Start Business Audit
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                    style={{ animation: reduced ? undefined : "cta-arrow-bob 1.8s ease-in-out infinite" }}
                  />
                </Button>
              </div>

              <Button
                href="/start-a-project"
                variant="ghost"
                size="lg"
                className="group/cta2 border border-transparent text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta2:translate-x-1" />
              </Button>
            </div>

            {/* Tiny live indicator row */}
            <div
              className="mt-8 flex flex-wrap items-center gap-5 text-xs text-white/80"
              style={{
                opacity: 1,
                animation: reduced ? undefined : "cta-fade-up 800ms ease-out 440ms both",
              }}
            >
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-300"
                    style={{ animation: reduced ? undefined : "cta-pulse-ring 2s ease-out infinite" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                </span>
                Free 20-min intro call
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-white"
                  style={{ animation: reduced ? undefined : "cta-dot-blink 1.4s ease-in-out infinite" }}
                />
                No obligation
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-white"
                  style={{
                    animation: reduced ? undefined : "cta-dot-blink 1.4s ease-in-out infinite",
                    animationDelay: "0.5s",
                  }}
                />
                Reply within 24h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}