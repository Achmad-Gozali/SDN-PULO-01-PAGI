import { SchoolStat } from "@/types";

// FIX: hapus latestNews (fetch langsung dari Supabase di LatestNews component)
// FIX: hapus gallery (fetch langsung dari Supabase di galeri page)
// FIX: hapus teachers (data guru dipindah ke profil/page.tsx dan HeadmasterGreeting.tsx)

export const stats: SchoolStat[] = [
  { label: "Guru & Staff", value: "22", iconName: "Users" },
  { label: "Siswa Aktif", value: "450+", iconName: "GraduationCap" },
  { label: "Ekstrakurikuler", value: "10", iconName: "Trophy" },
  { label: "Prestasi", value: "50+", iconName: "Award" },
];