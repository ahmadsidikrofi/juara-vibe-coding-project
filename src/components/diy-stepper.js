"use client";

import { useState } from "react";
import { Wrench, CheckCircle } from "lucide-react";

export function DiyStepper({ diy }) {
  const [completedSteps, setCompletedSteps] = useState([]);

  if (!diy || !diy.langkah) return null;

  const totalSteps = diy.langkah.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps.length / totalSteps) * 100 : 0;

  const toggleStep = (index) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((i) => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-clay-lavender/20 transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-clay-lavender/20 text-clay-lavender rounded-2xl flex items-center justify-center shrink-0">
          <Wrench className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-clay-ink">Panduan DIY</h3>
          <p className="text-sm font-semibold text-clay-ink/60">{diy.judul}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-clay-ink/5 h-2 rounded-full mb-8 overflow-hidden border border-clay-ink/10">
        <div 
          className="h-full bg-clay-sage transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="relative pl-4 md:pl-10">
        {/* Vertical Line */}
        <div className="absolute left-7 md:left-15 top-2 bottom-6 w-0.5 bg-clay-lavender/20 rounded-full"></div>

        <div className="space-y-8 relative">
          {diy.langkah.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            
            return (
              <div 
                key={i} 
                className="flex gap-6 relative z-10 items-center cursor-pointer group/step"
                onClick={() => toggleStep(i)}
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 text-xl md:text-2xl font-bold shadow-md ring-4 ring-white transition-all duration-500 ${isCompleted ? 'bg-[oklch(95%_0.02_150)] text-clay-sage shadow-clay-sage/30 scale-110' : 'bg-clay-lavender text-white shadow-clay-lavender/30 group-hover/step:scale-105'}`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5 md:w-6 md:h-6" /> : (i + 1)}
                </div>
                
                <div className={`flex-1 p-5 md:p-6 rounded-2xl transition-all duration-500 ${isCompleted ? 'bg-[oklch(95%_0.02_150)] border border-clay-sage/30 text-clay-ink/50' : 'bg-clay-lavender/5 border border-clay-lavender/10 text-clay-ink/80 group-hover/step:bg-white'}`}>
                  <span className={`leading-relaxed font-medium text-sm md:text-base transition-all duration-500 ${isCompleted ? 'line-through decoration-clay-ink/30' : ''}`}>
                    {step}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
