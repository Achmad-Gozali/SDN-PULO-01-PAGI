# 🏫 SDN Pulo 01 Pagi — Sistem Informasi Terpadu

Website resmi SDN Pulo 01 Pagi, Jakarta Selatan. Dibangun dengan Next.js, Tailwind CSS, dan Supabase.

---

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Database & Storage:** Supabase
- **Language:** TypeScript
- **Animation:** Motion (Framer Motion)
- **Form Validation:** React Hook Form + Zod
- **Deployment:** Vercel

---

## ✨ Fitur

- 🏠 **Halaman Beranda** — Hero section, statistik, sambutan kepala sekolah, berita terbaru
- 📰 **Berita & Mading** — Portal berita sekolah dengan fitur pencarian
- 🖼️ **Galeri** — Dokumentasi kegiatan dan prestasi sekolah dengan filter kategori
- 👤 **Profil Sekolah** — Visi misi, fasilitas, dan tenaga pendidik
- 📝 **SPMB Online** — Formulir pendaftaran siswa baru dengan upload dokumen
- 🔍 **Cek Status SPMB** — Cek status pendaftaran via NIK
- 🔐 **Dashboard Admin** — Manajemen berita, galeri, dan data SPMB

---

## ⚙️ Cara Menjalankan Lokal

**Prerequisites:** Node.js, akun Supabase

1. Clone repository:
   ```bash
   git clone https://github.com/Achmad-Gozali/SDN-PULO-01-PAGI.git
   cd SDN-PULO-01-PAGI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Buat file `.env.local` dan isi dengan kredensial Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Jalankan development server:
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000)

---

## 🔐 Akses Admin

Panel admin tersedia di `/admin`. Login dengan akun yang telah dikonfigurasi di Supabase Authentication.

---

## 📦 Deploy

Project ini siap di-deploy ke **Vercel**. Pastikan environment variables sudah dikonfigurasi di dashboard Vercel.

---

© 2026 SDN Pulo 01 Pagi. Seluruh Hak Cipta Dilindungi.