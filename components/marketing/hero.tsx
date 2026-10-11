"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  RefreshCw,
  Zap,
  Users,
  ShoppingBag,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/*  Media paths — drop these files into your /public folder:                   */
/*    public/videos/hero.mp4                                                   */
/*    public/images/hero.png                                                   */
/* -------------------------------------------------------------------------- */

const HERO_VIDEO = "/videos/hero.mp4";
const HERO_FALLBACK = "/images/hero.png";

const CARD_VIDEO = "/videos/hero.mp4";
const CARD_FALLBACK = "/images/hero.png";

/* -------------------------------------------------------------------------- */
/*  Live-stat tuning                                                           */
/*  Every STATS_TICK_MS, each stat grows by STATS_TICK_STEP. Forever.          */
/* -------------------------------------------------------------------------- */

const STATS_TICK_STEP = 3;
const STATS_TICK_MS = 2 * 60 * 60 * 1000; // 2 hours

/* -------------------------------------------------------------------------- */
/*  Infinite animation keyframes                                               */
/* -------------------------------------------------------------------------- */

const ANIMATION_CSS = `
@keyframes brand-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes brand-float-slow {
  0%, 100% { transform: translateY(0) translateX(0) scale(1); }
  33% { transform: translateY(-16px) translateX(8px) scale(1.06); }
  66% { transform: translateY(8px) translateX(-10px) scale(0.96); }
}
@keyframes brand-shimmer {
  0% { transform: translateX(-140%) skewX(-14deg); }
  100% { transform: translateX(340%) skewX(-14deg); }
}
@keyframes brand-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes brand-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes brand-bar {
  0%, 100% { transform: scaleY(0.32); }
  50% { transform: scaleY(1); }
}
@keyframes brand-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes brand-pulse-ring {
  0% { transform: scale(0.7); opacity: 0.9; }
  100% { transform: scale(2.6); opacity: 0; }
}
@keyframes brand-progress {
  0% { width: 6%; }
  50% { width: 94%; }
  100% { width: 6%; }
}
@keyframes brand-bob {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(3deg); }
}
@keyframes brand-fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes brand-glow {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.9; }
}
@keyframes brand-pop {
  0%   { transform: scale(1); color: inherit; }
  40%  { transform: scale(1.18); color: hsl(var(--primary)); }
  100% { transform: scale(1); color: inherit; }
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

/** Types a phrase, holds, deletes it, then moves to the next one. Forever. */
function useTypewriter(
  phrases: string[],
  { typeSpeed = 60, deleteSpeed = 30, holdTime = 1500 } = {}
) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];

    if (!deleting && text === current) {
      const t = window.setTimeout(() => setDeleting(true), holdTime);
      return () => window.clearTimeout(t);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const t = window.setTimeout(
      () => {
        setText((prev) =>
          deleting
            ? current.slice(0, Math.max(prev.length - 1, 0))
            : current.slice(0, prev.length + 1)
        );
      },
      deleting ? deleteSpeed : typeSpeed
    );

    return () => window.clearTimeout(t);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, holdTime]);

  return { text, index: index % phrases.length };
}

/** A number that keeps creeping upward forever. */
function useLiveCounter(start: number, { ms = 1600, step = 3 } = {}) {
  const [value, setValue] = useState(start);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setValue((v) => v + Math.floor(Math.random() * step) + 1);
    }, ms);
    return () => window.clearInterval(id);
  }, [ms, step, reduced]);

  return value;
}

/** Cycles 0 → length-1 forever. */
function useCycle(length: number, ms = 2000) {
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
/*  VideoLoop                                                                  */
/* -------------------------------------------------------------------------- */

type VideoLoopProps = {
  src: string;
  fallbackSrc: string;
  className?: string;
};

function VideoLoop({ src, fallbackSrc, className = "" }: VideoLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const video = videoRef.current;
      if (!video) return;

      if (mq.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      } else {
        void video.play().catch(() => {});
      }
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className={className}>
      <img
        src={fallbackSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {!failed && (
        <video
          ref={videoRef}
          src={src}
          poster={fallbackSrc}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const TYPED_PHRASES = [
  "Better You",
  "Bolder Brand",
  "Bigger Growth",
  "Faster Sales",
];

const TYPED_COLORS = ["#6366f1", "#06b6d4", "#ec4899", "#f59e0b"];

const NAV_ITEMS = ["Home", "Shop", "About"];

const STATS_BASE = [
  { label: "Customers", value: 2847, prefix: "", delta: "+42%" },
  { label: "Orders", value: 1392, prefix: "", delta: "+62%" },
  { label: "Revenue", value: 48620, prefix: "$", delta: "+72%" },
];

const MARQUEE_ITEMS = [
  "Free shipping",
  "30-day returns",
  "Carbon neutral",
  "Secure checkout",
  "24/7 support",
  "Made in EU",
];

const BAR_HEIGHTS = [38, 62, 45, 88, 54, 72, 40, 66, 50];

const EVENTS = [
  { icon: ShoppingBag, text: "New order #4821", meta: "$184.00", tone: "text-emerald-500" },
  { icon: Users, text: "New customer · Berlin", meta: "DE", tone: "text-sky-500" },
  { icon: Zap, text: "Checkout completed", meta: "$92.50", tone: "text-amber-500" },
  { icon: DollarSign, text: "Subscription renewed", meta: "$29/mo", tone: "text-emerald-500" },
  { icon: Activity, text: "Traffic spike detected", meta: "+18%", tone: "text-fuchsia-500" },
];

/* -------------------------------------------------------------------------- */
/*  Stat tile                                                                  */
/*  • Counts up from 0 → baseValue ONCE on mount.                              */
/*  • Never resets on flip / re-render.                                        */
/*  • After the count-up settles, ticks +STATS_TICK_STEP every STATS_TICK_MS.  */
/*  • Pops + flashes primary color each time it increments.                    */
/* -------------------------------------------------------------------------- */

function StatTile({
  label,
  value: baseValue,
  prefix,
  delta,
  index,
}: {
  label: string;
  value: number;
  prefix: string;
  delta: string;
  index: number;
}) {
  const reduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(0);
  const [settled, setSettled] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  /* ---- Initial count-up — runs ONCE, on mount only ---- */
  useEffect(() => {
    if (reduced) {
      setDisplayed(baseValue);
      setSettled(true);
      return;
    }

    let raf = 0;
    const duration = 1400 + index * 220;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(baseValue * eased);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setSettled(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Empty deps on purpose: only run on first mount, never on flip.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Live increment — every STATS_TICK_MS, add STATS_TICK_STEP ---- */
  useEffect(() => {
    if (!settled || reduced) return;

    const id = window.setInterval(() => {
      setDisplayed((v) => v + STATS_TICK_STEP);
      setPulseKey((k) => k + 1); // trigger a pop animation
    }, STATS_TICK_MS);

    return () => window.clearInterval(id);
  }, [settled, reduced]);

  return (
    <div
      className="group relative min-w-0 overflow-hidden rounded-xl border border-border bg-background p-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md sm:p-3"
      style={{ animation: `brand-fade-up 700ms ease-out ${index * 120}ms both` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <p className="relative truncate text-[10px] text-muted-foreground sm:text-xs">
        {label}
      </p>

      <p
        key={pulseKey}
        className="relative mt-1 truncate text-xs font-bold tabular-nums sm:text-sm"
        style={
          pulseKey > 0
            ? { animation: "brand-pop 700ms ease-out" }
            : undefined
        }
      >
        {prefix}
        {Math.round(displayed).toLocaleString()}
      </p>

      <p className="relative mt-0.5 flex items-center gap-0.5 text-[10px] font-medium text-primary sm:text-xs">
        <ArrowUpRight className="h-3 w-3 shrink-0" />
        {delta}
      </p>

      <span
        className="absolute bottom-0 left-0 h-0.5 rounded-full bg-primary/70"
        style={{
          animation: "brand-progress 4s ease-in-out infinite",
          animationDelay: `${index * 0.5}s`,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  The animated, flipping browser card                                        */
/* -------------------------------------------------------------------------- */

function AnimatedCard() {
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  const { text: typed, index: typedIndex } = useTypewriter(TYPED_PHRASES);
  const accent = TYPED_COLORS[typedIndex];
  const activeNav = useCycle(NAV_ITEMS.length, 2200);
  const activeEvent = useCycle(EVENTS.length, 1900);
  const liveVisitors = useLiveCounter(1284, { ms: 1500, step: 4 });

  // Auto-flip the card on a loop
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setFlipped((f) => !f), 7200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <>
      <style>{ANIMATION_CSS}</style>

      <div className="rounded-3xl border border-border bg-card p-2.5 shadow-sm sm:p-4">
        {/* Browser chrome */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400 sm:h-2.5 sm:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-yellow-400 sm:h-2.5 sm:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-green-400 sm:h-2.5 sm:w-2.5" />
          </div>

          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <RefreshCw
              className="h-3 w-3 transition-transform duration-500"
              style={{ transform: flipped ? "rotate(180deg)" : "rotate(0deg)" }}
            />
            Flip
          </button>
        </div>

        {/* Flip stage — FIXED responsive height. Both faces live inside
            this box with `absolute inset-0`, so front and back are always
            exactly the same size on every screen. */}
        <div className="[perspective:1800px]">
          <div
            className="relative h-[460px] transition-transform duration-700 [transform-style:preserve-3d] sm:h-[500px] lg:h-[540px]"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* ------------------------------ FRONT ------------------------------ */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-3.5 sm:p-5">
                {/* Card video loop */}
                <VideoLoop
                  src={CARD_VIDEO}
                  fallbackSrc={CARD_FALLBACK}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-background/85" />

                {/* Rotating conic glow border */}
                <div className="pointer-events-none absolute -inset-px overflow-hidden rounded-2xl opacity-60">
                  <div
                    className="absolute left-1/2 top-1/2 h-[320%] w-[320%] -translate-x-1/2 -translate-y-1/2 text-primary"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, currentColor 70deg, transparent 150deg, currentColor 250deg, transparent 360deg)",
                      animation: "brand-spin 9s linear infinite",
                      opacity: 0.35,
                    }}
                  />
                  <div className="absolute inset-[1px] rounded-2xl bg-background/95" />
                </div>

                {/* Floating orbs */}
                <div
                  className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-primary/25 blur-2xl"
                  style={{ animation: "brand-float-slow 9s ease-in-out infinite" }}
                />
                <div
                  className="pointer-events-none absolute -right-10 bottom-4 h-28 w-28 rounded-full bg-primary/20 blur-3xl"
                  style={{
                    animation: "brand-float-slow 12s ease-in-out infinite reverse",
                  }}
                />

                {/* Shimmer sweep */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    style={{ animation: "brand-shimmer 6s ease-in-out infinite" }}
                  />
                </div>

                {/* Front content — flex column that fills the fixed height */}
                <div className="relative flex h-full flex-col">
                  {/* Nav */}
                  <div className="flex items-center justify-between gap-2 border-b border-border pb-3 sm:pb-4">
                    <p className="shrink-0 text-xs font-bold tracking-tight sm:text-sm">
                      Lumen &amp; Co
                    </p>
                    <nav className="flex items-center gap-2.5 text-[11px] text-muted-foreground sm:gap-4 sm:text-xs">
                      {NAV_ITEMS.map((item, i) => (
                        <span
                          key={item}
                          className={`relative transition-colors duration-300 ${
                            i === activeNav
                              ? "font-semibold text-foreground"
                              : "hover:text-foreground"
                          }`}
                        >
                          {item}
                          <span
                            className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-500 ${
                              i === activeNav ? "w-full" : "w-0"
                            }`}
                          />
                        </span>
                      ))}
                    </nav>
                  </div>

                  {/* Typing headline with color change */}
                  <div className="pt-4 sm:pt-6">
                    <h3 className="text-lg font-bold tracking-tight sm:text-2xl">
                      Modern Essentials for a{" "}
                      <span
                        className="transition-colors duration-500"
                        style={{ color: accent }}
                      >
                        {typed}
                      </span>
                      <span
                        className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] align-middle"
                        style={{
                          backgroundColor: accent,
                          animation: "brand-blink 1s steps(1, end) infinite",
                        }}
                      />
                    </h3>

                    <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                      Trusted by customers in{" "}
                      <span className="font-semibold text-foreground">30+</span>{" "}
                      countries.
                    </p>
                  </div>

                  {/* Stats — initial count-up on mount, then +STEP every TICK */}
                  <div className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-6 sm:gap-3">
                    {STATS_BASE.map((s, i) => (
                      <StatTile key={s.label} {...s} index={i} />
                    ))}
                  </div>

                  {/* Bottom cluster pinned to bottom via mt-auto */}
                  <div className="mt-auto space-y-2.5 pt-4 sm:space-y-3 sm:pt-6">
                    {/* Live visitors pill */}
                    <div className="flex items-center justify-between gap-2 rounded-xl border border-border bg-background/80 px-2.5 py-1.5 text-[11px] backdrop-blur sm:px-3 sm:py-2 sm:text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground sm:gap-2">
                        <span className="relative flex h-2 w-2">
                          <span
                            className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
                            style={{
                              animation:
                                "brand-pulse-ring 1.8s ease-out infinite",
                            }}
                          />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        Live visitors
                      </span>
                      <span className="font-bold tabular-nums">
                        {liveVisitors.toLocaleString()}
                      </span>
                    </div>

                    {/* Infinite marquee */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        maskImage:
                          "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
                        WebkitMaskImage:
                          "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
                      }}
                    >
                      <div
                        className="flex w-max gap-4 text-[9px] uppercase tracking-widest text-muted-foreground sm:gap-5 sm:text-[10px]"
                        style={{ animation: "brand-marquee 20s linear infinite" }}
                      >
                        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                          <span
                            key={`${item}-${i}`}
                            className="flex items-center gap-4 whitespace-nowrap sm:gap-5"
                          >
                            {item}
                            <span className="h-1 w-1 rounded-full bg-primary/50" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------------ BACK ------------------------------- */}
            <div
              className="absolute inset-0 [backface-visibility:hidden]"
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-3.5 sm:p-5">
                <div className="absolute inset-0 bg-background/90" />

                {/* Slow glow */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/25 blur-3xl"
                  style={{ animation: "brand-glow 5s ease-in-out infinite" }}
                />

                {/* Back content — flex column that fills the fixed height */}
                <div className="relative flex h-full flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-border pb-2.5 sm:pb-3">
                    <p className="flex items-center gap-1.5 text-xs font-bold tracking-tight sm:gap-2 sm:text-sm">
                      <Activity className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                      Live Analytics
                    </p>
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-600 sm:text-[10px] dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Streaming
                    </span>
                  </div>

                  {/* Infinite bar chart */}
                  <div className="mt-3 flex h-16 items-end gap-1 sm:mt-4 sm:h-20 sm:gap-1.5">
                    {BAR_HEIGHTS.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-primary/30 to-primary"
                        style={{
                          height: `${h}%`,
                          animation: `brand-bar ${2 + (i % 3) * 0.45}s ease-in-out infinite`,
                          animationDelay: `${i * 0.14}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Infinite progress bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">
                      <span>Conversion goal</span>
                      <span className="font-semibold text-primary">68%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                        style={{
                          animation: "brand-progress 3.6s ease-in-out infinite",
                          backgroundSize: "200% 100%",
                        }}
                      />
                    </div>
                  </div>

                  {/* Cycling event feed — flex-1 lets rows size to the
                      remaining space. No magic translateY offsets. */}
                  <div className="mt-3 flex min-h-0 flex-1 flex-col sm:mt-4">
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">
                      Recent activity
                    </p>

                    <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1.5">
                      {EVENTS.map((e, i) => {
                        const Icon = e.icon;
                        const isActive = i === activeEvent;
                        return (
                          <div
                            key={e.text}
                            className={`flex flex-1 items-center justify-between gap-2 rounded-xl border px-2 text-[11px] transition-all duration-500 sm:px-3 sm:text-xs ${
                              isActive
                                ? "border-primary/40 bg-background shadow-sm ring-1 ring-primary/25"
                                : "border-transparent opacity-40"
                            }`}
                          >
                            <span className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                              <Icon
                                className={`h-3.5 w-3.5 shrink-0 ${
                                  isActive ? e.tone : "text-muted-foreground"
                                }`}
                              />
                              <span className="truncate font-medium">
                                {e.text}
                              </span>
                            </span>
                            <span className="shrink-0 font-bold tabular-nums text-muted-foreground">
                              {e.meta}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Infinite ticker */}
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-background/80 px-2.5 py-1.5 text-[9px] uppercase tracking-widest text-muted-foreground backdrop-blur sm:px-3 sm:py-2 sm:text-[10px]">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      style={{ animation: "brand-bob 1.6s ease-in-out infinite" }}
                    />
                    <div className="relative flex-1 overflow-hidden">
                      <div
                        className="flex w-max gap-6"
                        style={{ animation: "brand-marquee 14s linear infinite" }}
                      >
                        {[...EVENTS, ...EVENTS].map((e, i) => (
                          <span key={i} className="whitespace-nowrap">
                            {e.text} · {e.meta}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background video loop */}
      <VideoLoop
        src={HERO_VIDEO}
        fallbackSrc={HERO_FALLBACK}
        className="absolute inset-0"
      />

      {/* Readability overlay — vertical on mobile, horizontal from lg up */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/70 lg:bg-gradient-to-r lg:from-background lg:via-background/90 lg:to-background/60" />

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary sm:mb-4 sm:text-sm">
              Brandoria
            </p>
            <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Make your business easier to find, trust and buy from.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
              We build the websites, brands, content and digital systems
              businesses need to grow.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                href="/start-a-project"
                size="lg"
                className="w-full sm:w-auto"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href="/work"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                See Our Work
              </Button>
            </div>
          </div>

          <div className="relative min-w-0">
            <AnimatedCard />
          </div>
        </div>
      </div>
    </section>
  );
}