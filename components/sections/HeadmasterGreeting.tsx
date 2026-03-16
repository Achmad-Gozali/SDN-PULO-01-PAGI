"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function HeadmasterGreeting() {
  return (
    <section id="profil" className="py-16 md:py-24 px-4 md:px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          {/* Image - FIX: x offset dikurangi biar tidak berat di mobile low-end */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-sm mx-auto lg:mx-0 lg:w-1/2"
          >
            <div className="relative aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl z-10">
              <Image
                src="https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images/KEPSEK.jpeg"
                alt="Kepala Sekolah SDN Pulo 01 Pagi" fill className="object-cover" referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 md:w-32 h-24 md:h-32 bg-yellow-400 rounded-full z-0 opacity-20" />
            <div className="absolute -bottom-6 -right-6 w-40 md:w-64 h-40 md:h-64 bg-blue-600 rounded-[2rem] md:rounded-[3rem] z-0 opacity-10 rotate-12" />
            <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl z-20 border border-white/20">
              <h4 className="font-bold text-slate-900 text-base md:text-lg">Julaiha, S.Pd.Gr.</h4>
              <p className="text-blue-600 text-xs md:text-sm font-bold uppercase tracking-wider">Kepala Sekolah</p>
            </div>
          </motion.div>

          {/* Text - FIX: x offset dikurangi */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full lg:w-1/2 space-y-5 md:space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-blue-700 font-bold uppercase tracking-[0.2em] text-xs">
              <div className="w-8 h-[2px] bg-blue-700" />
              Sambutan Kepala Sekolah
            </div>
            <div className="relative">
              <Quote className="absolute -top-6 -left-4 md:-top-8 md:-left-8 text-blue-100 w-14 h-14 md:w-20 md:h-20 -z-10" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Membangun Masa Depan Melalui{" "}
                <span className="text-blue-700">Pendidikan Berkarakter</span>
              </h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
              <p>Assalamu&apos;alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera bagi kita semua.</p>
              <p>Selamat datang di portal informasi resmi SDN Pulo 01 Pagi. Sebagai lembaga pendidikan dasar, kami memikul tanggung jawab besar untuk meletakkan fondasi karakter dan intelektual yang kuat bagi putra-putri bangsa.</p>
              <p>Kami percaya bahwa setiap anak adalah unik dan memiliki potensi luar biasa. Melalui sinergi antara guru, orang tua, dan lingkungan sekolah yang kondusif, kami berkomitmen untuk mencetak generasi yang tidak hanya cerdas secara akademis, tetapi juga memiliki integritas moral yang tinggi.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}