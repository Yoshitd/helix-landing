import { ScrollProgress } from "@/components/site/scroll-progress";
import { Tracer } from "@/components/site/tracer";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Features } from "@/components/site/features";
import { Process } from "@/components/site/process";
import { Metrics } from "@/components/site/metrics";
import { CTA } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="relative">
      <ScrollProgress />
      <Tracer />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Features />
        <Process />
        <Metrics />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
