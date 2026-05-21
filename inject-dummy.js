// inject-dummy.js
import { createRequire } from 'module';
import admin from 'firebase-admin';

// Solusi import JSON di ES Module
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const dummyProjects = [
    {
        projectId: "#PRMK-88291",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2", // Sesuai userId kamu
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Kemeja Flannel",
        bahan: "Katun Flannel",
        isDamaged: true,
        isValid: true,
        status: "saved",
        // Gambar kemeja kotak-kotak estetik (Unsplash)
        imageUrl: "https://images.pexels.com/photos/18344069/pexels-photo-18344069.jpeg",

        kerusakan: [
            {
                deskripsi: "Siku tangan kanan robek besar dan kain menipis.",
                lokasi: "Siku Kanan",
                koordinat: { x: 45, y: 50 }
            }
        ],
        diagnosis: {
            judul: "Perbaikan Siku Flannel dengan Patch Kain",
            langkah: [
                "Siapkan kain perca denim atau katun tebal berbentuk oval.",
                "Sematkan kain perca di atas bagian siku yang robek menggunakan jarum pentul.",
                "Jahit keliling tepi kain perca dengan tusuk hias (feston atau jelujur rapat).",
                "Pastikan jahitan mengunci seluruh serat kain kemeja yang rapuh."
            ]
        },
        penjahit: {
            judul: "Instruksi Patch Siku Kemeja",
            pesan: "Tolong tambal bagian siku yang robek menggunakan potongan kain perca. Buat gaya unik ala vintage blazer.",
            rekomendasi: "Gunakan teknik visible mending dengan benang kontras.",
            skorKesulitan: 4
        },
        ecoImpact: {
            air: "2500 Liter",
            karbon: "8.5 kg"
        },
        remake: {
            title: "Rompi Kasual Patchwork",
            // Gambar rompi/vest estetik (Unsplash)
            imageUrl: "https://images.pexels.com/photos/7327181/pexels-photo-7327181.jpeg",
            recipe: [
                "Potong kedua lengan kemeja flannel tepat di jahitan kerung lengan.",
                "Rapikan bekas potongan, lalu lipat ke dalam sekitar 1 cm dan jahit keliling agar rapi.",
                "Potong bagian bawah kemeja jika ingin potongan rompi bergaya cropped vest.",
                "Gunakan sisa kain lengan untuk membuat saku tempel baru di bagian depan rompi."
            ]
        }
    },
    {
        projectId: "#PRMK-31102",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Jaket Denim",
        bahan: "Denim Tebal",
        isDamaged: true,
        isValid: true,
        status: "saved",
        // Gambar jaket jeans (Unsplash)
        imageUrl: "https://images.pexels.com/photos/4960280/pexels-photo-4960280.jpeg",

        kerusakan: [
            {
                deskripsi: "Bagian kerah robek panjang melintang.",
                lokasi: "Kerah Belakang",
                koordinat: { x: 50, y: 15 }
            }
        ],
        diagnosis: {
            judul: "Rekonstruksi Kerah dengan Aplikasi Kain Batik",
            langkah: [
                "Buka lapisan kerah yang rusak menggunakan pendedel benang.",
                "Potong kain batik perca sesuai ukuran pola kerah jaket.",
                "Jahit kain batik membungkus kerah jeans asli yang robek.",
                "Satukan kembali kerah baru ke badan jaket dengan jahitan ganda."
            ]
        },
        penjahit: {
            judul: "Instruksi Kombinasi Kain Batik di Kerah",
            pesan: "Bungkus bagian kerah jaket jeans yang robek dengan kain perca batik bermotif gelap.",
            rekomendasi: "Gunakan teknik boro mending agar terlihat etnik.",
            skorKesulitan: 7
        },
        ecoImpact: {
            air: "9000 Liter",
            karbon: "15.2 kg"
        },
        remake: {
            title: "Tote Bag Denim Kombinasi Batik",
            // Gambar tas jeans/tote bag denim (Unsplash)
            imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80",
            recipe: [
                "Potong badan jaket jeans menjadi dua kotak besar berukuran 40x40 cm.",
                "Jahit menyatu sisi kanan, kiri, dan bawah potongan badan jaket untuk membentuk kantong tas.",
                "Gunakan kain sisa lengan jaket untuk digunting memanjang sebagai tali pundak.",
                "Lapisi bagian dalam tas dengan sisa bahan kain batik agar interior tote bag terlihat premium."
            ]
        }
    },
    {
        projectId: "#PRMK-10231",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Kaos Polos",
        bahan: "Katun Cotton Combed",
        isDamaged: true,
        isValid: true,
        status: "saved",
        imageUrl: "https://images.pexels.com/photos/5698854/pexels-photo-5698854.jpeg",
        kerusakan: [
            {
                deskripsi: "Terdapat lubang akibat robekan di bagian dada kiri.",
                lokasi: "Dada Kiri",
                koordinat: { x: 30, y: 30 }
            }
        ],
        diagnosis: {
            judul: "Tambal Robekan Dada dengan Embroidery Motif",
            langkah: [
                "Bersihkan tepi robekan dari serat yang longgar menggunakan gunting kecil.",
                "Pasang kain organza tipis di belakang lubang sebagai penyangga sulaman.",
                "Buat motif bordir bunga di atas lubang menggunakan benang warna kontras.",
                "Kunci seluruh benang bordir di bagian dalam kaos agar tidak lepas."
            ]
        },
        penjahit: {
            judul: "Instruksi Bordir Penutup Robekan",
            pesan: "Tutup lubang di dada kiri dengan bordir motif bunga matahari menggunakan benang kuning dan oranye.",
            rekomendasi: "Gunakan teknik satin stitch untuk hasil bordir yang padat dan rapi.",
            skorKesulitan: 3
        },
        ecoImpact: {
            air: "2700 Liter",
            karbon: "5.5 kg"
        },
        remake: {
            title: "Crop Top Tanpa Lengan Stylish",
            imageUrl: "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg",
            recipe: [
                "Potong kaos secara horizontal di bawah bagian robekan (sekitar 10 cm di atas pinggang).",
                "Potong kedua lengan mengikuti jahitan kerung lengan.",
                "Lipat tepi potongan ke dalam 1 cm lalu jahit keliling dengan tusuk rantai.",
                "Tambahkan print atau bordir kecil di sisi sebaliknya untuk keseimbangan desain."
            ]
        }
    },

    // ─────────────────────────────────────────────
    // 2. Celana Jeans → Tas Pinggang / Shorts
    // ─────────────────────────────────────────────
    {
        projectId: "#PRMK-20445",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Celana Jeans",
        bahan: "Denim Stretch",
        isDamaged: true,
        isValid: true,
        status: "saved",
        imageUrl: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
        kerusakan: [
            {
                deskripsi: "Kain di selangkangan kanan sobek memanjang sekitar 8 cm.",
                lokasi: "Selangkangan Kanan",
                koordinat: { x: 48, y: 65 }
            }
        ],
        diagnosis: {
            judul: "Perbaikan Crotch Jeans dengan Teknik Darning",
            langkah: [
                "Balik celana ke sisi dalam, lalu ratakan area robekan di atas permukaan datar.",
                "Gunting sehelai denim perca selebar 5 cm lebih besar dari lubang di semua sisi.",
                "Tempelkan kain perca dengan setrika (gunakan fusible webbing) sebagai dasar.",
                "Jahit silang rapat (darning stitch) di atas perca hingga robekan tertutup sempurna."
            ]
        },
        penjahit: {
            judul: "Instruksi Tambal Crotch Jeans",
            pesan: "Tambal bagian selangkangan yang sobek dari sisi dalam menggunakan kain denim perca sewarna.",
            rekomendasi: "Gunakan jarum jeans (denim needle) dan benang polyester tebal agar jahitan kuat.",
            skorKesulitan: 5
        },
        ecoImpact: {
            air: "7500 Liter",
            karbon: "12.0 kg"
        },
        remake: {
            title: "Denim Shorts Distressed",
            imageUrl: "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg",
            recipe: [
                "Potong kedua kaki celana pada tinggi yang diinginkan (disarankan 5 cm di atas lutut).",
                "Buat efek distressed dengan cara menggosok tepi potongan menggunakan amplas kasar.",
                "Tarik beberapa benang pada bagian pinggir untuk menciptakan rumbai alami.",
                "Cuci dengan mesin sekali untuk hasil rumbai yang lebih natural."
            ]
        }
    },

    // ─────────────────────────────────────────────
    // 3. Gaun Dress → Rok Midi / Blus
    // ─────────────────────────────────────────────
    {
        projectId: "#PRMK-33871",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Dress Midi",
        bahan: "Rayon Viscose",
        isDamaged: true,
        isValid: true,
        status: "saved",
        imageUrl: "https://images.pexels.com/photos/8453415/pexels-photo-8453415.jpeg",
        kerusakan: [
            {
                deskripsi: "Jahitan samping kiri terbuka sepanjang 15 cm di bagian pinggang.",
                lokasi: "Samping Kiri Pinggang",
                koordinat: { x: 20, y: 45 }
            }
        ],
        diagnosis: {
            judul: "Rekonstruksi Jahitan Samping Dress",
            langkah: [
                "Rapikan sisa benang yang terurai pada jahitan yang terbuka menggunakan pendedel.",
                "Sematkan kedua sisi kain yang terbuka dengan jarum pentul agar rata dan tidak bergeser.",
                "Jahit ulang menggunakan mesin jahit dengan setikan lurus 2.5 mm.",
                "Setrika jahitan dari dalam agar pipih dan sambungan terlihat mulus."
            ]
        },
        penjahit: {
            judul: "Instruksi Jahit Ulang Samping Dress",
            pesan: "Jahit ulang bagian samping yang terbuka dengan setikan lurus rapat, tambahkan penguat di ujung jahitan.",
            rekomendasi: "Tambahkan kancing tersembunyi atau ritsleting jika sering terbuka.",
            skorKesulitan: 2
        },
        ecoImpact: {
            air: "3200 Liter",
            karbon: "7.0 kg"
        },
        remake: {
            title: "Set Blus dan Rok Terpisah",
            imageUrl: "https://images.pexels.com/photos/6311612/pexels-photo-6311612.jpeg",
            recipe: [
                "Potong dress secara horizontal tepat di garis pinggang untuk memisahkan bagian atas dan bawah.",
                "Bagian atas: lipat dan jahit tepi bawah sebagai blus, tambahkan karet atau tali di pinggang.",
                "Bagian bawah: tambahkan ban pinggang dari kain lain atau karet agar bisa dipakai sebagai rok.",
                "Sesuaikan panjang rok sesuai selera, lalu jahit keliman bagian bawah."
            ]
        }
    },

    // ─────────────────────────────────────────────
    // 4. Sweater Rajut → Bantal / Topi Beanie
    // ─────────────────────────────────────────────
    {
        projectId: "#PRMK-44509",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Sweater Rajut",
        bahan: "Wool Blend",
        isDamaged: true,
        isValid: true,
        status: "saved",
        imageUrl: "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg",
        kerusakan: [
            {
                deskripsi: "Motif rajutan terurai di bagian bahu kiri sepanjang 10 cm.",
                lokasi: "Bahu Kiri",
                koordinat: { x: 25, y: 20 }
            }
        ],
        diagnosis: {
            judul: "Perbaikan Rajutan Lepas dengan Teknik Kait Ulang",
            langkah: [
                "Identifikasi baris rajutan mana yang mulai terurai menggunakan jarum rajut kecil.",
                "Kait ulang benang yang terlepas mengikuti pola rajutan asli (knit atau purl).",
                "Sematkan ujung benang longgar dengan jarum tapestri ke dalam serat rajutan.",
                "Cuci perlahan dengan tangan menggunakan air dingin agar serat kembali rapat."
            ]
        },
        penjahit: {
            judul: "Instruksi Perbaikan Rajutan Terurai",
            pesan: "Kaitkan kembali benang yang lepas di bahu menggunakan jarum rajut sesuai pola sweater.",
            rekomendasi: "Gunakan benang cadangan sewarna agar tambalan tidak terlihat.",
            skorKesulitan: 6
        },
        ecoImpact: {
            air: "4000 Liter",
            karbon: "9.8 kg"
        },
        remake: {
            title: "Kemeja keren dan rapih",
            imageUrl: "https://images.pexels.com/photos/8152917/pexels-photo-8152917.jpeg",
            recipe: [
                "Potong badan sweater menjadi dua panel bujur sangkar berukuran 40x40 cm.",
                "Jahit keliling tiga sisi panel dengan bagian luar saling berhadapan.",
                "Balik ke sisi luar, masukkan bantal isian (dakron atau kapuk) ke dalamnya.",
                "Jahit sisi keempat dengan tusuk sembunyi atau tambahkan kancing untuk penutup yang bisa dibuka."
            ]
        }
    },

    // ─────────────────────────────────────────────
    // 5. Kemeja Batik → Dompet / Pouch
    // ─────────────────────────────────────────────
    {
        projectId: "#PRMK-55643",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Kaos Hitam Bolong",
        bahan: "Katun bahan katun",
        isDamaged: true,
        isValid: true,
        status: "saved",
        imageUrl: "https://images.pexels.com/photos/8942364/pexels-photo-8942364.jpeg",
        kerusakan: [
            {
                deskripsi: "Kancing depan hilang tiga buah dan kain di sekitarnya kusut permanen.",
                lokasi: "Bagian Depan Tengah",
                koordinat: { x: 50, y: 50 }
            }
        ],
        diagnosis: {
            judul: "Penggantian Kancing dan Perbaikan Kain Kusut",
            langkah: [
                "Lepas seluruh sisa kancing menggunakan pendedel agar konsisten dengan yang baru.",
                "Setrika area kerutan dengan kain lembab di atasnya hingga serat kain rileks.",
                "Pasang kancing baru berukuran sama, jahit dengan benang kuat melewati minimal 4 lubang.",
                "Perkuat lubang kancing lama yang kendur menggunakan tusuk feston keliling lubang."
            ]
        },
        penjahit: {
            judul: "Instruksi Ganti Kancing Kemeja Batik",
            pesan: "Ganti seluruh kancing dengan model kancing kayu bundar agar terlihat lebih etnik dan estetik.",
            rekomendasi: "Pilih kancing kayu polos berdiameter 1.5 cm agar serasi dengan motif batik.",
            skorKesulitan: 2
        },
        ecoImpact: {
            air: "2500 Liter",
            karbon: "6.5 kg"
        },
        remake: {
            title: "Pouch Kosmetik Batik Eksklusif",
            imageUrl: "https://images.pexels.com/photos/33190012/pexels-photo-33190012.jpeg",
            recipe: [
                "Gunting panel depan dan belakang kemeja masing-masing berukuran 25x18 cm.",
                "Jahit resleting di bagian atas kedua panel, pastikan resleting menghadap ke luar.",
                "Jahit keliling sisi kanan, kiri, dan bawah dengan bagian bermotif saling berhadapan.",
                "Balik pouch ke sisi luar melalui bukaan resleting, rapikan sudut-sudutnya."
            ]
        }
    },

    // ─────────────────────────────────────────────
    // 6. Jaket Kulit → Tas Selempang / Dompet
    // ─────────────────────────────────────────────
    {
        projectId: "#PRMK-66712",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Jaket Kulit Sintetis",
        bahan: "PU Leather",
        isDamaged: true,
        isValid: true,
        status: "saved",
        imageUrl: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg",
        kerusakan: [
            {
                deskripsi: "Lapisan kulit mengelupas di area punggung atas dan lengan kanan.",
                lokasi: "Punggung Atas & Lengan Kanan",
                koordinat: { x: 50, y: 25 }
            }
        ],
        diagnosis: {
            judul: "Restorasi Kulit Sintetis yang Mengelupas",
            langkah: [
                "Kupas semua lapisan yang sudah mengelupas agar permukaan bersih dan rata.",
                "Amplas halus permukaan yang mengelupas dengan kertas amplas 400 grit.",
                "Oleskan cat kulit (leather paint) tipis-tipis menggunakan spons kecil, biarkan kering.",
                "Aplikasikan pelapis akhir (leather finisher) untuk melindungi hasil pengecatan."
            ]
        },
        penjahit: {
            judul: "Instruksi Restorasi Cat Kulit Sintetis",
            pesan: "Cat ulang area yang mengelupas menggunakan cat kulit hitam, lalu lapisi dengan pelindung agar tahan lama.",
            rekomendasi: "Gunakan cat berbasis air agar tidak merusak sisa lapisan yang masih baik.",
            skorKesulitan: 7
        },
        ecoImpact: {
            air: "1200 Liter",
            karbon: "20.3 kg"
        },
        remake: {
            title: "Tas Selempang Kulit Urban",
            imageUrl: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
            recipe: [
                "Potong badan belakang jaket menjadi persegi panjang 35x25 cm sebagai panel utama tas.",
                "Gunakan lengan jaket yang dipotong dan diratakan sebagai tali selempang.",
                "Jahit resleting di bagian atas panel menggunakan jarum kulit dan benang waxed.",
                "Pasang D-ring dan klip di kedua ujung tali untuk koneksi yang kuat dan adjustable."
            ]
        }
    },

    // ─────────────────────────────────────────────
    // 7. Rok Pleats → Scrunchie / Headband
    // ─────────────────────────────────────────────
    {
        projectId: "#PRMK-77384",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Rok Pleats",
        bahan: "Chiffon",
        isDamaged: true,
        isValid: true,
        status: "saved",
        imageUrl: "https://media.istockphoto.com/id/467919835/id/foto/belakang-seorang-pria-mengenakan-t-shirt-putih-robek.jpg?s=2048x2048&w=is&k=20&c=hmVRcF7AV8w7EEl0FsT2Loh0lMwTr2YYgCu8Ek4dJ08=",
        kerusakan: [
            {
                deskripsi: "Ban pinggang elastis sudah longgar dan beberapa pleats lepas jahitannya.",
                lokasi: "Ban Pinggang & Pleats Depan",
                koordinat: { x: 50, y: 10 }
            }
        ],
        diagnosis: {
            judul: "Penggantian Elastis dan Penjahitan Pleats",
            langkah: [
                "Buka jahitan ban pinggang menggunakan pendedel, keluarkan elastis lama.",
                "Potong elastis baru sesuai lingkar pinggang minus 5 cm agar pas.",
                "Masukkan elastis baru ke terowongan ban pinggang menggunakan peniti besar.",
                "Jahit ulang seluruh pleats yang lepas menggunakan setikan mundur di ujungnya."
            ]
        },
        penjahit: {
            judul: "Instruksi Ganti Elastis dan Perbaiki Pleats",
            pesan: "Ganti elastis pinggang dengan yang baru ukuran 2.5 cm, dan jahit ulang semua pleats yang lepas.",
            rekomendasi: "Gunakan elastis anyam agar lebih kuat dan tidak mudah melengkung setelah dicuci.",
            skorKesulitan: 3
        },
        ecoImpact: {
            air: "3800 Liter",
            karbon: "8.0 kg"
        },
        remake: {
            title: "Set Scrunchie & Headband Chiffon",
            imageUrl: "https://media.istockphoto.com/id/1431886676/id/foto/aksesoris-rambut-seperti-scrunchie-cakar-rambut-dan-ikat-kepala.jpg?s=2048x2048&w=is&k=20&c=N1Mn4f2QA_GmT74oLbmyGwdAI7nz9gKug0ynhE8AHOk=",
            recipe: [
                "Gunting rok chiffon menjadi strip panjang selebar 10 cm untuk scrunchie (panjang 60 cm).",
                "Lipat strip memanjang, jahit tepi panjangnya, lalu balik membentuk tabung.",
                "Masukkan karet rambut ke dalam tabung, sambung ujung-ujungnya dengan jahitan.",
                "Potong sisa kain menjadi strip 8 cm x 50 cm, jahit melingkar untuk headband elastis."
            ]
        }
    },

    // ─────────────────────────────────────────────
    // 8. Hoodie → Tas Kanvas / Tote
    // ─────────────────────────────────────────────
    {
        projectId: "#PRMK-88143",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Hoodie Fleece",
        bahan: "Fleece Terry",
        isDamaged: true,
        isValid: true,
        status: "saved",
        imageUrl: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
        kerusakan: [
            {
                deskripsi: "Ritsleting kantong depan (kangaroo pocket) macet dan tidak bisa dibuka.",
                lokasi: "Kantong Depan",
                koordinat: { x: 50, y: 60 }
            }
        ],
        diagnosis: {
            judul: "Penggantian Ritsleting Kantong Hoodie",
            langkah: [
                "Pendedel jahitan sekitar ritsleting yang macet hati-hati agar kain tidak rusak.",
                "Lepas ritsleting lama sepenuhnya, bersihkan sisa benang.",
                "Sematkan ritsleting baru dengan panjang sesuai dan warna serasi menggunakan jarum pentul.",
                "Jahit ritsleting baru di kedua sisinya dengan setikan mundur di ujung untuk pengunci kuat."
            ]
        },
        penjahit: {
            judul: "Instruksi Ganti Ritsleting Kantong Hoodie",
            pesan: "Pasang ritsleting baru ukuran #5 nylon berwarna hitam di kantong depan hoodie.",
            rekomendasi: "Gunakan ritsleting coil/nylon agar lebih lentur dan tidak mudah macet kembali.",
            skorKesulitan: 4
        },
        ecoImpact: {
            air: "3500 Liter",
            karbon: "9.0 kg"
        },
        remake: {
            title: "Backpack Mini Fleece Cozy",
            imageUrl: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg",
            recipe: [
                "Balik hoodie ke dalam, jahit bagian bawah dan lengan tertutup rapat.",
                "Kapas atau busa tipis bisa dimasukkan di antara lapisan untuk bentuk tas yang kaku.",
                "Tali ransel dibuat dari lengan hoodie yang dipotong memanjang menjadi dua strip.",
                "Jahit tali ransel ke bagian atas (area kerah) dan bawah (area pinggang) sebagai titik pengikat."
            ]
        }
    },

    // ─────────────────────────────────────────────
    // 9. Blazer → Jacket Crop / Tas Tangan
    // ─────────────────────────────────────────────
    {
        projectId: "#PRMK-99026",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Blazer Formal",
        bahan: "Polyester Twill",
        isDamaged: true,
        isValid: true,
        status: "saved",
        imageUrl: "https://images.pexels.com/photos/5699798/pexels-photo-5699798.jpeg",
        kerusakan: [
            {
                deskripsi: "Lapisan dalam (lining) sobek di bagian perut kanan dan berbunyi saat dipakai.",
                lokasi: "Lining Perut Kanan",
                koordinat: { x: 60, y: 55 }
            }
        ],
        diagnosis: {
            judul: "Penggantian Lining Interior Blazer",
            langkah: [
                "Buka jahitan tepi bawah blazer untuk mengakses lining yang rusak.",
                "Potong panel lining baru dari kain satin atau sutera imitasi sesuai pola yang rusak.",
                "Jahit panel lining baru menggantikan yang lama, pastikan arah serat kain sejajar.",
                "Jahit kembali tepi bawah blazer dan setrika dengan kain pelindung agar rapi."
            ]
        },
        penjahit: {
            judul: "Instruksi Ganti Lining Blazer",
            pesan: "Ganti lining bagian perut kanan dengan kain satin hitam, sesuaikan dengan warna lining yang masih baik.",
            rekomendasi: "Pilih kain lining dengan berat yang sama agar jatuhan blazer tetap sempurna.",
            skorKesulitan: 6
        },
        ecoImpact: {
            air: "5500 Liter",
            karbon: "11.5 kg"
        },
        remake: {
            title: "Structured Blazer Bag",
            imageUrl: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
            recipe: [
                "Potong badan belakang blazer menjadi trapesium terbalik sebagai panel depan tas.",
                "Gunakan badan depan blazer (tanpa kerah) sebagai panel belakang, manfaatkan saku asli.",
                "Tambahkan busa EVA tipis di antara panel agar tas berbentuk kaku dan terstruktur.",
                "Buat tali tas dari sisa bahan blazer yang dijahit berlapis, pasang cincin D dan strap clip."
            ]
        }
    },

    // ─────────────────────────────────────────────
    // 10. Pakaian Anak → Boneka / Celemek Mini
    // ─────────────────────────────────────────────
    {
        projectId: "#PRMK-10578",
        userId: "5UZm7huwEYQYpGpZSsKEPNsWQUo2",
        createdAt: admin.firestore.Timestamp.now(),
        jenisPakaian: "Baju Anak Bergambar",
        bahan: "Katun Jersey",
        isDamaged: true,
        isValid: true,
        status: "saved",
        imageUrl: "https://images.pexels.com/photos/13187713/pexels-photo-13187713.jpeg",
        kerusakan: [
            {
                deskripsi: "Noda permanen dan pudar parah di bagian depan, gambar sablon terkelupas.",
                lokasi: "Bagian Depan Baju",
                koordinat: { x: 50, y: 40 }
            }
        ],
        diagnosis: {
            judul: "Menutupi Noda dengan Aplikasi Kain Felt",
            langkah: [
                "Cuci baju terlebih dahulu untuk memastikan area noda bersih dari kotoran permukaan.",
                "Gunting kain felt berwarna cerah menjadi bentuk bintang, hati, atau binatang lucu.",
                "Tempelkan potongan felt di atas area noda menggunakan lem kain khusus.",
                "Jahit keliling tepi felt dengan tusuk feston berwarna kontras agar lebih kuat dan estetik."
            ]
        },
        penjahit: {
            judul: "Instruksi Aplikasi Felt di Baju Anak",
            pesan: "Tempel patch kain felt berbentuk kelinci atau bintang di atas area noda untuk tampilan baru yang lucu.",
            rekomendasi: "Gunakan lem kain yang aman dan tidak mengandung bahan kimia berbahaya untuk anak.",
            skorKesulitan: 1
        },
        ecoImpact: {
            air: "2000 Liter",
            karbon: "4.5 kg"
        },
        remake: {
            title: "Boneka Kain Karakter Lucu",
            imageUrl: "https://images.pexels.com/photos/22434757/pexels-photo-22434757.jpeg",
            recipe: [
                "Gambar pola boneka sederhana (beruang atau kelinci) di atas baju, lalu gunting dua lembar.",
                "Jahit keliling pola boneka, sisakan celah 5 cm untuk memasukkan isian dakron.",
                "Isi boneka dengan dakron sampai padat, lalu jahit tutup celah dengan tusuk sembunyi.",
                "Tambahkan mata kancing dan detail bordir untuk wajah boneka yang menggemaskan."
            ]
        }
    }
];

async function run() {
    console.log("Memulai injeksi data dummy...");
    const batch = db.batch();

    dummyProjects.forEach((project) => {
        // Sesuaikan nama collection Firestore kamu (misal: 'projects' atau 'wardrobes')
        const docRef = db.collection('projects').doc();
        batch.set(docRef, project);
    });

    await batch.commit();
    console.log("⚡ Sukses! Data dummy berhasil masuk ke Firestore tanpa membakar token API.");
    process.exit();
}

run().catch(console.error);