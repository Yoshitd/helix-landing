import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./reveal";

const faqs = [
  {
    q: "How do you price engagements?",
    a: "Most work runs as a fixed monthly fee for a dedicated team, or a fixed-bid for tightly-scoped projects. We'll recommend whichever fits the risk — and we put the number in writing before we start.",
  },
  {
    q: "How big is the team I'd work with?",
    a: "Small and senior. A typical pod is two to four engineers plus a designer, all with a decade-plus of experience. The people who scope your work are the people who build it — no hand-offs to juniors.",
  },
  {
    q: "Do you work fixed-bid or retainer?",
    a: "Both. New products usually start as a retainer so we can move with you as things change; well-defined builds and integrations are often fixed-bid. We're happy to start one way and switch.",
  },
  {
    q: "What happens after launch?",
    a: "Your call. We can harden, document, and hand the codebase to your team, or stay on as a long-term platform team. Either way you own all the code and infrastructure from day one.",
  },
  {
    q: "How quickly can you start?",
    a: "Discovery can usually begin within a week or two. We deliberately keep capacity open so we're never spreading a team too thin across clients.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-28 md:py-36">
      <Reveal className="text-center">
        <p className="text-sm font-medium text-brand">Questions</p>
        <h2 className="text-balance mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          The things people ask first.
        </h2>
      </Reveal>

      <Reveal className="mt-12">
        <Accordion multiple={false} className="border-t border-border">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="py-5 text-base hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pr-8 text-[15px] leading-relaxed text-foreground/60">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
