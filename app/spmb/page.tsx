import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegistrationForm from "@/components/spmb/RegistrationForm";
import { Info, ClipboardCheck, ShieldCheck, Search } from "lucide-react";
import Link from "next/link";

export default function SpmbPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
            <ClipboardCheck size={13} /> Tahun Ajaran 2026/2027
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 px-2">
            Pendaftaran SPMB Online
          </h1>
          <p className="text-blue-100 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Selamat datang di portal SPMB SDN Pulo 01 Pagi. Silakan lengkapi formulir dengan data yang benar.
          </p>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-4 md:py-8 px-4 md:px-6 -mt-6 md:-mt-10 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Info, color: "bg-blue-50 text-blue-600", title: "Syarat Usia", desc: "Minimal berusia 6 tahun pada bulan Juli 2026." },
              { icon: ShieldCheck, color: "bg-emerald-50 text-emerald-600", title: "Zonasi Sekolah", desc: "Wajib berdomisili sesuai KK." },
              { icon: ClipboardCheck, color: "bg-yellow-50 text-yellow-600", title: "Dokumen Fisik", desc: "Membawa dokumen asli saat verifikasi." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className={`${color} p-2.5 rounded-xl h-fit shrink-0`}><Icon size={18} /></div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5 text-sm">{title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 px-4 md:px-6">
        <RegistrationForm />
        <div className="max-w-4xl mx-auto mt-6 text-center">
          <Link href="/spmb/cek-status" className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all group text-sm w-full sm:w-auto">
            <Search size={17} className="group-hover:scale-110 transition-transform" />
            Sudah Mendaftar? Cek Status
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}