"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Loader2, X, Upload, AlertCircle, Pencil } from "lucide-react";

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
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteItem, setDeleteItem] = useState<GaleriItem | null>(null);
  const [editData, setEditData] = useState<GaleriItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadForm, setUploadForm] = useState({ title: "", category: "Prestasi" });
  const [editForm, setEditForm] = useState({ title: "", category: "Prestasi" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>("");

  const fetchGaleri = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });
    setGaleriList(data || []);
    setIsLoading(false);
  }, []);

  useEffect(() => { fetchGaleri(); }, [fetchGaleri]);

  // Helper: ambil nama file dari URL
  const getFileNameFromUrl = (url: string) => {
    return url.split("/").pop() || "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;
    setIsSubmitting(true);

    const timestamp = Date.now();
    const fileName = `galeri-${timestamp}-${imageFile.name}`;
    const { data: uploadData, error } = await supabase.storage
      .from("gallery-images").upload(fileName, imageFile);

    if (error) { setIsSubmitting(false); return; }

    const imageUrl = `${SUPABASE_URL}/${uploadData.path}`;
    await supabase.from("galeri").insert({ ...uploadForm, image_url: imageUrl });

    setIsUploadOpen(false);
    setUploadForm({ title: "", category: "Prestasi" });
    setImageFile(null);
    setImagePreview("");
    fetchGaleri();
    setIsSubmitting(false);
  };

  const openEdit = (item: GaleriItem) => {
    setEditData(item);
    setEditForm({ title: item.title, category: item.category });
    setEditImageFile(null);
    setEditImagePreview(item.image_url);
    setIsEditOpen(true);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;
    setIsSubmitting(true);

    let imageUrl = editData.image_url;

    // Kalau ada foto baru, upload & hapus foto lama
    if (editImageFile) {
      // Upload foto baru
      const timestamp = Date.now();
      const fileName = `galeri-${timestamp}-${editImageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gallery-images").upload(fileName, editImageFile);

      if (!uploadError) {
        imageUrl = `${SUPABASE_URL}/${uploadData.path}`;

        // FIX: Hapus foto lama dari Storage otomatis
        const oldFileName = getFileNameFromUrl(editData.image_url);
        await supabase.storage.from("gallery-images").remove([oldFileName]);
      }
    }

    await supabase.from("galeri")
      .update({ title: editForm.title, category: editForm.category, image_url: imageUrl })
      .eq("id", editData.id);

    setIsEditOpen(false);
    setEditData(null);
    setEditImageFile(null);
    fetchGaleri();
    setIsSubmitting(false);
  };

  // FIX: Hapus foto dari Storage otomatis saat hapus dari tabel
  const handleDelete = async () => {
    if (!deleteItem) return;

    // Hapus file dari Storage
    const fileName = getFileNameFromUrl(deleteItem.image_url);
    await supabase.storage.from("gallery-images").remove([fileName]);

    // Hapus data dari tabel
    await supabase.from("galeri").delete().eq("id", deleteItem.id);

    setDeleteId(null);
    setDeleteItem(null);
    fetchGaleri();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Manajemen Galeri</h1>
          <p className="text-slate-400 text-sm mt-1">Kelola foto dan dokumentasi kegiatan sekolah</p>
        </div>
        <button onClick={() => setIsUploadOpen(true)}
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
                <p className="text-slate-300 text-[10px] mb-2">{item.category}</p>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-xs font-bold">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => { setDeleteId(item.id); setDeleteItem(item); }}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-xs font-bold">
                    <Trash2 size={12} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Upload */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsUploadOpen(false)} />
          <div className="relative bg-slate-800 rounded-3xl border border-slate-700 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white">Upload Foto Galeri</h2>
              <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Foto</label>
                <div className="relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
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
                <input value={uploadForm.title} onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                  placeholder="Judul foto..." required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Kategori</label>
                <select value={uploadForm.category} onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsUploadOpen(false)}
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

      {/* Modal Edit */}
      {isEditOpen && editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsEditOpen(false)} />
          <div className="relative bg-slate-800 rounded-3xl border border-slate-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white">Edit Foto Galeri</h2>
              <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleEdit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Ganti Foto (opsional)</label>
                <div className="relative cursor-pointer" onClick={() => editFileInputRef.current?.click()}>
                  <input ref={editFileInputRef} type="file" accept="image/*" onChange={handleEditImageChange} className="hidden" />
                  <div className="relative">
                    <img src={editImagePreview} alt="preview" className="w-full h-48 object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                      <div className="text-white text-center">
                        <Upload size={24} className="mx-auto mb-1" />
                        <p className="text-xs font-bold">Klik untuk ganti foto</p>
                      </div>
                    </div>
                  </div>
                </div>
                {editImageFile && (
                  <p className="text-xs text-blue-400">✓ Foto baru dipilih: {editImageFile.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Judul Foto</label>
                <input value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  placeholder="Judul foto..." required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Kategori</label>
                <select value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsEditOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 transition-all">
                  Batal
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Menyimpan...</> : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Konfirmasi Hapus */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => { setDeleteId(null); setDeleteItem(null); }} />
          <div className="relative bg-slate-800 rounded-2xl border border-slate-700 p-6 max-w-sm w-full text-center">
            <Trash2 size={40} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Hapus Foto?</h3>
            <p className="text-slate-400 text-sm mb-6">Foto akan dihapus dari galeri dan storage secara permanen.</p>
            <div className="flex gap-3">
              <button onClick={() => { setDeleteId(null); setDeleteItem(null); }}
                className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 transition-all">
                Batal
              </button>
              <button onClick={handleDelete}
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