"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Loader2, AlertCircle, CheckCircle2, XCircle, Clock, User, Fingerprint, Printer } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface RegistrationData {
  nik: string;
  nama_lengkap: string;
  nama_orang_tua: string;
  tanggal_lahir: string;
  alamat: string;
  jalur: string;
  status: 'PROSES' | 'DITERIMA' | 'DITOLAK';
  pesan: string;
  created_at: string;
}

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
      .eq("nik", nikInput)
      .single();

    if (error || !data) {
      setSearchResult("NOT_FOUND");
    } else {
      setSearchResult(data as RegistrationData);
    }
    setIsLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const maskNik = (nik: string) => nik.substring(0, 4) + "********" + nik.substring(12);

  const jalurColor: Record<string, string> = {
    ZONASI: "text-blue-700 bg-blue-100",
    AFIRMASI: "text-purple-700 bg-purple-100",
    MUTASI: "text-orange-700 bg-orange-100",
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: fixed; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <section className="pt-32 pb-20 bg-blue-900 text-white relative overflow-hidden no-print">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black mb-4">
            Cek Status Pendaftaran <br className="hidden md:block" /> SPMB 2026
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto">
            Masukkan NIK calon murid untuk melihat hasil seleksi dan status pendaftaran.
          </motion.p>
        </div>
      </section>

      <section className="px-6 -mt-12 relative z-20 flex-grow pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Form Cek */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 p-8 md:p-12 border border-slate-100 no-print">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nomor Induk Kependudukan (NIK)</label>
                <div className="relative">
                  <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input type="text" maxLength={16} placeholder="Contoh: 1234567890123456"
                    value={nikInput} onChange={(e) => setNikInput(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white text-slate-900 font-medium outline-none transition-all text-lg tracking-wider" required />
                </div>
                <p className="mt-2 text-xs text-slate-400 ml-1">* Pastikan NIK terdiri dari 16 digit angka sesuai Kartu Keluarga.</p>
              </div>
              <button type="submit" disabled={isLoading || nikInput.length < 16}
                className={cn("w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-lg",
                  isLoading || nikInput.length < 16
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-blue-700 text-white hover:bg-blue-800 shadow-blue-700/20 active:scale-[0.98]"
                )}>
                {isLoading ? <><Loader2 className="animate-spin" size={24} /> Sedang Mencari...</> : <><Search size={24} /> Cek Hasil Seleksi</>}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {searchResult === 'NOT_FOUND' && (
                <motion.div key="not-found" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-10">
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start gap-4">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600"><AlertCircle size={24} /></div>
                    <div>
                      <h4 className="font-bold text-red-900 mb-1">Data Tidak Ditemukan</h4>
                      <p className="text-red-700 text-sm leading-relaxed">
                        Data pendaftaran dengan NIK <strong>{maskNik(nikInput)}</strong> tidak ditemukan. Mohon periksa kembali atau hubungi panitia SPMB.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {searchResult && searchResult !== 'NOT_FOUND' && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 pt-10 border-t border-slate-100">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest mb-4 shadow-sm",
                        searchResult.status === 'DITERIMA' && "bg-emerald-100 text-emerald-700 border border-emerald-200",
                        searchResult.status === 'PROSES' && "bg-amber-100 text-amber-700 border border-amber-200",
                        searchResult.status === 'DITOLAK' && "bg-rose-100 text-rose-700 border border-rose-200"
                      )}>
                        {searchResult.status === 'DITERIMA' && <CheckCircle2 size={18} />}
                        {searchResult.status === 'PROSES' && <Clock size={18} />}
                        {searchResult.status === 'DITOLAK' && <XCircle size={18} />}
                        {searchResult.status === 'DITERIMA' ? "DITERIMA" : searchResult.status === 'PROSES' ? "SEDANG DIPROSES" : "TIDAK LULUS SELEKSI"}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Nama Calon Murid", value: searchResult.nama_lengkap },
                        { label: "NIK", value: maskNik(searchResult.nik) },
                        { label: "Nama Orang Tua", value: searchResult.nama_orang_tua },
                        { label: "Tanggal Lahir", value: searchResult.tanggal_lahir },
                      ].map(item => (
                        <div key={item.label} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{item.label}</p>
                          <p className="text-slate-900 font-bold">{item.value}</p>
                        </div>
                      ))}
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Jalur Pendaftaran</p>
                        <span className={cn("px-3 py-1 rounded-full text-xs font-bold", jalurColor[searchResult.jalur] || "bg-slate-100 text-slate-700")}>
                          {searchResult.jalur}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Tanggal Daftar</p>
                        <p className="text-slate-900 font-bold">{new Date(searchResult.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                      </div>
                    </div>

                    <div className={cn("p-6 rounded-2xl border-2",
                      searchResult.status === 'DITERIMA' && "bg-emerald-50 border-emerald-100 text-emerald-900",
                      searchResult.status === 'PROSES' && "bg-amber-50 border-amber-100 text-amber-900",
                      searchResult.status === 'DITOLAK' && "bg-rose-50 border-rose-100 text-rose-900"
                    )}>
                      <h5 className="font-bold mb-2">Informasi dari Panitia:</h5>
                      <p className="text-sm leading-relaxed">{searchResult.pesan}</p>
                    </div>

                    {/* Tombol Cetak Bukti */}
                    <button onClick={handlePrint}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition-all">
                      <Printer size={20} /> Cetak / Download Bukti Pendaftaran
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Area Print - hanya muncul saat print */}
          {searchResult && searchResult !== 'NOT_FOUND' && (
            <div id="print-area" ref={printRef} style={{ display: 'none' }}
              className="bg-white p-12 max-w-2xl mx-auto">
              <div style={{ fontFamily: 'Arial, sans-serif', color: '#1e293b' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', borderBottom: '3px solid #1d4ed8', paddingBottom: '16px', marginBottom: '24px' }}>
                  <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#1d4ed8' }}>
                    BUKTI PENDAFTARAN SPMB 2026
                  </h1>
                  <p style={{ fontSize: '14px', margin: 0, color: '#64748b' }}>SDN Pulo 01 Pagi — Jakarta Selatan</p>
                  <p style={{ fontSize: '12px', margin: '4px 0 0 0', color: '#94a3b8' }}>
                    Dicetak pada: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {/* Status */}
                <div style={{
                  textAlign: 'center', padding: '12px', borderRadius: '8px', marginBottom: '24px',
                  backgroundColor: searchResult.status === 'DITERIMA' ? '#d1fae5' : searchResult.status === 'PROSES' ? '#fef3c7' : '#fee2e2',
                  color: searchResult.status === 'DITERIMA' ? '#065f46' : searchResult.status === 'PROSES' ? '#92400e' : '#991b1b',
                  fontWeight: 'bold', fontSize: '16px'
                }}>
                  STATUS: {searchResult.status === 'DITERIMA' ? '✓ DITERIMA' : searchResult.status === 'PROSES' ? '⏳ SEDANG DIPROSES' : '✗ TIDAK LULUS SELEKSI'}
                </div>

                {/* Data */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
                  <tbody>
                    {[
                      ["Nama Lengkap", searchResult.nama_lengkap],
                      ["NIK", maskNik(searchResult.nik)],
                      ["Tanggal Lahir", searchResult.tanggal_lahir],
                      ["Nama Orang Tua/Wali", searchResult.nama_orang_tua],
                      ["Alamat", searchResult.alamat],
                      ["Jalur Pendaftaran", searchResult.jalur],
                      ["Tanggal Mendaftar", new Date(searchResult.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })],
                    ].map(([label, value]) => (
                      <tr key={label} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '10px 8px', fontWeight: 'bold', width: '40%', fontSize: '13px', color: '#475569' }}>{label}</td>
                        <td style={{ padding: '10px 8px', fontSize: '13px' }}>: {value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pesan */}
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '32px' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 8px 0', fontSize: '13px' }}>Informasi dari Panitia:</p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>{searchResult.pesan}</p>
                </div>

                {/* Footer */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    <p style={{ margin: 0 }}>SDN Pulo 01 Pagi</p>
                    <p style={{ margin: 0 }}>Jl. Jemb. Sel., Pulo, Kec. Kby. Baru, Jakarta Selatan</p>
                    <p style={{ margin: 0 }}>sdnpulo01pagi@gmail.com</p>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '11px', color: '#94a3b8' }}>
                    <p style={{ margin: 0 }}>Dokumen ini sah sebagai bukti pendaftaran</p>
                    <p style={{ margin: 0 }}>dan dapat digunakan untuk verifikasi berkas.</p>
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