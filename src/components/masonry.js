import { useState } from "react";
import { cn } from "@/lib/utils";

const Masonry = ({
    items = [],
    scaleOnHover = true,
}) => {
    const handleCardClick = (url) => {
        if (!url) return;
        if (url.startsWith("/")) {
            window.location.href = url;
        } else {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    if (items.length === 0) return null;

    return (
        <div className="relative w-full min-h-[400px]">
            <div className="columns-2 sm:columns-3 md:columns-4 gap-2 [column-fill:balance] w-full animate-in fade-in duration-300">
                {items.map((item) => {
                    const stableHeight = 330 + (item.id.charCodeAt(0) + item.id.charCodeAt(1)) % 101;

                    return (
                        <div
                            key={item.id}
                            onClick={() => handleCardClick(item.url)}
                            className={cn(
                                "break-inside-avoid mb-3 bg-white p-2 rounded-3xl shadow-sm border border-clay-ink/5 overflow-hidden cursor-pointer",
                                // PERUBAHAN 1: Durasi jadi 200ms (sat-set). Tambah transform-gpu & will-change-transform biar RTX yang kerja
                                "transition-all duration-200 hover:shadow-md group transform-gpu will-change-transform",
                                scaleOnHover ? "hover:-translate-y-1" : ""
                            )}
                        >
                            <div
                                className="relative w-full overflow-hidden rounded-2xl bg-clay-sage/10"
                                style={{ height: `${stableHeight}px` }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.img}
                                    alt={item.title || "Pakaian"}
                                    // PERUBAHAN 2: decoding="async" itu KRUSIAL untuk gambar Base64 biar UI nggak nge-freeze
                                    decoding="async"
                                    loading="lazy"
                                    // PERUBAHAN 3: scale hover sat-set (200ms)
                                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 transform-gpu"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Masonry;