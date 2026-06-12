import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

type Feature = {
  title: string;
  body: string;
  icon: React.ReactNode;
  span?: string;
};

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-brand" aria-hidden>
    <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features: Feature[] = [
  {
    title: "Product engineering",
    body: "Senior teams that own delivery end-to-end — discovery, design, and code that holds up under real load.",
    icon: <Icon d="M4 7h16M4 12h16M4 17h10" />,
    span: "md:col-span-2",
  },
  {
    title: "Cloud & platform",
    body: "Infrastructure as a product: observable, secure, and cheap to run.",
    icon: <Icon d="M5 16a4 4 0 0 1 1-7.9A5 5 0 0 1 16 7a4 4 0 0 1 1 9H6" />,
  },
  {
    title: "AI integration",
    body: "Models wired into your workflows where they earn their keep.",
    icon: <Icon d="M12 3v3M12 18v3M3 12h3M18 12h3M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" />,
  },
  {
    title: "Data platforms",
    body: "Pipelines, warehouses, and dashboards your whole company can trust to make decisions.",
    icon: <Icon d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3ZM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />,
    span: "md:col-span-2",
  },
];

export function Features() {
  return (
    <section id="platform" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-medium text-brand">What we do</p>
        <h2 className="text-balance mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          One partner for the whole software lifecycle.
        </h2>
        <p className="mt-4 text-lg text-foreground/60">
          No hand-offs, no agencies in a trenchcoat. The people who scope your
          work are the people who build it.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {features.map((f, i) => (
          <Reveal
            key={f.title}
            delay={i * 0.07}
            className={cn("group h-full", f.span)}
          >
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_50px_-20px_rgba(0,203,187,0.45)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft transition-colors group-hover:bg-brand group-hover:[&_svg]:text-brand-foreground">
                {f.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-foreground/60">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
