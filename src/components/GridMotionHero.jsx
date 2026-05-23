"use client";

import GridMotion from "./GridMotion";
import { Leaf } from "lucide-react";

// You can customize the GridMotion items here
const items = [
  'Item 1',
  <div key='jsx-item-1' className="text-sm">Custom JSX</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 2',
  <div key='jsx-item-2' className="text-sm">Custom JSX</div>,
  'Item 4',
  <div key='jsx-item-3' className="text-sm">Custom JSX</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 5',
  <div key='jsx-item-4' className="text-sm">Custom JSX</div>,
  'Item 7',
  <div key='jsx-item-5' className="text-sm">Custom JSX</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 8',
  <div key='jsx-item-6' className="text-sm">Custom JSX</div>,
  'Item 10',
  <div key='jsx-item-7' className="text-sm">Custom JSX</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 11',
  <div key='jsx-item-8' className="text-sm">Custom JSX</div>,
  'Item 13',
  <div key='jsx-item-9' className="text-sm">Custom JSX</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 14',
];

export function GridMotionHero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* GridMotion Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GridMotion items={items} gradientColor="rgba(255, 255, 255, 0.8)" />
      </div>

      {/* Foreground Text Overlay */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-8 text-center px-4 md:px-12 pointer-events-none mt-16 md:mt-0">
        
        {/* Dynamic Badge */}
        <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md px-6 py-2.5 rounded-full text-clay-sage font-extrabold text-sm tracking-wide uppercase shadow-lg border border-white/50 animate-slide-up pointer-events-auto">
          <Leaf className="w-4 h-4 drop-shadow-sm" />
          <span className="w-2 h-2 rounded-full bg-clay-pink animate-pulse" />
          Permak.in
        </div>

        {/* Massive H1 Heading */}
        <h1 className="text-6xl md:text-8xl font-extrabold text-clay-ink leading-[1.05] tracking-tight animate-slide-up [animation-delay:100ms] pointer-events-auto">
          Wujudkan Gaya Baru <br />
          <span className="relative inline-block mt-4 bg-gradient-to-r from-clay-sage to-clay-peach bg-clip-text text-transparent pb-4">
            Pakaian Lamamu
            <svg className="absolute w-full h-5 -bottom-2 left-0 text-clay-peach/40 drop-shadow-sm" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Descriptive Paragraph */}
        <p className="max-w-2xl text-xl md:text-2xl text-clay-ink/80 leading-relaxed font-medium animate-slide-up [animation-delay:200ms] mt-4 pointer-events-auto bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
          Jangan buang baju lamamu. Biarkan AI kami menganalisis kerusakan, memberikan panduan <strong>repair</strong> DIY, atau menciptakan visual modifikasi <strong>remake</strong> yang trendi.
        </p>

      </div>
    </div>
  );
}
