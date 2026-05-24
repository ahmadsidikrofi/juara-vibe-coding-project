"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import toast from "react-hot-toast";

const AuthContext = createContext({
  user: null,
  loading: true,
  loginWithGoogle: async () => { },
  logout: async () => { },
  wardrobeItems: [],
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wardrobeItems, setWardrobeItems] = useState([]);

  useEffect(() => {
    let unsubscribeProjects;

    // Listen for auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Subscribe to user's wardrobe items
        const q = query(
          collection(db, "projects"),
          where("userId", "==", currentUser.uid)
        );
        unsubscribeProjects = onSnapshot(q, (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setWardrobeItems(items);
        });
      } else {
        setUser(null);
        setWardrobeItems([]);
        if (unsubscribeProjects) unsubscribeProjects();
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProjects) unsubscribeProjects();
    };
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Force account selection to avoid auto-login confusion
      provider.setCustomParameters({ prompt: 'select_account' })

      await signInWithPopup(auth, provider)
      toast.success(`Halo, Senang bertemu denganmu di Permak.in`, {
        position: "top-center",
        duration: 3000,
      })
    } catch (error) {
      if (
        error.code === 'auth/cancelled-popup-request' ||
        error.code === 'auth/popup-closed-by-user'
      ) {
        return;
      }
      console.error("Firebase Auth Error:", error.code, error.message);
      toast.error("Gagal masuk. Silakan coba lagi nanti.");
    }
  };

  const logout = async () => {
    try {
      const userName = user?.displayName || "Sobat Permak";

      await toast.promise(
        signOut(auth),
        {
          loading: 'Mengeluarkan...',
          success: <p>Sampai jumpa lagi, {userName}. Jangan lupa kesini lagi yaa :D</p>,
          error: <p>Gagal nih, kayaknya gaboleh keluar :D</p>,
        }
      );
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, wardrobeItems }}>
      {loading ? (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-clay-cream selection:bg-transparent">
          {/* Inline keyframes for orbit animation */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes orbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes orbit-reverse {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            @keyframes logo-breathe {
              0%, 100% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.05); opacity: 1; }
            }
          `}} />

          <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
            {/* Outer soft ambient glow */}
            <div className="absolute inset-0 bg-clay-sage/20 rounded-full blur-2xl scale-150 animate-pulse" />

            {/* Orbit Ring 1 - Primary (clockwise) */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                animation: 'orbit 2.5s linear infinite',
                border: '3px solid transparent',
                borderTopColor: '#A4D4C5',
                borderRightColor: '#D4B5D6',
              }}
            />

            {/* Orbit Ring 2 - Secondary (counter-clockwise, slightly smaller) */}
            <div
              className="absolute rounded-full"
              style={{
                inset: 12,
                animation: 'orbit-reverse 1.8s linear infinite',
                border: '2px solid transparent',
                borderBottomColor: '#F2B8A2',
                borderLeftColor: '#A4D4C5',
              }}
            />

            {/* Orbit Ring 3 - Subtle dashed outer ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: -8,
                animation: 'orbit 4s linear infinite',
                border: '1.5px dashed rgba(45, 55, 72, 0.08)',
              }}
            />

            {/* Logo centered */}
            <div
              className="relative z-10 w-20 h-20 rounded-full bg-white shadow-xl shadow-clay-ink/10 flex items-center justify-center overflow-hidden"
              style={{ animation: 'logo-breathe 3s ease-in-out infinite' }}
            >
              <img
                src="/logo.png"
                alt="Permak.in"
                className="w-14 h-14 object-contain"
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-clay-ink/40 font-medium tracking-wide">Menyiapkan studio-mu...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
