"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";
import { Search, Calendar, User, ArrowRight, Newspaper, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BeritaItem {
  id: string; title: string; excerpt: string;
  image_url: string; category: string; author: string; date: string;
}

export default function BeritaListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BeritaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("berita")
        .select("id, title, excerpt, image_url, category, author, date")
        .order("created_at", { ascending: false });
      setPosts(data || []);
      setIsLoading(false);
    };
    fetchBerita();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-800 border border-blue-700 text-blue-200 text-xs font-bold uppercase tracking-widest mb-4">
            <Newspaper size={12} /> Kabar Terbaru
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="text-3xl md:text-5xl font-black mb-4 px-2">
            Berita & Kabar Sekolah
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-blue-100 text-sm md:text-lg max-w-2xl mx-auto mb-8 px-2">
            Temukan informasi terkini, pengumuman penting, dan prestasi membanggakan dari keluarga besar SDN Pulo 01 Pagi.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="max-w-xl mx-auto relative px-2 md:px-0">
            <Search className="absolute left-6 md:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Cari berita..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 shadow-xl focus:ring-4 focus:ring-blue-500/20 outline-none text-sm md:text-base" />
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-16 px-4 md:px-6 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={36} />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                // FIX: cap delay max 0.2s biar card tidak terlalu lama muncul di mobile
                transition={{ delay: Math.min(idx * 0.06, 0.2), duration: 0.35 }}
                className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={post.image_url} alt={post.title} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3">
                    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      post.category === "PENTING" ? "bg-red-600 text-white" : "bg-blue-600 text-white")}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                    <span className="flex items-center gap-1 truncate"><User size={11} /> {post.author}</span>
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto pt-3 border-t border-slate-50">
                    <Link href={`/berita/${post.id}`} className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:gap-2.5 transition-all active:opacity-70">
                      Baca Selengkapnya <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Newspaper size={30} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Berita tidak ditemukan</h3>
            <p className="text-slate-500 text-sm">Coba gunakan kata kunci lain.</p>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}