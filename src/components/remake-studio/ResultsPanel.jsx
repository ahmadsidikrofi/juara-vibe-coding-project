import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, BookmarkCheck } from "lucide-react";
import { ProgressLoader } from "@/components/ui/progress-loader";

export default function ResultsPanel({
  isGenerating,
  history,
  activeVersionIndex,
  activeTab,
  setActiveTab,
  onSave,
  isSaving
}) {
  // Helper to parse **bold** text from AI
  const renderStepText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-clay-ink font-extrabold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="mt-8 flex-grow">
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.div
            key="generating"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-full min-h-[300px] bg-gradient-to-br from-clay-sage/5 via-white to-clay-lavender/5 rounded-2xl border border-clay-sage/15 flex flex-col items-center justify-center text-center p-8 gap-6 relative overflow-hidden"
          >
            {/* Decorative floating orbs */}
            <motion.div
              className="absolute w-32 h-32 bg-clay-sage/15 rounded-full filter blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 40, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-24 h-24 bg-clay-pink/15 rounded-full filter blur-2xl"
              animate={{
                scale: [1, 1.4, 1],
                x: [0, -30, 0],
                y: [0, 25, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Progress card */}
            <motion.div
              className="relative z-10 w-full max-w-xs px-6 py-6 bg-white/85 border border-white/60 shadow-lg shadow-clay-ink/5 rounded-2xl backdrop-blur-xl"
              initial={{ scale: 0.92, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Spinning icon */}
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 bg-clay-sage/10 rounded-full flex items-center justify-center border border-clay-sage/15">
                  <Sparkles className="w-7 h-7 text-clay-sage animate-pulse" />
                </div>
              </div>

              <ProgressLoader
                isActive={isGenerating}
                stages={[
                  "Membaca desain pakaian...",
                  "Merancang ulang dengan AI...",
                  "Membuat visual preview...",
                  "Menyusun instruksi pembuatan...",
                  "Hampir selesai...",
                ]}
                estimatedDurationMs={25000}
              />
            </motion.div>
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
                  className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${activeTab === idx
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
                      <div className="w-full max-w-[280px] aspect-3/4 rounded-2xl overflow-hidden bg-clay-ink/5 border border-clay-ink/10 shadow-inner">
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
                            <p className="text-clay-ink/80 leading-relaxed font-medium pt-1">
                              {renderStepText(step)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Save Button */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={onSave}
              disabled={isSaving}
              className="mt-5 w-full py-4 bg-clay-sage text-white font-bold rounded-2xl shadow-[inset_0px_-4px_8px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.1)] hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-5 h-5" />
                  Simpan Desain ke Blueprint
                </>
              )}
            </motion.button>
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
              Pilih chip rekomendasi atau tulis resep karyamu sendiri!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
