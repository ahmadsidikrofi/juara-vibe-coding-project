import { SmartCanvas } from "@/components/smart-canvas";
import { HowItWorks } from "@/components/how-it-works";
import { InspirasiPermak } from "@/components/inspirasi-permak";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 animate-fade-in relative">
      <main className="w-full max-w-5xl z-10 flex flex-col items-center gap-8 text-center mt-12 mb-10">
        
        <div className="inline-flex items-center gap-2 bg-white/60 glass px-5 py-2 rounded-full text-clay-sage font-bold text-sm tracking-wide uppercase shadow-sm animate-slide-up">
          <span className="w-2 h-2 rounded-full bg-clay-pink animate-pulse" />
          Permak.in AI Asisten
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-clay-ink leading-[1.1] tracking-tight animate-slide-up [animation-delay:100ms]">
          Wujudkan Gaya Baru <br />
          <span className="text-clay-sage relative inline-block mt-2">
            Pakaian Lamamu
            <svg className="absolute w-full h-4 -bottom-2 left-0 text-clay-peach/50" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        
        <p className="max-w-2xl text-xl text-clay-ink/70 leading-relaxed animate-slide-up [animation-delay:200ms] mt-4">
          Jangan buang baju lamamu. Biarkan AI kami menganalisis kerusakan, memberikan panduan <strong>repair</strong> DIY, atau menciptakan visual modifikasi <strong>remake</strong> yang trendi.
        </p>

        <div className="w-full mt-8 animate-slide-up [animation-delay:300ms]">
          <SmartCanvas />
        </div>

        <HowItWorks />

      </main>
      
      {/* Full width section for Masonry Gallery */}
      <InspirasiPermak />

      {/* Final Call to Action */}
      <CtaSection />
    </div>
  );
}


