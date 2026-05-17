"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Wand2, Image as ImageIcon } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";

export default function RemakeStudioPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;
  const { user } = useAuth();

  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [history, setHistory] = useState([]);
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0); // 0: Preview Visual, 1: Langkah Pembuatan

  const suggestions = ["👕 Jadi Rompi", "👜 Jadi Tas", "🩳 Jadi Celana Pendek"];

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProjectData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    // Simulate AI generation process (2 seconds)
    setTimeout(() => {
      setIsGenerating(false);
      
      const newVersion = history.length + 1;
      const newHistoryItem = {
        version: newVersion,
        prompt: prompt,
        imageUrl: projectData?.imageUrl || "", // Placeholder using original image
        recipe: [
          "Siapkan bahan-bahan dan alat jahit dasar (gunting kain, jarum, benang, meteran).",
          `Tandai area pada pakaian asli yang akan dipotong sesuai dengan pola desain ${prompt}.`,
          "Potong kain perlahan mengikuti garis yang sudah ditandai.",
          "Jahit pinggiran kain agar serat tidak mudah terurai menggunakan teknik obras atau zig-zag.",
          "Tambahkan aksesoris pendukung jika diperlukan, lalu setrika hasil akhir agar terlihat rapi dan siap digunakan."
        ]
      };
      
      const updatedHistory = [...history, newHistoryItem];
      setHistory(updatedHistory);
      setActiveVersionIndex(updatedHistory.length - 1);
      setPrompt("");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-clay-cream p-6 md:p-12 pb-24 font-sans max-w-6xl mx-auto flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-clay-sage border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-clay-cream flex items-center justify-center font-sans">
        <p className="text-xl font-bold text-clay-ink">Pakaian tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-clay-cream p-6 md:p-12 font-sans text-clay-ink selection:bg-clay-sage selection:text-white pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-8 flex items-center gap-4"
      >
        <button
          onClick={() => router.push(`/blueprint/${projectId}`)}
          className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-clay-ink hover:text-clay-sage hover:-translate-x-1 shrink-0 cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Remake Studio: <span className="text-clay-sage">Upcycle Lab</span>
          </h1>
          <p className="text-clay-ink/60 font-medium mt-1">
            Visualisasikan gaya baru untuk pakaianmu.
          </p>
        </div>
      </motion.div>

      {/* Main Workspace */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Kolom Kiri: The Reference Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <div className="bg-white rounded-[32px] p-6 shadow-[inset_0px_2px_4px_rgba(255,255,255,0.8),0px_4px_12px_rgba(0,0,0,0.02)] border border-clay-sage/10 relative overflow-hidden group">
            <div className="inline-block px-4 py-1.5 bg-clay-sage/10 text-clay-sage font-bold text-xs uppercase tracking-widest rounded-full mb-4 border border-clay-sage/20 w-fit">
              Pakaian Asli
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-clay-ink/5 border border-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={projectData.imageUrl}
                alt="Pakaian Referensi"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>

        {/* Kolom Kanan: The Creative Sandbox */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="bg-white rounded-[32px] p-8 shadow-[inset_0px_2px_4px_rgba(255,255,255,0.8),0px_4px_12px_rgba(0,0,0,0.02)] border border-clay-sage/10 flex flex-col h-full">

            <label className="text-lg font-bold text-clay-ink mb-4 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-clay-sage" />
              Creative Prompt
            </label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Mau diubah jadi apa pakaianmu hari ini, ${user?.displayName?.split(' ')[0] || 'kreator'}? (Misal: Ubah pakaian ini jadi totebag estetik)`}
              className="w-full h-32 p-5 bg-clay-cream/50 rounded-2xl border-2 border-clay-sage/10 focus:border-clay-sage/40 focus:bg-white outline-none resize-none transition-all placeholder:text-clay-ink/30 text-clay-ink font-medium"
            />

            <div className="flex flex-wrap gap-2 mt-4">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(suggestion)}
                  className="px-4 py-2 bg-clay-pink/10 text-clay-ink/80 hover:text-clay-ink hover:bg-clay-pink/20 text-sm font-semibold rounded-xl border border-clay-pink/20 transition-colors cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="mt-6 w-full py-4 bg-clay-sage text-white font-bold rounded-2xl shadow-[inset_0px_-4px_8px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.1)] hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Membayangkan Desain...
                </>
              ) : (
                <>
                  Rancang Desain Baru <Sparkles className="w-5 h-5" />
                </>
              )}
            </button>

            {/* History Strip */}
            {history.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex flex-wrap gap-2 items-center"
              >
                <span className="text-sm font-bold text-clay-ink/50 mr-2">History:</span>
                {history.map((item, index) => {
                  const isActive = activeVersionIndex === index;
                  return (
                    <button
                      key={`history-${index}`}
                      onClick={() => setActiveVersionIndex(index)}
                      className={`px-4 py-2 text-sm font-bold rounded-full transition-all cursor-pointer ${
                        isActive
                          ? "bg-clay-sage/20 text-clay-sage border border-clay-sage/30 shadow-sm"
                          : "bg-transparent text-clay-ink/60 border border-clay-ink/10 hover:border-clay-sage/30 hover:bg-clay-sage/5"
                      }`}
                    >
                      Versi {item.version}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* Area Hasil Placeholder / Tabs View */}
            <div className="mt-8 flex-grow">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full min-h-[300px] bg-clay-sage/5 rounded-2xl border-2 border-dashed border-clay-sage/20 flex flex-col items-center justify-center text-center p-6 gap-4"
                  >
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-clay-sage animate-pulse" />
                    </div>
                    <p className="font-bold text-clay-ink/70">AI sedang memproses imajinasimu...</p>
                  </motion.div>
                ) : history.length > 0 ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full min-h-[300px] flex flex-col"
                  >
                    {/* Tabs Header */}
                    <div className="flex gap-2 mb-4 p-1.5 bg-clay-ink/5 rounded-xl w-fit">
                      {["🖼️ Preview Visual", "📜 Langkah Pembuatan"].map((tab, idx) => (
                        <button
                          key={`tab-${idx}`}
                          onClick={() => setActiveTab(idx)}
                          className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                            activeTab === idx
                              ? "bg-white text-clay-ink shadow-sm"
                              : "text-clay-ink/50 hover:text-clay-ink"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Tabs Content */}
                    <div className="flex-grow relative overflow-hidden bg-white rounded-2xl border border-clay-ink/10 p-6 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.02)]">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={`${activeTab}-${activeVersionIndex}`}
                          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                          transition={{ duration: 0.2 }}
                          className="w-full h-full"
                        >
                          {activeTab === 0 ? (
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden bg-clay-ink/5 border border-clay-ink/10 shadow-inner">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={history[activeVersionIndex].imageUrl}
                                  alt={`Desain Versi ${history[activeVersionIndex].version}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p className="text-sm font-semibold text-clay-ink/70 text-center bg-clay-sage/10 px-5 py-2.5 rounded-full border border-clay-sage/20">
                                <span className="text-clay-sage">Prompt:</span> {history[activeVersionIndex].prompt}
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-5">
                              <h3 className="text-xl font-bold text-clay-ink">Instruksi Pembuatan (Versi {history[activeVersionIndex].version})</h3>
                              <ul className="space-y-4">
                                {history[activeVersionIndex].recipe.map((step, idx) => (
                                  <li key={`recipe-${activeVersionIndex}-${idx}`} className="flex gap-4 items-start bg-clay-ink/5 p-4 rounded-2xl">
                                    <div className="w-8 h-8 rounded-full bg-clay-sage/20 text-clay-sage flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm shadow-inner">
                                      {idx + 1}
                                    </div>
                                    <p className="text-clay-ink/80 leading-relaxed font-medium pt-1">{step}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full min-h-[300px] bg-clay-cream/30 rounded-2xl border-2 border-dashed border-clay-ink/10 flex flex-col items-center justify-center text-center p-6 gap-4"
                  >
                    <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center text-clay-ink/20 shadow-inner">
                      <Wand2 className="w-8 h-8" />
                    </div>
                    <p className="font-medium text-clay-ink/50 max-w-[250px]">
                      Masukkan ide kreatifmu di atas untuk mulai merancang ulang pakaian ini... ✨
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
