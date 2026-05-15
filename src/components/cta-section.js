import ButtonWithIconDemo from "./shadcn-space/radix/button/button-01";

export function CtaSection() {
  return (
    <section className="w-full max-w-full mx-auto px-4 md:px-8 animate-fade-in relative z-10">
      <div className="relative w-full rounded-[3rem] overflow-hidden p-10 md:p-24 text-center flex flex-col items-center justify-center bg-gradient-to-br from-clay-sage/40 via-clay-lavender/30 to-clay-pink/30 shadow-2xl shadow-clay-sage/20 border border-white/50 backdrop-blur-xl group">

        {/* Soft floating decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/60 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/50 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />

        <h2 className="text-4xl md:text-6xl font-extrabold text-clay-ink tracking-tight mb-6 leading-[1.1] max-w-4xl relative z-10">
          Jangan biarkan bajumu menumpuk di lemari.
        </h2>

        <p className="text-xl md:text-3xl text-clay-ink/80 mb-12 font-semibold max-w-3xl relative z-10">
          Ubah sekarang, <span className="text-clay-sage">selamatkan bumi kemudian.</span>
        </p>

        <div className="relative z-10 flex justify-center w-full">
          {/* Custom Giant CTA Button to ensure it's extremely prominent */}
          <button className="px-10 py-5 bg-clay-ink text-white font-extrabold text-lg md:text-xl rounded-full shadow-2xl shadow-clay-ink/30 hover:shadow-clay-ink/40 hover:-translate-y-2 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 group/btn">
            Mulai Perjalanan Hijau Anda
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-clay-ink transition-colors">
              <svg
                className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
