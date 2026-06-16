# Permak.in - Sustainable Fashion & Upcycling AI Assistant

Permak.in adalah asisten AI ramah lingkungan (*sustainable fashion assistant*) berbasis Next.js dan didukung oleh **Google Gemini 2.5 Flash**. Platform ini dirancang untuk mendeteksi kerusakan pakaian secara instan, menyajikan panduan reparasi mandiri (DIY), menyusun pesan petunjuk bagi penjahit, serta memvisualisasikan rancangan *upcycling* (modifikasi kreatif) agar pakaian lama Anda kembali trendi dan berumur panjang.

---

## 📌 Masalah (The Problem)

1. **Krisis Limbah Tekstil (Fast Fashion)**: Industri mode memproduksi pakaian dalam jumlah besar dan berbiaya murah, memicu perilaku konsumtif di mana pakaian dengan kerusakan kecil langsung dibuang.
2. **Ketiadaan Keterampilan Mending**: Generasi muda sering kali tidak memiliki keterampilan dasar menjahit (DIY) untuk memperbaiki pakaian sobek, kancing lepas, atau noda ringan.
3. **Kendala Komunikasi dengan Penjahit**: Pengguna sering kesulitan menjelaskan perbaikan teknis atau perubahan pola pakaian kepada penjahit lokal (*tailor*).
4. **Buta Dampak Lingkungan**: Banyak orang tidak menyadari bahwa memproduksi satu kaos katun baru memakan sekitar **2.700 liter air**—jumlah air minum yang cukup untuk satu orang selama 3 tahun.

---

## 💡 Solusi (The Solution)

1. **Smart Canvas Diagnosis**: Pengguna cukup mengunggah foto pakaian mereka yang bermasalah. AI akan langsung mendeteksi jenis pakaian, jenis bahan, titik kerusakan beserta koordinatnya, dan tingkat kesulitan perbaikan.
2. **Panduan DIY Interaktif**: Menyediakan panduan langkah-demi-langkah (seperti teknik sulam *Sashiko* atau penambalan) bagi pengguna yang ingin memperbaiki sendiri pakaian mereka.
3. **Instruksi Penjahit Siap Pakai**: Menghasilkan pesan instruksi permak teknis yang siap disalin dan dikirimkan langsung ke penjahit lokal untuk menghindari salah komunikasi.
4. **Remake Studio**: Wadah berkreasi menggunakan AI di mana pengguna dapat menginstruksikan modifikasi (misal: "ubah kemeja jadi tote bag", "tambahkan renda", atau "potong jadi crop top") dan menerima resep modifikasi terstruktur.
5. **Eco-Impact Estimator**: Mengalkulasi langsung volume air yang berhasil dihemat dan emisi karbon yang berhasil dicegah dengan memilih memperbaiki pakaian daripada membeli yang baru.

---

## ✨ Keunikan Proyek (Uniqueness)

- ⚡ **Integrasi Gemini 2.5 Flash (Streaming)**: Menggunakan SDK Google Gen AI terbaru untuk memproses analisis gambar pakaian dan menghasilkan respons JSON secara *real-time streaming* sehingga UI terasa interaktif dan tanpa hambatan.
- 🎨 **Aestetika Premium Claymorphism**: Antarmuka visual kelas atas yang menggabungkan elemen *claymorphism* lembut, palet warna organik (`clay-cream`, `clay-sage`, `clay-pink`), efek paralaks sutra kinetik (*dynamic Silk background*), serta animasi transisi yang mulus dari Framer Motion.
- 💧 **Gamifikasi Eco-Badge Global**: Terdapat penghitung akumulatif penyelamatan air di Navbar yang bersinkronisasi secara otomatis dengan seluruh koleksi pakaian di lemari digital pengguna (*My Wardrobe*).
- 🏷️ **Interactive Damage Pinning**: AI memproyeksikan titik kerusakan langsung di atas kanvas gambar pakaian secara presisi menggunakan koordinat dinamis.

---

## 🛠️ Tech Stack & Arsitektur

- **Framework Utama**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Bahasa**: JavaScript (ES6+)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan variabel warna HSL kustom dan kustomisasi border organik.
- **Database & Auth**: [Firebase Firestore](https://firebase.google.com/) & [Firebase Authentication (Google Provider)](https://firebase.google.com/docs/auth).
- **Mesin AI**: [Google Gemini API](https://ai.google.dev/) menggunakan SDK `@google/genai` (Model: `gemini-2.5-flash`).
- **Animasi & Transisi**: [Framer Motion](https://www.framer.com/motion/) & HTML5 Canvas.

---

## ⚙️ Variabel Lingkungan (Environment Variables)

Buat file `.env` di direktori root proyek dan masukkan variabel berikut:

| Variabel | Deskripsi |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | API Key dari Firebase Project Anda |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth Domain Firebase Project |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project ID Firebase |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage Bucket Firebase |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID Firebase |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID Firebase |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Measurement ID Firebase (Analytics) |
| `GOOGLE_GEMINI_API_KEY` | API Key dari Google AI Studio untuk akses Gemini 2.5 Flash |

---

## 🚀 Panduan Memulai (Getting Started)

Pastikan Anda telah menginstal [Bun](https://bun.sh/) di komputer Anda (karena proyek ini dioptimalkan menggunakan Bun).

### 1. Kloning Repositori
```bash
git clone https://github.com/ahmadsidikrofi/juara-vibe-coding-project.git
cd juara-vibe-coding
```

### 2. Instalasi Dependensi
```bash
bun install
```

### 3. Menjalankan Server Pengembangan (Local Development)
```bash
bun dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

### 4. Membangun untuk Produksi (Production Build)
```bash
bun run build
```

### 5. Menjalankan Hasil Build Produksi
```bash
bun start
```

---

## 📂 Struktur Folder Proyek

```text
├── public/                 # Aset gambar statis dan logo
├── src/
│   ├── app/                # Next.js App Router Pages & API Routes
│   │   ├── api/
│   │   │   ├── analyze/    # API Route untuk analisis pakaian via Gemini
│   │   │   └── remake/     # API Route untuk instruksi modifikasi via Gemini
│   │   ├── blueprint/      # Halaman visual detail hasil diagnosis pakaian
│   │   ├── login/          # Halaman masuk & pendaftaran pengguna
│   │   ├── my-wardrobe/    # Halaman galeri koleksi lemari pakaian digital
│   │   └── studio/         # Halaman Remake Studio (playground AI)
│   ├── components/         # Komponen UI modular
│   │   ├── ui/             # Komponen UI dasar (Avatar, Dialog, dll)
│   │   ├── Silk.jsx        # Latar belakang animasi gelombang sutra kinetik
│   │   ├── SilkHero.jsx    # Komponen hero landing page dengan paralaks
│   │   └── smart-canvas.js # Kanvas analisis & unggah berkas cerdas
│   ├── context/            # AuthContext untuk integrasi Firebase & state wardrobe
│   └── lib/                # Konfigurasi database & service helper
├── .env                    # Konfigurasi API key lokal
├── tailwind.config.js      # Konfigurasi Tailwind & Clay Color Scheme
└── package.json            # Daftar dependensi & scripts proyek
```

---

## ♻️ Kontribusi & Pengembangan Berkelanjutan

Permak.in terbuka untuk kontribusi pengembangan fitur ramah lingkungan lainnya seperti pencari penjahit terdekat (*Tailor Finder*), pasar loak terintegrasi (*Upcycled Marketplace*), serta komunitas berbagi resep kreasi sandang. Selamat menjaga bumi lewat pakaianmu! 🌍👕
