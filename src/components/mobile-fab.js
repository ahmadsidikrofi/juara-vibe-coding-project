"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SmartCanvas } from "./smart-canvas";

export function MobileFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="md:hidden fixed bottom-6 right-6 z-50 bg-clay-ink text-white shadow-xl rounded-full p-4 flex items-center justify-center gap-2 font-bold transform active:scale-95 transition-transform cursor-pointer"
          aria-label="Scan Baju"
        >
          <Plus className="w-5 h-5" />
          <span>Scan</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-xl p-4 md:p-8 bg-white/95 backdrop-blur-xl border border-clay-ink/10 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogTitle className="font-bold text-lg hidden">Scan Baju</DialogTitle>
        <div className="pt-4">
          <SmartCanvas />
        </div>
      </DialogContent>
    </Dialog>
  );
}
