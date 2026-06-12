"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { Reveal } from "./reveal";

type Metric = { value: number; suffix: string; label: string; decimals?: number };

const metrics: Metric[] = [
  { value: 120, suffix: "+", label: "Products shipped" },
  { value: 99.98, suffix: "%", label: "Uptime across fleets", decimals: 2 },
  { value: 8, suffix: "wk", label: "Median time to first release" },
  { value: 14, suffix: "yr", label: "Average senior experience" },
];

function Counter({ value, suffix, label, decimals = 0 }: Metric) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 1.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      });
      return controls.stop;
    }
  }, [inView, count, value]);

  return (
    <div className="text-center">
      <p className="flex items-baseline justify-center text-5xl font-semibold tracking-tight md:text-6xl">
        <motion.span ref={ref}>{rounded}</motion.span>
        <span className="text-brand">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-foreground/55">{label}</p>
    </div>
  );
}

export function Metrics() {
  return (
    <section id="metrics" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Measured by what ships.
        </h2>
        <p className="mt-4 text-lg text-foreground/60">
          A decade of building means we&rsquo;ve learned where projects go to
          die — and how to keep yours out of that graveyard.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-y-12 md:grid-cols-4">
        {metrics.map((m) => (
          <Counter key={m.label} {...m} />
        ))}
      </div>
    </section>
  );
}
