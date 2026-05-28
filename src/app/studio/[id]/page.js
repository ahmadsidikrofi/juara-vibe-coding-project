"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";

import ReferenceCard from "@/components/remake-studio/ReferenceCard";
import PromptSandbox from "@/components/remake-studio/PromptSandbox";
import HistoryStrip from "@/components/remake-studio/HistoryStrip";
import ResultsPanel from "@/components/remake-studio/ResultsPanel";
import toast from "react-hot-toast";

// Helper untuk kompresi base64 agar tidak melampaui limit 1MB Firestore
const compressImageBase64 = (base64Str, maxWidth = 800, quality = 0.6) => {
  return new Promise((resolve) => {
    if (!base64Str || !base64Str.startsWith('data:image')) {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(base64Str); // Fallback ke asli jika gagal
    img.src = base64Str;
  });
};

export default function RemakeStudioPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;
  const { user } = useAuth();

  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
          const docData = docSnap.data();
          setProjectData(docData);

          // Load existing remake history from database
          let existingHistory = [];

          if (docData.remakeHistory && Array.isArray(docData.remakeHistory)) {
            // New format: array of remakes
            existingHistory = docData.remakeHistory.map((item, idx) => ({
              version: idx + 1,
              prompt: item.prompt || item.title || `Versi ${idx + 1}`,
              imageUrl: item.imageUrl || "",
              title: item.title || `Versi ${idx + 1}`,
              recipe: item.recipe || [],
            }));
          } else if (docData.remake && docData.remake.imageUrl) {
            // Backward compat: migrate old single-object format
            existingHistory = [{
              version: 1,
              prompt: docData.remake.title || "Versi 1",
              imageUrl: docData.remake.imageUrl,
              title: docData.remake.title || "Versi 1",
              recipe: docData.remake.recipe || [],
            }];
          }

          if (existingHistory.length > 0) {
            setHistory(existingHistory);
            setActiveVersionIndex(existingHistory.length - 1);
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch("/api/remake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          originalImageUrl: projectData?.imageUrl,
          userPrompt: prompt
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Terjadi kesalahan pada server");
      }

      if (data.error) {
        // AI specifically rejected the prompt gracefully
        toast.error(`Penolakan Sistem: ${data.error}`, {
          position: "top-center",
          duration: 5000,
        })
        return
      }

      const newVersion = history.length + 1;
      const newHistoryItem = {
        version: newVersion,
        prompt: prompt,
        imageUrl: data.generatedImageUrl || projectData?.imageUrl || "",
        title: data.title || prompt,
        recipe: data.recipe || ["Gagal memuat resep"]
      };

      const updatedHistory = [...history, newHistoryItem];
      setHistory(updatedHistory);
      setActiveVersionIndex(updatedHistory.length - 1);
      setPrompt("");
    } catch (error) {
      console.error("Generate Error:", error);
      const msg = error.message || "";
      if (msg.includes("spending cap") || msg.includes("spending-cap") || msg.includes("429") || msg.includes("Quota") || msg.includes("quota") || msg.includes("limit")) {
        toast.error("Ups... kuota penggunaan AI kamu sudah habis nih. Silahkan coba lagi besok yaa 😊", {
          position: "top-center",
          duration: 7000,
        });
      } else {
        toast.error(error.message || "Maaf, ternyata permintaanmu gagal diproses. Coba lagi yukk", {
          position: "top-center",
          duration: 5000,
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRemake = async () => {
    if (history.length === 0) return;
    const activeVersion = history[activeVersionIndex];
    setIsSaving(true);
    try {
      const docRef = doc(db, "projects", projectId);

      // Build the full remakeHistory array and compress images to avoid Firestore 1MB limit
      const remakeHistoryToSave = await Promise.all(history.map(async (item) => ({
        imageUrl: await compressImageBase64(item.imageUrl, 800, 0.6),
        recipe: item.recipe,
        title: item.title || item.prompt,
        prompt: item.prompt,
      })));

      const activeCompressedImageUrl = remakeHistoryToSave[activeVersionIndex].imageUrl;

      await updateDoc(docRef, {
        // Keep legacy field pointing to latest for backward compat
        remake: {
          imageUrl: activeCompressedImageUrl,
          recipe: activeVersion.recipe,
          title: activeVersion.title || activeVersion.prompt,
        },
        // Full history array
        remakeHistory: remakeHistoryToSave,
      });
      toast.success("Desain berhasil disimpan ke Blueprint 🎨", {
        duration: 5000,
      })
      router.push(`/blueprint/${projectId}`);
    } catch (error) {
      console.error("Save Remake Error:", error);
      toast.error("Gagal menyimpan desain. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
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
    <div className="min-h-screen mt-18 bg-clay-cream p-6 md:p-12 font-sans text-clay-ink selection:bg-clay-sage selection:text-white pb-24">
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

        {/* Kolom Kiri: Reference Card */}
        <ReferenceCard imageUrl={projectData.imageUrl} />

        {/* Kolom Kanan: The Creative Sandbox */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="bg-white rounded-[32px] p-8 shadow-[inset_0px_2px_4px_rgba(255,255,255,0.8),0px_4px_12px_rgba(0,0,0,0.02)] border border-clay-sage/10 flex flex-col h-full">

            {/* SoC Sandbox Prompt Input */}
            <PromptSandbox
              prompt={prompt}
              setPrompt={setPrompt}
              suggestions={suggestions}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              userName={user?.displayName?.split(' ')[0]}
            />

            {/* SoC History Version Strip */}
            <HistoryStrip
              history={history}
              activeVersionIndex={activeVersionIndex}
              setActiveVersionIndex={setActiveVersionIndex}
            />

            {/* SoC Dynamic Results Tabs Panel */}
            <ResultsPanel
              isGenerating={isGenerating}
              history={history}
              activeVersionIndex={activeVersionIndex}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onSave={handleSaveRemake}
              isSaving={isSaving}
            />

          </div>
        </motion.div>

      </div>
    </div>
  );
}
