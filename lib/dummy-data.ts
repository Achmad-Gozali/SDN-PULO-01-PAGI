import { Teacher, NewsPost, GalleryItem, SchoolStat } from "@/types";

const SUPABASE_URL = "https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images";

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Hj. Siti Aminah, M.Pd",
    role: "Kepala Sekolah",
    image: "https://picsum.photos/seed/teacher1/400/500",
  },
  {
    id: "2",
    name: "Budi Santoso, S.Pd",
    role: "Guru Kelas 6",
    image: "https://picsum.photos/seed/teacher2/400/500",
  },
  {
    id: "3",
    name: "Lani Wijaya, S.Pd",
    role: "Guru Matematika",
    image: "https://picsum.photos/seed/teacher3/400/500",
  },
];

// 3 berita terbaru untuk ditampilkan di beranda
export const latestNews: NewsPost[] = [
  {
    id: "12",
    title: "Marching Band SDN Pulo 01 Borong 6 Juara di Batavia Marching Band Competition Nasional 2025",
    excerpt: "Prestasi membanggakan di tingkat nasional! Marching Band SDN Pulo 01 Pagi berhasil meraih 6 kategori juara dalam Batavia Marching Band Competition Tingkat Nasional 2025.",
    date: "1 Agustus 2025",
    category: "Prestasi",
    isImportant: false,
    image: `${SUPABASE_URL}/PRESTASI-12.jpeg`,
  },
  {
    id: "11",
    title: "Pocil SDN Pulo 01 Raih 4 Penghargaan Bergengsi di LKBB Nasional 2025",
    excerpt: "Tim Polisi Cilik SDN Pulo 01 Pagi kembali mengharumkan nama sekolah dengan meraih 4 penghargaan sekaligus dalam ajang LKBB Nasional 2025.",
    date: "5 September 2025",
    category: "Prestasi",
    isImportant: false,
    image: `${SUPABASE_URL}/PRESTASI-11.jpeg`,
  },
  {
    id: "10",
    title: "Radithya Zhafran Raih Medali Emas & Saydatul Raih Medali Perak Silat IPSI Jakarta Selatan 2025",
    excerpt: "Dua atlet pencak silat SDN Pulo 01 Pagi menorehkan prestasi gemilang di Lomba Silat Piala Pengkot IPSI Jakarta Selatan 2025 dengan meraih medali emas dan perak.",
    date: "20 September 2025",
    category: "Prestasi",
    isImportant: false,
    image: `${SUPABASE_URL}/PRESTASI-10.jpeg`,
  },
];

export const stats: SchoolStat[] = [
  { label: "Guru & Staff", value: "22", iconName: "Users" },
  { label: "Siswa Aktif", value: "450+", iconName: "GraduationCap" },
  { label: "Ekstrakurikuler", value: "10", iconName: "Trophy" },
  { label: "Prestasi", value: "50+", iconName: "Award" },
];

export const gallery: GalleryItem[] = [
  { id: "1", title: "Marching Band - Juara Nasional 2025", image: `${SUPABASE_URL}/PRESTASI-12.jpeg`, category: "Prestasi" },
  { id: "2", title: "Pocil - LKBB Nasional 2025", image: `${SUPABASE_URL}/PRESTASI-11.jpeg`, category: "Prestasi" },
  { id: "3", title: "Medali Emas & Perak Silat IPSI 2025", image: `${SUPABASE_URL}/PRESTASI-10.jpeg`, category: "Prestasi" },
];