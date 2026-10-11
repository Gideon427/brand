"use client";

import { useEffect, useRef, useState } from "react";
import { Target, Users, Zap, Shield } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/marketing/cta-section";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const values = [
  {
    icon: Target,
    title: "Purpose first",
    desc: "Every decision answers one question: does this help the business?",
  },
  {
    icon: Users,
    title: "Built with you",
    desc: "Not for you. We work with your team, not around it.",
  },
  {
    icon: Zap,
    title: "Simple over clever",
    desc: "If it needs a manual, it's not finished.",
  },
  {
    icon: Shield,
    title: "Own what we ship",
    desc: "If it's not working, we fix it. No hand-offs and disappearances.",
  },
];

/* Stats — values are now numeric so they can count up */
const stats = [
  { value: 24, suffix: "", decimals: 0, label: "Active clients", mode: "up" as const },
  { value: 8, suffix: "", decimals: 0, label: "Service areas", mode: "still" as const },
  { value: 72, suffix: "%", decimals: 0, label: "Avg. completion", mode: "sway" as const },
  { value: 4.9, suffix: "", decimals: 1, label: "Client rating", mode: "sway" as const },
];

const reasons = [
  {
    title: "Direct access",
    body: "You talk to the people building the work. No account manager middle layer.",
  },
  {
    title: "Clear scope",
    body: "We tell you what we're doing, what it costs, and what happens next. Up front.",
  },
  {
    title: "Long-term thinking",
    body: "We'd rather build something that lasts than something that wins an award.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Keyframes                                                                  */
/* -------------------------------------------------------------------------- */

const ANIMATION_CSS = `
@keyframes ab-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ab-shimmer {
  0%   { transform: translateX(-160%) skewX(-14deg); }
  100% { transform: translateX(360%) skewX(-14deg); }
}
@keyframes ab-dot-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.35; transform: scale(0.8); }
}
@keyframes ab-orb {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
  50%      { transform: translate(-30px, 30px) scale(1.1); opacity: 0.6; }
}
@keyframes ab-orb-b {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
  50%      { transform: translate(40px, -30px) scale(1.15); opacity: 0.55; }
}
@keyframes ab-ring-pulse {
  0%   { transform: scale(1);   opacity: 0.55; }
  100% { transform: scale(2.2); opacity: 0; }
}
@keyframes ab-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
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

/** Count-up with a post-settle behavior: "up" | "still" | "sway". */
function useLivingNumber(
  target: number,
  active: boolean,
  mode: "up" | "still" | "sway",
  { duration = 1600, phase = 0 }: { duration?: number; phase?: number } = {}
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
    if (!settled || reduced || mode === "still") return;

    if (mode === "up") {
      let timeout: number;
      const scheduleNext = () => {
        const wait = 2400 + Math.random() * 2400;
        timeout = window.setTimeout(() => {
          setValue((v) => {
            const magnitude = Math.max(target, 1);
            const step = magnitude * (0.0008 + Math.random() * 0.0012);
            return Math.min(v + step, target * 1.1);
          });
          scheduleNext();
        }, wait);
      };
      scheduleNext();
      return () => window.clearTimeout(timeout);
    }

    let raf = 0;
    const start = performance.now();
    const period = 6200;
    const amplitude = target * 0.035;

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

/* -------------------------------------------------------------------------- */
/*  Story — text side fades in line by line                                    */
/* -------------------------------------------------------------------------- */

function Story() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  const line = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(16px)",
    transition: `opacity 700ms ease-out ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section ref={ref} className="relative overflow-hidden py-20">
      {/* Ambient orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-orange-500/[0.06] blur-3xl"
        style={{ animation: "ab-orb 14s ease-in-out infinite" }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight" style={line(0)}>
            Our approach
          </h2>
          <p
            className="mt-6 text-lg text-muted-foreground"
            style={line(100)}
          >
            Most businesses don&apos;t have a website problem. They have a
            business problem that shows up on the website.
          </p>
          <p className="mt-4 text-muted-foreground" style={line(200)}>
            We start by understanding what&apos;s actually working, what&apos;s
            getting in the way, and where there&apos;s room to grow. Then we
            build the pieces that make the difference — not the ones that just
            look good in a deck.
          </p>
          <p className="mt-4 text-muted-foreground" style={line(300)}>
            Every engagement starts with the same question: what does this
            business actually need next?
          </p>
        </div>

        <ValueGrid />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Value cards                                                                */
/* -------------------------------------------------------------------------- */

function ValueGrid() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-2">
      {values.map((v, i) => {
        const Icon = v.icon;
        return (
          <div
            key={v.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-md"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(24px)",
              transition: `opacity 700ms ease-out ${i * 120}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, border-color 300ms, box-shadow 300ms, translate 300ms`,
            }}
          >
            {/* Orange tint on hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] via-transparent to-orange-500/[0.08] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* Shimmer on hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            >
              <div
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-400/15 to-transparent opacity-0 group-hover:opacity-100"
                style={{
                  animation: reduced ? undefined : "ab-shimmer 1.8s ease-in-out infinite",
                }}
              />
            </div>

            <div className="relative">
              {/* Icon with pulse ring + spin on hover */}
              <div className="relative mb-4 inline-flex">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-orange-500/15 opacity-0 group-hover:opacity-100"
                  style={{
                    animation: reduced ? undefined : "ab-ring-pulse 1.8s ease-out infinite",
                  }}
                />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-inset ring-orange-500/20 transition-transform duration-500 group-hover:[transform:rotate(360deg)]">
                  <Icon className="h-5 w-5 text-orange-500 transition-transform duration-700 group-hover:[transform:rotate(-360deg)]" />
                </div>
              </div>

              <p className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-orange-500">
                {v.title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats — counting numbers with glow                                         */
/* -------------------------------------------------------------------------- */

function StatBlock({
  stat,
  index,
  active,
  reduced,
}: {
  stat: (typeof stats)[number];
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  const value = useLivingNumber(stat.value, active, stat.mode, {
    duration: 1500 + index * 180,
    phase: index * 0.9,
  });

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(24px)",
        transition: `opacity 700ms ease-out ${index * 110}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 110}ms, border-color 300ms, box-shadow 300ms, translate 300ms`,
      }}
    >
      {/* Pulsing orange ring behind the number on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          animation: reduced ? undefined : "ab-ring-pulse 2.4s ease-out infinite",
        }}
      />

      {/* Top shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <div
          className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-400/[0.08] to-transparent"
          style={{
            animation: reduced ? undefined : "ab-shimmer 6s ease-in-out infinite",
            animationDelay: `${index * 400}ms`,
          }}
        />
      </div>

      <p className="relative text-4xl font-bold tabular-nums text-orange-500 transition-transform duration-500 group-hover:scale-[1.04]">
        {stat.decimals > 0
          ? value.toFixed(stat.decimals)
          : Math.round(value).toString()}
        {stat.suffix}
      </p>
      <p className="relative mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {stat.label}
      </p>
    </div>
  );
}

function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const reduced = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-border bg-muted/20 py-16"
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-orange-500/[0.05] blur-3xl"
        style={{ animation: reduced ? undefined : "ab-orb 12s ease-in-out infinite" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatBlock
              key={s.label}
              stat={s}
              index={i}
              active={inView}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why Brandoria                                                              */
/* -------------------------------------------------------------------------- */

function WhyBrandoria() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const reduced = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden py-20">
      {/* Ambient orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber-500/[0.06] blur-3xl"
        style={{ animation: reduced ? undefined : "ab-orb-b 15s ease-in-out infinite" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(16px)",
            transition: "opacity 700ms ease-out, transform 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <SectionHeading
            eyebrow="Why Brandoria"
            title="Small team. Serious work."
          />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {reasons.map((item, i) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-transparent p-6 transition-all duration-500 hover:border-orange-500/30 hover:bg-orange-500/[0.03]"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(24px)",
                transition: `opacity 700ms ease-out ${i * 130}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${i * 130}ms, border-color 400ms, background-color 400ms`,
              }}
            >
              {/* Numbered marker */}
              <p
                className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-orange-500"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
                  style={{
                    animation: reduced ? undefined : "ab-dot-blink 1.8s ease-in-out infinite",
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
                0{i + 1}
              </p>

              <p className="text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-orange-500">
                {item.title}
              </p>
              <p className="mt-3 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  const reduced = useReducedMotion();
  const { ref: heroRef, inView: heroIn } = useInView<HTMLDivElement>(0.1);

  return (
    <>
      <style>{ANIMATION_CSS}</style>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-border bg-muted/20 py-20"
      >
        {/* Two ambient orbs drifting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-orange-500/[0.07] blur-3xl"
          style={{ animation: reduced ? undefined : "ab-orb 13s ease-in-out infinite" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-500/[0.07] blur-3xl"
          style={{ animation: reduced ? undefined : "ab-orb-b 16s ease-in-out infinite" }}
        />

        {/* Drifting grid overlay for texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
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
              eyebrow="About"
              title="We build the parts that move the business."
              description="Websites, brands, content and digital systems businesses need to grow."
            />
          </div>
        </div>
      </section>

      <Story />
      <Stats />
      <WhyBrandoria />

      <CtaSection />
    </>
  );
}