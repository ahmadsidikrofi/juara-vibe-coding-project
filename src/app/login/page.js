"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const slides = [
  {
    before: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
    after: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
    title: "Proyek Denim Upcycle",
    desc: "Mengubah celana jeans lama yang robek menjadi denim jacket modis beraksen patchwork.",
  },
  {
    before: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    after: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    title: "Redesain Kemeja Polos",
    desc: "Menyulap kemeja putih membosankan menjadi crop shirt asimetris dengan sulaman estetik.",
  },
  {
    before: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
    after: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1000&q=80",
    title: "Seni Sulam Penutup Celah",
    desc: "Menutupi noda atau lubang pada sweater rajut rajutan tangan menggunakan pola bunga handmade.",
  },
];

const benefits = [
  {
    icon: "✨",
    color: "bg-clay-sage/10 text-clay-sage",
    title: "Diagnosis AI Instan",
    desc: "Deteksi titik kerusakan pada baju secara akurat menggunakan kamera AI."
  },
  {
    icon: "🎨",
    color: "bg-clay-pink/10 text-clay-pink",
    title: "Remake Studio Kreatif",
    desc: "Visualisasikan desain modifikasi baju bekas sebelum pengerjaan."
  },
  {
    icon: "🌍",
    color: "bg-clay-lavender/10 text-clay-lavender",
    title: "Sustainable Fashion Tracker",
    desc: "Pantau kontribusi penghematan air & emisi karbon dari upcycling."
  }
];

export default function LoginPage() {
  const { user, loginWithGoogle } = useAuth();
  const router = useRouter();

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      router.push("/my-wardrobe");
    }
  }, [user, router]);

  // Visual Storytelling: State for slider ticks
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentSlideIdx = Math.floor(tick / 2) % slides.length;
  const showAfter = tick % 2 === 1;

  // Entrance Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="-mt-20 h-screen lg:grid lg:grid-cols-2 bg-clay-cream text-clay-ink selection:bg-clay-sage/30 overflow-hidden"
    >
      {/* LEFT SIDE: Visual Storytelling (Desktop Only) */}
      <div className="hidden lg:block relative overflow-hidden h-full bg-clay-ink z-10">
        {/* Slider Images */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => {
            const isActive = index === currentSlideIdx;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* Before Image */}
                <img
                  src={slide.before}
                  alt={`Sebelum - ${slide.title}`}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                />
                
                {/* After Image (Fades in over the Before image) */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    showAfter ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={slide.after}
                    alt={`Sesudah - ${slide.title}`}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                  />
                </div>

                {/* Top Floating Badge for Process Indicators */}
                <div className="absolute top-8 left-8 z-30 flex items-center gap-2">
                  <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-sm ${
                    !showAfter
                      ? "bg-clay-pink text-white scale-105"
                      : "bg-white/30 text-white/90 backdrop-blur-md"
                  }`}>
                    Sebelum
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-sm ${
                    showAfter
                      ? "bg-clay-sage text-white scale-105"
                      : "bg-white/30 text-white/90 backdrop-blur-md"
                  }`}>
                    Hasil Remake
                  </div>
                </div>

                {/* Project Description Box */}
                <div className="absolute top-8 right-8 z-30 max-w-[280px] bg-black/35 glass rounded-[20px] p-4 text-white shadow-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-clay-peach animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-clay-peach">
                      Proses Kreatif
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm tracking-tight text-white mb-1">
                    {slide.title}
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed font-medium">
                    {slide.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-clay-ink via-clay-ink/40 to-transparent z-20 pointer-events-none" />

        {/* Storyteller Bottom Content */}
        <div className="absolute bottom-12 left-12 right-12 z-30 flex flex-col gap-4">
          <div className="w-fit flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-white/10 glass border border-white/20 shadow-md">
            <span>🌍 10.000+ Liter Air Diselamatkan</span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight max-w-lg drop-shadow-sm">
            Mulai perjalanan upcycling pakaianmu.
          </h2>
          <p className="text-white/70 text-sm font-medium max-w-md">
            Ubah limbah tekstil menjadi karya fesyen berkelanjutan dengan asisten AI Permak.in.
          </p>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 mt-4">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentSlideIdx ? "w-8 bg-clay-sage" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive & Warm Auth Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden bg-clay-cream h-full">
        
        {/* Glow Blobs in Background */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-clay-sage/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-clay-pink/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[200px] h-[200px] bg-clay-lavender/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Auth Card */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-md bg-white border border-clay-ink/10 rounded-[32px] p-8 sm:p-10 shadow-[0_16px_40px_-12px_rgba(21,24,38,0.05),inset_0_2px_4px_rgba(255,255,255,0.8)] relative z-10"
        >
          {/* Header */}
          <div className="text-center sm:text-left mb-8">
            <h1 className="text-3xl font-extrabold text-clay-ink tracking-tight mb-2">
              Selamat Datang di Lemari Barumu ✨
            </h1>
            <p className="text-sm font-semibold text-clay-ink/50">
              Masuk untuk mendiagnosis dan meremake pakaianmu.
            </p>
          </div>

          {/* Primary Action: Google Sign-in */}
          <Button
            type="button"
            onClick={loginWithGoogle}
            className="w-full h-14 bg-white border border-clay-ink/10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 active:translate-y-px transition-all duration-300 ease-out flex items-center justify-center font-bold text-clay-ink cursor-pointer hover:bg-clay-cream/30 gap-3 text-base"
          >
            {/* Google Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.69c-.29 1.5-.1.86-1.08 2.51v2.08h1.66c1.65-1.53 2.61-3.77 2.61-6.42z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.88-3.01c-1.08.72-2.47 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.97H1.54v3.12C3.52 21.36 7.48 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.25 14.26c-.25-.72-.39-1.49-.39-2.26s.14-1.54.39-2.26V6.62H1.54C.56 8.58 0 10.74 0 13s.56 4.42 1.54 6.38l3.71-3.12z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.48 0 3.52 2.64 1.54 6.62l3.71 3.12c.95-2.85 3.61-4.99 6.75-4.99z"
              />
            </svg>
            <span>Masuk dengan Google</span>
          </Button>

          {/* Value Propositions / Why Join Permak.in */}
          <div className="mt-8 pt-8 border-t border-clay-ink/5 space-y-4">
            <h3 className="text-xs font-black text-clay-ink/40 uppercase tracking-widest pl-1 mb-2">
              Mengapa Gabung Permak.in?
            </h3>
            {benefits.map((b, idx) => (
              <div key={idx} className="flex gap-4 items-start p-3 hover:bg-clay-ink/5 rounded-2xl transition-all duration-300 ease-out">
                <div className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center font-bold text-lg shrink-0 shadow-inner`}>
                  {b.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-clay-ink">{b.title}</h4>
                  <p className="text-xs text-clay-ink/60 mt-0.5 leading-relaxed font-semibold">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}
