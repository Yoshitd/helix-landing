"use client";

import { motion } from "motion/react";
import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiNextdotjs,
  SiRust,
  SiPostgresql,
  SiKubernetes,
  SiGo,
  SiGraphql,
  SiTerraform,
  SiReact,
  SiPython,
} from "react-icons/si";

const items: { label: string; Icon: IconType }[] = [
  { label: "TypeScript", Icon: SiTypescript },
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "Rust", Icon: SiRust },
  { label: "PostgreSQL", Icon: SiPostgresql },
  { label: "Kubernetes", Icon: SiKubernetes },
  { label: "Go", Icon: SiGo },
  { label: "GraphQL", Icon: SiGraphql },
  { label: "Terraform", Icon: SiTerraform },
  { label: "React", Icon: SiReact },
  { label: "Python", Icon: SiPython },
];

export function Marquee() {
  return (
    <section className="border-y border-black/[0.06] bg-white py-8">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
        The stack we ship on
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="flex w-max gap-12 pr-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
        >
          {[...items, ...items].map(({ label, Icon }, i) => (
            <span
              key={`${label}-${i}`}
              className="group flex items-center gap-2.5 whitespace-nowrap text-xl font-medium text-foreground/35 transition-colors hover:text-brand"
            >
              <Icon className="h-6 w-6 shrink-0" aria-hidden />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
