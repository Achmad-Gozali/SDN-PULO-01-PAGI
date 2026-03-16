"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Loader2, X, Upload, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const SUPABASE_URL = "https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images";
const CATEGORIES = ["PRESTASI", "PENGUMUMAN", "PENTING"];

interface Berita {
  id: string; title: string; excerpt: string; content: string;
  image_url: string; category: string; author: string; date: string; created_at: string;
}

export default function AdminBeritaPage() {
  // FIX: supabase dibuat di dalam component, bukan module level
  const supabase = createClient();

  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Berita | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", category: "PRESTASI",
    author: "Humas Sekolah", date: "", image_url: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const fetchBerita = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase.from("berita").select("*").order("created_at", { ascending: false });
    setBeritaList(data || []);
    setIsLoading(false);
  }, []);

  useEffect(() => { fetchBerita(); }, [fetchBerita]);

  const openModal = (berita?: Berita) => {
    if (berita) {
      setEditData(berita);
      setForm({ title: berita.title, excerpt: berita.excerpt, content: berita.content, category: berita.category, author: berita.author, date: berita.date, image_url: berita.image_url });
      setImagePreview(berita.image_url);
    } else {
      setEditData(null);
      setForm({ title: "", excerpt: "", content: "", category: "PRESTASI", author: "Humas Sekolah", date: new Date().toLocaleDateString("id-ID"), image_url: "" });
      setImagePreview("");
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let imageUrl = form.image_url;
    if (imageFile) {
      const fileName = `berita-${Date.now()}-${imageFile.name}`;
      const { data: uploadData, error } = await supabase.storage.from("gallery-images").upload(fileName, imageFile);
      if (error) { setIsSubmitting(false); return; }
      imageUrl = `${SUPABASE_URL}/${uploadData.path}`;
    }
    const payload = { ...form, image_url: imageUrl };
    if (editData) {
      await supabase.from("berita").update(payload).eq("id", editData.id);
    } else {
      await supabase.from("berita").insert(payload);
    }
    setIsModalOpen(false);
    fetchBerita();
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("berita").delete().eq("id", id);
    setDeleteId(null);
    fetchBerita();
  };

  const inputClass = "w-full px-3.5 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white">Manajemen Berita</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-0.5">Kelola berita dan pengumuman sekolah</p>
        </div>
        <button onClick={() => openModal()}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all shrink-0">
          <Plus size={15} /> <span className="hidden sm:inline">Tambah</span> Berita
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-slate-400" size={28} />
          </div>
        ) : beritaList.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <AlertCircle size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">Belum ada berita.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {beritaList.map((berita) => (
              <div key={berita.id} className="flex items-center gap-3 p-3 md:p-4 hover:bg-slate-700/30 transition-colors">
                <img src={berita.image_url} alt={berita.title} className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold uppercase",
                      berita.category === "PENTING" ? "bg-red-500/10 text-red-400" :
                      berita.category === "PRESTASI" ? "bg-blue-500/10 text-blue-400" : "bg-yellow-500/10 text-yellow-400")}>
                      {berita.category}
                    </span>
                    <span className="text-slate-500 text-[10px] hidden sm:block">{berita.date}</span>
                  </div>
                  <p className="text-white font-medium text-xs md:text-sm truncate">{berita.title}</p>
                  <p className="text-slate-400 text-xs truncate hidden sm:block">{berita.excerpt}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => openModal(berita)}
                    className="p-1.5 md:p-2 rounded-lg bg-slate-700 text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => setDeleteId(berita.id)}
                    className="p-1.5 md:p-2 rounded-lg bg-slate-700 text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-slate-800 rounded-t-3xl sm:rounded-3xl border border-slate-700 w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
              <h2 className="text-base md:text-lg font-bold text-white">{editData ? "Edit Berita" : "Tambah Berita"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Foto Berita</label>
                <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-40 md:h-48 object-cover rounded-xl" />
                  ) : (
                    <div className="w-full h-40 md:h-48 rounded-xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center gap-2 hover:border-blue-500 transition-colors">
                      <Upload size={22} className="text-slate-500" />
                      <p className="text-slate-500 text-sm">Klik untuk upload foto</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Judul</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Judul berita..." required className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Kategori</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={inputClass}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Penulis</label>
                  <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Nama penulis..." required className={inputClass} />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Tanggal</label>
                  <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="Contoh: 16 Maret 2026" required className={inputClass} />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Ringkasan</label>
                  <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    rows={2} placeholder="Ringkasan singkat..." required
                    className={cn(inputClass, "resize-none")} />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Konten (HTML)</label>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={7} placeholder="<p>Isi berita lengkap...</p>" required
                    className={cn(inputClass, "resize-none font-mono")} />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 transition-all text-sm">
                  Batal
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2 text-sm">
                  {isSubmitting ? <><Loader2 className="animate-spin" size={16} /> Menyimpan...</> : "Simpan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Konfirmasi Hapus */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDeleteId(null)} />
          <div className="relative bg-slate-800 rounded-2xl border border-slate-700 p-6 max-w-sm w-full text-center">
            <Trash2 size={36} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg mb-2">Hapus Berita?</h3>
            <p className="text-slate-400 text-sm mb-5">Berita yang dihapus tidak bisa dikembalikan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 transition-all text-sm">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all text-sm">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}