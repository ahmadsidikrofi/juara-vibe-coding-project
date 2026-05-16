"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Masonry from "@/components/masonry";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const MyWardrobePage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [wardrobeItems, setWardrobeItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchProjects = async () => {
            try {
                const q = query(
                    collection(db, "projects"),
                    where("userId", "==", user.uid)
                )

                const querySnapshot = await getDocs(q)
                const items = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    items.push({
                        id: doc.id,
                        img: data.imageUrl,
                        url: `/blueprint/${doc.id}`,
                        // Memberikan random height agar efek masonry (susun bata) lebih terlihat estetis
                        height: Math.floor(Math.random() * (600 - 300 + 1)) + 300,
                        createdAt: data.createdAt?.toMillis() || 0,
                    });
                });

                // Mengurutkan dari yang terbaru
                items.sort((a, b) => b.createdAt - a.createdAt);

                setWardrobeItems(items);
            } catch (error) {
                console.error("Error fetching wardrobe items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [user]);

    // Loading auth state
    if (!user && loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-clay-cream">
                <div className="w-12 h-12 border-4 border-clay-sage border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-clay-cream p-6 md:p-12 font-sans text-clay-ink selection:bg-clay-sage selection:text-white pb-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto mb-12 flex items-center gap-4"
            >
                <button
                    onClick={() => router.push("/")}
                    className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-clay-ink hover:text-clay-sage hover:-translate-x-1 cursor-pointer"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        My <span className="text-clay-sage">Wardrobe</span>
                    </h1>
                    <p className="text-clay-ink/60 text-lg mt-1 font-medium">Koleksi pakaian yang telah kamu scan.</p>
                </div>
            </motion.div>

            <div className="max-w-6xl mx-auto">
                {loading ? (
                    // Skeleton Loading State
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="bg-clay-sage/10 animate-pulse rounded-2xl aspect-3/4 w-full"></div>
                        ))}
                    </div>
                ) : wardrobeItems.length === 0 ? (
                    // Empty State Experience (Clay Aesthetic)
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/40 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 max-w-2xl mx-auto mt-10"
                    >
                        <div className="w-24 h-24 bg-clay-sage/20 text-clay-sage rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <Sparkles className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Lemarimu masih kosong nih.</h2>
                        <p className="text-clay-ink/60 text-lg mb-8 max-w-md">
                            Yuk, mulai scan baju pertamamu untuk menemukan inspirasi perbaikan yang kreatif dan ramah lingkungan!
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="px-8 py-4 bg-clay-sage text-white font-bold rounded-2xl shadow-md shadow-clay-sage/20 hover:bg-clay-sage/90 transition-colors cursor-pointer"
                        >
                            Mulai Scan Baju
                        </button>
                    </motion.div>
                ) : (
                    // Masonry Component
                    <Masonry
                        items={wardrobeItems}
                        ease="power3.out"
                        duration={0.6}
                        stagger={0.05}
                        animateFrom="bottom"
                        scaleOnHover
                        hoverScale={0.95}
                        blurToFocus
                        colorShiftOnHover={false}
                    />
                )}
            </div>
        </div>
    );
};

export default MyWardrobePage;