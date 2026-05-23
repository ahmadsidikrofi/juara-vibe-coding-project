"use client";

import { Badge } from "@/components/ui/badge";
import ButtonWithIconDemo from "./shadcn-space/radix/button/button-01";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

const baseInspirations = [
  {
    id: 1,
    url: "/jeans-1.jpg",
    status: "DIY Repair",
    tag: "Pembetulan Jeans Robek",
    badgeColor: "bg-clay-sage text-clay-ink hover:bg-clay-sage/80 border-none shadow-sm font-bold",
    heightClass: "h-[400px]",
  },
  {
    id: 2,
    url: "/kaos-kebesaran.jpg",
    status: "Surat Penjahit",
    tag: "Kaos Kebesaran",
    badgeColor: "bg-clay-lavender text-clay-ink hover:bg-clay-lavender/80 border-none shadow-sm font-bold",
    heightClass: "h-[300px]",
  },
  {
    id: 3,
    url: "/jaket-denim.jpg",
    status: "AI Remake",
    tag: "Jaket Denim",
    badgeColor: "bg-clay-pink text-clay-ink hover:bg-clay-pink/80 border-none shadow-sm font-bold",
    heightClass: "h-[450px]",
  },
  {
    id: 4,
    url: "/jeans-2.jpg",
    status: "Surat Penjahit",
    tag: "Vintage Dress",
    badgeColor: "bg-clay-lavender text-clay-ink hover:bg-clay-lavender/80 border-none shadow-sm font-bold",
    heightClass: "h-[350px]",
  },
  {
    id: 5,
    url: "/patchwork.jpg",
    status: "AI Remake",
    tag: "Patchwork Denim",
    badgeColor: "bg-clay-pink text-clay-ink hover:bg-clay-pink/80 border-none shadow-sm font-bold",
    heightClass: "h-[400px]",
  },
  {
    id: 6,
    url: "/sweater-repair.jpg",
    status: "AI Remake",
    tag: "Sweater Upcycle",
    badgeColor: "bg-clay-sage text-clay-ink hover:bg-clay-sage/80 border-none shadow-sm font-bold",
    heightClass: "h-[500px]",
  },
  {
    id: 7,
    url: "/baju-sobek.jpg",
    status: "DIY Repair",
    tag: "Kaos Sobek",
    badgeColor: "bg-clay-sage text-clay-ink hover:bg-clay-sage/80 border-none shadow-sm font-bold",
    heightClass: "h-[300px]",
  }
];

const col1 = [baseInspirations[0], baseInspirations[3], baseInspirations[2], baseInspirations[5]];
const col2 = [baseInspirations[1], baseInspirations[4], baseInspirations[0], baseInspirations[3]];
const col3 = [baseInspirations[2], baseInspirations[5], baseInspirations[1], baseInspirations[4]];

const doubleItems = (arr) => [...arr, ...arr];

const ScrollingColumn = ({ items, duration, reverse = false }) => {
  return (
    <div className="flex flex-col gap-4 relative overflow-visible">
      <motion.div
        className="flex flex-col gap-4"
        animate={{
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
      >
        {doubleItems(items).map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="bg-white p-2 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 group"
          >
            <div className={`relative w-full rounded-2xl overflow-hidden ${item.heightClass}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.tag}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay Gradient for readability */}
              <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col items-start gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                <Badge className={item.badgeColor}>
                  {item.status}
                </Badge>
                <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-clay-ink border-none shadow-sm font-medium">
                  {item.tag}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export function InspirasiPermak() {
  const { user } = useAuth()

  return (
    <section className="w-full max-w-7xl mx-auto mt-10 mb-32 px-4 md:px-8">
      <div className="text-center mb-16 animate-slide-up">
        <h2 className="text-3xl md:text-5xl font-extrabold text-clay-ink tracking-tight mb-4">
          Inspirasi <span className="text-clay-sage">Permak</span>
        </h2>
        <p className="text-xl text-clay-ink/70 max-w-2xl mx-auto">
          Jelajahi bagaimana AI dan tangan kreatif mengubah pakaian lama menjadi karya baru yang menakjubkan.
        </p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative h-[600px] md:h-[800px] overflow-hidden flex gap-4 md:gap-6 rounded-3xl">
        {/* Fade overlays */}
        <div className="absolute inset-x-0 top-0 h-24 md:h-40 bg-lienar-to-b from-clay-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 bg-lienar-to-t from-clay-cream to-transparent z-10 pointer-events-none" />

        {/* Columns */}
        <div className="w-1/2 md:w-1/3">
          <ScrollingColumn items={col1} duration={35} />
        </div>
        <div className="w-1/2 md:w-1/3">
          <ScrollingColumn items={col2} duration={60} reverse={true} />
        </div>
        <div className="hidden md:block md:w-1/3">
          <ScrollingColumn items={col3} duration={45} />
        </div>
      </div>

      <div className="mt-16 text-center animate-slide-up relative z-20">
        <Link href={user ? "/my-wardrobe" : "/login"}>
          <ButtonWithIconDemo className="bg-clay-ink text-white shadow-xl hover:shadow-2xl text-lg h-14" text="Lihat Lebih Banyak di My Wardrobe" />
        </Link>
      </div>
    </section>
  );
}
