"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "motion/react";
import { ImageIcon, Filter, Search, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Semua", "Pramuka", "Prestasi", "Olahraga", "Kegiatan"];

interface GaleriItem { id: string; title: string; category: string; image_url: string; }

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState<GaleriItem | null>(null);

  useEffect(() => {
    const fetchGaleri = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });
      setItems(data || []);
      setIsLoading(false);
    };
    fetchGaleri();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // FIX: lock body scroll saat lightbox terbuka
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const filteredItems = (activeCategory === "Semua" ? items : items.filter(i => i.category === activeCategory))
    .filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
            <ImageIcon size={12} /> Dokumentasi Sekolah
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4">
            Galeri Kegiatan
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
            className="text-blue-100 text-sm md:text-lg max-w-2xl mx-auto px-2">
            Melihat kembali momen-momen berharga dan prestasi di SDN Pulo 01 Pagi.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-3 md:py-4 px-4 md:px-6 sticky top-14 md:top-[72px] z-30 bg-slate-50/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-2 md:space-y-0 md:flex md:items-center md:justify-between md:gap-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
            <div className="bg-blue-100 p-1.5 rounded-lg text-blue-700 hidden md:flex shrink-0"><Filter size={15} /></div>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap shrink-0 active:scale-95",
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 active:bg-blue-50"
                )}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-56 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input type="text" placeholder="Cari kegiatan..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-white outline-none focus:border-blue-500 text-xs md:text-sm transition-all" />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 px-4 md:px-6 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={36} />
          </div>
        ) : (
          <>
            {/* FIX: hapus layout animation di mobile (berat), pakai grid biasa */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    // FIX: duration lebih pendek + cap delay
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.15) }}
                    onClick={() => setLightbox(item)}
                    className="group relative aspect-square md:aspect-[4/3] rounded-xl md:rounded-3xl overflow-hidden bg-slate-200 border border-white cursor-pointer shadow-sm active:opacity-90"
                  >
                    <Image src={item.image_url} alt={item.title} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer" />
                    {/* Label selalu visible di mobile, hover di desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-6">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-400 text-blue-900 text-[9px] md:text-[10px] font-black uppercase mb-1 w-fit">
                        {item.category}
                      </span>
                      <h3 className="text-xs md:text-lg font-bold text-white leading-tight line-clamp-2">{item.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
              <div className="py-16 text-center">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <ImageIcon size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Tidak ada foto</h3>
                <p className="text-slate-500 text-sm">Coba kategori atau kata kunci lain.</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* Lightbox - FIX: animasi lebih ringan di mobile */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 active:bg-white/30 transition-colors">
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3]">
                <Image src={lightbox.image_url} alt={lightbox.title} fill
                  className="object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="inline-block px-2 py-0.5 rounded-full bg-yellow-400 text-blue-900 text-[10px] font-black uppercase mb-1">
                  {lightbox.category}
                </span>
                <h3 className="text-white font-bold text-sm">{lightbox.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </main>
  );
}