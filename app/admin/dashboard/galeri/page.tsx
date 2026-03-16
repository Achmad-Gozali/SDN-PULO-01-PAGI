"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Loader2, X, Upload, AlertCircle, Pencil } from "lucide-react";

const SUPABASE_URL = "https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images";
const CATEGORIES = ["Prestasi", "Pramuka", "Olahraga", "Kegiatan"];

interface GaleriItem { id: string; title: string; category: string; image_url: string; created_at: string; }

export default function AdminGaleriPage() {
  const supabase = createClient();
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const getFileNameFromUrl = (url: string) => url.split("/").pop() || "";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setImageFile(file); setImagePreview(URL.createObjectURL(file));
  };
  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setEditImageFile(file); setEditImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;
    setIsSubmitting(true);
    const fileName = `galeri-${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error } = await supabase.storage.from("gallery-images").upload(fileName, imageFile);
    if (error) { setIsSubmitting(false); return; }
    await supabase.from("galeri").insert({ ...uploadForm, image_url: `${SUPABASE_URL}/${uploadData.path}` });
    setIsUploadOpen(false);
    setUploadForm({ title: "", category: "Prestasi" });
    setImageFile(null); setImagePreview("");
    fetchGaleri(); setIsSubmitting(false);
  };

  const openEdit = (item: GaleriItem) => {
    setEditData(item);
    setEditForm({ title: item.title, category: item.category });
    setEditImageFile(null); setEditImagePreview(item.image_url);
    setIsEditOpen(true);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;
    setIsSubmitting(true);
    let imageUrl = editData.image_url;
    if (editImageFile) {
      const fileName = `galeri-${Date.now()}-${editImageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from("gallery-images").upload(fileName, editImageFile);
      if (!uploadError) {
        imageUrl = `${SUPABASE_URL}/${uploadData.path}`;
        await supabase.storage.from("gallery-images").remove([getFileNameFromUrl(editData.image_url)]);
      }
    }
    await supabase.from("galeri").update({ title: editForm.title, category: editForm.category, image_url: imageUrl }).eq("id", editData.id);
    setIsEditOpen(false); setEditData(null); setEditImageFile(null);
    fetchGaleri(); setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    await supabase.storage.from("gallery-images").remove([getFileNameFromUrl(deleteItem.image_url)]);
    await supabase.from("galeri").delete().eq("id", deleteItem.id);
    setDeleteItem(null); fetchGaleri();
  };

  const inputClass = "w-full px-3.5 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm";

  const ModalWrapper = ({ title, onClose, onSubmit, children }: { title: string; onClose: () => void; onSubmit: (e: React.FormEvent) => void; children: React.ReactNode }) => (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-slate-800 rounded-t-3xl sm:rounded-3xl border border-slate-700 w-full sm:max-w-md max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-700 sticky top-0 bg-slate-800">
          <h2 className="text-base font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={onSubmit} className="p-4 space-y-4">{children}</form>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white">Manajemen Galeri</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-0.5">Kelola foto dan dokumentasi kegiatan</p>
        </div>
        <button onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all shrink-0">
          <Plus size={15} /> Upload Foto
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="animate-spin text-slate-400" size={28} /></div>
      ) : galeriList.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-slate-800 rounded-2xl border border-slate-700">
          <AlertCircle size={32} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">Belum ada foto.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galeriList.map((item) => (
            <div key={item.id} className="group relative rounded-xl md:rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 aspect-square">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-2.5 md:p-3">
                <p className="text-white text-[10px] md:text-xs font-bold truncate">{item.title}</p>
                <p className="text-slate-300 text-[9px] md:text-[10px] mb-1.5">{item.category}</p>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-[10px] md:text-xs font-bold">
                    <Pencil size={10} /> Edit
                  </button>
                  <button onClick={() => setDeleteItem(item)} className="flex-1 flex items-center justify-center gap-1 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 text-[10px] md:text-xs font-bold">
                    <Trash2 size={10} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <ModalWrapper title="Upload Foto" onClose={() => setIsUploadOpen(false)} onSubmit={handleUpload}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Foto</label>
            <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" required />
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="w-full h-40 object-cover rounded-xl" />
              ) : (
                <div className="w-full h-40 rounded-xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center gap-2 hover:border-blue-500 transition-colors">
                  <Upload size={22} className="text-slate-500" />
                  <p className="text-slate-500 text-sm">Klik untuk upload</p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Judul</label>
            <input value={uploadForm.title} onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
              placeholder="Judul foto..." required className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Kategori</label>
            <select value={uploadForm.category} onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
              className={inputClass}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => setIsUploadOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 text-sm">Batal</button>
            <button type="submit" disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2 text-sm">
              {isSubmitting ? <><Loader2 className="animate-spin" size={15} /> Upload...</> : "Upload"}
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* Edit Modal */}
      {isEditOpen && editData && (
        <ModalWrapper title="Edit Foto" onClose={() => setIsEditOpen(false)} onSubmit={handleEdit}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Ganti Foto (opsional)</label>
            <div className="cursor-pointer relative" onClick={() => editFileInputRef.current?.click()}>
              <input ref={editFileInputRef} type="file" accept="image/*" onChange={handleEditImageChange} className="hidden" />
              <img src={editImagePreview} alt="preview" className="w-full h-40 object-cover rounded-xl" />
              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                <div className="text-white text-center"><Upload size={22} className="mx-auto mb-1" /><p className="text-xs font-bold">Klik untuk ganti</p></div>
              </div>
            </div>
            {editImageFile && <p className="text-xs text-blue-400">✓ {editImageFile.name}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Judul</label>
            <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              placeholder="Judul foto..." required className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Kategori</label>
            <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              className={inputClass}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={() => setIsEditOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 text-sm">Batal</button>
            <button type="submit" disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2 text-sm">
              {isSubmitting ? <><Loader2 className="animate-spin" size={15} /> Simpan...</> : "Simpan"}
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* Delete Confirm */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDeleteItem(null)} />
          <div className="relative bg-slate-800 rounded-2xl border border-slate-700 p-6 max-w-sm w-full text-center">
            <Trash2 size={36} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg mb-2">Hapus Foto?</h3>
            <p className="text-slate-400 text-sm mb-5">Foto akan dihapus dari galeri dan storage secara permanen.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteItem(null)} className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 text-sm">Batal</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}