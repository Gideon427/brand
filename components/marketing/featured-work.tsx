"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/*  Keyframes                                                                  */
/* -------------------------------------------------------------------------- */

const ANIMATION_CSS = `
@keyframes fw-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fw-shimmer {
  0%   { transform: translateX(-160%) skewX(-16deg); }
  100% { transform: translateX(360%) skewX(-16deg); }
}
@keyframes fw-preview-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-8px) rotate(-0.4deg); }
}
@keyframes fw-glow-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%      { opacity: 0.85; transform: scale(1.04); }
}
@keyframes fw-dot-blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
}
@keyframes fw-tile-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-3px); }
}
@keyframes fw-arrow-nudge {
  0%, 100% { transform: translateX(0); }
  50%      { transform: translateX(4px); }
}
@keyframes fw-cursor-blink {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes fw-type-cycle {
  0%, 45%   { opacity: 1; }
  55%, 100% { opacity: 0; }
}
@keyframes fw-spin-slow {
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

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
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

/** Counts up from 0 → target once `active` is true. */
function useCountUp(target: number, active: boolean, duration = 1800) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (reduced) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduced]);

  return value;
}

/** Cycles 0 → length-1 on an interval. Used for the fake browser tabs. */
function useCycle(length: number, ms = 2200) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % length), ms);
    return () => window.clearInterval(id);
  }, [length, ms, reduced]);

  return i;
}

/* -------------------------------------------------------------------------- */
/*  Mock browser preview                                                       */
/* -------------------------------------------------------------------------- */

const TYPED_HEADLINES = [
  "Advice you can act on.",
  "Clarity at every step.",
  "Growth, properly planned.",
];

function MockPreview({ reduced }: { reduced: boolean }) {
  const typedIndex = useCycle(TYPED_HEADLINES.length, 3400);
  const tiles = ["Tax", "Growth", "Legal"];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Site chrome — the "browser tabs" of the mock */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-yellow-400 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-green-400 sm:h-2.5 sm:w-2.5" />
          <span className="ml-2 hidden font-bold tracking-tight sm:inline">
            NORTH &amp; CO.
          </span>
          <span className="font-bold tracking-tight sm:hidden">N&amp;CO</span>
        </div>

        <span className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-medium text-orange-600 ring-1 ring-inset ring-orange-500/20 sm:text-xs dark:text-orange-400">
          <span
            className="h-1.5 w-1.5 rounded-full bg-orange-500"
            style={{ animation: reduced ? undefined : "fw-dot-blink 1.4s ease-in-out infinite" }}
          />
          Book a call
        </span>
      </div>

      {/* Hero slab inside the mock */}
      <div className="p-5 sm:p-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-amber-500/5 p-6 ring-1 ring-inset ring-orange-500/10 sm:p-8">
          {/* Rotating conic glow border */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-60"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(249,115,22,0.6) 15%, transparent 30%, transparent 60%, rgba(251,146,60,0.5) 75%, transparent 90%)",
              animation: reduced ? undefined : "fw-spin-slow 9s linear infinite",
              maskImage:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />

          {/* Ambient orb */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-500/25 blur-3xl"
            style={{ animation: reduced ? undefined : "fw-glow-pulse 5s ease-in-out infinite" }}
          />

          <div className="relative">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-orange-600 sm:text-xs dark:text-orange-400">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
                style={{ animation: reduced ? undefined : "fw-dot-blink 1.6s ease-in-out infinite" }}
              />
              Professional Services
            </p>

            {/* Cycling headline with blinking caret */}
            <p className="relative mt-3 h-[2.6em] text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {TYPED_HEADLINES.map((text, i) => (
                <span
                  key={text}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    opacity: i === typedIndex ? 1 : 0,
                    transform: i === typedIndex ? "translateY(0)" : "translateY(6px)",
                    transitionProperty: "opacity, transform",
                  }}
                >
                  {text}
                </span>
              ))}
              <span
                className="absolute -bottom-1 left-0 inline-block h-[2px] w-6 rounded-full bg-orange-500"
                style={{ animation: reduced ? undefined : "fw-cursor-blink 1s steps(1, end) infinite" }}
              />
            </p>

            <button
              type="button"
              tabIndex={-1}
              className="group/btn mt-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-xs font-medium text-white shadow-md transition-transform duration-300 hover:scale-[1.03]"
            >
              Get started
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Service tiles — float gently, light up on hover */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
          {tiles.map((t, i) => (
            <div
              key={t}
              className="group/tile relative overflow-hidden rounded-xl border border-border bg-background p-3 text-center text-[11px] font-semibold transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-md sm:text-xs"
              style={{
                animation: reduced ? undefined : `fw-tile-float ${3 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100"
              />
              <span className="relative">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Site footer of the mock */}
      <div className="border-t border-border px-4 py-3 sm:px-6 sm:py-4">
        <p className="font-semibold tracking-tight">North &amp; Co.</p>
        <p className="text-xs text-muted-foreground sm:text-sm">
          A clearer online presence for a growing professional business.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function FeaturedWork() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.08);
  const enquiries = useCountUp(42, inView, 1800);

  const fade = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(20px)",
    transition: `opacity 700ms ease-out ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-border bg-muted/20 py-24"
    >
      <style>{ANIMATION_CSS}</style>

      {/* Ambient orange blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"
        style={{ animation: reduced ? undefined : "fw-glow-pulse 8s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-amber-500/10 blur-3xl"
        style={{ animation: reduced ? undefined : "fw-glow-pulse 11s ease-in-out infinite reverse" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl" style={fade(0)}>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-orange-500">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
                style={{ animation: reduced ? undefined : "fw-dot-blink 1.6s ease-in-out infinite" }}
              />
              Featured work
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See what we build.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real websites, brands, campaigns and digital experiences built
              for real business needs.
            </p>
          </div>

          <div style={fade(150)}>
            <Button
              href="/work"
              variant="outline"
              className="group/cta ring-1 ring-inset ring-transparent transition-all duration-300 hover:border-orange-500/50 hover:ring-orange-500/30"
            >
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Left: mock site preview, floats gently */}
          <div
            style={fade(0)}
            className={reduced ? "" : "will-change-transform"}
          >
            <div
              style={{
                animation: reduced
                  ? undefined
                  : "fw-preview-float 7s ease-in-out infinite",
              }}
            >
              {/* Soft orange glow under the preview */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-orange-500/15 via-transparent to-amber-500/15 blur-2xl"
                  style={{ animation: reduced ? undefined : "fw-glow-pulse 6s ease-in-out infinite" }}
                />
                <MockPreview reduced={reduced} />
              </div>
            </div>
          </div>

          {/* Right: stat card with counting number */}
          <div
            className="group relative flex flex-col justify-center overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-orange-500/40 hover:shadow-lg sm:p-10"
            style={fade(200)}
          >
            {/* Shimmer sweep across the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            >
              <div
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent"
                style={{
                  animation: reduced ? undefined : "fw-shimmer 5s ease-in-out infinite",
                }}
              />
            </div>

            {/* Faint orange gradient that lives inside the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="relative">
              <p className="text-3xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  +{Math.round(enquiries)}%
                </span>{" "}
                enquiries
              </p>

              <p className="mt-4 text-muted-foreground">
                After a website and lead generation rebuild, North &amp; Co.
                saw a significant jump in qualified enquiries — without
                changing what they sold.
              </p>

              {/* Small live indicator row */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-[11px] font-medium text-orange-600 dark:text-orange-400">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-orange-500"
                    style={{ animation: reduced ? undefined : "fw-dot-blink 1.4s ease-in-out infinite" }}
                  />
                  Website rebuild
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-[11px] font-medium text-orange-600 dark:text-orange-400">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-orange-500"
                    style={{ animation: reduced ? undefined : "fw-dot-blink 1.4s ease-in-out infinite", animationDelay: "0.4s" }}
                  />
                  Lead generation
                </span>
              </div>

              <Button
                href="/work/case-studies"
                variant="outline"
                className="group/cta mt-8 w-fit transition-all duration-300 hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400"
              >
                Read case study
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}