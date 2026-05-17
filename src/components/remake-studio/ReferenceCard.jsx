import { motion } from "framer-motion";

export default function ReferenceCard({ imageUrl }) {
  return (
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

        <div className="relative rounded-2xl overflow-hidden aspect-3/4 bg-clay-ink/5 border border-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Pakaian Referensi"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </motion.div>
  );
}
