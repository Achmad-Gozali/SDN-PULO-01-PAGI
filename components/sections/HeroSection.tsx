"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-blue-900">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images/LATAR-HERO.jpeg"
          alt="SDN Pulo 01 Pagi" fill className="object-cover opacity-60" priority referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/50 to-blue-900/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-6 text-center pt-24 pb-28 md:pt-0 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block px-3 md:px-4 py-1.5 mb-5 text-[10px] md:text-xs font-bold tracking-widest text-yellow-400 uppercase bg-yellow-400/10 border border-yellow-400/20 rounded-full">
            Selamat Datang di Website Resmi
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-5 leading-[1.1] tracking-tight">
            Membentuk Generasi <br />
            <span className="text-yellow-400">Cerdas & Berkarakter</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed font-medium px-2 md:px-0">
            SDN Pulo 01 Pagi berkomitmen memberikan pendidikan terbaik untuk masa depan gemilang putra-putri Anda melalui kurikulum inovatif dan lingkungan belajar yang inspiratif.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
            <Link href="/spmb" className="w-full sm:w-auto">
              {/* FIX: hapus whileHover (tidak jalan di touchscreen), pakai whileTap + active:scale CSS */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full bg-yellow-400 text-blue-900 px-7 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-2 hover:bg-yellow-500 active:scale-95 transition-all"
              >
                Info SPMB 2026 <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/profil" className="w-full sm:w-auto">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full bg-white/10 backdrop-blur-md text-white border border-white/20 px-7 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-white/20 active:scale-95 transition-all"
              >
                Lihat Profil Sekolah
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - delay lebih pendek biar tidak terlalu lama */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      <div className="absolute -bottom-1 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}