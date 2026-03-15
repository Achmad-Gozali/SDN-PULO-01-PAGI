"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function HeadmasterGreeting() {
  return (
    <section id="profil" className="py-24 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl z-10">
              <Image
                src="https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images/KEPSEK.jpeg"
                alt="Kepala Sekolah SDN Pulo 01 Pagi"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative shapes */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-400 rounded-full z-0 opacity-20" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600 rounded-[3rem] z-0 opacity-10 rotate-12" />
            
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl z-20 border border-white/20">
              <h4 className="font-bold text-slate-900 text-lg">Hj. Siti Aminah, M.Pd</h4>
              <p className="text-blue-600 text-sm font-bold uppercase tracking-wider">Kepala Sekolah</p>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-blue-700 font-bold uppercase tracking-[0.2em] text-xs">
              <div className="w-8 h-[2px] bg-blue-700" />
              Sambutan Kepala Sekolah
            </div>
            
            <div className="relative">
              <Quote className="absolute -top-8 -left-8 text-blue-100 w-20 h-20 -z-10" />
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                Membangun Masa Depan <br />
                Melalui <span className="text-blue-700">Pendidikan Berkarakter</span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                Assalamu&apos;alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera bagi kita semua.
              </p>
              <p>
                Selamat datang di portal informasi resmi SDN Pulo 01 Pagi. Sebagai lembaga pendidikan dasar, kami memikul tanggung jawab besar untuk meletakkan fondasi karakter dan intelektual yang kuat bagi putra-putri bangsa.
              </p>
              <p>
                Kami percaya bahwa setiap anak adalah unik dan memiliki potensi luar biasa. Melalui sinergi antara guru, orang tua, dan lingkungan sekolah yang kondusif, kami berkomitmen untuk mencetak generasi yang tidak hanya cerdas secara akademis, tetapi juga memiliki integritas moral yang tinggi.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}