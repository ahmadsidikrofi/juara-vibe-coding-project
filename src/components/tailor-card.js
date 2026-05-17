"use client";

import { Scissors, Copy } from "lucide-react";
import toast from "react-hot-toast";
import ButtonShineHoverDemo from "./shadcn-space/radix/button/button-03";
import ButtonCopy from "./shadcn-space/radix/button/button-18";

export function TailorCard({ penjahit }) {
  if (!penjahit) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(penjahit.pesan);

  };

  return (
    <div className="bg-linear-to-r from-clay-sage/10 to-white rounded-3xl p-6 shadow-sm border border-clay-sage/20 group hover:shadow-md transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-clay-sage/20 text-clay-sage rounded-2xl flex items-center justify-center shrink-0">
          <Scissors className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-clay-ink">Instruksi Penjahit</h3>
          <p className="text-sm font-semibold text-clay-ink/60">{penjahit.judul}</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-clay-ink/5 italic text-sm text-clay-ink/80 mb-4 relative shadow-inner">
        <span className="text-4xl text-clay-sage/20 absolute -top-1 -left-1 font-serif">"</span>
        <span className="relative z-10 leading-relaxed">{penjahit.pesan}</span>
      </div>
      {/* <ButtonShineHoverDemo
        icon={<Copy className="w-4 h-4" />}
        text="Salin Teks Instruksi"

        className="w-full py-4 bg-clay-sage text-white font-bold rounded-xl shadow-md shadow-clay-sage/20 hover:bg-clay-sage/90 transition-colors flex items-center justify-center gap-2"
      >
      </ButtonShineHoverDemo> */}
      <ButtonCopy
        text="Salin instruksi"
        onClick={handleCopy}
      >

      </ButtonCopy>
    </div>
  );
}
