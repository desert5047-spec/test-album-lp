import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { TargetPersona } from "@/components/sections/TargetPersona";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <TargetPersona />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
