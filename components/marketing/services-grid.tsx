"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Globe,
  Palette,
  Megaphone,
  Target,
  ShoppingBag,
  Settings,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    slug: "web",
    title: "Websites",
    desc: "Websites that help people understand your business and take the next step.",
    icon: Globe,
  },
  {
    slug: "branding",
    title: "Branding",
    desc: "A visual identity that makes your business look as serious as it is.",
    icon: Palette,
  },
  {
    slug: "marketing",
    title: "Marketing",
    desc: "Ways to put your business in front of the right people.",
    icon: Megaphone,
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    desc: "A better path from attention to enquiry.",
    icon: Target,
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    desc: "A complete experience from product discovery to checkout.",
    icon: ShoppingBag,
  },
  {
    slug: "custom-systems",
    title: "Custom Systems",
    desc: "Digital tools built around the way your business works.",
    icon: Settings,
  },
];

/* -------------------------------------------------------------------------- */
/*  Keyframes                                                                  */
/* -------------------------------------------------------------------------- */

const ANIMATION_CSS = `
@keyframes sg-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes sg-icon-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes sg-icon-flip {
  0%   { transform: rotateY(0deg) rotateX(0deg); }
  50%  { transform: rotateY(180deg) rotateX(15deg); }
  100% { transform: rotateY(360deg) rotateX(0deg); }
}
@keyframes sg-shimmer {
  0%   { transform: translateX(-160%) skewX(-16deg); }
  100% { transform: translateX(360%) skewX(-16deg); }
}
@keyframes sg-ring-pulse {
  0%   { transform: scale(1);   opacity: 0.55; }
  100% { transform: scale(2.2); opacity: 0; }
}
@keyframes sg-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
}
@keyframes sg-dot-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(0.85); }
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

/** Fires once when the element scrolls into view. */
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
/*  Accent variants — all orange, tuned for subtle depth                       */
/* -------------------------------------------------------------------------- */

const ACCENTS = [
  { text: "text-orange-500", bg: "bg-orange-500/10", ring: "ring-orange-500/30", glow: "from-orange-500/20" },
  { text: "text-amber-500",  bg: "bg-amber-500/10",  ring: "ring-amber-500/30",  glow: "from-amber-500/20" },
  { text: "text-orange-600", bg: "bg-orange-600/10", ring: "ring-orange-600/30", glow: "from-orange-600/20" },
  { text: "text-amber-600",  bg: "bg-amber-600/10",  ring: "ring-amber-600/30",  glow: "from-amber-600/20" },
  { text: "text-orange-400", bg: "bg-orange-400/10", ring: "ring-orange-400/30", glow: "from-orange-400/20" },
  { text: "text-orange-500", bg: "bg-orange-500/10", ring: "ring-orange-500/30", glow: "from-orange-500/20" },
];

/* -------------------------------------------------------------------------- */
/*  Service card                                                               */
/* -------------------------------------------------------------------------- */

function ServiceCard({
  service,
  index,
  active,
  reduced,
}: {
  service: (typeof services)[number];
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  const Icon = service.icon;
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(28px)",
        transition: `opacity 700ms ease-out ${index * 90}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${index * 90}ms`,
      }}
    >
      {/* Outer glow ring — lights up on hover */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 ring-1 ring-inset transition-opacity duration-500 group-hover:opacity-100 ${accent.ring}`}
      />

      {/* Ambient orange gradient behind the card, appears on hover */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br ${accent.glow} to-transparent opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-transform duration-500 group-hover:-translate-y-1">
        {/* Shimmer sweep on hover — orange tint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        >
          <div
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent opacity-0 group-hover:opacity-100"
            style={{
              animation: reduced ? undefined : "sg-shimmer 1.6s ease-in-out infinite",
              animationPlayState: "paused",
            }}
          />
        </div>

        {/* Icon container with pulse ring + spin/flip on hover */}
        <div className="relative mb-4 inline-flex">
          <span
            aria-hidden="true"
            className={`absolute inset-0 rounded-xl ${accent.bg} opacity-0 group-hover:opacity-100`}
            style={{
              animation: reduced ? undefined : "sg-ring-pulse 1.8s ease-out infinite",
            }}
          />

          <div
            className={`relative flex h-11 w-11 items-center justify-center rounded-xl ${accent.bg} ring-1 ring-inset ${accent.ring} transition-transform duration-500 will-change-transform group-hover:[transform:rotateY(360deg)]`}
          >
            <Icon
              className={`h-5 w-5 ${accent.text} transition-transform duration-700 group-hover:[transform:rotate(360deg)]`}
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>

        <span className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${accent.text}`}>
          Learn more
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          <span
            className="ml-0.5 inline-block h-1 w-1 rounded-full bg-current"
            style={{
              animation: reduced ? undefined : "sg-dot-blink 1.4s ease-in-out infinite",
            }}
          />
        </span>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function ServicesGrid() {
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

      {/* Ambient orange blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"
        style={{ animation: reduced ? undefined : "sg-float 8s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
        style={{ animation: reduced ? undefined : "sg-float 10s ease-in-out infinite reverse" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl" style={fade(0)}>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-500">
            What we build
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What can we build for you?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start with one thing or let us help you put the bigger picture
            together.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard
              key={s.slug}
              service={s}
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