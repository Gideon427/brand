"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

/* -------------------------------------------------------------------------- */
/*  Nav data                                                                   */
/* -------------------------------------------------------------------------- */

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Insights" },
  { href: "/business-growth-audit", label: "Growth Audit" },
];

/* -------------------------------------------------------------------------- */
/*  Keyframes                                                                  */
/* -------------------------------------------------------------------------- */

const NAV_CSS = `
@keyframes nb-fade-down {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes nb-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes nb-aurora {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(8%, -6%) scale(1.15); }
  66%      { transform: translate(-6%, 6%) scale(0.92); }
}
@keyframes nb-pulse-dot {
  0%   { transform: scale(0.6); opacity: 0.9; }
  100% { transform: scale(2.4); opacity: 0; }
}
@keyframes nb-shimmer {
  0%   { transform: translateX(-120%) skewX(-20deg); }
  100% { transform: translateX(320%) skewX(-20deg); }
}
@keyframes nb-underline {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
`;

/* -------------------------------------------------------------------------- */
/*  Session link                                                               */
/*  Default is ALWAYS "Client Login" → /login.                                 */
/*  "Admin" only shows when: status === "authenticated"                        */
/*                       AND session.user exists                               */
/*                       AND role === "admin" (case-insensitive)               */
/* -------------------------------------------------------------------------- */

function SessionLink({ onClick }: { onClick?: () => void }) {
  const { data: session, status } = useSession();

  const isAuthenticated =
    status === "authenticated" && Boolean(session?.user);

  const role =
    isAuthenticated && typeof session?.user?.role === "string"
      ? session.user.role.toLowerCase()
      : null;

  const isAdmin = isAuthenticated && role === "admin";

  /* ---- Loading: skeleton, not "Admin" ---- */
  if (status === "loading") {
    return (
      <span
        className="inline-flex h-8 w-24 animate-pulse rounded-full bg-muted"
        aria-label="Loading session"
      />
    );
  }

  /* ---- Not logged in (or unauthenticated): Client Login → /login ---- */
  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        onClick={onClick}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border/70 px-3.5 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-foreground"
      >
        <span className="relative z-10">Client Login</span>
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-primary/10 transition-transform duration-300 group-hover:translate-x-0"
          aria-hidden="true"
        />
      </Link>
    );
  }

  /* ---- Logged in as admin ---- */
  if (isAdmin) {
    return (
      <Link
        href="/admin"
        onClick={onClick}
        className="group inline-flex items-center gap-2 rounded-full border border-border/70 px-3.5 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-foreground"
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
            style={{ animation: "nb-pulse-dot 1.8s ease-out infinite" }}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>Admin</span>
      </Link>
    );
  }

  /* ---- Any non-admin user should keep the default login entry ---- */
  return (
    <Link
      href="/login"
      onClick={onClick}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border/70 px-3.5 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-foreground"
    >
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
          style={{ animation: "nb-pulse-dot 1.8s ease-out infinite" }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="relative z-10">Login</span>
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-primary/10 transition-transform duration-300 group-hover:translate-x-0"
        aria-hidden="true"
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                     */
/* -------------------------------------------------------------------------- */

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });
  const [hovered, setHovered] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  const navRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  /* ---- Scroll: switch to floating capsule + track reading progress ---- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Lock body scroll when mobile menu is open ---- */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ---- Close mobile menu on desktop breakpoint ---- */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* ---- Cursor spotlight ---- */
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };
  const handleLeave = () => setSpot((s) => ({ ...s, active: false }));

  /* ---- Sliding pill: measures the hovered link's box ---- */
  const movePill = (i: number) => {
    setHovered(i);
    const el = linkRefs.current[i];
    const nav = navRef.current;
    if (!el || !nav) return;

    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    setPill({
      left: elRect.left - navRect.left,
      width: elRect.width,
      visible: true,
    });
  };
  const hidePill = () => {
    setHovered(null);
    setPill((p) => ({ ...p, visible: false }));
  };

  return (
    <>
      <style>{NAV_CSS}</style>

      <header className="fixed inset-x-0 top-0 z-50">
        {/* ---------- Outer wrapper: morphs between edge-to-edge and capsule ---------- */}
        <div
          className={[
            "mx-auto transition-all duration-500 ease-out",
            scrolled
              ? "mt-3 max-w-6xl px-3 sm:mt-4 sm:px-4"
              : "mt-0 max-w-full px-0",
          ].join(" ")}
        >
          {/* ---------- Shell ---------- */}
          <div
            ref={shellRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={[
              "relative overflow-hidden transition-[border-radius,box-shadow] duration-500 ease-out",
              scrolled
                ? "rounded-2xl shadow-[0_12px_45px_-15px_rgba(0,0,0,0.4)]"
                : "rounded-none",
            ].join(" ")}
          >
            {/* Rotating conic-gradient border (scrolled only) */}
            <div
              className={[
                "pointer-events-none absolute -inset-[200%] transition-opacity duration-500",
                scrolled ? "opacity-100" : "opacity-0",
              ].join(" ")}
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, hsl(var(--primary)) 15%, transparent 30%, hsl(var(--primary)) 50%, transparent 65%, hsl(var(--primary)) 85%, transparent 100%)",
                animation: "nb-spin 9s linear infinite",
              }}
              aria-hidden="true"
            />

            {/* Inner glass panel */}
            <div
              className={[
                "relative overflow-hidden transition-all duration-500",
                scrolled
                  ? "m-px rounded-[calc(1rem-1px)] bg-background/80 backdrop-blur-2xl"
                  : "rounded-none border-b border-border/60 bg-background/60 backdrop-blur-xl",
              ].join(" ")}
            >
              {/* Aurora orbs */}
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden="true"
              >
                <div
                  className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
                  style={{ animation: "nb-aurora 14s ease-in-out infinite" }}
                />
                <div
                  className="absolute -bottom-28 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl"
                  style={{ animation: "nb-aurora 18s ease-in-out infinite reverse" }}
                />
              </div>

              {/* Cursor spotlight */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: spot.active ? 1 : 0,
                  background: `radial-gradient(240px circle at ${spot.x}px ${spot.y}px, hsl(var(--primary) / 0.18), transparent 65%)`,
                }}
                aria-hidden="true"
              />

              {/* Reading progress bar */}
              <div
                className={[
                  "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-primary via-primary/60 to-transparent transition-opacity duration-500",
                  scrolled ? "opacity-100" : "opacity-0",
                ].join(" ")}
                style={{ transform: `scaleX(${progress})` }}
                aria-hidden="true"
              />

              {/* ---------- Content row ---------- */}
              <div
                className={[
                  "relative mx-auto flex items-center justify-between transition-all duration-500 ease-out",
                  scrolled
                    ? "h-14 gap-3 px-4 sm:px-5"
                    : "h-16 gap-6 px-6 sm:h-20",
                ].join(" ")}
              >
                {/* ---------- Logo ---------- */}
                <Link
                  href="/"
                  className="group/logo relative flex shrink-0 items-center gap-2.5"
                  aria-label="Brandoria home"
                >
                  <span className="relative inline-flex h-9 w-9 items-center justify-center">
                    <span
                      className="absolute inset-0 rounded-xl bg-primary/50 blur-md transition-all duration-500 group-hover/logo:bg-primary/70 group-hover/logo:blur-lg"
                      aria-hidden="true"
                    />
                    <Image
                      src="/logo.png"
                      alt="Brandoria"
                      width={36}
                      height={36}
                      priority
                      className="relative h-9 w-9 rounded-xl object-contain transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-[4deg]"
                    />
                  </span>

                  <span className="hidden flex-col leading-none sm:flex">
                    <span className="text-base font-bold tracking-tight">
                      BRAND<span className="text-primary">ORIA</span>
                    </span>
                    <span className="mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground md:block">
                      Digital Studio
                    </span>
                  </span>
                </Link>

                {/* ---------- Desktop nav with sliding pill ---------- */}
                <nav
                  ref={navRef}
                  onMouseLeave={hidePill}
                  className="relative hidden items-center gap-1 md:flex"
                >
                  <span
                    className="pointer-events-none absolute top-1/2 h-8 -translate-y-1/2 rounded-full bg-foreground/[0.06] ring-1 ring-foreground/10 backdrop-blur transition-all duration-300 ease-out"
                    style={{
                      left: pill.left,
                      width: pill.width,
                      opacity: pill.visible ? 1 : 0,
                    }}
                    aria-hidden="true"
                  />

                  {navLinks.map((link, i) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      ref={(el) => {
                        linkRefs.current[i] = el;
                      }}
                      onMouseEnter={() => movePill(i)}
                      className={[
                        "relative z-10 rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300",
                        hovered === i
                          ? "text-foreground"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* ---------- Desktop actions ---------- */}
                <div className="hidden shrink-0 items-center gap-2 md:flex">
                  <ThemeToggle />
                  <SessionLink />

                  <Link
                    href="/start-a-project"
                    className="group/cta relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_5px_hsl(var(--primary)/0.12)]"
                  >
                    <span className="relative z-10">Start a Project</span>
                    <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                    <span
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                {/* ---------- Mobile toggle ---------- */}
                <button
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 transition-colors duration-300 hover:border-primary/50 md:hidden"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Toggle menu"
                  aria-expanded={open}
                >
                  <span className="relative block h-5 w-5">
                    <Menu
                      className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                        open
                          ? "rotate-90 scale-0 opacity-0"
                          : "rotate-0 scale-100 opacity-100"
                      }`}
                    />
                    <X
                      className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                        open
                          ? "rotate-0 scale-100 opacity-100"
                          : "-rotate-90 scale-0 opacity-0"
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ---------- Mobile menu ---------- */}
          <div
            className={[
              "overflow-hidden transition-all duration-500 ease-out md:hidden",
              open
                ? "mt-2 max-h-[80vh] opacity-100"
                : "pointer-events-none mt-0 max-h-0 opacity-0",
            ].join(" ")}
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/90 backdrop-blur-2xl">
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden="true"
              >
                <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-primary/25 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
              </div>

              <nav className="relative flex flex-col gap-1 p-4">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground"
                    style={{
                      animation: open
                        ? `nb-fade-down 400ms ease-out ${i * 55}ms both`
                        : undefined,
                    }}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                ))}

                <div
                  className="mt-3 flex items-center gap-3 border-t border-border/60 pt-4"
                  style={{
                    animation: open
                      ? "nb-fade-down 400ms ease-out 300ms both"
                      : undefined,
                  }}
                >
                  <SessionLink onClick={() => setOpen(false)} />
                  <ThemeToggle />
                </div>

                <Link
                  href="/start-a-project"
                  onClick={() => setOpen(false)}
                  className="group mt-3 flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background"
                  style={{
                    animation: open
                      ? "nb-fade-down 400ms ease-out 380ms both"
                      : undefined,
                  }}
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer so the fixed header doesn't overlap content */}
      <div className="h-16 sm:h-20" aria-hidden="true" />
    </>
  );
}