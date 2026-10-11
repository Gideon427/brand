"use client";

import { useEffect, useState } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Globe,
  Megaphone,
  Target,
} from "lucide-react";

const nodes = [
  { label: "Customers", icon: Users },
  { label: "Products", icon: ShoppingBag },
  { label: "Revenue", icon: DollarSign },
  { label: "Website", icon: Globe },
  { label: "Marketing", icon: Megaphone },
  { label: "Goals", icon: Target },
];

/* -------------------------------------------------------------------------- */
/*  Motion tuning                                                              */
/* -------------------------------------------------------------------------- */

const RADIUS = 40; // % of the square, from the center
const DRAG_Y = 4.5; // vertical drag amplitude (units of the 100×100 viewBox)
const DRAG_X = 1.6; // subtle horizontal sway
const SLACK = 6; // rope sag/sway amplitude
const SPEED = 1.1; // base wiggle speed

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

export function BusinessDiagram() {
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);

  /* Single clock driving both the ropes and the nodes, so the rope ends
     always land exactly on their node. */
  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    const start = performance.now();

    const loop = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  /* Precompute every node's position + its rope's control point each frame. */
  const layout = nodes.map((node, i) => {
    const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
    const phase = i * 1.05;

    const baseX = 50 + RADIUS * Math.cos(angle);
    const baseY = 50 + RADIUS * Math.sin(angle);

    const dy = reduced ? 0 : DRAG_Y * Math.sin(t * SPEED + phase);
    const dx = reduced ? 0 : DRAG_X * Math.cos(t * SPEED * 0.8 + phase);

    const x = baseX + dx;
    const y = baseY + dy;

    const mx = (50 + x) / 2;
    const my = (50 + y) / 2;

    const vx = x - 50;
    const vy = y - 50;
    const len = Math.hypot(vx, vy) || 1;
    const perpX = -vy / len;
    const perpY = vx / len;

    const sway = reduced ? 0 : SLACK * Math.sin(t * 1.6 + phase * 1.3);

    const cx = mx + perpX * sway;
    const cy = my + perpY * sway;

    const tilt = reduced ? 0 : sway * 1.4;

    return { ...node, x, y, cx, cy, tilt };
  });

  return (
    <section className="border-t border-border bg-muted/20 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              How we think
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your business is more than a website.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Your website, customers, products, pricing and marketing all
              affect each other. We look at the bigger picture so the pieces
              work together.
            </p>
            <p className="mt-6 font-semibold tracking-tight">
              Every part affects the next.
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            {/* Concentric rings */}
            <div className="absolute inset-0 rounded-full bg-primary/10" />
            <div className="absolute inset-12 rounded-full bg-primary/20" />

            {/* Ropes — 100×100 viewBox maps 1:1 to the % positions used
                for the nodes below. */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              {layout.map((n) => {
                const d = `M 50 50 Q ${n.cx} ${n.cy} ${n.x} ${n.y}`;
                return (
                  <g key={n.label}>
                    <path
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className="text-primary/15"
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      className="text-primary/70"
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeDasharray="1.2 2"
                      strokeDashoffset={-t * 6}
                      className="text-primary"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Center hub — wrapper centers it with flex; the inner
                element is the ONLY thing the pulse transform touches.
                These two concerns can never fight each other again. */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-center text-sm font-bold text-primary-foreground shadow-lg"
                style={
                  reduced
                    ? undefined
                    : {
                        transform: `scale(${1 + 0.02 * Math.sin(t * 1.4)})`,
                      }
                }
              >
                YOUR BUSINESS
              </div>
            </div>

            {/* Nodes — position AND tilt come from the same layout calc as
                the ropes, so endpoints always match. */}
            {layout.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.label}
                  className="absolute flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium shadow-sm will-change-transform"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform: `translate(-50%, -50%) rotate(${n.tilt}deg)`,
                  }}
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {n.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}