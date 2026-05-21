"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Menu, X, Scissors, Wand2, LogOut, Settings, LayoutGrid, ScanSearch } from "lucide-react";
import ButtonDemo from "./shadcn-space/radix/button/button-16";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loginWithGoogle, logout } = useAuth();

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
        className={`flex items-center justify-between w-full transition-all duration-500 ease-in-out rounded-full ${scrolled
          ? "max-w-4xl py-2 px-6 bg-white/50 backdrop-blur-lg shadow-lg shadow-clay-ink/5 border border-clay-ink/10"
          : "max-w-6xl py-4 px-8 bg-white backdrop-blur-sm shadow-md border border-white/30"
          }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 z-50">
          <span className="text-2xl font-extrabold tracking-tight text-clay-ink font-sans">
            Permak<span className="text-clay-sage">.in</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 font-bold text-clay-ink/80 text-md tracking-wide">
          <Link href="/" className="px-5 py-2.5 rounded-full hover:bg-clay-ink/5 hover:text-clay-sage transition-all">Home</Link>

          {/* Layanan Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-5 py-2.5 rounded-full hover:bg-clay-ink/5 hover:text-clay-sage transition-all outline-none cursor-pointer">
              Layanan
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-64 rounded-3xl p-2 bg-white/90 backdrop-blur-xl border-clay-ink/5 shadow-xl mt-4">
              <DropdownMenuGroup>
                <DropdownMenuItem className="p-3 rounded-2xl cursor-pointer hover:bg-clay-lavender/20 gap-3 group transition-colors">
                  <div className="w-10 h-10 rounded-full bg-clay-lavender/30 flex items-center justify-center text-clay-ink group-hover:scale-110 transition-transform">
                    <ScanSearch className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-clay-ink">Diagnosis Baju</span>
                    <span className="text-xs text-clay-ink/60">Scan kerusakan via AI</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-3 rounded-2xl cursor-pointer hover:bg-clay-sage/20 gap-3 group transition-colors">
                  <div className="w-10 h-10 rounded-full bg-clay-sage/30 flex items-center justify-center text-clay-ink group-hover:scale-110 transition-transform">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-clay-ink">Solusi Perbaikan</span>
                    <span className="text-xs text-clay-ink/60">Panduan DIY & Penjahit</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-3 rounded-2xl cursor-pointer hover:bg-clay-pink/20 gap-3 group transition-colors">
                  <div className="w-10 h-10 rounded-full bg-clay-pink/30 flex items-center justify-center text-clay-ink group-hover:scale-110 transition-transform">
                    <Wand2 className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-clay-ink">Remake Studio</span>
                    <span className="text-xs text-clay-ink/60">Visualisasi modifikasi</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="#inspirasi" className="px-5 py-2.5 rounded-full hover:bg-clay-ink/5 hover:text-clay-sage transition-all">Inspirasi</Link>
          <Link href="#tentang" className="px-5 py-2.5 rounded-full hover:bg-clay-ink/5 hover:text-clay-sage transition-all">Tentang Kami</Link>
        </nav>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center z-50">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none rounded-full cursor-pointer hover:ring-4 hover:ring-clay-sage/20 transition-all">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                    <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                    <AvatarFallback className="bg-clay-peach text-clay-ink font-bold">
                      {user?.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-3xl p-2 bg-white/95 backdrop-blur-xl border-clay-ink/5 shadow-xl mt-4">
                  <DropdownMenuLabel className="flex flex-col px-3 py-2">
                    <span className="font-bold text-clay-ink truncate">{user.displayName || "User Permak.in"}</span>
                    <span className="text-xs text-clay-ink/60 truncate">{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-clay-ink/5" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="p-3 rounded-2xl cursor-pointer hover:bg-clay-ink/5 gap-3 font-medium">
                      <LayoutGrid className="w-4 h-4 text-clay-ink/70" />
                      My Wardrobe
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 rounded-2xl cursor-pointer hover:bg-clay-ink/5 gap-3 font-medium">
                      <Settings className="w-4 h-4 text-clay-ink/70" />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-clay-ink/5" />
                  <DropdownMenuItem onClick={logout} className="p-3 rounded-2xl cursor-pointer hover:bg-red-50 text-red-600 gap-3 font-medium">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <ButtonDemo onClick={loginWithGoogle} text="Sign in" className="px-6 py-2.5 bg-clay-ink text-white font-bold rounded-full hover:bg-clay-sage hover:scale-105 active:scale-95 transition-all shadow-md text-lg tracking-wide" />
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-clay-ink hover:bg-clay-ink/5 rounded-full transition-colors z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
              <button onClick={loginWithGoogle} className="w-full py-3 bg-clay-ink text-white font-bold rounded-full hover:bg-clay-sage transition-all shadow-md">
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
