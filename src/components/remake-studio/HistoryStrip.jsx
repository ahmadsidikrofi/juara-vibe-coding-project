import { motion } from "framer-motion";

export default function HistoryStrip({
  history,
  activeVersionIndex,
  setActiveVersionIndex
}) {
  if (history.length === 0) return null;

  return (
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
  );
}
