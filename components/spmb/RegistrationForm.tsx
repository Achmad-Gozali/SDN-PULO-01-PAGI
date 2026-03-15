"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { spmbSchema, SpmbFormData } from "@/lib/validations/spmb";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Users,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Upload,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SpmbFormData>({
    resolver: zodResolver(spmbSchema),
  });

  const onSubmit = async (data: SpmbFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const timestamp = Date.now();
    const fileKK = (data.fileKK as FileList)[0];
    const fileAkte = (data.fileAkte as FileList)[0];

    const { data: kkUpload, error: kkError } = await supabase.storage
      .from("spmb-documents")
      .upload(`kk/${data.nik}-${timestamp}-${fileKK.name}`, fileKK);

    if (kkError) {
      setSubmitError("Gagal mengupload file KK. Silakan coba lagi.");
      setIsSubmitting(false);
      return;
    }

    const { data: akteUpload, error: akteError } = await supabase.storage
      .from("spmb-documents")
      .upload(`akte/${data.nik}-${timestamp}-${fileAkte.name}`, fileAkte);

    if (akteError) {
      setSubmitError("Gagal mengupload file Akte. Silakan coba lagi.");
      setIsSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("spmb_registrations")
      .insert({
        nama_lengkap: data.namaLengkap,
        nik: data.nik,
        tanggal_lahir: data.tanggalLahir,
        nama_orang_tua: data.namaOrangTua,
        whatsapp: data.whatsapp,
        alamat: data.alamat,
        file_kk_path: kkUpload.path,
        file_akte_path: akteUpload.path,
        status: "PROSES",
      });

    if (insertError) {
      if (insertError.code === "23505") {
        setSubmitError("NIK ini sudah terdaftar dalam sistem. Silakan cek status pendaftaran Anda.");
      } else {
        setSubmitError("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
      }
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4 shadow-sm"
          >
            <CheckCircle2 className="text-emerald-600 shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-emerald-900 text-lg">Pendaftaran Berhasil Terkirim!</h3>
              <p className="text-emerald-700 text-sm mt-1">
                Terima kasih telah mendaftar di SDN Pulo 01 Pagi. Mohon tunggu informasi selanjutnya mengenai jadwal verifikasi dokumen via WhatsApp.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 text-sm font-bold text-emerald-800 hover:underline"
              >
                Tutup Pesan
              </button>
            </div>
          </motion.div>
        )}

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4 shadow-sm"
          >
            <AlertCircle className="text-red-600 shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-red-900 text-lg">Pendaftaran Gagal</h3>
              <p className="text-red-700 text-sm mt-1">{submitError}</p>
              <button
                onClick={() => setSubmitError(null)}
                className="mt-4 text-sm font-bold text-red-800 hover:underline"
              >
                Tutup Pesan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Data Calon Murid */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
              <User size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Data Calon Murid</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Nama Lengkap Murid</label>
              <input
                {...register("namaLengkap")}
                placeholder="Sesuai Akte Kelahiran"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none",
                  errors.namaLengkap ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500"
                )}
              />
              {errors.namaLengkap && (
                <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.namaLengkap.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">NIK Calon Murid</label>
              <input
                {...register("nik")}
                placeholder="16 Digit NIK"
                maxLength={16}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none",
                  errors.nik ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500"
                )}
              />
              {errors.nik && (
                <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.nik.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Tanggal Lahir</label>
              <input
                {...register("tanggalLahir")}
                type="date"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none",
                  errors.tanggalLahir ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500"
                )}
              />
              {errors.tanggalLahir && (
                <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.tanggalLahir.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Data Orang Tua / Wali */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
              <Users size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Data Orang Tua / Wali</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Nama Orang Tua / Wali</label>
              <input
                {...register("namaOrangTua")}
                placeholder="Nama Lengkap Ayah/Ibu/Wali"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none",
                  errors.namaOrangTua ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500"
                )}
              />
              {errors.namaOrangTua && (
                <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.namaOrangTua.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Nomor WhatsApp Aktif</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  {...register("whatsapp")}
                  placeholder="Contoh: 081234567890"
                  className={cn(
                    "w-full pl-12 pr-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none",
                    errors.whatsapp ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500"
                  )}
                />
              </div>
              {errors.whatsapp && (
                <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.whatsapp.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">Alamat Lengkap Sesuai KK</label>
              <textarea
                {...register("alamat")}
                rows={4}
                placeholder="Tuliskan alamat lengkap termasuk RT/RW, Kelurahan, dan Kecamatan"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none resize-none",
                  errors.alamat ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500"
                )}
              />
              {errors.alamat && (
                <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.alamat.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Dokumen Persyaratan */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
              <FileText size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Dokumen Persyaratan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Scan Kartu Keluarga (KK)</label>
              <div className="relative group">
                <input
                  type="file"
                  {...register("fileKK")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={cn(
                  "w-full p-6 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2",
                  errors.fileKK ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50 group-hover:border-blue-400 group-hover:bg-blue-50"
                )}>
                  <Upload className="text-slate-400 group-hover:text-blue-500" size={24} />
                  <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600">Pilih File KK</span>
                  <span className="text-[10px] text-slate-400">PDF/JPG/PNG (Maks 2MB)</span>
                </div>
              </div>
              {errors.fileKK && (
                <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.fileKK.message as string}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Scan Akte Kelahiran</label>
              <div className="relative group">
                <input
                  type="file"
                  {...register("fileAkte")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={cn(
                  "w-full p-6 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2",
                  errors.fileAkte ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50 group-hover:border-blue-400 group-hover:bg-blue-50"
                )}>
                  <Upload className="text-slate-400 group-hover:text-blue-500" size={24} />
                  <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600">Pilih File Akte</span>
                  <span className="text-[10px] text-slate-400">PDF/JPG/PNG (Maks 2MB)</span>
                </div>
              </div>
              {errors.fileAkte && (
                <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.fileAkte.message as string}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full py-5 rounded-2xl text-white font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3",
              isSubmitting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 shadow-blue-700/20 active:scale-[0.98]"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                Sedang Mengirim...
              </>
            ) : (
              <>
                Kirim Pendaftaran SPMB 2026
                <CheckCircle2 size={24} />
              </>
            )}
          </button>
          <p className="text-center text-slate-400 text-xs mt-6">
            Dengan menekan tombol di atas, Anda menyetujui bahwa data yang diberikan adalah benar dan sah.
          </p>
        </div>
      </form>
    </div>
  );
}