export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export const categories = ["Semua", "Pramuka", "Prestasi", "Olahraga", "Kegiatan"];

const SUPABASE_URL = "https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images";

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "M. Ilham - Juara 3 Dacil Putra Lomba Ramadhan Ceria",
    category: "Prestasi",
    imageUrl: `${SUPABASE_URL}/PRESTASI-1.jpeg`,
  },
  {
    id: "2",
    title: "Mutiara Alfatuzahra - Juara 3 Lomba Mendongeng",
    category: "Prestasi",
    imageUrl: `${SUPABASE_URL}/PRESTASI-2.jpeg`,
  },
  {
    id: "3",
    title: "Chayla Destya Jati - Harapan 3 Lomba Menulis Cerita",
    category: "Prestasi",
    imageUrl: `${SUPABASE_URL}/PRESTASI-3.jpeg`,
  },
  {
    id: "4",
    title: "Polisi Cilik - 6 Juara LKBB Timoer Se-Jabodetabek Open",
    category: "Prestasi",
    imageUrl: `${SUPABASE_URL}/PRESTASI-4.jpeg`,
  },
  {
    id: "5",
    title: "Juara 2 Lomba Cerdas Cermat HUT RI ke-80",
    category: "Prestasi",
    imageUrl: `${SUPABASE_URL}/PRESTASI-5.jpeg`,
  },
  {
    id: "6",
    title: "Tim Marawis - Juara 2 Pentas PAI Kec. Kebayoran Baru",
    category: "Prestasi",
    imageUrl: `${SUPABASE_URL}/PRESTASI-6.jpeg`,
  },
  {
    id: "7",
    title: "Tim Pramuka Siaga - Borong Juara Pesta Besar Siaga",
    category: "Pramuka",
    imageUrl: `${SUPABASE_URL}/PRESTASI-7.jpeg`,
  },
  {
    id: "8",
    title: "Tim Futsal - Juara 2 Gen Smart Cup Vol 6 2025",
    category: "Olahraga",
    imageUrl: `${SUPABASE_URL}/PRESTASI-8.jpeg`,
  },
  {
    id: "9",
    title: "Saydatul Budiyadari - Medali Perak Silat IPSI Jaksel 2025",
    category: "Prestasi",
    imageUrl: `${SUPABASE_URL}/PRESTASI-9.jpeg`,
  },
  {
    id: "10",
    title: "Radithya Zhafran - Medali Emas Silat IPSI Jaksel 2025",
    category: "Prestasi",
    imageUrl: `${SUPABASE_URL}/PRESTASI-10.jpeg`,
  },
  {
    id: "11",
    title: "Pocil - 4 Juara LKBB Nasional 2025",
    category: "Prestasi",
    imageUrl: `${SUPABASE_URL}/PRESTASI-11.jpeg`,
  },
  {
    id: "12",
    title: "Marching Band - 6 Juara Batavia Marching Band Competition Nasional 2025",
    category: "Prestasi",
    imageUrl: `${SUPABASE_URL}/PRESTASI-12.jpeg`,
  },
];