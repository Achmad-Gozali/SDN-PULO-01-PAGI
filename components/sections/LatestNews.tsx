"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface BeritaItem {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  date: string;
  isImportant?: boolean;
}

export default function LatestNews() {
  const [news, setNews] = useState<BeritaItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("berita")
        .select("id, title, excerpt, image_url, category, date")
        .order("created_at", { ascending: false })
        .limit(3);
      setNews(data || []);
    };
    fetchNews();
  }, []);

  if (news.length === 0) return null;

  return (
    <section id="mading" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-blue-700 font-bold uppercase tracking-[0.2em] text-xs">
              <div className="w-8 h-[2px] bg-blue-700" />
              PORTAL BERITA
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">
              Kabar Terbaru <span className="text-blue-700">Sekolah</span>
            </h2>
          </div>
          <Link
            href="/berita"
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-700 transition-colors group"
          >
            Lihat Semua Berita <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-md text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Tag size={10} /> {item.category}
                  </span>
                  {item.category === "PENTING" && (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-red-600/20 animate-pulse">
                      PENTING
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-4">
                  <Calendar size={14} />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="mt-auto">
                  <Link href={`/berita/${item.id}`}>
                    <button className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-300">
                      Baca Selengkapnya
                    </button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}