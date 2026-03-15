"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Loader2, AlertCircle, CheckCircle2, XCircle, Clock, User, Fingerprint } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
// FIX (SUPABASE): import supabase client
import { createClient } from "@/lib/supabase/client";

interface RegistrationData {
  nik: string;
  nama: string;
  status: 'PROSES' | 'DITERIMA' | 'DITOLAK';
  pesan: string;
}

export default function CekStatusPage() {
  const [nikInput, setNikInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<RegistrationData | 'NOT_FOUND' | null>(null);

  // FIX (SUPABASE): query langsung ke tabel 'spmb_registrations' di Supabase
  // Pastikan tabel punya kolom: nik, nama, status, pesan
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nikInput.length < 16) return;

    setIsLoading(true);
    setSearchResult(null);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("spmb_registrations")
      .select("nik, nama, status, pesan")
      .eq("nik", nikInput)
      .single();

    if (error || !data) {
      setSearchResult("NOT_FOUND");
    } else {
      setSearchResult(data as RegistrationData);
    }

    setIsLoading(false);
  };

  const maskNik = (nik: string) => {
    return nik.substring(0, 4) + "********" + nik.substring(12);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black mb-4"
          >
            Cek Status Pendaftaran <br className="hidden md:block" /> SPMB 2026
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto"
          >
            Masukkan Nomor Induk Kependudukan (NIK) calon murid untuk melihat hasil seleksi dan status pendaftaran terbaru.
          </motion.p>
        </div>
      </section>

      {/* Search Form Section */}
      <section className="px-6 -mt-12 relative z-20 flex-grow pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 p-8 md:p-12 border border-slate-100"
          >
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="relative">
                <label htmlFor="nik" className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <div className="relative">
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    id="nik"
                    type="text"
                    maxLength={16}
                    placeholder="Contoh: 1234567890123456"
                    value={nikInput}
                    onChange={(e) => setNikInput(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white text-slate-900 font-medium outline-none transition-all text-lg tracking-wider"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-slate-400 ml-1">
                  * Pastikan NIK terdiri dari 16 digit angka sesuai Kartu Keluarga.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || nikInput.length < 16}
                className={cn(
                  "w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-lg",
                  isLoading || nikInput.length < 16
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-blue-700 text-white hover:bg-blue-800 shadow-blue-700/20 active:scale-[0.98]"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Sedang Mencari...
                  </>
                ) : (
                  <>
                    <Search size={24} />
                    Cek Hasil Seleksi
                  </>
                )}
              </button>
            </form>

            {/* Results Area */}
            <AnimatePresence mode="wait">
              {searchResult === 'NOT_FOUND' && (
                <motion.div
                  key="not-found"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-10"
                >
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start gap-4">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-900 mb-1">Data Tidak Ditemukan</h4>
                      <p className="text-red-700 text-sm leading-relaxed">
                        {/* FIX: NIK di-mask agar tidak tampil polos, pakai maskNik() */}
                        Data pendaftaran dengan NIK <strong>{maskNik(nikInput)}</strong> tidak ditemukan dalam sistem kami. 
                        Mohon periksa kembali nomor yang Anda masukkan atau hubungi panitia SPMB jika Anda merasa sudah mendaftar.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {searchResult && searchResult !== 'NOT_FOUND' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 pt-10 border-t border-slate-100"
                >
                  <div className="space-y-8">
                    {/* Status Badge */}
                    <div className="text-center">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest mb-4 shadow-sm",
                        searchResult.status === 'DITERIMA' && "bg-emerald-100 text-emerald-700 border border-emerald-200",
                        searchResult.status === 'PROSES' && "bg-amber-100 text-amber-700 border border-amber-200",
                        searchResult.status === 'DITOLAK' && "bg-rose-100 text-rose-700 border border-rose-200"
                      )}>
                        {searchResult.status === 'DITERIMA' && <CheckCircle2 size={18} />}
                        {searchResult.status === 'PROSES' && <Clock size={18} />}
                        {searchResult.status === 'DITOLAK' && <XCircle size={18} />}
                        
                        {searchResult.status === 'DITERIMA' && "DITERIMA"}
                        {searchResult.status === 'PROSES' && "SEDANG DIPROSES"}
                        {searchResult.status === 'DITOLAK' && "TIDAK LULUS SELEKSI"}
                      </div>
                    </div>

                    {/* Data Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                          <User size={16} />
                          <span className="text-xs font-bold uppercase tracking-wider">Nama Calon Murid</span>
                        </div>
                        <p className="text-lg font-black text-slate-900 uppercase">{searchResult.nama}</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                          <Fingerprint size={16} />
                          <span className="text-xs font-bold uppercase tracking-wider">Nomor NIK</span>
                        </div>
                        <p className="text-lg font-black text-slate-900 tracking-widest">{maskNik(searchResult.nik)}</p>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className={cn(
                      "p-8 rounded-3xl border-2",
                      searchResult.status === 'DITERIMA' && "bg-emerald-50/50 border-emerald-100 text-emerald-900",
                      searchResult.status === 'PROSES' && "bg-amber-50/50 border-amber-100 text-amber-900",
                      searchResult.status === 'DITOLAK' && "bg-rose-50/50 border-rose-100 text-rose-900"
                    )}>
                      <h5 className="font-bold mb-3">Informasi Panitia:</h5>
                      <p className="leading-relaxed font-medium">{searchResult.pesan}</p>
                    </div>

                    {/* Action Button */}
                    {searchResult.status === 'DITERIMA' && (
                      <div className="text-center pt-4">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20">
                          Unduh Surat Kelulusan (PDF)
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}