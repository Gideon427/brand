"use client";

import { useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Data — each row declares its behavior mode                                 */
/*  mode: "up"    → counts up to target, then keeps creeping upward            */
/*  mode: "still" → counts up to target, then stays put                        */
/*  mode: "sway"  → counts up to target, then gently oscillates around it      */
/* -------------------------------------------------------------------------- */

const factors = [
  {
    title: "More People",
    sub: "Visitors",
    value: 24860,
    prefix: "",
    suffix: "",
    decimals: 0,
    mode: "up" as const,
  },
  {
    title: "More Buyers",
    sub: "Orders",
    value: 1284,
    prefix: "",
    suffix: "",
    decimals: 0,
    mode: "still" as const,
  },
  {
    title: "More Value",
    sub: "Avg. order",
    value: 86.4,
    prefix: "$",
    suffix: "",
    decimals: 2,
    mode: "sway" as const,
  },
];

const revenue = {
  value: 110.9,
  prefix: "$",
  suffix: "K",
  decimals: 1,
  mode: "up" as const,
};

const acquisition = [
  { label: "Search", pct: 78, mode: "up" as const },
  { label: "Social", pct: 62, mode: "sway" as const },
  { label: "Email", pct: 48, mode: "still" as const },
  { label: "Direct", pct: 35, mode: "sway" as const },
];

/* -------------------------------------------------------------------------- */
/*  Keyframes                                                                  */
/* -------------------------------------------------------------------------- */

const ANIMATION_CSS = `
@keyframes gn-fade-up {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes gn-shimmer {
  0%   { transform: translateX(-160%) skewX(-16deg); }
  100% { transform: translateX(360%) skewX(-16deg); }
}
@keyframes gn-glow-pulse {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50%      { opacity: 0.9;  transform: scale(1.035); }
}
@keyframes gn-bar-shimmer {
  0%   { background-position: -140% 0; }
  100% { background-position: 240% 0; }
}
@keyframes gn-dot-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.35; transform: scale(0.8); }
}
@keyframes gn-float {
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
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* -------------------------------------------------------------------------- */
/*  useLivingNumber — count-up + one of three continuous behaviors             */
/*                                                                             */
/*  • "up"    → after settling, ticks slowly upward forever                    */
/*  • "still" → after settling, stays exactly at target                        */
/*  • "sway"  → after settling, oscillates smoothly around target              */
/* -------------------------------------------------------------------------- */

function useLivingNumber(
  target: number,
  active: boolean,
  mode: "up" | "still" | "sway",
  { duration = 1600, phase = 0 }: { duration?: number; phase?: number } = {}
) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const [settled, setSettled] = useState(false);

  /* ---- Phase 1: count-up ---- */
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

  /* ---- Phase 2: living behavior ---- */
  useEffect(() => {
    if (!settled || reduced || mode === "still") return;

    if (mode === "up") {
      // Slow creep upward. Uses a timeout chain so intervals feel organic.
      let timeout: number;

      const scheduleNext = () => {
        const wait = 2400 + Math.random() * 2400; // 2.4s – 4.8s
        timeout = window.setTimeout(() => {
          setValue((v) => {
            // Step scales with the size of the number so small ones don't
            // jump and large ones don't crawl.
            const magnitude = Math.max(target, 1);
            const step = magnitude * (0.0008 + Math.random() * 0.0012);
            // Cap so it doesn't run away forever.
            return Math.min(v + step, target * 1.12);
          });
          scheduleNext();
        }, wait);
      };

      scheduleNext();
      return () => window.clearTimeout(timeout);
    }

    // mode === "sway" — smooth sine oscillation, no randomness.
    let raf = 0;
    const start = performance.now();
    const period = 6200; // ms per full cycle
    const amplitude = target * 0.04; // ±4%

    const loop = (now: number) => {
      const elapsed = now - start;
      const wave = Math.sin((elapsed / period) * Math.PI * 2 + phase);
      setValue(target + amplitude * wave);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [settled, reduced, mode, target, phase]);

  return value;
}

function format(n: number, prefix: string, suffix: string, decimals: number) {
  const safe = Number.isFinite(n) ? n : 0;
  const fixed = safe.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${fixed}${suffix}`;
}

/* -------------------------------------------------------------------------- */
/*  Factor row                                                                 */
/* -------------------------------------------------------------------------- */

function FactorRow({
  factor,
  index,
  active,
  reduced,
}: {
  factor: (typeof factors)[number];
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  const value = useLivingNumber(factor.value, active, factor.mode, {
    duration: 1500 + index * 200,
    phase: index * 1.1,
  });

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-border bg-card px-5 py-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-md"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(20px)",
        transition: `opacity 650ms ease-out ${index * 120}ms, transform 650ms cubic-bezier(0.22,1,0.36,1) ${index * 120}ms, box-shadow 300ms, border-color 300ms, translate 300ms`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
      >
        <div
          className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent opacity-0 group-hover:opacity-100"
          style={{
            animation: reduced ? undefined : "gn-shimmer 1.8s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"
            style={{
              animation: reduced ? undefined : "gn-dot-blink 1.6s ease-in-out infinite",
              animationDelay: `${index * 0.3}s`,
            }}
          />
          <div>
            <p className="text-base font-semibold tracking-tight">{factor.title}</p>
            <p className="text-xs text-muted-foreground">
              {factor.sub}
              <span className="ml-1.5 text-[10px] uppercase tracking-widest text-orange-500/70">
                {factor.mode === "up" && "· live"}
                {factor.mode === "sway" && "· fluctuating"}
              </span>
            </p>
          </div>
        </div>
        <p className="text-lg font-bold tabular-nums text-foreground transition-colors duration-300 group-hover:text-orange-500">
          {format(value, factor.prefix, factor.suffix, factor.decimals)}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Revenue card                                                               */
/* -------------------------------------------------------------------------- */

function RevenueCard({ active, reduced }: { active: boolean; reduced: boolean }) {
  const value = useLivingNumber(revenue.value, active, revenue.mode, {
    duration: 2200,
  });

  return (
    <div
      className="relative"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(20px)",
        transition:
          "opacity 750ms ease-out 480ms, transform 750ms cubic-bezier(0.22,1,0.36,1) 480ms",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-r from-orange-500/40 via-amber-400/50 to-orange-500/40 blur-lg"
        style={{
          animation: reduced ? undefined : "gn-glow-pulse 2.8s ease-in-out infinite",
        }}
      />

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-4 text-white shadow-lg">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
        >
          <div
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              animation: reduced ? undefined : "gn-shimmer 3s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative flex items-center justify-between">
          <p className="text-base font-bold uppercase tracking-tight">
            = More Revenue
          </p>
          <p className="text-lg font-bold tabular-nums">
            {format(value, revenue.prefix, revenue.suffix, revenue.decimals)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Acquisition bar                                                            */
/* -------------------------------------------------------------------------- */

function AcquisitionBar({
  row,
  index,
  active,
  reduced,
}: {
  row: (typeof acquisition)[number];
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  const pct = useLivingNumber(row.pct, active, row.mode, {
    duration: 1400 + index * 200,
    phase: index * 0.9,
  });

  return (
    <li
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateX(-10px)",
        transition: `opacity 600ms ease-out ${index * 130}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 130}ms`,
      }}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{row.label}</span>
        <span className="tabular-nums text-muted-foreground">
          {pct.toFixed(1)}%
        </span>
      </div>

      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(0, Math.min(pct, 100))}%` }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: reduced
                ? undefined
                : "gn-bar-shimmer 2.2s ease-in-out infinite",
              animationDelay: `${index * 0.2}s`,
            }}
          />
        </div>
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function GrowthNumbers() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.08);

  const fade = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(18px)",
    transition: `opacity 700ms ease-out ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      <style>{ANIMATION_CSS}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"
        style={{ animation: reduced ? undefined : "gn-float 9s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-amber-500/10 blur-3xl"
        style={{ animation: reduced ? undefined : "gn-float 11s ease-in-out infinite reverse" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p
              className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-orange-500"
              style={fade(0)}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
                style={{
                  animation: reduced
                    ? undefined
                    : "gn-dot-blink 1.5s ease-in-out infinite",
                }}
              />
              The math
            </p>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={fade(100)}
            >
              Want more customers? There are numbers behind it.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground" style={fade(200)}>
              Growth usually comes down to a few simple things: reaching more
              people, getting more of them to buy, increasing what each
              customer is worth, or getting customers to come back.
            </p>

            <div className="mt-10 space-y-4">
              {factors.map((f, i) => (
                <FactorRow
                  key={f.title}
                  factor={f}
                  index={i}
                  active={inView}
                  reduced={reduced}
                />
              ))}
              <RevenueCard active={inView} reduced={reduced} />
            </div>
          </div>

          <div className="relative" style={fade(180)}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10 blur-2xl"
              style={{
                animation: reduced
                  ? undefined
                  : "gn-glow-pulse 6s ease-in-out infinite",
              }}
            />

            <div className="relative rounded-3xl border border-border bg-card p-8 transition-shadow duration-500 hover:shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Customer Acquisition
              </p>

              <ul className="mt-6 space-y-4">
                {acquisition.map((row, i) => (
                  <AcquisitionBar
                    key={row.label}
                    row={row}
                    index={i}
                    active={inView}
                    reduced={reduced}
                  />
                ))}
              </ul>

              <p className="mt-8 text-sm text-muted-foreground">
                The right answer depends on your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}