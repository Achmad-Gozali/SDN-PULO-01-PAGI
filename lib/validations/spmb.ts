import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export const spmbSchema = z.object({
  namaLengkap: z
    .string()
    .min(3, { message: "Nama lengkap minimal 3 karakter" })
    .max(100, { message: "Nama lengkap terlalu panjang" }),
  nik: z
    .string()
    .length(16, { message: "NIK harus tepat 16 digit" })
    .regex(/^\d+$/, { message: "NIK harus berupa angka" }),
  tanggalLahir: z.string().min(1, { message: "Tanggal lahir wajib diisi" }),
  namaOrangTua: z
    .string()
    .min(3, { message: "Nama orang tua/wali minimal 3 karakter" }),
  whatsapp: z
    .string()
    .min(10, { message: "Nomor WhatsApp minimal 10 digit" })
    .max(15, { message: "Nomor WhatsApp terlalu panjang" })
    .regex(/^\d+$/, { message: "Nomor WhatsApp harus berupa angka" }),
  alamat: z
    .string()
    .min(10, { message: "Alamat lengkap minimal 10 karakter" }),
  fileKK: z
    .any()
    .refine((files) => files?.length > 0, "File Kartu Keluarga wajib diunggah")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Ukuran file KK maksimal 5MB")
    .refine((files) => ALLOWED_TYPES.includes(files?.[0]?.type), "Format file KK harus JPG, PNG, atau PDF"),
  fileAkte: z
    .any()
    .refine((files) => files?.length > 0, "File Akte Kelahiran wajib diunggah")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Ukuran file Akte maksimal 5MB")
    .refine((files) => ALLOWED_TYPES.includes(files?.[0]?.type), "Format file Akte harus JPG, PNG, atau PDF"),
});

export type SpmbFormData = z.infer<typeof spmbSchema>;