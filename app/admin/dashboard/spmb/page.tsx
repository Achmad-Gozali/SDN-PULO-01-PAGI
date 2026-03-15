"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Search, CheckCircle2, Clock, XCircle, Eye, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Registration {
  id: string;
  nama_lengkap: string;
  nik: string;
  tanggal_lahir: string;
  nama_orang_tua: string;
  whatsapp: string;
  alamat: string;
  file_kk_path: string;
  file_akte_path: string;
  status: "PROSES" | "DITERIMA" | "DITOLAK";
  pesan: string;
  created_at: string;
}

const SUPABASE_STORAGE = "https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/spmb-documents";

export default function AdminSpmbPage() {
  const supabase = createClient();
  const [data, setData] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("SEMUA");
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateForm, setUpdateForm] = useState({ status: "", pesan: "" });

  const fetchData = async () => {
    setIsLoading(true);
    const { data: registrations } = await supabase
      .from("spmb_registrations")
      .select("*")
      .order("created_at", { ascending: false });
    setData(registrations || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = data.filter((reg) => {
    const matchSearch = reg.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      reg.nik.includes(search);
    const matchStatus = filterStatus === "SEMUA" || reg.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openDetail = (reg: Registration) => {
    setSelectedReg(reg);
    setUpdateForm({ status: reg.status, pesan: reg.pesan || "" });
  };

  const handleUpdate = async () => {
    if (!selectedReg) return;
    setIsUpdating(true);
    await supabase.from("spmb_registrations")
      .update({ status: updateForm.status, pesan: updateForm.pesan })
      .eq("id", selectedReg.id);
    await fetchData();
    setSelectedReg(null);
    setIsUpdating(false);
  };

  const exportToCSV = () => {
    const headers = ["Nama Lengkap", "NIK", "Tanggal Lahir", "Nama Orang Tua", "WhatsApp", "Alamat", "Status", "Tanggal Daftar"];
    const rows = data.map(r => [r.nama_lengkap, r.nik, r.tanggal_lahir, r.nama_orang_tua, r.whatsapp, r.alamat, r.status, new Date(r.created_at).toLocaleDateString("id-ID")]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-spmb-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const maskNik = (nik: string) => nik.substring(0, 4) + "****" + nik.substring(12);

  const statusConfig = {
    DITERIMA: { icon: CheckCircle2, class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    PROSES: { icon: Clock, class: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    DITOLAK: { icon: XCircle, class: "bg-red-500/10 text-red-400 border-red-500/20" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Manajemen SPMB</h1>
          <p className="text-slate-400 text-sm mt-1">Kelola data pendaftar dan status seleksi</p>
        </div>
        <button onClick={exportToCSV}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau NIK..."
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div className="flex gap-2">
          {["SEMUA", "PROSES", "DITERIMA", "DITOLAK"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={cn("px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
                filterStatus === s ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500"
              )}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-slate-400" size={32} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <FileText size={40} className="mx-auto mb-3 opacity-50" />
            <p>Tidak ada data pendaftar</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">Nama</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">NIK</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">WhatsApp</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">Status</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">Tanggal</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg) => {
                  const cfg = statusConfig[reg.status];
                  return (
                    <tr key={reg.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-white text-sm font-medium">{reg.nama_lengkap}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm font-mono">{maskNik(reg.nik)}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{reg.whatsapp}</td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border", cfg.class)}>
                          <cfg.icon size={12} />
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(reg.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => openDetail(reg)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-bold transition-colors">
                          <Eye size={14} /> Detail
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

      {/* Detail Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedReg(null)} />
          <div className="relative bg-slate-800 rounded-3xl border border-slate-700 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white">Detail Pendaftar</h2>
              <button onClick={() => setSelectedReg(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-6">
              {/* Info */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Nama Lengkap", value: selectedReg.nama_lengkap },
                  { label: "NIK", value: maskNik(selectedReg.nik) },
                  { label: "Tanggal Lahir", value: selectedReg.tanggal_lahir },
                  { label: "Nama Orang Tua", value: selectedReg.nama_orang_tua },
                  { label: "WhatsApp", value: selectedReg.whatsapp },
                  { label: "Tanggal Daftar", value: new Date(selectedReg.created_at).toLocaleDateString("id-ID") },
                ].map(item => (
                  <div key={item.label} className="bg-slate-700/50 rounded-xl p-3">
                    <p className="text-slate-400 text-xs mb-1">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                ))}
                <div className="col-span-2 bg-slate-700/50 rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-1">Alamat</p>
                  <p className="text-white text-sm">{selectedReg.alamat}</p>
                </div>
              </div>

              {/* Dokumen */}
              <div className="space-y-2">
                <p className="text-slate-300 text-sm font-bold">Dokumen</p>
                <div className="grid grid-cols-2 gap-3">
                  <a href={`${SUPABASE_STORAGE}/${selectedReg.file_kk_path}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-slate-700 rounded-xl text-sm text-blue-400 hover:bg-slate-600 transition-colors">
                    <FileText size={16} /> Lihat KK
                  </a>
                  <a href={`${SUPABASE_STORAGE}/${selectedReg.file_akte_path}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-slate-700 rounded-xl text-sm text-blue-400 hover:bg-slate-600 transition-colors">
                    <FileText size={16} /> Lihat Akte
                  </a>
                </div>
              </div>

              {/* Update Status */}
              <div className="space-y-3 pt-4 border-t border-slate-700">
                <p className="text-slate-300 text-sm font-bold">Update Status</p>
                <select value={updateForm.status} onChange={(e) => setUpdateForm({...updateForm, status: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all">
                  <option value="PROSES">PROSES</option>
                  <option value="DITERIMA">DITERIMA</option>
                  <option value="DITOLAK">DITOLAK</option>
                </select>
                <textarea value={updateForm.pesan} onChange={(e) => setUpdateForm({...updateForm, pesan: e.target.value})}
                  rows={3} placeholder="Pesan untuk pendaftar..."
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all resize-none text-sm" />
                <button onClick={handleUpdate} disabled={isUpdating}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2">
                  {isUpdating ? <><Loader2 className="animate-spin" size={18} /> Menyimpan...</> : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}