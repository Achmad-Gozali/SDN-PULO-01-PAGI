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

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<SpmbFormData>({
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
        setSubmitError(insertError.code === "23505"
          ? "NIK ini sudah terdaftar. Silakan cek status pendaftaran Anda."
          : "Terjadi kesalahan. Silakan coba lagi.");
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

  // FIX: FileUploadField dengan feedback nama file setelah dipilih
  const FileUploadField = ({ name, label, hint }: { name: keyof SpmbFormData; label: string; hint?: string }) => {
    const [fileName, setFileName] = useState<string>("");

    return (
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">{label}</label>
        <div className="relative group">
          <input
            type="file"
            {...register(name)}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setFileName(file ? file.name : "");
              // trigger react-hook-form onChange juga
              register(name).onChange(e);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={cn(
            "w-full p-4 md:p-5 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2",
            errors[name]
              ? "border-red-300 bg-red-50"
              : fileName
              ? "border-blue-400 bg-blue-50"
              : "border-slate-200 bg-slate-50 group-hover:border-blue-400 group-hover:bg-blue-50"
          )}>
            {fileName ? (
              <>
                <CheckCircle2 className="text-blue-500" size={22} />
                {/* FIX: tampilkan nama file yang dipilih */}
                <span className="text-xs font-bold text-blue-600 text-center break-all line-clamp-2 px-2">{fileName}</span>
                <span className="text-[10px] text-blue-400">Ketuk untuk ganti file</span>
              </>
            ) : (
              <>
                <Upload className="text-slate-400 group-hover:text-blue-500 transition-colors" size={22} />
                <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 text-center">Pilih {label}</span>
                <span className="text-[10px] text-slate-400">{hint || "PDF/JPG/PNG (Maks 5MB)"}</span>
              </>
            )}
          </div>
        </div>
        {errors[name] && (
          <p className="text-xs font-medium text-red-500 flex items-center gap-1">
            <AlertCircle size={11} /> {errors[name]?.message as string}
          </p>
        )}
      </div>
    );
  };

  // Komponen 3 dropdown tanggal lahir - range 1990 sampai 2030
  const TanggalLahirPicker = () => {
    const [hari, setHari] = React.useState("");
    const [bulan, setBulan] = React.useState("");
    const [tahun, setTahun] = React.useState("");

    const updateValue = (h: string, b: string, t: string) => {
      if (h && b && t) {
        setValue("tanggalLahir", `${t}-${b.padStart(2, "0")}-${h.padStart(2, "0")}`, { shouldValidate: true });
      }
    };

    const hariList = Array.from({ length: 31 }, (_, i) => i + 1);
    const bulanList = [
      { val: "1", label: "Januari" }, { val: "2", label: "Februari" },
      { val: "3", label: "Maret" }, { val: "4", label: "April" },
      { val: "5", label: "Mei" }, { val: "6", label: "Juni" },
      { val: "7", label: "Juli" }, { val: "8", label: "Agustus" },
      { val: "9", label: "September" }, { val: "10", label: "Oktober" },
      { val: "11", label: "November" }, { val: "12", label: "Desember" },
    ];
    // Range 1990 - 2030
    const tahunList = Array.from({ length: 41 }, (_, i) => 2030 - i);

    const selectClass = cn(
      inputClass,
      errors.tanggalLahir ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500"
    );

    return (
      <div className="grid grid-cols-3 gap-2">
        <select value={hari} onChange={(e) => { setHari(e.target.value); updateValue(e.target.value, bulan, tahun); }}
          className={selectClass}>
          <option value="">Tanggal</option>
          {hariList.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        <select value={bulan} onChange={(e) => { setBulan(e.target.value); updateValue(hari, e.target.value, tahun); }}
          className={selectClass}>
          <option value="">Bulan</option>
          {bulanList.map(b => <option key={b.val} value={b.val}>{b.label}</option>)}
        </select>
        <select value={tahun} onChange={(e) => { setTahun(e.target.value); updateValue(hari, bulan, e.target.value); }}
          className={selectClass}>
          <option value="">Tahun</option>
          {tahunList.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input type="hidden" {...register("tanggalLahir")} />
      </div>
    );
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border bg-slate-50 transition-all focus:ring-2 focus:ring-blue-500/20 outline-none text-sm md:text-base";

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
            <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={22} />
            <div>
              <h3 className="font-bold text-emerald-900 text-base md:text-lg">Pendaftaran Berhasil Terkirim!</h3>
              <p className="text-emerald-700 text-sm mt-1 leading-relaxed">
                Terima kasih telah mendaftar di SDN Pulo 01 Pagi. Mohon tunggu informasi selanjutnya via WhatsApp.
              </p>
              <button onClick={() => setIsSuccess(false)} className="mt-3 text-sm font-bold text-emerald-800 hover:underline active:opacity-70">
                Tutup
              </button>
            </div>
          </motion.div>
        )}
        {submitError && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
            <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={22} />
            <div>
              <h3 className="font-bold text-red-900 text-base md:text-lg">Pendaftaran Gagal</h3>
              <p className="text-red-700 text-sm mt-1">{submitError}</p>
              <button onClick={() => setSubmitError(null)} className="mt-3 text-sm font-bold text-red-800 hover:underline active:opacity-70">
                Tutup
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-8">

        {/* Section 1: Jalur */}
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-5 md:mb-8 pb-3 md:pb-4 border-b border-slate-50">
            <div className="bg-yellow-100 p-2 rounded-lg text-yellow-700 shrink-0"><FileText size={18} /></div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">Jalur Pendaftaran</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { value: "ZONASI", label: "Zonasi", desc: "Jarak tempat tinggal ke sekolah (kuota 70%)" },
              { value: "AFIRMASI", label: "Afirmasi", desc: "Keluarga tidak mampu / disabilitas (kuota 15%)" },
              { value: "MUTASI", label: "Mutasi", desc: "Perpindahan tugas orang tua (kuota 5%)" },
            ].map((item) => (
              <label key={item.value} className={cn(
                "relative flex gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98]",
                jalur === item.value ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-300"
              )}>
                <input type="radio" {...register("jalur")} value={item.value} className="absolute opacity-0" />
                <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                  jalur === item.value ? "border-blue-500" : "border-slate-300")}>
                  {jalur === item.value && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{item.label}</span>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
          {errors.jalur && (
            <p className="mt-3 text-xs font-medium text-red-500 flex items-center gap-1">
              <AlertCircle size={11} /> {errors.jalur.message}
            </p>
          )}
        </div>

        {/* Section 2: Data Calon Murid */}
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-5 md:mb-8 pb-3 md:pb-4 border-b border-slate-50">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700 shrink-0"><User size={18} /></div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">Data Calon Murid</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Nama Lengkap Murid</label>
              <input {...register("namaLengkap")} placeholder="Sesuai Akte Kelahiran"
                className={cn(inputClass, errors.namaLengkap ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500")} />
              {errors.namaLengkap && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={11} /> {errors.namaLengkap.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">NIK Calon Murid</label>
              <input {...register("nik")} placeholder="16 Digit NIK" inputMode="numeric"
                className={cn(inputClass, errors.nik ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500")} />
              {errors.nik && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={11} /> {errors.nik.message}</p>}
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Tanggal Lahir</label>
              <TanggalLahirPicker />
              {errors.tanggalLahir && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={11} /> {errors.tanggalLahir.message}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Data Orang Tua */}
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-5 md:mb-8 pb-3 md:pb-4 border-b border-slate-50">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700 shrink-0"><Users size={18} /></div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">Data Orang Tua / Wali</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Nama Orang Tua / Wali</label>
              <input {...register("namaOrangTua")} placeholder="Nama Lengkap Ayah/Ibu/Wali"
                className={cn(inputClass, errors.namaOrangTua ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500")} />
              {errors.namaOrangTua && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={11} /> {errors.namaOrangTua.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Nomor WhatsApp Aktif</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input {...register("whatsapp")} placeholder="Contoh: 081234567890" inputMode="tel"
                  className={cn(inputClass, "pl-11", errors.whatsapp ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500")} />
              </div>
              {errors.whatsapp && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={11} /> {errors.whatsapp.message}</p>}
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Alamat Lengkap Sesuai KK</label>
              <textarea {...register("alamat")} rows={3} placeholder="Tuliskan alamat lengkap termasuk RT/RW, Kelurahan, dan Kecamatan"
                className={cn(inputClass, "resize-none", errors.alamat ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-500")} />
              {errors.alamat && <p className="text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle size={11} /> {errors.alamat.message}</p>}
            </div>
          </div>
        </div>

        {/* Section 4: Dokumen */}
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-5 md:mb-8 pb-3 md:pb-4 border-b border-slate-50">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700 shrink-0"><FileText size={18} /></div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">Dokumen Persyaratan</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <FileUploadField name="fileKK" label="Kartu Keluarga (KK)" hint="KK min. 1 tahun sebelum pendaftaran" />
            <FileUploadField name="fileAkte" label="Akte Kelahiran" />
            <FileUploadField name="fileSPTJM" label="SPTJM (Bermeterai)" hint="Surat Pernyataan Tanggung Jawab Mutlak" />
            <FileUploadField name="fileFoto" label="Pas Foto Terbaru" hint="JPG/PNG, ukuran 3x4 atau 4x6" />
            {jalur === "AFIRMASI" && (
              <div className="col-span-1 sm:col-span-2">
                <FileUploadField name="filePendukung" label="Dokumen KIP / KKS / PKH" hint="Bukti keluarga tidak mampu atau disabilitas" />
              </div>
            )}
            {jalur === "MUTASI" && (
              <div className="col-span-1 sm:col-span-2">
                <FileUploadField name="filePendukung" label="Surat Mutasi Orang Tua" hint="Surat keterangan mutasi/pindah tugas resmi" />
              </div>
            )}
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" disabled={isSubmitting}
            className={cn(
              "w-full py-4 md:py-5 rounded-2xl text-white font-black text-base md:text-lg shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]",
              isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 shadow-blue-700/20"
            )}>
            {isSubmitting
              ? <><Loader2 className="animate-spin" size={22} /> Sedang Mengirim...</>
              : <><CheckCircle2 size={22} /> Kirim Pendaftaran SPMB 2026</>}
          </button>
          <p className="text-center text-slate-400 text-xs mt-4 px-4">
            Dengan menekan tombol di atas, Anda menyetujui bahwa data yang diberikan adalah benar dan sah.
          </p>
        </div>
      </form>
    </div>
  );
}