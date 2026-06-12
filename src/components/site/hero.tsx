"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const headline = ["Software", "solutions,", "quietly", "powerful."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // hero content drifts up + fades as you scroll past it
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // dotted grid drifts the opposite way for depth
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        style={{ y: gridY }}
        aria-hidden
        className="bg-dotgrid pointer-events-none absolute inset-0 -top-24 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_40%,black,transparent)]"
      />
      {/* soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-4 py-1.5 text-xs font-medium text-brand"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Now booking Q3 engagements
        </motion.span>

        <h1 className="text-balance mt-7 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          {headline.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: "0.5em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35 + i * 0.08,
                duration: 0.7,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className={`mr-[0.25em] inline-block ${
                word === "powerful." ? "text-brand" : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="text-balance mx-auto mt-6 max-w-xl text-lg text-foreground/60"
        >
          Helix designs, builds, and scales the software that runs your
          business — from first sketch to production at scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-full bg-brand px-7 text-brand-foreground hover:bg-brand/90",
            )}
          >
            Start a project
          </a>
          <a
            href="#platform"
            className={cn(
              buttonVariants({ size: "lg", variant: "ghost" }),
              "h-11 rounded-full px-7 text-foreground/70 hover:text-foreground",
            )}
          >
            See the platform →
          </a>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-foreground/20 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-brand"
          />
        </div>
      </motion.div>
    </section>
  );
}
