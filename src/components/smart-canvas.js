"use client";

import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ButtonRipleSpotlight from "./shadcn-space/radix/button/button-16";
import { ProgressLoader } from "./ui/progress-loader";

// Helper untuk kompresi base64 agar aman disimpan di Firestore (limit 1MB)
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

export function SmartCanvas() {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingText, setAnalyzingText] = useState("Menganalisis...");
  const inputRef = useRef(null);
  const router = useRouter();

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle click upload
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process and preview the file
  const handleFile = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Ups... Format file tidak didukung. Fotonya pake format JPG atau PNG yaa 😊", {
        position: "top-center",
        duration: 5000
      });
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      toast.error("Ups... Ukuran gambar melebihi batas 1MB. Silahkan kompres foto kamu yaa 😊", {
        position: "top-center",
        duration: 5000
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
  };

  // Clear the selected image
  const clearImage = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setAnalyzingText("Menganalisis...");
    if (inputRef.current) inputRef.current.value = "";
  };

  // Handle analyze
  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalyzingText("Menganalisis...");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Terjadi kesalahan saat menganalisis");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      let currentAnalyzingText = "Menganalisis Vibe...";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        if (currentAnalyzingText === "Menganalisis Vibe...") {
          const match = fullText.match(/"jenisPakaian"\s*:\s*"([^"]+)"/i);
          if (match && match[1]) {
            currentAnalyzingText = `Menganalisis ${match[1]}...`;
            setAnalyzingText(currentAnalyzingText);
          }
        }
      }

      try {
        const data = JSON.parse(fullText);

        if (data.isValid === false) {
          toast.error(data.alasan || "Gambar tidak dikenali sebagai pakaian.", {
            duration: 5000,
            position: 'top-center'
          })
          setIsAnalyzing(false);
          setAnalyzingText("Menganalisis...");
          return;
        }

        if (data.isValid === true && data.isDamaged === false) {
          toast.success(data.pesan || "Pakaian terlihat sempurna!", {
            duration: 5000,
            position: 'top-center'
          });
          setIsAnalyzing(false);
          setAnalyzingText("Menganalisis...");
          return;
        }

        // Convert file to base64 so it survives hard refresh on /blueprint
        const readerBase64 = new FileReader();
        readerBase64.readAsDataURL(selectedFile);
        readerBase64.onload = async () => {
          const rawBase64 = readerBase64.result;
          const compressedBase64 = await compressImageBase64(rawBase64, 800, 0.6);

          sessionStorage.setItem("blueprintData", JSON.stringify({
            image: compressedBase64,
            analysis: data
          }));
          router.push('/blueprint');
        };

      } catch (parseError) {
        console.error("Failed to parse JSON stream:", fullText);
        throw new Error("Gagal membaca respons dari AI.");
      }

    } catch (error) {
      console.error("Error analysis:", error);
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
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 animate-fade-in">
      <div
        className={`relative flex flex-col items-center justify-center w-full min-h-[380px] p-8 transition-all duration-500 ease-out rounded-3xl overflow-hidden glass cursor-pointer group ${dragActive
          ? 'border-2 border-clay-sage bg-clay-sage/5 scale-[1.02] shadow-2xl shadow-clay-sage/20'
          : 'border-2 border-dashed border-clay-ink/15 bg-gradient-to-br from-clay-cream to-clay-lavender/5 hover:border-clay-sage/50 hover:shadow-xl hover:bg-white/40'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !previewUrl && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleChange}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative w-full h-full flex flex-col items-center animate-slide-up">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-md group/img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Preview Pakaian"
                className="w-full h-auto max-h-[400px] object-cover rounded-2xl transition-transform duration-700 group-hover/img:scale-105"
              />
              {!isAnalyzing && (
                <div className="absolute inset-0 bg-clay-ink/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button
                    onClick={(e) => { e.stopPropagation(); clearImage(); }}
                    className="bg-white/90 text-clay-ink p-4 rounded-full hover:bg-clay-pink hover:text-white transition-all transform hover:scale-110 hover:rotate-90 shadow-xl"
                    aria-label="Hapus gambar"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}

              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/50 backdrop-blur-xl overflow-hidden rounded-2xl"
                >
                  {/* Ambient blobs */}
                  <motion.div
                    className="absolute w-48 h-48 bg-clay-sage/30 rounded-full mix-blend-multiply filter blur-2xl opacity-60"
                    animate={{
                      scale: [1, 1.2, 1],
                      x: [0, 30, 0],
                      y: [0, -30, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute w-48 h-48 bg-clay-pink/30 rounded-full mix-blend-multiply filter blur-2xl opacity-60"
                    animate={{
                      scale: [1, 1.5, 1],
                      x: [0, -30, 0],
                      y: [0, 30, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />

                  {/* Progress card */}
                  <motion.div
                    className="relative z-20 w-[280px] px-6 py-5 bg-white/80 border border-white/60 shadow-xl shadow-clay-ink/5 rounded-2xl backdrop-blur-xl"
                    initial={{ scale: 0.9, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <ProgressLoader
                      isActive={isAnalyzing}
                      stages={[
                        "Mengunggah gambar...",
                        analyzingText,
                        "Mengidentifikasi kerusakan...",
                        "Menghitung dampak lingkungan...",
                        "Menyusun blueprint...",
                      ]}
                      estimatedDurationMs={18000}
                    />
                  </motion.div>
                </motion.div>
              )}
            </div>

            {!isAnalyzing && (
              <button
                onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}
                className={`mt-8 px-8 py-4 bg-clay-sage text-white font-bold rounded-full shadow-lg shadow-clay-sage/30 transition-all flex items-center gap-3 hover:scale-105 active:scale-95`}
              >
                <ImageIcon className="w-6 h-6" />
                Diagnosis dengan Smart Canvas
              </button>
            )}

          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-5 pointer-events-none">
            <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center text-clay-sage mb-4 transition-transform duration-500 group-hover:-translate-y-3 group-hover:shadow-md">
              <UploadCloud className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-extrabold text-clay-ink tracking-tight px-4">
              Punya baju yang butuh sentuhan baru? Taruh di sini.
            </h3>
            <p className="text-clay-ink/60 max-w-lg text-lg">
              Tarik dan lepas foto pakaianmu di area ini, atau klik untuk memilih file dari perangkatmu. Kami akan menganalisis kerusakannya.
            </p>
            <ButtonRipleSpotlight text="Pilih Foto (JPG, PNG)"></ButtonRipleSpotlight>
          </div>
        )}
      </div>
    </div>
  );
}
