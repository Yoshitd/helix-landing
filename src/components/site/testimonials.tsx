import { Reveal } from "./reveal";

type Quote = {
  body: string;
  name: string;
  role: string;
  initials: string;
};

const quotes: Quote[] = [
  {
    body:
      "Helix shipped in eight weeks what our last vendor couldn't in eight months. The difference was night and day — senior people who actually owned the outcome.",
    name: "Dana Whitlock",
    role: "VP Engineering, Northwind",
    initials: "DW",
  },
  {
    body:
      "They scoped it honestly, told us what not to build, and the thing has barely needed a patch since. Rare to find a team that says no for the right reasons.",
    name: "Marcus Bell",
    role: "Founder, Coalesce",
    initials: "MB",
  },
  {
    body:
      "Our platform costs dropped 40% after their rebuild, and on-call went quiet. The dashboards alone paid for the engagement.",
    name: "Priya Nair",
    role: "CTO, Meridian Labs",
    initials: "PN",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-brand">In their words</p>
        <h2 className="text-balance mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          Teams that bet on us, twice.
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 0.07} className="h-full">
            <figure className="flex h-full flex-col justify-between rounded-3xl border border-black/[0.07] bg-white p-7">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-brand/30"
                fill="currentColor"
                aria-hidden
              >
                <path d="M9.5 8C7 8 5 10 5 12.5V18h6v-6H8c0-1.7 .8-2.5 2.5-2.5L9.5 8Zm9 0c-2.5 0-4.5 2-4.5 4.5V18h6v-6h-3c0-1.7 .8-2.5 2.5-2.5L18.5 8Z" />
              </svg>
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground/80">
                {q.body}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                  {q.initials}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold">{q.name}</span>
                  <span className="block text-sm text-foreground/50">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
