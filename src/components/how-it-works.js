import { ScanSearch, Scissors, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Foto & Diagnosis",
    desc: "Potret pakaianmu yang rusak atau kebesaran. Gemini AI akan mendeteksi jenis kain dan masalah teknisnya secara instan.",
    color: "bg-clay-lavender",
    icon: <ScanSearch className="w-8 h-8 text-clay-ink" />,
    delay: "100ms",
  },
  {
    title: "DIY atau Penjahit?",
    desc: 'Dapatkan panduan perbaikan mandiri (DIY) atau biarkan kami membuatkan "Surat Instruksi Penjahit" yang presisi agar tak ada lagi salah komunikasi.',
    color: "bg-clay-sage",
    icon: <Scissors className="w-8 h-8 text-clay-ink" />,
    delay: "200ms",
  },
  {
    title: "Remake Studio",
    desc: "Bosan dengan model lama? Visualisasikan modifikasi baru bajumu dengan AI sebelum benar-benar dipotong atau dijahit.",
    color: "bg-clay-pink",
    icon: <Sparkles className="w-8 h-8 text-clay-ink" />,
    delay: "300ms",
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`${step.color} p-8 rounded-3xl text-clay-ink flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-slide-up relative overflow-hidden group`}
            style={{ animationDelay: step.delay }}
          >
            {/* Soft decorative blob */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/30 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            
            <div className="w-16 h-16 bg-white/40 rounded-2xl flex items-center justify-center shadow-sm backdrop-blur-sm mb-4 relative z-10 group-hover:rotate-6 transition-transform duration-300">
              {step.icon}
            </div>
            
            <h3 className="text-2xl font-bold tracking-tight relative z-10">
              {step.title}
            </h3>
            
            <p className="text-clay-ink/80 leading-relaxed font-medium relative z-10 text-lg">
              {step.desc}
            </p>
            
            <div className="mt-auto pt-8 relative z-10">
              <span className="text-sm font-extrabold opacity-30 uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                Langkah 0{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
