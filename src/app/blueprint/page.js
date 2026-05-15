"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Droplets, Leaf, Scissors, Wrench, ShieldAlert, CheckCircle2, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { saveProject } from "@/lib/projectService";
import { useAuth } from "@/context/auth-context";

export default function BlueprintPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  
  // Auto-save states
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  // Generate Unique ID consistently
  const uniqueId = useMemo(() => `#PRMK-${Math.floor(Math.random() * 90000) + 10000}`, []);

  useEffect(() => {
    const storedData = sessionStorage.getItem("blueprintData");
    if (!storedData) {
      router.push("/");
      return;
    }
    try {
      setData(JSON.parse(storedData));
    } catch (e) {
      router.push("/");
    }
  }, [router]);

  // Auto-save logic
  useEffect(() => {
    if (data && user && !hasSaved && !isSaving) {
      const autoSave = async () => {
        setIsSaving(true);
        try {
          await saveProject(user.uid, data.image, data.analysis, uniqueId);
          setHasSaved(true);
        } catch (error) {
          console.error("Auto-save failed:", error);
        } finally {
          setIsSaving(false);
        }
      };
      
      autoSave();
    }
  }, [data, user, hasSaved, isSaving, uniqueId]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-clay-cream">
        <div className="w-12 h-12 border-4 border-clay-sage border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { image, analysis } = data;

  return (
    <div className="min-h-screen bg-clay-cream p-6 md:p-12 font-sans text-clay-ink selection:bg-clay-sage selection:text-white pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-8 flex items-center gap-4"
      >
        <button
          onClick={() => router.push("/")}
          className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-clay-ink hover:text-clay-sage hover:-translate-x-1"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Project Blueprint: <span className="text-clay-sage">{analysis.jenisPakaian || "Pakaian"}</span>
          </h1>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-2">
            <p className="text-clay-ink/60 text-lg font-medium">Unique ID: {uniqueId}</p>
            
            <AnimatePresence mode="wait">
              {isSaving && (
                <motion.div 
                  key="saving"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-clay-sage/10 text-clay-sage px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 border border-clay-sage/20 shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-clay-sage animate-ping"></div>
                  ✨ Mengamankan pakaianmu...
                </motion.div>
              )}
              {hasSaved && (
                <motion.div 
                  key="saved"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 border border-green-200 shadow-sm"
                >
                  ✅ Tersimpan di My Wardrobe
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT: Visual Evidence */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="glass rounded-3xl p-4 shadow-xl border border-white/50 relative overflow-hidden group">
            <div className="relative rounded-2xl overflow-hidden aspect-3/4 bg-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Pakaian"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Pulse overlay for damages */}
              {analysis.kerusakan?.map((k, i) => {
                const x = k.koordinat?.x || 50;
                const y = k.koordinat?.y || 50;
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-clay-pink/50 rounded-full animate-ping absolute inset-0"></div>
                      <div className="w-8 h-8 bg-clay-pink/80 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white backdrop-blur-sm cursor-help hover:scale-110 transition-transform" title={k.deskripsi}>
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eco Impact Box */}
          {analysis.ecoImpact && (
            <div className="bg-linear-to-br from-clay-sage/20 to-clay-sage/5 rounded-3xl p-6 border border-clay-sage/20 shadow-sm relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-clay-sage/10 transform rotate-12">
                <Leaf className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
                <Leaf className="w-5 h-5 text-clay-sage" />
                Eco-Impact
              </h3>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl">
                  <Droplets className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-sm font-medium text-clay-ink/60">Air Dihemat</p>
                  <p className="text-xl font-extrabold text-clay-ink">{analysis.ecoImpact.air || '-'}</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl">
                  <Leaf className="w-6 h-6 text-green-500 mb-2" />
                  <p className="text-sm font-medium text-clay-ink/60">Karbon Dicegah</p>
                  <p className="text-xl font-extrabold text-clay-ink">{analysis.ecoImpact.karbon || '-'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Instruksi Penjahit */}
          {analysis.penjahit && (
            <div className="bg-linear-to-r from-clay-sage/10 to-white rounded-3xl p-6 shadow-sm border border-clay-sage/20 group hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-clay-sage/20 text-clay-sage rounded-2xl flex items-center justify-center shrink-0">
                  <Scissors className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-clay-ink">Instruksi Penjahit</h3>
                  <p className="text-sm font-semibold text-clay-ink/60">{analysis.penjahit.judul}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-clay-ink/5 italic text-sm text-clay-ink/80 mb-4 relative shadow-inner">
                <span className="text-4xl text-clay-sage/20 absolute -top-1 -left-1 font-serif">"</span>
                <span className="relative z-10 leading-relaxed">{analysis.penjahit.pesan}</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(analysis.penjahit.pesan);
                  toast.success("Teks instruksi berhasil disalin!");
                }}
                className="w-full py-3 bg-clay-sage text-white font-bold rounded-xl shadow-md shadow-clay-sage/20 hover:bg-clay-sage/90 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Salin Teks Instruksi
              </button>
            </div>
          )}
        </motion.div>

        {/* RIGHT: Technical Specs & Action Hub */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Technical Specs */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-clay-ink/5">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-clay-ink/10">Technical Specs</h2>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
              <div>
                <p className="text-sm font-medium text-clay-ink/50 uppercase tracking-wider mb-1">Jenis</p>
                <p className="text-lg font-semibold">{analysis.jenisPakaian || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-clay-ink/50 uppercase tracking-wider mb-1">Bahan</p>
                <p className="text-lg font-semibold">{analysis.bahan || '-'}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-3">
                <p className="text-sm font-medium text-clay-ink/50 uppercase tracking-wider">Skor Kesulitan</p>
                <span className="font-bold text-clay-pink">{analysis.skorKesulitan}/10</span>
              </div>
              <div className="w-full h-3 bg-clay-ink/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-clay-pink rounded-full transition-all duration-1000"
                  style={{ width: `${(analysis.skorKesulitan / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-clay-ink/50 uppercase tracking-wider mb-3">Daftar Kerusakan</p>
              <div className="space-y-3">
                {analysis.kerusakan?.map((k, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 bg-clay-ink/5 rounded-2xl">
                    <div className="w-8 h-8 rounded-full bg-clay-pink/20 text-clay-pink flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold">{k.lokasi}</h4>
                      <p className="text-clay-ink/70 leading-relaxed text-sm mt-1">{k.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-clay-sage/10 rounded-2xl border border-clay-sage/20 flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-clay-sage shrink-0" />
              <div>
                <h4 className="font-bold text-clay-sage mb-1">Rekomendasi Utama</h4>
                <p className="text-sm leading-relaxed text-clay-ink/80">{analysis.rekomendasi}</p>
              </div>
            </div>
          </div>

          {/* Panduan DIY (Roadmap Style) */}
          {analysis.diy && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-clay-lavender/20 group hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-clay-lavender/20 text-clay-lavender rounded-2xl flex items-center justify-center shrink-0">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-clay-ink">Panduan DIY</h3>
                  <p className="text-sm font-semibold text-clay-ink/60">{analysis.diy.judul}</p>
                </div>
              </div>

              <div className="relative pl-4 md:pl-10">
                {/* Vertical Line */}
                <div className="absolute left-7 md:left-15 top-2 bottom-6 w-0.5 bg-clay-lavender/20 rounded-full"></div>

                <div className="space-y-8 relative">
                  {analysis.diy.langkah?.map((step, i) => (
                    <div key={i} className="flex gap-6 relative z-10 items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-clay-lavender text-white flex items-center justify-center shrink-0 text-xl md:text-2xl font-bold shadow-md shadow-clay-lavender/30 ring-4 ring-white">
                        {i + 1}
                      </div>
                      <div className="flex-1 bg-clay-lavender/5 p-5 md:p-6 rounded-2xl border border-clay-lavender/10 group-hover:bg-white transition-colors">
                        <span className="text-clay-ink/80 leading-relaxed font-medium text-sm md:text-base">{step}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
