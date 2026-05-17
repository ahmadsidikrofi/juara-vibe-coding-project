"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Leaf, ShieldAlert, CheckCircle2, Trash2, Sparkles } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { deleteProject } from "@/lib/projectService";
import toast from "react-hot-toast";
import { TailorCard } from "@/components/tailor-card";
import { DiyStepper } from "@/components/diy-stepper";
import ButtonShineHoverDemo from "@/components/shadcn-space/radix/button/button-03";
import Dialog02 from "@/components/shadcn-space/radix/dialog/dialog-02";

export default function BlueprintDetailPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProject(projectId);
      toast.success("Pakaian berhasil dihapus.");
      router.push("/my-wardrobe");
    } catch (err) {
      console.error("Gagal menghapus:", err);
      toast.error("Gagal menghapus pakaian.");
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) return;

      try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const docData = docSnap.data();
          setData({
            image: docData.imageUrl,
            analysis: docData.diagnosis,
            uniqueId: docData.projectId || `#PRMK-${projectId.substring(0, 5).toUpperCase()}`
          });
        } else {
          setError("Blueprint tidak ditemukan. Mungkin sudah dihapus atau URL tidak valid.");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Gagal memuat blueprint dari server. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-clay-cream p-6 md:p-12 pb-24 font-sans max-w-6xl mx-auto flex flex-col gap-8">
        <div className="h-12 w-full md:w-1/2 lg:w-1/3 bg-clay-sage/10 animate-pulse rounded-2xl mb-4 mt-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 h-[500px] md:h-[700px] bg-clay-sage/10 animate-pulse rounded-3xl border border-clay-sage/5"></div>
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="h-[300px] bg-clay-sage/10 animate-pulse rounded-3xl border border-clay-sage/5"></div>
            <div className="h-[400px] bg-clay-sage/10 animate-pulse rounded-3xl border border-clay-sage/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-clay-cream gap-6 font-sans">
        <div className="w-24 h-24 bg-clay-pink/10 text-clay-pink rounded-full flex items-center justify-center shadow-inner">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-clay-ink">{error || "Terjadi Kesalahan"}</h2>
        <button
          onClick={() => router.push("/my-wardrobe")}
          className="px-8 py-4 bg-clay-sage text-white font-bold rounded-2xl shadow-md shadow-clay-sage/20 hover:bg-clay-sage/90 transition-colors"
        >
          Kembali ke Wardrobe
        </button>
      </div>
    );
  }

  const { image, analysis, uniqueId } = data;

  return (
    <div className="min-h-screen bg-clay-cream p-6 md:p-12 font-sans text-clay-ink selection:bg-clay-sage selection:text-white pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row items-start md:items-center gap-4"
      >
        <button
          onClick={() => router.push("/my-wardrobe")}
          className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-clay-ink hover:text-clay-sage hover:-translate-x-1 shrink-0"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <div className="flex items-start gap-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Project Blueprint: <span className="text-clay-sage">{analysis.jenisPakaian || "Pakaian"}</span>
            </h1>
          </div>

          <div className="flex items-center flex-wrap gap-x-8 gap-y-2 mt-2">
            <p className="text-clay-ink/60 text-lg font-medium">Unique ID: {uniqueId}</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="w-full md:w-auto flex flex-col md:flex-row justify-end items-center md:ml-auto gap-4">
          <button
            onClick={() => router.push(`/studio/${projectId}`)}
            className="w-full md:w-auto px-6 py-4 bg-clay-sage text-white font-bold rounded-2xl shadow-[inset_0px_-4px_8px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.1)] hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Buka Remake Studio
          </button>

          <Dialog02
            title="Hapus Pakaian Ini?"
            description="Apakah Anda yakin ingin menghapus pakaian ini dari My Wardrobe? Tindakan ini tidak dapat dibatalkan."
            confirmText="Ya, Hapus"
            cancelText="Batal"
            onConfirm={handleDelete}
            trigger={
              <ButtonShineHoverDemo
                icon={isDeleting ? (
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                text={isDeleting ? "Menghapus..." : "Hapus"}
                disabled={isDeleting}
                className="flex items-center gap-2 p-5 bg-red-50 text-red-600 font-bold rounded-2xl shadow-sm border border-red-100 hover:bg-red-100 transition-colors disabled:opacity-70 cursor-pointer"
              >
              </ButtonShineHoverDemo>
            }
          />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT: Visual Evidence */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="glass rounded-3xl p-4 shadow-xl border border-white/50 relative overflow-hidden group">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Pakaian"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Pulse overlay for damages */}
              {analysis.kerusakan?.map((k, i) => {
                const x = k.koordinat?.x || 50;
                const y = k.koordinat?.y || 50;
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-clay-pink/50 rounded-full animate-ping absolute inset-0"></div>
                      <div className="w-8 h-8 bg-clay-pink/80 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white backdrop-blur-sm cursor-help hover:scale-110 transition-transform" title={k.deskripsi}>
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eco Impact Box */}
          {analysis.ecoImpact && (
            <div className="bg-gradient-to-br from-clay-sage/20 to-clay-sage/5 rounded-3xl p-6 border border-clay-sage/20 shadow-sm relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-clay-sage/10 transform rotate-12">
                <Leaf className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
                <Leaf className="w-5 h-5 text-clay-sage" />
                Eco-Impact
              </h3>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl">
                  <Droplets className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-sm font-medium text-clay-ink/60">Air Dihemat</p>
                  <p className="text-lg font-semibold text-clay-ink">{analysis.ecoImpact.air || '-'}</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl">
                  <Leaf className="w-6 h-6 text-green-500 mb-2" />
                  <p className="text-sm font-medium text-clay-ink/60">Karbon Dicegah</p>
                  <p className="text-lg font-semibold text-clay-ink">{analysis.ecoImpact.karbon || '-'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Instruksi Penjahit */}
          <TailorCard penjahit={analysis.penjahit} />
        </motion.div>

        {/* RIGHT: Technical Specs & Action Hub */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Technical Specs */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-clay-ink/5">
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-clay-ink/10">Technical Specs</h2>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
              <div>
                <p className="text-sm font-medium text-clay-ink/50 uppercase tracking-wider mb-1">Jenis</p>
                <p className="text-lg font-semibold">{analysis.jenisPakaian || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-clay-ink/50 uppercase tracking-wider mb-1">Bahan</p>
                <p className="text-lg font-semibold">{analysis.bahan || '-'}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-3">
                <p className="text-sm font-medium text-clay-ink/50 uppercase tracking-wider">Skor Kesulitan</p>
                <span className="font-bold text-clay-pink">{analysis.skorKesulitan}/10</span>
              </div>
              <div className="w-full h-3 bg-clay-ink/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-clay-pink rounded-full transition-all duration-1000"
                  style={{ width: `${(analysis.skorKesulitan / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-clay-ink/50 uppercase tracking-wider mb-3">Daftar Kerusakan</p>
              <div className="space-y-3">
                {analysis.kerusakan?.map((k, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 bg-clay-ink/5 rounded-2xl">
                    <div className="w-8 h-8 rounded-full bg-clay-pink/20 text-clay-pink flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold">{k.lokasi}</h4>
                      <p className="text-clay-ink/70 leading-relaxed text-sm mt-1">{k.deskripsi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-clay-sage/10 rounded-2xl border border-clay-sage/20 flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-clay-sage shrink-0" />
              <div>
                <h4 className="font-bold text-clay-sage mb-1">Rekomendasi Utama</h4>
                <p className="text-sm leading-relaxed text-clay-ink/80">{analysis.rekomendasi}</p>
              </div>
            </div>
          </div>

          {/* Panduan DIY (Roadmap Style) */}
          <DiyStepper diy={analysis.diy} />

        </motion.div>
      </div>
    </div>
  );
}
