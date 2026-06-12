import { Logo } from "./logo";

const cols = [
  { title: "Platform", links: ["Product engineering", "Cloud & platform", "AI integration", "Data platforms"] },
  { title: "Company", links: ["About", "Work", "Careers", "Journal"] },
  { title: "Connect", links: ["hello@helix.dev", "LinkedIn", "GitHub", "X / Twitter"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-5">
        <div className="col-span-2">
          <Logo className="text-lg" />
          <p className="mt-4 max-w-xs text-sm text-foreground/55">
            Software solutions, quietly powerful. Built by a small team that
            sweats the details.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-foreground/55 transition-colors hover:text-brand"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border pt-8 text-xs text-foreground/45 sm:flex-row">
        <p>© {new Date().getFullYear()} Helix Labs. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> All systems operational
        </p>
      </div>
    </footer>
  );
}
