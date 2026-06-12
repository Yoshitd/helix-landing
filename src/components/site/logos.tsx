import { Reveal } from "./reveal";

const companies = [
  { name: "Northwind", className: "font-semibold tracking-tight" },
  { name: "COALESCE", className: "font-medium tracking-[0.2em] text-base" },
  { name: "Meridian", className: "font-light italic" },
  { name: "Vantage", className: "font-bold tracking-tight" },
  { name: "larkspur", className: "font-medium lowercase" },
  { name: "AVERLY", className: "font-semibold tracking-[0.15em] text-base" },
];

export function Logos() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
      <Reveal>
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
          Trusted by teams shipping at scale
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((c) => (
            <span
              key={c.name}
              className={`text-2xl text-foreground/30 transition-colors duration-300 hover:text-brand ${c.className}`}
            >
              {c.name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
