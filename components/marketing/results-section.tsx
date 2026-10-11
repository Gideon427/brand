"use client";

import { useEffect, useId, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const results = [
  { value: 42, label: "Enquiries", path: "M0 50 L30 40 L60 45 L90 25 L120 30 L150 15 L180 20 L200 8" },
  { value: 31, label: "Orders",    path: "M0 52 L30 45 L60 40 L90 30 L120 33 L150 22 L180 14 L200 10" },
  { value: 28, label: "Conversion",path: "M0 54 L30 48 L60 42 L90 36 L120 25 L150 20 L180 22 L200 6" },
];

/* -------------------------------------------------------------------------- */
/*  Animation keyframes                                                        */
/* -------------------------------------------------------------------------- */

const ANIMATION_CSS = `
@property --rd-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@keyframes rd-rotate-glow {
  to { --rd-angle: 360deg; }
}
@keyframes rd-shimmer {
  0% { transform: translateX(-140%) skewX(-14deg); }
  100% { transform: translateX(340%) skewX(-14deg); }
}
@keyframes rd-dash-flow {
  to { stroke-dashoffset: -20; }
}
@keyframes rd-glow {
  0%, 100% { opacity: 0.25; transform: translate(-50%, 0) scale(1); }
  50%      { opacity: 0.5;  transform: translate(-50%, 0) scale(1.05); }
}
@keyframes rd-pulse-ring {
  0%   { transform: scale(1);   opacity: 0.7; }
  100% { transform: scale(2.2); opacity: 0; }
}
@keyframes rd-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
@keyframes rd-blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
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

function useInView<T extends HTMLElement>(threshold = 0.15) {
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
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Counts up to `target`, then keeps nudging upward in tiny random steps. */
function useCountUp(
  target: number,
  active: boolean,
  duration = 2400,
  maxOverflow = 2.5
) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (reduced) {
      setValue(target);
      setSettled(true);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setSettled(true);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduced]);

  useEffect(() => {
    if (!settled || reduced) return;

    let timeout: number;

    const scheduleNext = () => {
      const wait = 3500 + Math.random() * 3000;
      timeout = window.setTimeout(() => {
        setValue((v) => {
          const step = 0.1 + Math.random() * 0.3;
          return Math.min(v + step, target + maxOverflow);
        });
        scheduleNext();
      }, wait);
    };

    scheduleNext();
    return () => window.clearTimeout(timeout);
  }, [settled, reduced, target, maxOverflow]);

  return value;
}

/* -------------------------------------------------------------------------- */
/*  Animated zigzag chart                                                      */
/* -------------------------------------------------------------------------- */

function Chart({
  path,
  active,
  reduced,
  delay,
  id,
}: {
  path: string;
  active: boolean;
  reduced: boolean;
  delay: number;
  id: string;
}) {
  const area = `${path} L200 60 L0 60 Z`;

  return (
    <svg
      viewBox="0 0 200 60"
      className="mt-6 h-16 w-full overflow-visible"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={area}
        fill={`url(#${id}-area)`}
        style={{
          opacity: active ? 1 : 0,
          transition: `opacity 1.2s ease-out ${delay + 700}ms`,
        }}
      />

      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary/60"
        strokeDasharray="400"
        strokeDashoffset={active ? 0 : 400}
        style={{
          transition: `stroke-dashoffset 2s cubic-bezier(0.65,0,0.35,1) ${delay}ms`,
        }}
      />

      <path
        d={path}
        fill="none"
        stroke="#fb923c"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 16"
        style={{
          opacity: active ? 0.85 : 0,
          transition: `opacity 1s ease-out ${delay + 1400}ms`,
          animation: reduced ? undefined : "rd-dash-flow 1.6s linear infinite",
        }}
      />

      {active && !reduced && (
        <circle r="2.25" fill="#f97316">
          <animateMotion dur="3.5s" repeatCount="indefinite" path={path} />
        </circle>
      )}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card — toned-down glow                                                     */
/* -------------------------------------------------------------------------- */

function GlowCard({
  value,
  label,
  path,
  index,
  active,
}: {
  value: number;
  label: string;
  path: string;
  index: number;
  active: boolean;
}) {
  const reduced = useReducedMotion();
  const display = useCountUp(value, active, 2400);
  const uid = useId().replace(/:/g, "");

  /* Much softer conic — thin highlights instead of thick ones */
  const conic =
    "conic-gradient(from var(--rd-angle), transparent 0%, rgba(249,115,22,0.7) 8%, rgba(251,146,60,0.5) 15%, transparent 26%, transparent 62%, rgba(249,115,22,0.6) 72%, rgba(251,146,60,0.45) 78%, transparent 90%)";

  return (
    <div
      className="group relative rounded-2xl"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(28px)",
        transition: `opacity 800ms ease-out ${index * 140}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${index * 140}ms`,
      }}
    >
      {/* Single soft halo — subtle on rest, brighter on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-40 blur-[6px] transition-opacity duration-500 group-hover:opacity-70"
        style={{
          background: conic,
          animation: reduced ? undefined : "rd-rotate-glow 8s linear infinite",
        }}
      />

      {/* Crisp 1px ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl p-px"
        style={{
          background: conic,
          animation: reduced ? undefined : "rd-rotate-glow 8s linear infinite",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-8 shadow-sm">
        {/* Gentle shimmer sweep — half the prior intensity */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        >
          <div
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-300/[0.06] to-transparent"
            style={{
              animation: reduced ? undefined : "rd-shimmer 7s ease-in-out infinite",
              animationDelay: `${index * 500}ms`,
            }}
          />
        </div>

        <div className="relative">
          <p className="text-4xl font-bold tabular-nums text-primary">
            +{display.toFixed(1)}%
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>

          <Chart
            path={path}
            active={active}
            reduced={reduced}
            delay={index * 200}
            id={uid}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function ResultsSection() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  const fade = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(18px)",
    transition: `opacity 800ms ease-out ${delay}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-border bg-muted/20 py-24"
    >
      <style>{ANIMATION_CSS}</style>

      {/* Ambient background — much dimmer than before */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-orange-500/[0.05] blur-3xl"
        style={{
          animation: reduced ? undefined : "rd-glow 12s ease-in-out infinite",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl" style={fade(0)}>
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
              style={{
                animation: reduced ? undefined : "rd-blink 1.6s ease-in-out infinite",
              }}
            />
            Real outcomes
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The work should have a purpose.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A better website should help the business. A campaign should have a
            reason. A digital system should solve a problem.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {results.map((r, i) => (
            <GlowCard
              key={r.label}
              value={r.value}
              label={r.label}
              path={r.path}
              index={i}
              active={inView}
            />
          ))}
        </div>

        <blockquote className="mt-16 max-w-3xl" style={fade(500)}>
          <p className="text-xl font-medium leading-relaxed tracking-tight">
            &ldquo;Brandoria didn&apos;t just give us a new website. They helped
            us understand what our business actually needed.&rdquo;
          </p>
          <footer className="mt-6 flex items-center gap-4">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-primary/50"
                style={{
                  animation: reduced ? undefined : "rd-pulse-ring 2.4s ease-out infinite",
                }}
              />
              EM
            </div>
            <div>
              <p className="font-semibold">Elena Marlowe</p>
              <p className="text-sm text-muted-foreground">
                Director, North &amp; Co. — Website + Lead Generation
              </p>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}