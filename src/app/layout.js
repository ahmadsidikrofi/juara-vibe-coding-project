import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Navbar } from "@/components/navbar";
import { MobileFAB } from "@/components/mobile-fab";
import { Footer } from "@/components/footer";
import { Toaster } from "react-hot-toast";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Permak.in - Sustainable Fashion AI",
  description: "Bantu Gen-Z memperbaiki atau memodifikasi pakaian mereka menggunakan asisten AI. Sustainable fashion for a better future.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable}`}>
      <body
        className={`
          antialiased 
          bg-clay-cream 
          text-clay-ink 
          font-sans 
          min-h-screen 
          selection:bg-clay-sage/30 
          selection:text-clay-ink
        `}
      >
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="relative flex flex-col min-h-screen overflow-hidden">
            <Navbar />
            <MobileFAB />

            {/* Subtle noise texture or gradient for rich aesthetics */}
            <main className="grow flex flex-col">
              {children}
            </main>

            <Footer />

            {/* Global decorative elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-50">
              <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-clay-sage/10 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-clay-pink/5 blur-[120px] rounded-full" />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

