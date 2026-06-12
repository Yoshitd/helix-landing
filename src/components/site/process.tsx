"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const steps = [
  {
    no: "01",
    title: "Discover",
    body: "We pressure-test the idea, map constraints, and agree on what 'done' actually means before a line of code is written.",
  },
  {
    no: "02",
    title: "Design",
    body: "Interface and architecture in lockstep. Prototypes you can click, schemas you can ship.",
  },
  {
    no: "03",
    title: "Build",
    body: "Small senior teams shipping in weekly increments, with the tests and observability baked in from day one.",
  },
  {
    no: "04",
    title: "Scale",
    body: "We harden, automate, and hand over — or stay on as your long-term platform team. Your call.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // translate the horizontal track from 0 to roughly -75% across the scroll
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-78%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative h-[320vh] bg-[#0b1413] dark:bg-[#f4f6f6]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="text-sm font-medium text-brand">How we work</p>
          <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-white md:text-5xl dark:text-[#0b1413]">
            Four steps, no surprises.
          </h2>
          {/* progress line */}
          <div className="mt-8 h-px w-full max-w-xl overflow-hidden bg-white/10 dark:bg-black/10">
            <motion.div style={{ width: lineWidth }} className="h-full bg-brand" />
          </div>
        </div>

        <motion.div style={{ x }} className="mt-12 flex gap-6 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
          {steps.map((s) => (
            <article
              key={s.no}
              className="relative flex h-[22rem] w-[80vw] shrink-0 flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-9 backdrop-blur-sm sm:w-[26rem] dark:border-black/10 dark:bg-black/[0.02]"
            >
              <span className="text-7xl font-semibold tracking-tighter text-brand/90">
                {s.no}
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-white dark:text-[#0b1413]">{s.title}</h3>
                <p className="mt-3 text-white/55 dark:text-black/60">{s.body}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
