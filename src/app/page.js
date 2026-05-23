'use client'

import { SmartCanvas } from "@/components/smart-canvas";
import { HowItWorks } from "@/components/how-it-works";
import { InspirasiPermak } from "@/components/inspirasi-permak";
import { CtaSection } from "@/components/cta-section";
import { SilkHero } from "@/components/SilkHero";
import Silk from "@/components/Silk";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in relative w-full overflow-hidden">

      {/* 1. Hero Section (Full Screen & Kinetik) */}
      <SilkHero />

      {/* 2. Main Content Container */}
      <main className="w-full max-w-7xl z-10 flex flex-col items-center gap-16 text-center px-6 md:px-12 mt-0 mb-24">

        {/* Smart Canvas (Upload Area) */}
        <div id="smart-canvas" className="w-full animate-slide-up [animation-delay:300ms]">
          <SmartCanvas />
        </div>

        {/* How It Works Section */}
        <HowItWorks />

      </main>

      {/* 3. Full width section for Masonry Gallery */}
      <InspirasiPermak />

      {/* 4. Final Call to Action */}
      <CtaSection />

    </div>
  );
}


