import { ScrollProgress } from "@/components/site/scroll-progress";
import { Tracer } from "@/components/site/tracer";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Logos } from "@/components/site/logos";
import { Features } from "@/components/site/features";
import { Process } from "@/components/site/process";
import { Metrics } from "@/components/site/metrics";
import { Testimonials } from "@/components/site/testimonials";
import { FAQ } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
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
        <Logos />
        <Features />
        <Process />
        <Metrics />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
