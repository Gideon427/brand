"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/about", label: "Our Approach" },
      { href: "/about", label: "Why Brandoria" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/web", label: "Web" },
      { href: "/services/branding", label: "Branding" },
      { href: "/services/video", label: "Video" },
      { href: "/services/content-marketing", label: "Content Marketing" },
      { href: "/services/lead-generation", label: "Lead Generation" },
      { href: "/services/ecommerce", label: "Ecommerce" },
      { href: "/services/custom-systems", label: "Custom Systems" },
    ],
  },
  {
    title: "Work",
    links: [
      { href: "/work", label: "Portfolio" },
      { href: "/work/case-studies", label: "Case Studies" },
      { href: "/work/results", label: "Results" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/resources", label: "Insights" },
      { href: "/faq", label: "FAQ" },
      { href: "/business-growth-audit", label: "Business Growth Audit" },
    ],
  },
  {
    title: "Client",
    links: [
      { href: "/login", label: "Client Login" },
      { href: "/start-a-project", label: "Start a Project" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Keyframes                                                                  */
/* -------------------------------------------------------------------------- */

const ANIMATION_CSS = `
@keyframes ft-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes ft-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ft-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.35; transform: scale(0.8); }
}
@keyframes ft-orb {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  50%      { transform: translate(-30px, 30px) scale(1.15); opacity: 0.85; }
}
@keyframes ft-orb-b {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  50%      { transform: translate(40px, -30px) scale(1.2); opacity: 0.75; }
}
@keyframes ft-glow {
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 1; }
}
@keyframes ft-dot-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-3px); }
}
@keyframes ft-heart {
  0%, 100% { transform: scale(1); }
  20%      { transform: scale(1.25); }
  40%      { transform: scale(1); }
  60%      { transform: scale(1.15); }
  80%      { transform: scale(1); }
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

function useInView<T extends HTMLElement>(threshold = 0.08) {
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
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* -------------------------------------------------------------------------- */
/*  Welcome marquee                                                            */
/* -------------------------------------------------------------------------- */

const WELCOME_ITEMS = [
  "Welcome to Brandoria",
  "Built for Business",
  "Websites · Branding · Growth",
  "Made with care",
  "Let's build something",
];

function WelcomeMarquee({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative overflow-hidden border-b border-border"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}
    >
      {/* Soft orange glow behind the marquee */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"
        style={{ animation: reduced ? undefined : "ft-glow 6s ease-in-out infinite" }}
      />

      <div
        className="relative flex w-max items-center gap-10 py-6 text-2xl font-bold tracking-tight text-orange-500 sm:gap-14 sm:py-8 sm:text-3xl lg:text-4xl"
        style={{
          animation: reduced ? undefined : "ft-marquee 32s linear infinite",
        }}
      >
        {[...WELCOME_ITEMS, ...WELCOME_ITEMS].map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 sm:gap-14">
            <span className="whitespace-nowrap">{item}</span>
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500"
              style={{
                animation: reduced ? undefined : "ft-blink 1.6s ease-in-out infinite",
                animationDelay: `${(i % 5) * 0.2}s`,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer link with animated underline + arrow                                */
/* -------------------------------------------------------------------------- */

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-300 hover:text-orange-500"
    >
      <span className="relative">
        {label}
        {/* Animated underline draws in from left on hover */}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"
        />
      </span>
      <ArrowUpRight className="h-3 w-3 -translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-100" />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Column                                                                     */
/* -------------------------------------------------------------------------- */

function Column({
  col,
  index,
  active,
  reduced,
}: {
  col: (typeof columns)[number];
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <div
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(14px)",
        transition: `opacity 650ms ease-out ${index * 100}ms, transform 650ms cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
      }}
    >
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
          style={{
            animation: reduced ? undefined : "ft-blink 2s ease-in-out infinite",
            animationDelay: `${index * 0.25}s`,
          }}
        />
        {col.title}
      </p>
      <ul className="space-y-2">
        {col.links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

export function Footer() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLElement>(0.05);

  const fade = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(14px)",
    transition: `opacity 650ms ease-out ${delay}ms, transform 650ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-border bg-muted/30"
    >
      <style>{ANIMATION_CSS}</style>

      {/* Ambient background orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"
        style={{ animation: reduced ? undefined : "ft-orb 12s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
        style={{ animation: reduced ? undefined : "ft-orb-b 15s ease-in-out infinite" }}
      />

      {/* Welcome marquee */}
      <WelcomeMarquee reduced={reduced} />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="lg:col-span-1" style={fade(0)}>
            <p className="group relative inline-block text-lg font-bold tracking-tight">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-orange-500">
                BRANDORIA
              </span>
              {/* Glow behind the logo on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 rounded-md bg-orange-500/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
              />
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Business growth, digital infrastructure and customer acquisition.
            </p>

            {/* Live status chip */}
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-[11px] font-medium text-orange-600 dark:text-orange-400">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-orange-500"
                  style={{
                    animation: reduced ? undefined : "ft-blink 1.8s ease-in-out infinite",
                  }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
              </span>
              Currently taking projects
            </span>
          </div>

          {columns.map((col, i) => (
            <Column
              key={col.title}
              col={col}
              index={i}
              active={inView}
              reduced={reduced}
            />
          ))}
        </div>

        <div
          className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center"
          style={fade(600)}
        >
          <div className="flex gap-6">
            {[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/cookies", label: "Cookies" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="group relative inline-block transition-colors duration-300 hover:text-orange-500"
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"
                />
              </Link>
            ))}
          </div>

          <p className="flex items-center gap-2 font-medium tracking-tight">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500"
              style={{
                animation: reduced ? undefined : "ft-dot-bob 1.6s ease-in-out infinite",
              }}
            />
            BUILT FOR BUSINESS.
            <Heart
              className="h-3.5 w-3.5 text-orange-500"
              fill="currentColor"
              style={{
                animation: reduced ? undefined : "ft-heart 2.4s ease-in-out infinite",
              }}
            />
          </p>
        </div>
      </div>
    </footer>
  );
}