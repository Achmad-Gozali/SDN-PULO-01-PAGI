"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "motion/react";
import { ImageIcon, Filter, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Semua", "Pramuka", "Prestasi", "Olahraga", "Kegiatan"];

interface GaleriItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGaleri = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("galeri")
        .select("*")
        .order("created_at", { ascending: false });
      setItems(data || []);
      setIsLoading(false);
    };
    fetchGaleri();
  }, []);

  const filteredItems = (activeCategory === "Semua"
    ? items
    : items.filter((item) => item.category === activeCategory)
  ).filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="relative pt-32 pb-20 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ImageIcon size={14} /> Dokumentasi Sekolah
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Galeri Kegiatan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Melihat kembali momen-momen berharga, prestasi, dan fasilitas unggulan di SDN Pulo 01 Pagi Jakarta Selatan.
          </motion.p>
        </div>
      </section>

      <section className="py-12 px-6 sticky top-[72px] z-30 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700 hidden md:block">
              <Filter size={18} />
            </div>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                )}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari kegiatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-full border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500/20 outline-none focus:border-blue-500 text-sm transition-all"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 shadow-xl shadow-slate-200/50 border border-white"
                  >
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                      <div className="space-y-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-yellow-400 text-blue-900 text-[10px] font-black uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 md:hidden">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-blue-900 text-[10px] font-black uppercase shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
              <div className="py-20 text-center">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                  <ImageIcon size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Tidak ada foto ditemukan</h3>
                <p className="text-slate-500">Coba pilih kategori lain atau ubah pencarian Anda.</p>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}