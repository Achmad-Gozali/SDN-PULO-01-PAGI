"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Loader2, AlertCircle, CheckCircle2, XCircle, Clock, Fingerprint, Printer } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface RegistrationData {
  nik: string; nama_lengkap: string; nama_orang_tua: string;
  tanggal_lahir: string; alamat: string; jalur: string;
  status: 'PROSES' | 'DITERIMA' | 'DITOLAK'; pesan: string; created_at: string;
}

const jalurColor: Record<string, string> = {
  ZONASI: "text-blue-700 bg-blue-100",
  AFIRMASI: "text-purple-700 bg-purple-100",
  MUTASI: "text-orange-700 bg-orange-100",
};

export default function CekStatusPage() {
  const [nikInput, setNikInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<RegistrationData | 'NOT_FOUND' | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nikInput.length < 16) return;
    setIsLoading(true);
    setSearchResult(null);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("spmb_registrations")
      .select("nik, nama_lengkap, nama_orang_tua, tanggal_lahir, alamat, jalur, status, pesan, created_at")
      .eq("nik", nikInput).single();
    setSearchResult(error || !data ? "NOT_FOUND" : data as RegistrationData);
    setIsLoading(false);
  };

  const maskNik = (nik: string) => nik.substring(0, 4) + "********" + nik.substring(12);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <section className="pt-24 md:pt-32 pb-14 md:pb-20 bg-blue-900 text-white relative overflow-hidden no-print">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 px-2">
            Cek Status Pendaftaran SPMB 2026
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}
            className="text-blue-100 text-sm md:text-lg max-w-2xl mx-auto px-2">
            Masukkan NIK calon murid untuk melihat hasil seleksi.
          </motion.p>
        </div>
      </section>

      <section className="px-4 md:px-6 -mt-8 md:-mt-12 relative z-20 flex-grow pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
            className="bg-white rounded-2xl md:rounded-[2rem] shadow-2xl shadow-blue-900/10 p-6 md:p-10 border border-slate-100 no-print"
          >
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Induk Kependudukan (NIK)</label>
                <div className="relative">
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" inputMode="numeric" maxLength={16}
                    placeholder="Contoh: 1234567890123456" value={nikInput}
                    onChange={(e) => setNikInput(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white text-slate-900 font-medium outline-none transition-all text-base tracking-wider" required />
                </div>
                <p className="mt-1.5 text-xs text-slate-400">* NIK terdiri dari 16 digit angka sesuai Kartu Keluarga.</p>
              </div>
              <button type="submit" disabled={isLoading || nikInput.length < 16}
                className={cn(
                  "w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98]",
                  isLoading || nikInput.length < 16
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-700 text-white hover:bg-blue-800 shadow-lg shadow-blue-700/20"
                )}>
                {isLoading
                  ? <><Loader2 className="animate-spin" size={20} /> Sedang Mencari...</>
                  : <><Search size={20} /> Cek Hasil Seleksi</>}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {searchResult === 'NOT_FOUND' && (
                <motion.div key="not-found"
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                  className="mt-6">
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600 shrink-0 h-fit"><AlertCircle size={18} /></div>
                    <div>
                      <h4 className="font-bold text-red-900 mb-1 text-sm">Data Tidak Ditemukan</h4>
                      <p className="text-red-700 text-xs md:text-sm leading-relaxed">
                        NIK <strong>{maskNik(nikInput)}</strong> tidak terdaftar. Periksa kembali atau hubungi panitia SPMB.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {searchResult && searchResult !== 'NOT_FOUND' && (
                <motion.div key="result"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 pt-8 border-t border-slate-100">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-black uppercase tracking-widest",
                        searchResult.status === 'DITERIMA' && "bg-emerald-100 text-emerald-700 border border-emerald-200",
                        searchResult.status === 'PROSES' && "bg-amber-100 text-amber-700 border border-amber-200",
                        searchResult.status === 'DITOLAK' && "bg-rose-100 text-rose-700 border border-rose-200"
                      )}>
                        {searchResult.status === 'DITERIMA' && <CheckCircle2 size={15} />}
                        {searchResult.status === 'PROSES' && <Clock size={15} />}
                        {searchResult.status === 'DITOLAK' && <XCircle size={15} />}
                        {searchResult.status === 'DITERIMA' ? "DITERIMA" : searchResult.status === 'PROSES' ? "SEDANG DIPROSES" : "TIDAK LULUS SELEKSI"}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "Nama Calon Murid", value: searchResult.nama_lengkap },
                        { label: "NIK", value: maskNik(searchResult.nik) },
                        { label: "Nama Orang Tua", value: searchResult.nama_orang_tua },
                        { label: "Tanggal Lahir", value: searchResult.tanggal_lahir },
                      ].map(item => (
                        <div key={item.label} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">{item.label}</p>
                          <p className="text-slate-900 font-bold text-sm">{item.value}</p>
                        </div>
                      ))}
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Jalur</p>
                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold", jalurColor[searchResult.jalur])}>{searchResult.jalur}</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Tanggal Daftar</p>
                        <p className="text-slate-900 font-bold text-sm">{new Date(searchResult.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                      </div>
                    </div>

                    <div className={cn("p-4 rounded-xl border-2",
                      searchResult.status === 'DITERIMA' && "bg-emerald-50 border-emerald-100 text-emerald-900",
                      searchResult.status === 'PROSES' && "bg-amber-50 border-amber-100 text-amber-900",
                      searchResult.status === 'DITOLAK' && "bg-rose-50 border-rose-100 text-rose-900")}>
                      <h5 className="font-bold mb-1.5 text-sm">Informasi dari Panitia:</h5>
                      <p className="text-sm leading-relaxed">{searchResult.pesan}</p>
                    </div>

                    <button onClick={() => window.print()}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-900 active:bg-black text-white font-bold transition-all text-sm active:scale-[0.98]">
                      <Printer size={17} /> Cetak / Download Bukti
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Print Area */}
          {searchResult && searchResult !== 'NOT_FOUND' && (
            <div id="print-area" ref={printRef}
              style={{ position: 'absolute', left: '-9999px', top: 0 }}
              className="bg-white p-10 max-w-2xl">
              <div style={{ fontFamily: 'Arial, sans-serif', color: '#1e293b' }}>
                <div style={{ textAlign: 'center', borderBottom: '3px solid #1d4ed8', paddingBottom: '16px', marginBottom: '24px' }}>
                  <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#1d4ed8' }}>BUKTI PENDAFTARAN SPMB 2026</h1>
                  <p style={{ fontSize: '14px', margin: 0, color: '#64748b' }}>SDN Pulo 01 Pagi — Jakarta Selatan</p>
                  <p style={{ fontSize: '12px', margin: '4px 0 0', color: '#94a3b8' }}>
                    Dicetak: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div style={{
                  textAlign: 'center', padding: '12px', borderRadius: '8px', marginBottom: '24px',
                  backgroundColor: searchResult.status === 'DITERIMA' ? '#d1fae5' : searchResult.status === 'PROSES' ? '#fef3c7' : '#fee2e2',
                  color: searchResult.status === 'DITERIMA' ? '#065f46' : searchResult.status === 'PROSES' ? '#92400e' : '#991b1b',
                  fontWeight: 'bold', fontSize: '16px'
                }}>
                  STATUS: {searchResult.status === 'DITERIMA' ? '✓ DITERIMA' : searchResult.status === 'PROSES' ? '⏳ SEDANG DIPROSES' : '✗ TIDAK LULUS SELEKSI'}
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
                  <tbody>
                    {[
                      ["Nama Lengkap", searchResult.nama_lengkap],
                      ["NIK", maskNik(searchResult.nik)],
                      ["Tanggal Lahir", searchResult.tanggal_lahir],
                      ["Nama Orang Tua", searchResult.nama_orang_tua],
                      ["Alamat", searchResult.alamat],
                      ["Jalur", searchResult.jalur],
                      ["Tanggal Daftar", new Date(searchResult.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })],
                    ].map(([label, value]) => (
                      <tr key={label} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '10px 8px', fontWeight: 'bold', width: '40%', fontSize: '13px', color: '#475569' }}>{label}</td>
                        <td style={{ padding: '10px 8px', fontSize: '13px' }}>: {value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '32px' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 8px', fontSize: '13px' }}>Informasi dari Panitia:</p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>{searchResult.pesan}</p>
                </div>
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    <p style={{ margin: 0 }}>SDN Pulo 01 Pagi</p>
                    <p style={{ margin: 0 }}>Jl. Jemb. Sel., Pulo, Jakarta Selatan</p>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '11px', color: '#94a3b8' }}>
                    <p style={{ margin: 0 }}>Dokumen sah sebagai bukti pendaftaran</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}