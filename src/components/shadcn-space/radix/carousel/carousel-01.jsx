"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ShieldAlert } from "lucide-react";

export default function BlueprintCarousel({ slides = [], onSlideChange, kerusakan = [] }) {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const handleSelect = useCallback(() => {
    if (!api) return;
    const index = api.selectedScrollSnap();
    setCurrent(index);
    onSlideChange?.(index);
  }, [api, onSlideChange]);

  useEffect(() => {
    if (!api) return;
    handleSelect();
    api.on("select", handleSelect);
    api.on("scroll", () => {
      setScrollProgress(api.scrollProgress());
    });
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, handleSelect]);

  if (!slides.length) return null;

  return (
    <div className="flex flex-col gap-4" ref={containerRef}>
      {/* Main Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ loop: false }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative rounded-[28px] overflow-hidden aspect-3/4 bg-clay-ink/5 border border-white/40 shadow-[inset_0px_2px_4px_rgba(255,255,255,0.6),0px_16px_40px_rgba(0,0,0,0.08)] group">
                {/* Parallax image — shifts horizontally based on scroll progress */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.url}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{
                    transform: `translateX(${(scrollProgress - index / Math.max(slides.length - 1, 1)) * 24}px) scale(1.04)`,
                    transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                />

                {/* Damage Pins — only on repair slides */}
                {slide.type === "repair" && kerusakan.map((k, i) => {
                  const x = k.koordinat?.x || 50;
                  const y = k.koordinat?.y || 50;
                  return (
                    <div
                      key={`pin-${i}`}
                      className="absolute z-20"
                      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-clay-pink/50 rounded-full animate-ping absolute inset-0" />
                        <div
                          className="w-8 h-8 bg-clay-pink/80 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white backdrop-blur-sm cursor-help hover:scale-110 transition-transform"
                          title={k.deskripsi}
                        >
                          <ShieldAlert className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Slide Label Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={cn(
                    "text-xs font-black uppercase tracking-[0.15em] px-4 py-2 rounded-full border shadow-sm backdrop-blur-md",
                    slide.type === "remake"
                      ? "bg-clay-lavender/80 text-clay-ink border-clay-lavender/30"
                      : "bg-white/70 text-clay-ink border-white/40"
                  )}>
                    {slide.type === "remake" ? "✨ Remake" : "📸 Asli"}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {slides.length > 1 && (
          <>
            <CarouselPrevious className="cursor-pointer left-2 bg-white/80 backdrop-blur-sm hover:bg-white border-white/40 shadow-md" />
            <CarouselNext className="cursor-pointer right-2 bg-white/80 backdrop-blur-sm hover:bg-white border-white/40 shadow-md" />
          </>
        )}
      </Carousel>

      {/* Thumbnail Row */}
      {slides.length > 1 && (
        <div className="flex gap-3 justify-center px-1">
          {slides.map((slide, index) => {
            const isActive = current === index;
            return (
              <button
                key={`thumb-${slide.id}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "relative rounded-2xl overflow-hidden shrink-0 transition-all duration-300 cursor-pointer",
                  isActive
                    ? "w-20 h-20 ring-2 ring-clay-sage ring-offset-2 ring-offset-clay-cream shadow-[0px_4px_12px_rgba(136,171,142,0.4)] scale-105"
                    : "w-16 h-16 ring-1 ring-clay-ink/10 opacity-60 hover:opacity-90 hover:scale-105"
                )}
                aria-label={`Lihat ${slide.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.url}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-clay-sage/10" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
