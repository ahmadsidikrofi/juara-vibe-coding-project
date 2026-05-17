"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";

const AuthContext = createContext({
  user: null,
  loading: true,
  loginWithGoogle: async () => { },
  logout: async () => { },
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {loading ? (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-clay-cream selection:bg-transparent">
          <div className="relative flex items-center justify-center">
            {/* Outer soft glowing ring */}
            <div className="absolute w-32 h-32 bg-clay-sage/30 rounded-full blur-xl animate-pulse" />

            {/* Spinning gradient border */}
            <div className="absolute w-24 h-24 rounded-full border-[6px] border-t-clay-sage border-r-clay-lavender border-b-clay-pink border-l-transparent animate-spin" style={{ animationDuration: '1.5s' }} />

            {/* Inner solid clay circle */}
            <div className="relative w-16 h-16 bg-white rounded-full shadow-lg shadow-clay-ink/10 flex items-center justify-center z-10">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-clay-lavender to-clay-pink opacity-80 animate-pulse" />
            </div>
          </div>

          <h2 className="mt-8 text-xl font-extrabold text-clay-ink tracking-widest uppercase opacity-70 animate-pulse flex items-center gap-1">
            Permak<span className="text-clay-sage">.in</span>
          </h2>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
