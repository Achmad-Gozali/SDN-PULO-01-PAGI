"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Loader2, X, Upload, AlertCircle } from "lucide-react";

const SUPABASE_URL = "https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images";
const CATEGORIES = ["Prestasi", "Pramuka", "Olahraga", "Kegiatan"];

interface GaleriItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
}

export default function AdminGaleriPage() {
  const supabase = createClient();
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ title: "", category: "Prestasi" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // FIX: useCallback agar dependency array useEffect benar
  const fetchGaleri = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });
    setGaleriList(data || []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchGaleri();
  }, [fetchGaleri]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;
    setIsSubmitting(true);

    // FIX: Date.now() di dalam handler, bukan di render
    const timestamp = Date.now();
    const fileName = `galeri-${timestamp}-${imageFile.name}`;
    const { data: uploadData, error } = await supabase.storage
      .from("gallery-images").upload(fileName, imageFile);

    if (error) { setIsSubmitting(false); return; }

    const imageUrl = `${SUPABASE_URL}/${uploadData.path}`;
    await supabase.from("galeri").insert({ ...form, image_url: imageUrl });

    setIsModalOpen(false);
    setForm({ title: "", category: "Prestasi" });
    setImageFile(null);
    setImagePreview("");
    fetchGaleri();
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("galeri").delete().eq("id", id);
    setDeleteId(null);
    fetchGaleri();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Manajemen Galeri</h1>
          <p className="text-slate-400 text-sm mt-1">Kelola foto dan dokumentasi kegiatan sekolah</p>
        </div>
        <button onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all">
          <Plus size={18} /> Upload Foto
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-slate-400" size={32} />
        </div>
      ) : galeriList.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-slate-800 rounded-2xl border border-slate-700">
          <AlertCircle size={40} className="mx-auto mb-3 opacity-50" />
          <p>Belum ada foto. Upload foto pertama!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galeriList.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 aspect-square">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3">
                <p className="text-white text-xs font-bold truncate">{item.title}</p>
                <p className="text-slate-300 text-[10px]">{item.category}</p>
                <button onClick={() => setDeleteId(item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-slate-800 rounded-3xl border border-slate-700 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white">Upload Foto Galeri</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Foto</label>
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" required />
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Judul Foto</label>
                <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
                  placeholder="Judul foto..." required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Kategori</label>
                <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 transition-all">
                  Batal
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Mengupload...</> : "Upload Foto"}
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
            <h3 className="text-white font-bold text-lg mb-2">Hapus Foto?</h3>
            <p className="text-slate-400 text-sm mb-6">Foto yang dihapus tidak bisa dikembalikan.</p>
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