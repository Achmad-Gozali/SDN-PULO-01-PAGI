"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { spmbSchema, SpmbFormData } from "@/lib/validations/spmb";
import { motion, AnimatePresence } from "motion/react";
import { User, Users, FileText, CheckCircle2, AlertCircle, Loader2, Upload, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const SUPABASE_URL = "https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/spmb-documents";

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<SpmbFormData>({
    resolver: zodResolver(spmbSchema),
    defaultValues: { jalur: "ZONASI" },
  });

  const jalur = watch("jalur");

  const uploadFile = async (file: File, folder: string, nik: string, timestamp: number) => {
    const supabase = createClient();
    const fileName = `${folder}/${nik}-${timestamp}-${file.name}`;
    const { data, error } = await supabase.storage.from("spmb-documents").upload(fileName, file);
    if (error) throw new Error(`Gagal upload ${folder}`);
    return data.path;
  };

  const onSubmit = async (data: SpmbFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    const supabase = createClient();
    const timestamp = Date.now();

    try {
      const fileKK = (data.fileKK as FileList)[0];
      const fileAkte = (data.fileAkte as FileList)[0];
      const fileSPTJM = (data.fileSPTJM as FileList)[0];
      const fileFoto = (data.fileFoto as FileList)[0];
      const filePendukung = data.filePendukung as FileList | undefined;

      const [kkPath, aktePath, sptjmPath, fotoPath] = await Promise.all([
        uploadFile(fileKK, "kk", data.nik, timestamp),
        uploadFile(fileAkte, "akte", data.nik, timestamp),
        uploadFile(fileSPTJM, "sptjm", data.nik, timestamp),
        uploadFile(fileFoto, "foto", data.nik, timestamp),
      ]);

      let pendukungPath = null;
      if (filePendukung && filePendukung.length > 0) {
        pendukungPath = await uploadFile(filePendukung[0], "pendukung", data.nik, timestamp);
      }

      const { error: insertError } = await supabase.from("spmb_registrations").insert({
        nama_lengkap: data.namaLengkap,
        nik: data.nik,
        tanggal_lahir: data.tanggalLahir,
        nama_orang_tua: data.namaOrangTua,
        whatsapp: data.whatsapp,
        alamat: data.alamat,
        jalur: data.jalur,
        file_kk_path: kkPath,
        file_akte_path: aktePath,
        file_sptjm_path: sptjmPath,
        file_foto_path: fotoPath,
        file_pendukung_path: pendukungPath,
        status: "PROSES",
        pesan: "Berkas sedang diverifikasi oleh panitia.",
      });

      if (insertError) {
        if (insertError.code === "23505") {
          setSubmitError("NIK ini sudah terdaftar. Silakan cek status pendaftaran Anda.");
        } else {
          setSubmitError("Terjadi kesalahan. Silakan coba lagi.");
        }
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Gagal mengupload dokumen. Pastikan koneksi internet Anda stabil.");
    }

    setIsSubmitting(false);
  };

  const FileUploadField = ({ name, label, hint }: { name: keyof SpmbFormData; label: string; hint?: string }) => (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <div className="relative group">
        <input type="file" {...register(name)} accept=".pdf,.jpg,.jpeg,.png"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
        <div className={cn(
          "w-full p-6 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2",
          errors[name] ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50 group-hover:border-blue-400 group-hover:bg-blue-50"
        )}>
          <Upload className="text-slate-400 group-hover:text-blue-500" size={24} />
          <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600">Pilih File {label}</span>
          <span className="text-[10px] text-slate-400">{hint || "PDF/JPG/PNG (Maks 5MB)"}</span>
        </div>
      </div>
      {errors[name] && (
        <p className="text-xs font-medium text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {errors[name]?.message as string}
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4">
            <CheckCircle2 className="text-emerald-600 shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-emerald-900 text-lg">Pendaftaran Berhasil Terkirim!</h3>
              <p className="text-emerald-700 text-sm mt-1">
                Terima kasih telah mendaftar di SDN Pulo 01 Pagi. Mohon tunggu informasi selanjutnya mengenai jadwal verifikasi dokumen via WhatsApp.
              </p>
              <button onClick={() => setIsSuccess(false)} className="mt-4 text-sm font-bold text-emerald-800 hover:underline">
                Tutup Pesan
              </button>
            </div>
          </motion.div>
        )}
        {submitError && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4">
            <AlertCircle className="text-red-600 shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-red-900 text-lg">Pendaftaran Gagal</h3>
              <p className="text-red-700 text-sm mt-1">{submitError}</p>
              <button onClick={() => setSubmitError(null)} className="mt-4 text-sm font-bold text-red-800 hover:underline">
                Tutup Pesan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Section 1: Jalur Pendaftaran */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <div className="bg-yellow-100 p-2 rounded-lg text-yellow-700">
              <FileText size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Jalur Pendaftaran</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: "ZONASI", label: "Zonasi", desc: "Berdasarkan jarak tempat tinggal ke sekolah (kuota 70%)" },
              { value: "AFIRMASI", label: "Afirmasi", desc: "Keluarga tidak mampu / penyandang disabilitas (kuota 15%)" },
              { value: "MUTASI", label: "Mutasi", desc: "Perpindahan tugas orang tua (kuota 5%)" },
            ].map((item) => (
              <label key={item.value} className={cn(
                "relative flex flex-col gap-2 p-5 rounded-2xl border-2 cursor-pointer transition-all",
                jalur === item.value ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
              )}>
                <input type="radio" {...register("jalur")} value={item.value} className="absolute opacity-0" />
                <div className="flex items-center gap-2">
                  <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    jalur === item.value ? "border-blue-500" : "border-slate-300"
                  )}>
                    {jalur === item.value && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                  </div>
                  <span className="font-bold text-slate-900">{item.label}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </label>
            ))}
          </div>
          {errors.jalur && (
            <p className="mt-3 text-xs font-medium text-red-500 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.jalur.message}
            </p>
          )}
        </div>

        {/* Section 2: Data Calon Murid */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700"><User size={20} /></div>
            <h2 className="text-xl font-bold text-slate-900">Data Calon Murid</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "namaLengkap" as const, label: "Nama Lengkap Murid", placeholder: "Sesuai Akte Kelahiran" },
              { name: "nik" as const, label: "NIK Calon Murid", placeholder: "16 Digit NIK" },
            ].map(({ name, label, placeholder }) => (
              <div key={name} className="space-y-2">
                <label className="text-sm font-bold text-slate-700">{label}</label>
                <input {...register(name)} placeholder={placeholder}
                  className={cn("w-full px-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none",
                    errors[name] ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500")} />
                {errors[name] && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors[name]?.message}</p>}
              </div>
            ))}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Tanggal Lahir</label>
              <input {...register("tanggalLahir")} type="date"
                className={cn("w-full px-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none",
                  errors.tanggalLahir ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500")} />
              {errors.tanggalLahir && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.tanggalLahir.message}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Data Orang Tua */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700"><Users size={20} /></div>
            <h2 className="text-xl font-bold text-slate-900">Data Orang Tua / Wali</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Nama Orang Tua / Wali</label>
              <input {...register("namaOrangTua")} placeholder="Nama Lengkap Ayah/Ibu/Wali"
                className={cn("w-full px-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none",
                  errors.namaOrangTua ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500")} />
              {errors.namaOrangTua && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.namaOrangTua.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Nomor WhatsApp Aktif</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input {...register("whatsapp")} placeholder="Contoh: 081234567890"
                  className={cn("w-full pl-12 pr-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none",
                    errors.whatsapp ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500")} />
              </div>
              {errors.whatsapp && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.whatsapp.message}</p>}
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">Alamat Lengkap Sesuai KK</label>
              <textarea {...register("alamat")} rows={4} placeholder="Tuliskan alamat lengkap termasuk RT/RW, Kelurahan, dan Kecamatan"
                className={cn("w-full px-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none resize-none",
                  errors.alamat ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500")} />
              {errors.alamat && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {errors.alamat.message}</p>}
            </div>
          </div>
        </div>

        {/* Section 4: Dokumen */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700"><FileText size={20} /></div>
            <h2 className="text-xl font-bold text-slate-900">Dokumen Persyaratan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FileUploadField name="fileKK" label="Scan Kartu Keluarga (KK)" hint="KK diterbitkan min. 1 tahun sebelum pendaftaran" />
            <FileUploadField name="fileAkte" label="Scan Akte Kelahiran" />
            <FileUploadField name="fileSPTJM" label="SPTJM (Bermeterai)" hint="Surat Pernyataan Tanggung Jawab Mutlak" />
            <FileUploadField name="fileFoto" label="Pas Foto Terbaru" hint="Format JPG/PNG, ukuran 3x4 atau 4x6" />

            {/* Dokumen pendukung khusus jalur */}
            {jalur === "AFIRMASI" && (
              <div className="md:col-span-2">
                <FileUploadField name="filePendukung" label="Dokumen KIP / KKS / PKH" hint="Bukti keluarga tidak mampu atau disabilitas" />
              </div>
            )}
            {jalur === "MUTASI" && (
              <div className="md:col-span-2">
                <FileUploadField name="filePendukung" label="Surat Mutasi / Tugas Orang Tua" hint="Surat keterangan mutasi/pindah tugas resmi" />
              </div>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={isSubmitting}
            className={cn("w-full py-5 rounded-2xl text-white font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3",
              isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 shadow-blue-700/20 active:scale-[0.98]"
            )}>
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={24} /> Sedang Mengirim...</>
            ) : (
              <><CheckCircle2 size={24} /> Kirim Pendaftaran SPMB 2026</>
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