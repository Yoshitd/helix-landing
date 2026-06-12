import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function CTA() {
  return (
    <section id="contact" className="px-6 pb-28 md:pb-36">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand px-8 py-20 text-center md:py-28">
          <div
            aria-hidden
            className="bg-dotgrid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
          />
          <div className="relative">
            <h2 className="text-balance mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Have something worth building?
            </h2>
            <p className="text-balance mx-auto mt-5 max-w-lg text-lg text-white/80">
              Tell us where you&rsquo;re stuck. We&rsquo;ll come back within two
              business days with a plan — no slide deck required.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:hello@helix.dev"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-full bg-white px-8 text-brand hover:bg-white/90",
                )}
              >
                Book a call
              </a>
              <a
                href="mailto:hello@helix.dev"
                className={cn(
                  buttonVariants({ size: "lg", variant: "ghost" }),
                  "h-11 rounded-full px-8 text-white hover:bg-white/10 hover:text-white",
                )}
              >
                hello@helix.dev
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
