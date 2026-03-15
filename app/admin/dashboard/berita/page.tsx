"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Loader2, X, Upload, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const supabase = createClient();

const SUPABASE_URL = "https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images";
const CATEGORIES = ["PRESTASI", "PENGUMUMAN", "PENTING"];

interface Berita {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  author: string;
  date: string;
  created_at: string;
}

export default function AdminBeritaPage() {
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

  useEffect(() => {
    fetchBerita();
  }, [fetchBerita]);

  const openModal = (berita?: Berita) => {
    if (berita) {
      setEditData(berita);
      setForm({
        title: berita.title, excerpt: berita.excerpt, content: berita.content,
        category: berita.category, author: berita.author, date: berita.date, image_url: berita.image_url,
      });
      setImagePreview(berita.image_url);
    } else {
      setEditData(null);
      setForm({
        title: "", excerpt: "", content: "", category: "PRESTASI",
        author: "Humas Sekolah", date: new Date().toLocaleDateString("id-ID"), image_url: "",
      });
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
      const timestamp = Date.now();
      const fileName = `berita-${timestamp}-${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gallery-images").upload(fileName, imageFile);
      if (uploadError) { setIsSubmitting(false); return; }
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Manajemen Berita</h1>
          <p className="text-slate-400 text-sm mt-1">Kelola berita dan pengumuman sekolah</p>
        </div>
        <button onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all">
          <Plus size={18} /> Tambah Berita
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-slate-400" size={32} />
          </div>
        ) : beritaList.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <AlertCircle size={40} className="mx-auto mb-3 opacity-50" />
            <p>Belum ada berita. Tambahkan berita pertama!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {beritaList.map((berita) => (
              <div key={berita.id} className="flex items-center gap-4 p-4 hover:bg-slate-700/30 transition-colors">
                <img src={berita.image_url} alt={berita.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                      berita.category === "PENTING" ? "bg-red-500/10 text-red-400" :
                      berita.category === "PRESTASI" ? "bg-blue-500/10 text-blue-400" :
                      "bg-yellow-500/10 text-yellow-400"
                    )}>{berita.category}</span>
                    <span className="text-slate-500 text-xs">{berita.date}</span>
                  </div>
                  <p className="text-white font-medium text-sm truncate">{berita.title}</p>
                  <p className="text-slate-400 text-xs truncate">{berita.excerpt}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openModal(berita)}
                    className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setDeleteId(berita.id)}
                    className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-slate-800 rounded-3xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white">{editData ? "Edit Berita" : "Tambah Berita Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Foto Berita</label>
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-48 object-cover rounded-xl" />
                  ) : (
                    <div className="w-full h-48 rounded-xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center gap-2 hover:border-blue-500 transition-colors">
                      <Upload size={24} className="text-slate-500" />
                      <p className="text-slate-500 text-sm">Klik untuk upload foto</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-300">Judul</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Judul berita..." required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Kategori</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Penulis</label>
                  <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Nama penulis..." required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-300">Tanggal</label>
                  <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="Contoh: 16 Maret 2026" required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-300">Ringkasan</label>
                  <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    rows={2} placeholder="Ringkasan singkat berita..." required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all resize-none" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-300">Konten (HTML)</label>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={8} placeholder="<p>Isi berita lengkap...</p>" required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all resize-none font-mono text-sm" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 transition-all">
                  Batal
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Menyimpan...</> : "Simpan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDeleteId(null)} />
          <div className="relative bg-slate-800 rounded-2xl border border-slate-700 p-6 max-w-sm w-full text-center">
            <Trash2 size={40} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Hapus Berita?</h3>
            <p className="text-slate-400 text-sm mb-6">Berita yang dihapus tidak bisa dikembalikan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 transition-all">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}