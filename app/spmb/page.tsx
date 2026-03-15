// FIX: indentasi extra 2 spasi di semua baris sudah dihapus
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">
            <ClipboardCheck size={14} /> Tahun Ajaran 2026/2027
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Pendaftaran SPMB Online
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Selamat datang di portal Seleksi Penerimaan Murid Baru (SPMB) SDN Pulo 01 Pagi. 
            Silakan lengkapi formulir di bawah ini dengan data yang benar.
          </p>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-12 px-6 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 h-fit">
                <Info size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Syarat Usia</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Minimal berusia 6 tahun pada bulan Juli 2026.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600 h-fit">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Zonasi Sekolah</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Wajib berdomisili sesuai alamat di Kartu Keluarga (KK).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-yellow-50 p-3 rounded-2xl text-yellow-600 h-fit">
                <ClipboardCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Dokumen Fisik</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Membawa dokumen asli saat jadwal verifikasi tiba.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 px-6">
        <RegistrationForm />
        
        {/* Tracking Link */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <Link href="/spmb/cek-status">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all group">
              <Search size={20} className="group-hover:scale-110 transition-transform" />
              Sudah Mendaftar? Cek Status Pendaftaran
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}