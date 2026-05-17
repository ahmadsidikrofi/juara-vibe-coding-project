import { Wand2, Sparkles } from "lucide-react";

export default function PromptSandbox({
  prompt,
  setPrompt,
  suggestions,
  onGenerate,
  isGenerating,
  userName
}) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-lg font-bold text-clay-ink mb-4 flex items-center gap-2">
        <Wand2 className="w-5 h-5 text-clay-sage" />
        Creative Prompt
      </label>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`Mau diubah jadi apa pakaianmu hari ini, ${userName || 'kreator'}? (Misal: Ubah pakaian ini jadi totebag estetik)`}
        className="w-full h-32 p-5 bg-clay-cream/50 rounded-2xl border-2 border-clay-sage/10 focus:border-clay-sage/40 focus:bg-white outline-none resize-none transition-all placeholder:text-clay-ink/30 text-clay-ink font-medium"
      />

      <div className="flex flex-wrap gap-2 mt-2">
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
        onClick={onGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="mt-2 w-full py-4 bg-clay-sage text-white font-bold rounded-2xl shadow-[inset_0px_-4px_8px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.1)] hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed cursor-pointer"
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
    </div>
  );
}
