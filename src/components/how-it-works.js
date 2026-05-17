import { ScanSearch, Scissors, Sparkles, ArrowRight } from "lucide-react";
import SpotlightCard from './SpotlightCard';

const steps = [
  {
    title: "Foto & Diagnosis",
    desc: "Potret pakaianmu yang rusak atau kebesaran. Gemini AI akan mendeteksi jenis kain dan masalah teknisnya secara instan.",
    color: "bg-clay-lavender",
    icon: <ScanSearch className="w-7 h-7 text-clay-ink" />,
    delay: "100ms",
    cta: "Coba Scan Baju"
  },
  {
    title: "DIY atau Penjahit?",
    desc: 'Dapatkan panduan perbaikan mandiri (DIY) atau biarkan kami membuatkan "Surat Instruksi Penjahit" yang presisi agar tak ada lagi salah komunikasi.',
    color: "bg-clay-sage",
    icon: <Scissors className="w-7 h-7 text-clay-ink" />,
    delay: "200ms",
    cta: "Lihat Panduan"
  },
  {
    title: "Remake Studio",
    desc: "Bosan dengan model lama? Visualisasikan modifikasi baru bajumu dengan AI sebelum benar-benar dipotong atau dijahit.",
    color: "bg-clay-pink",
    icon: <Sparkles className="w-7 h-7 text-clay-ink" />,
    delay: "300ms",
    cta: "Mulai Eksplorasi"
  }
];

export function HowItWorks() {
  return (
    <section className="w-full max-w-5xl mx-auto mt-24 mb-16 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-clay-ink tracking-tight animate-slide-up">
          3 Langkah Menuju <span className="text-clay-sage">Sustainable Style</span>
        </h2>
      </div>

      <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {steps.map((step, index) => (
          <SpotlightCard
            key={index}
            spotlightColor="rgb(201, 201, 201)"
            className={`${step.color} p-8 rounded-2xl text-clay-ink flex flex-col gap-5 hover:-translate-y-2 transition-all duration-300 animate-slide-up relative overflow-hidden group shadow-[inset_-8px_-8px_0px_rgba(255,255,255,0.5)] backdrop-blur-md border border-white/50`}
            style={{
              animationDelay: step.delay,
              boxShadow: "inset 0px -8px 20px rgba(0,0,0,0.06), inset 0px 8px 20px rgba(255,255,255,0.5), 0px 10px 30px rgba(0,0,0,0.05)"
            }}
          >
            {/* Soft decorative blob */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/30 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

            {/* Header: Step & Icon */}
            <div className="flex items-center justify-between relative z-10 mb-2">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 group-hover:rotate-12 transition-transform duration-300">
                {step.icon}
              </div>
              <span className="text-xs font-black text-clay-ink/60 uppercase tracking-[0.2em] bg-white/30 px-4 py-2 rounded-full border border-white/20">
                Langkah 0{index + 1}
              </span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-black tracking-tighter relative z-10 mt-2">
              {step.title}
            </h3>

            <p className="text-clay-ink/80 leading-relaxed font-medium relative z-10 text-md">
              {step.desc}
            </p>

            <div className="mt-auto mx-auto pt-3 relative z-10">
              <button className={`flex items-center gap-2 text-sm font-bold bg-white/40 hover:bg-white/10 transition-colors px-5 py-3 rounded-xl shadow-[inset_-2px_-2px_0px_rgba(255,255,255,0.5)] border border-white/40 text-clay-ink w-max group/btn cursor-pointer`}>
                {step.cta}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
