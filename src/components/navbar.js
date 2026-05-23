"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Scissors, Wand2, LogOut, Settings, LayoutGrid, ScanSearch, HomeIcon, Plus, Sparkles, Leaf, House, Grid2X2, ShirtIcon } from "lucide-react";
import ButtonDemo from "./shadcn-space/radix/button/button-16";
import { SmartCanvas } from "./smart-canvas";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import ButtonShineHoverDemo from "./shadcn-space/radix/button/button-03";

const getBreadcrumbs = (pathname) => {
  if (pathname === "/") {
    return (
      <div className="flex items-center gap-2 text-sm">
        <HomeIcon className="w-4 h-4 text-clay-ink/70" />
        <span className="text-clay-ink font-bold">Halaman</span>
      </div>
    );
  }

  if (pathname === "/my-wardrobe") {
    return (
      <div className="flex items-center gap-2 text-sm">
        <LayoutGrid className="w-4 h-4 text-clay-ink/70" />
        <Link href="/">
          <span className="text-clay-ink/70 hover:text-clay-ink cursor-pointer">Halaman</span>
        </Link>
        <span className="text-clay-ink/40">/</span>
        <span className="text-clay-ink font-bold">Lemariku</span>
      </div>
    );
  }

  if (pathname.startsWith("/blueprint")) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Link href="/" className="text-clay-ink/70 hover:text-clay-ink cursor-pointer">Halaman</Link>
        <span className="text-clay-ink/40">/</span>
        <Link href="/my-wardrobe" className="text-clay-ink/70 hover:text-clay-ink cursor-pointer">Lemariku</Link>
        <span className="text-clay-ink/40">/</span>
        <span className="text-clay-ink font-bold">Blueprint Pakaian</span>
      </div>
    );
  }

  if (pathname.startsWith("/studio")) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Link href="/" className="text-clay-ink/70 hover:text-clay-ink cursor-pointer"><House /></Link>
        <span className="text-clay-ink/40">/</span>
        <Link href="/my-wardrobe" className="text-clay-ink/70 hover:text-clay-ink cursor-pointer"><Grid2X2 /></Link>
        <span className="text-clay-ink/40">/</span>
        <Link href="/blueprint"><span className="text-clay-ink/70"><ShirtIcon /></span></Link>
        <span className="text-clay-ink/40">/</span>
        <span className="text-clay-ink font-bold">Remake Studio ✨</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-clay-ink font-bold">Permak.in</span>
    </div>
  );
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loginWithGoogle, logout, wardrobeItems } = useAuth();

  const [totalWaterSaved, setTotalWaterSaved] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  useEffect(() => {
    if (!wardrobeItems || wardrobeItems.length === 0) {
      setTotalWaterSaved(0);
      return;
    }
    const total = wardrobeItems.reduce((acc, item) => {
      if (item.ecoImpact && item.ecoImpact.air) {
        // Remove non-numeric characters and parse
        const waterStr = item.ecoImpact.air.replace(/[^0-9]/g, '');
        return acc + (parseInt(waterStr) || 0);
      }
      return acc;
    }, 0);

    if (total !== totalWaterSaved) {
      setIsAnimating(true);
      setTotalWaterSaved(total);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [wardrobeItems, totalWaterSaved]);

  useEffect(() => {
    if (pathname === "/login") return;
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname === "/login") return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out px-4 ${scrolled ? "mt-2" : "mt-4"
        }`}
    >
      <div
        className={`flex items-center justify-between w-full transition-all duration-1000 ease-in-out rounded-full ${scrolled
          ? "max-w-4xl py-2 px-4 bg-white/50 backdrop-blur-lg shadow-lg shadow-clay-ink/5 border border-clay-ink/10"
          : "max-w-6xl py-4 px-6 bg-white backdrop-blur-sm shadow-md border border-white/30"
          }`}
      >
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-1 z-50">
            <span className="text-2xl font-extrabold tracking-tight text-clay-ink font-sans">
              Permak<span className="text-clay-sage">.in</span>
            </span>
          </Link>
        </div>

        {/* Center: Dynamic Breadcrumbs Capsule */}
        <div className="hidden md:flex flex-none items-center gap-3 px-4 py-1.5 bg-white/60 backdrop-blur-md border border-white/50 rounded-full shadow-sm">
          {getBreadcrumbs(pathname)}
          <div className="w-px h-5 bg-clay-ink/10" />
          <Popover open={isCanvasOpen} onOpenChange={setIsCanvasOpen}>
            <PopoverTrigger asChild>
              <ButtonShineHoverDemo
                className="bg-black"
                text="Scan Baju"
                icon={<Plus className="w-4 h-4" />}
              />
            </PopoverTrigger>
            <PopoverContent
              align="center"
              sideOffset={15}
              className="w-[90vw] max-w-xl px-8 backdrop-blur-xl border-clay-ink/10 shadow-2xl rounded-3xl overflow-hidden data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-300"
            >
              {/* Tutup tombol asli di SmartCanvas kalau mau, tapi kita biarkan apa adanya */}
              <div className="overflow-y-auto">
                <SmartCanvas />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Right: Actions & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center z-50 gap-3">
          <div className="hidden md:flex items-center gap-5">
            {/* Eco-Badge */}
            <div className={`hidden lg:flex items-end gap-2 bg-clay-sage/10 text-clay-sage px-3 py-1.5 rounded-full text-xs font-bold border border-clay-sage/20 shadow-inner transition-transform duration-300 ${isAnimating ? "scale-110 ring-2 ring-clay-sage/50" : ""}`}>
              <Leaf className={`w-3.5 h-3.5 ${isAnimating ? "animate-bounce" : ""}`} />
              <span>{totalWaterSaved > 0 ? `${totalWaterSaved.toLocaleString("id-ID")} L Air` : "🌿 0 L Air"}</span>
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none rounded-xl cursor-pointer hover:ring-4 hover:ring-clay-sage/20 transition-all">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                    <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                    <AvatarFallback className="bg-clay-peach text-clay-ink font-bold">
                      {user?.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56 rounded-xl p-2 bg-white/95 backdrop-blur-xl border-clay-ink/5 shadow-xl mt-2 data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-bottom-2 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-200">
                  <DropdownMenuLabel className="flex items-center gap-3 px-2 py-2">
                    <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                      <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                      <AvatarFallback className="bg-clay-peach text-clay-ink font-bold">
                        {user?.displayName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-bold text-clay-ink text-sm truncate">{user.displayName || "User Permak.in"}</span>
                      <span className="text-xs text-clay-ink/60 truncate">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-clay-ink/5" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push('/my-wardrobe')} className="p-2 text-sm font-medium text-clay-ink cursor-pointer gap-2 hover:bg-clay-ink/5 rounded-xl">
                      <span className="text-lg">👕</span>
                      <span>Lemariku</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-clay-ink/5" />
                  <DropdownMenuItem onClick={logout} className="p-2 text-sm font-medium text-red-600 cursor-pointer gap-2 hover:bg-red-50 rounded-xl">
                    <span className="text-lg">🚪</span>
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <ButtonDemo text="Sign in" className="px-6 py-2.5 bg-clay-ink text-white font-bold rounded-full hover:bg-clay-sage hover:scale-105 active:scale-95 transition-all shadow-md text-lg tracking-wide" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-clay-ink hover:bg-clay-ink/5 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Bottom Sheet/Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-[calc(100%+1rem)] left-4 right-4 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-clay-ink/5 flex flex-col gap-6 md:hidden animate-slide-up">
          <nav className="flex flex-col gap-4 font-bold text-lg text-clay-ink">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <div className="h-px w-full bg-clay-ink/5" />
            <span className="text-sm text-clay-ink/50 uppercase tracking-wider">Layanan</span>
            <Link href="#" className="flex items-center gap-3 pl-2" onClick={() => setMobileMenuOpen(false)}>
              <ScanSearch className="w-5 h-5 text-clay-lavender" /> Diagnosis Baju
            </Link>
            <Link href="#" className="flex items-center gap-3 pl-2" onClick={() => setMobileMenuOpen(false)}>
              <Scissors className="w-5 h-5 text-clay-sage" /> Solusi Perbaikan
            </Link>
            <Link href="#" className="flex items-center gap-3 pl-2" onClick={() => setMobileMenuOpen(false)}>
              <Wand2 className="w-5 h-5 text-clay-pink" /> Remake Studio
            </Link>
            <div className="h-px w-full bg-clay-ink/5" />
            <Link href="#inspirasi" onClick={() => setMobileMenuOpen(false)}>Inspirasi</Link>
            <Link href="#tentang" onClick={() => setMobileMenuOpen(false)}>Tentang Kami</Link>
          </nav>

          <div className="pt-4 mt-2 border-t border-clay-ink/5">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-clay-sage/30">
                    <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                    <AvatarFallback className="bg-clay-peach text-clay-ink font-bold">
                      {user?.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm truncate max-w-[150px]">{user.displayName || "User"}</span>
                    <span className="text-xs text-clay-ink/60">My Wardrobe</span>
                  </div>
                </div>
                <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="w-full py-3 bg-clay-ink text-white font-bold rounded-full hover:bg-clay-sage transition-all shadow-md">
                  Login / Register
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
