"use client";

import { Scissors, Copy } from "lucide-react";
import toast from "react-hot-toast";

export function TailorCard({ penjahit }) {
  if (!penjahit) return null;

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
      <button
        onClick={() => {
          navigator.clipboard.writeText(penjahit.pesan);
          toast.success("Instruksi disalin! Siap dikirim ke penjahit kesayanganmu", {
            duration: 5000
          });
        }}
        className="w-full py-3 bg-clay-sage text-white font-bold rounded-xl shadow-md shadow-clay-sage/20 hover:bg-clay-sage/90 transition-colors flex items-center justify-center gap-2"
      >
        <Copy className="w-4 h-4" />
        Salin Teks Instruksi
      </button>
    </div>
  );
}
