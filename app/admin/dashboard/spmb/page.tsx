"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Search, CheckCircle2, Clock, XCircle, Eye, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Registration {
  id: string; nama_lengkap: string; nik: string; tanggal_lahir: string;
  nama_orang_tua: string; whatsapp: string; alamat: string; jalur: string;
  file_kk_path: string; file_akte_path: string; file_sptjm_path: string;
  file_foto_path: string; file_pendukung_path: string | null;
  status: "PROSES" | "DITERIMA" | "DITOLAK"; pesan: string; created_at: string;
}

const SUPABASE_STORAGE = "https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/spmb-documents";

const statusConfig = {
  DITERIMA: { icon: CheckCircle2, class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  PROSES: { icon: Clock, class: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  DITOLAK: { icon: XCircle, class: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const jalurConfig: Record<string, string> = {
  ZONASI: "bg-blue-500/10 text-blue-400",
  AFIRMASI: "bg-purple-500/10 text-purple-400",
  MUTASI: "bg-orange-500/10 text-orange-400",
};

export default function AdminSpmbPage() {
  const supabase = createClient();
  const [data, setData] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("SEMUA");
  const [filterJalur, setFilterJalur] = useState("SEMUA");
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateForm, setUpdateForm] = useState({ status: "", pesan: "" });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("DITERIMA");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const { data: registrations } = await supabase.from("spmb_registrations").select("*").order("created_at", { ascending: false });
    setData(registrations || []);
    setIsLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = data.filter((reg) => {
    const matchSearch = reg.nama_lengkap.toLowerCase().includes(search.toLowerCase()) || reg.nik.includes(search);
    const matchStatus = filterStatus === "SEMUA" || reg.status === filterStatus;
    const matchJalur = filterJalur === "SEMUA" || reg.jalur === filterJalur;
    return matchSearch && matchStatus && matchJalur;
  });

  const stats = {
    total: data.length,
    zonasi: data.filter(r => r.jalur === "ZONASI").length,
    afirmasi: data.filter(r => r.jalur === "AFIRMASI").length,
    mutasi: data.filter(r => r.jalur === "MUTASI").length,
    diterima: data.filter(r => r.status === "DITERIMA").length,
    proses: data.filter(r => r.status === "PROSES").length,
    ditolak: data.filter(r => r.status === "DITOLAK").length,
  };

  const toggleSelect = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleSelectAll = () => setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map(r => r.id));

  const handleBulkUpdate = async () => {
    if (!selectedIds.length) return;
    setIsBulkUpdating(true);
    const pesan = bulkStatus === "DITERIMA"
      ? "Selamat! Anda dinyatakan DITERIMA di SDN Pulo 01 Pagi. Harap datang untuk daftar ulang."
      : bulkStatus === "DITOLAK"
      ? "Mohon maaf, berkas Anda tidak memenuhi syarat atau kuota telah penuh."
      : "Berkas sedang diverifikasi oleh panitia.";
    await supabase.from("spmb_registrations").update({ status: bulkStatus, pesan }).in("id", selectedIds);
    setSelectedIds([]);
    fetchData();
    setIsBulkUpdating(false);
  };

  const openDetail = (reg: Registration) => {
    setSelectedReg(reg);
    setUpdateForm({ status: reg.status, pesan: reg.pesan || "" });
  };

  const handleUpdate = async () => {
    if (!selectedReg) return;
    setIsUpdating(true);
    await supabase.from("spmb_registrations").update({ status: updateForm.status, pesan: updateForm.pesan }).eq("id", selectedReg.id);
    await fetchData();
    setSelectedReg(null);
    setIsUpdating(false);
  };

  const exportToCSV = () => {
    const headers = ["Nama Lengkap", "NIK", "Jalur", "Tanggal Lahir", "Nama Orang Tua", "WhatsApp", "Alamat", "Status", "Tanggal Daftar"];
    const rows = data.map(r => [r.nama_lengkap, r.nik, r.jalur, r.tanggal_lahir, r.nama_orang_tua, r.whatsapp, r.alamat, r.status, new Date(r.created_at).toLocaleDateString("id-ID")]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `data-spmb-${new Date().toISOString().split("T")[0]}.csv`; a.click();
  };

  const maskNik = (nik: string) => nik.substring(0, 4) + "****" + nik.substring(12);
  const inputClass = "w-full px-3.5 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all text-sm";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white">Manajemen SPMB</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-0.5">Kelola data pendaftar dan status seleksi</p>
        </div>
        <button onClick={exportToCSV}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all shrink-0">
          <Download size={15} /> <span className="hidden sm:inline">Export</span> CSV
        </button>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
        {[
          { label: "Total", value: stats.total, color: "text-white" },
          { label: "Zonasi", value: stats.zonasi, color: "text-blue-400" },
          { label: "Afirmasi", value: stats.afirmasi, color: "text-purple-400" },
          { label: "Mutasi", value: stats.mutasi, color: "text-orange-400" },
          { label: "Diterima", value: stats.diterima, color: "text-emerald-400" },
          { label: "Diproses", value: stats.proses, color: "text-amber-400" },
          { label: "Ditolak", value: stats.ditolak, color: "text-red-400" },
        ].map(s => (
          <div key={s.label} className="bg-slate-800 rounded-xl p-3 md:p-4 border border-slate-700">
            <p className={cn("text-xl md:text-2xl font-black", s.color)}>{s.value}</p>
            <p className="text-slate-400 text-[10px] md:text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama atau NIK..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-slate-400 text-xs self-center">Status:</span>
          {["SEMUA", "PROSES", "DITERIMA", "DITOLAK"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={cn("px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                filterStatus === s ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 border border-slate-700")}>
              {s}
            </button>
          ))}
          <span className="text-slate-400 text-xs self-center ml-1">Jalur:</span>
          {["SEMUA", "ZONASI", "AFIRMASI", "MUTASI"].map(s => (
            <button key={s} onClick={() => setFilterJalur(s)}
              className={cn("px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                filterJalur === s ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 border border-slate-700")}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Action */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 p-3 md:p-4 bg-blue-600/10 border border-blue-600/20 rounded-xl">
          <span className="text-blue-400 text-sm font-bold">{selectedIds.length} dipilih</span>
          <div className="flex items-center gap-2 ml-auto">
            <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-lg text-white text-xs focus:outline-none">
              <option value="DITERIMA">DITERIMA</option>
              <option value="PROSES">PROSES</option>
              <option value="DITOLAK">DITOLAK</option>
            </select>
            <button onClick={handleBulkUpdate} disabled={isBulkUpdating}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
              {isBulkUpdating ? <><Loader2 className="animate-spin" size={13} /> Proses...</> : "Update"}
            </button>
            <button onClick={() => setSelectedIds([])} className="px-3 py-1.5 bg-slate-700 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-600">Batal</button>
          </div>
        </div>
      )}

      {/* Tabel */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="animate-spin text-slate-400" size={28} /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <FileText size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">Tidak ada data</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-3 md:px-4 py-3">
                    <input type="checkbox" checked={selectedIds.length === filtered.length && filtered.length > 0}
                      onChange={toggleSelectAll} className="w-4 h-4 rounded accent-blue-600" />
                  </th>
                  {["Nama", "NIK", "Jalur", "WA", "Status", "Tanggal", "Aksi"].map(h => (
                    <th key={h} className="text-left text-[10px] md:text-xs font-bold text-slate-400 uppercase px-3 md:px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg) => {
                  const cfg = statusConfig[reg.status];
                  return (
                    <tr key={reg.id} className={cn("border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors",
                      selectedIds.includes(reg.id) && "bg-blue-600/5")}>
                      <td className="px-3 md:px-4 py-3">
                        <input type="checkbox" checked={selectedIds.includes(reg.id)} onChange={() => toggleSelect(reg.id)}
                          className="w-4 h-4 rounded accent-blue-600" />
                      </td>
                      <td className="px-3 md:px-4 py-3 text-white text-xs md:text-sm font-medium">{reg.nama_lengkap}</td>
                      <td className="px-3 md:px-4 py-3 text-slate-400 text-xs font-mono">{maskNik(reg.nik)}</td>
                      <td className="px-3 md:px-4 py-3">
                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", jalurConfig[reg.jalur] || "bg-slate-500/10 text-slate-400")}>
                          {reg.jalur}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-3 text-slate-400 text-xs">{reg.whatsapp}</td>
                      <td className="px-3 md:px-4 py-3">
                        <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border", cfg.class)}>
                          <cfg.icon size={10} /> {reg.status}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-3 text-slate-400 text-xs">{new Date(reg.created_at).toLocaleDateString("id-ID")}</td>
                      <td className="px-3 md:px-4 py-3">
                        <button onClick={() => openDetail(reg)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-[10px] font-bold transition-colors">
                          <Eye size={12} /> Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedReg(null)} />
          <div className="relative bg-slate-800 rounded-t-3xl sm:rounded-3xl border border-slate-700 w-full sm:max-w-lg max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-700 sticky top-0 bg-slate-800">
              <h2 className="text-base font-bold text-white">Detail Pendaftar</h2>
              <button onClick={() => setSelectedReg(null)} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-4 space-y-5">
              <span className={cn("px-3 py-1 rounded-full text-xs font-bold", jalurConfig[selectedReg.jalur])}>
                Jalur {selectedReg.jalur}
              </span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Nama Lengkap", value: selectedReg.nama_lengkap },
                  { label: "NIK", value: maskNik(selectedReg.nik) },
                  { label: "Tanggal Lahir", value: selectedReg.tanggal_lahir },
                  { label: "Nama Orang Tua", value: selectedReg.nama_orang_tua },
                  { label: "WhatsApp", value: selectedReg.whatsapp },
                  { label: "Tanggal Daftar", value: new Date(selectedReg.created_at).toLocaleDateString("id-ID") },
                ].map(item => (
                  <div key={item.label} className="bg-slate-700/50 rounded-xl p-3">
                    <p className="text-slate-400 text-[10px] mb-0.5">{item.label}</p>
                    <p className="text-white text-xs md:text-sm font-medium">{item.value}</p>
                  </div>
                ))}
                <div className="col-span-2 bg-slate-700/50 rounded-xl p-3">
                  <p className="text-slate-400 text-[10px] mb-0.5">Alamat</p>
                  <p className="text-white text-xs md:text-sm">{selectedReg.alamat}</p>
                </div>
              </div>

              {/* Dokumen */}
              <div className="space-y-2">
                <p className="text-slate-300 text-sm font-bold">Dokumen</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "KK", path: selectedReg.file_kk_path },
                    { label: "Akte", path: selectedReg.file_akte_path },
                    { label: "SPTJM", path: selectedReg.file_sptjm_path },
                    { label: "Pas Foto", path: selectedReg.file_foto_path },
                    ...(selectedReg.file_pendukung_path ? [{ label: "Dok. Pendukung", path: selectedReg.file_pendukung_path }] : []),
                  ].map(doc => (
                    <a key={doc.label} href={`${SUPABASE_STORAGE}/${doc.path}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 bg-slate-700 rounded-xl text-xs text-blue-400 hover:bg-slate-600 transition-colors">
                      <FileText size={14} /> {doc.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Update Status */}
              <div className="space-y-3 pt-3 border-t border-slate-700">
                <p className="text-slate-300 text-sm font-bold">Update Status</p>
                <select value={updateForm.status} onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                  className={inputClass}>
                  <option value="PROSES">PROSES</option>
                  <option value="DITERIMA">DITERIMA</option>
                  <option value="DITOLAK">DITOLAK</option>
                </select>
                <textarea value={updateForm.pesan} onChange={(e) => setUpdateForm({ ...updateForm, pesan: e.target.value })}
                  rows={3} placeholder="Pesan untuk pendaftar..."
                  className={cn(inputClass, "resize-none")} />
                <button onClick={handleUpdate} disabled={isUpdating}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2 text-sm">
                  {isUpdating ? <><Loader2 className="animate-spin" size={16} /> Menyimpan...</> : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}