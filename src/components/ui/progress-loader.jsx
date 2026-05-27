"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * Reusable progress loader with elapsed time, animated progress bar,
 * and cycling status messages.
 *
 * @param {boolean} isActive - Whether the loader is active
 * @param {string[]} stages - Array of status messages to cycle through
 * @param {number} estimatedDurationMs - Total estimated duration in ms (default 15s)
 * @param {string} className - Additional class names for the container
 */
export function ProgressLoader({
  isActive,
  stages = ["Memproses..."],
  estimatedDurationMs = 15000,
  className = "",
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  // Reset state when loader activates
  useEffect(() => {
    if (isActive) {
      setElapsedSeconds(0);
      setProgress(0);
      setCurrentStageIndex(0);
      startTimeRef.current = Date.now();
    } else {
      startTimeRef.current = null;
    }
  }, [isActive]);

  // Smooth progress animation via requestAnimationFrame
  const animate = useCallback(() => {
    if (!startTimeRef.current) return;

    const elapsed = Date.now() - startTimeRef.current;
    const seconds = Math.floor(elapsed / 1000);
    setElapsedSeconds(seconds);

    // Asymptotic curve: rises fast at first, then slows — never reaches 100%
    // Formula: progress = 1 - e^(-t / tau)  where tau = estimatedDuration * 0.4
    const tau = estimatedDurationMs * 0.4;
    const raw = 1 - Math.exp(-elapsed / tau);
    // Cap at 95% so it never looks "done" prematurely
    setProgress(Math.min(raw * 100, 95));

    // Cycle through stages based on elapsed time
    if (stages.length > 1) {
      const stageInterval = estimatedDurationMs / stages.length;
      const idx = Math.min(
        Math.floor(elapsed / stageInterval),
        stages.length - 1
      );
      setCurrentStageIndex(idx);
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [estimatedDurationMs, stages]);

  useEffect(() => {
    if (isActive) {
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, animate]);

  if (!isActive) return null;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      {/* Status text */}
      <motion.p
        key={currentStageIndex}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3 }}
        className="text-center text-sm font-semibold text-clay-ink/70 tracking-wide"
      >
        {stages[currentStageIndex]}
      </motion.p>

      {/* Progress bar track */}
      <div className="relative w-full h-2 bg-clay-ink/8 rounded-full overflow-hidden">
        {/* Animated fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, #a4d4c5 0%, #8ec5b4 40%, #6db59f 100%)",
          }}
          transition={{ duration: 0.15, ease: "linear" }}
        />
        {/* Shimmer sweep effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Bottom row: label + elapsed time */}
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-semibold text-clay-ink/40 uppercase tracking-[1.5px]">
          Estimated Progress
        </span>
        <span className="text-[11px] font-bold text-clay-ink/50 tabular-nums">
          {formatTime(elapsedSeconds)}
        </span>
      </div>
    </div>
  );
}
