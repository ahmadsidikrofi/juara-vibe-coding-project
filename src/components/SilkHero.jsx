"use client";

import Silk from "./Silk";
import { ChevronRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ButtonWithIconDemo from "./shadcn-space/radix/button/button-01";

export function SilkHero() {
  const { scrollY } = useScroll();
  // Transformasi Parallax: Saat user scroll ke bawah 1000px, background hanya bergerak turun 400px (40% speed)
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <div className="relative w-full h-screen min-h-[850px] flex flex-col items-center justify-center overflow-hidden bg-white selection:bg-clay-ink/20">

      {/* Background Silk Layer - Parallaxed */}
      <motion.div
        className="absolute inset-0 z-0 origin-top"
        style={{ y: yBg, scale: 1.1 }} // Skala 1.1 agar pinggiran canvas tidak terlihat saat di-parallax
      >
        <Silk speed={2} scale={0.8} color="#A4D4C5" noiseIntensity={1.5} rotation={0} />
      </motion.div>

      {/* Overlay Content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-8 text-center px-6 pointer-events-none mt-[64px]">

        {/* Brand Name & Badge Group */}
        <div className="flex flex-col items-center gap-4 animate-slide-up">
          {/* Big Brand Name */}
          <span
            className="text-2xl md:text-3xl font-black text-clay-ink tracking-[3px] drop-shadow-sm"
            style={{ fontFamily: "'Comfortaa', 'Quicksand', 'Nunito', sans-serif" }}
          >
            Permak<span className="text-clay-pink">.in</span>
          </span>
        </div>

        {/* Massive H1 Heading - Clay Style (Dark Ink & Comfortaa) */}
        <h1
          className="text-5xl md:text-[5.5rem] font-black text-clay-ink leading-[1.1] tracking-tight animate-slide-up [animation-delay:100ms] pointer-events-auto"
          style={{ fontFamily: "'Comfortaa', 'Quicksand', 'Nunito', sans-serif" }}
        >
          <span className="text-clay-sage/80">Wujudkan Gaya Baru</span> <br className="hidden md:block" />
          <span className="text-clay-peach">Pakaian Lamamu.</span>
        </h1>

        {/* Descriptive Paragraph */}
        <p className="max-w-2xl text-lg md:text-xl text-clay-ink/70 leading-relaxed font-medium animate-slide-up [animation-delay:200ms] pointer-events-auto">
          Permak.in adalah asisten AI terpercaya untuk memberikan nafas baru pada pakaianmu. Biarkan kami menganalisis kerusakan, memberikan panduan repair DIY, atau menciptakan visual modifikasi remake yang trendi.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-2 mb-24 animate-slide-up [animation-delay:300ms] pointer-events-auto">
          {/* Primary CTA (Dark) */}
          <div onClick={() => document.getElementById('smart-canvas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="cursor-pointer">
            <ButtonWithIconDemo
              className="bg-clay-ink pointer-events-none"
              variant="outline"
              color="neutral"
              size="lg"
              text="Mulai sekarang"
            >
            </ButtonWithIconDemo>
          </div>
        </div>

      </div>

      {/* Fade out to bottom matching the layout's cream color */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-clay-cream via-clay-cream/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
