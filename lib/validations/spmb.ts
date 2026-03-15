import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const fileRequired = (label: string) =>
  z.any()
    .refine((files) => files?.length > 0, `${label} wajib diunggah`)
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran ${label} maksimal 5MB`)
    .refine((files) => ALLOWED_TYPES.includes(files?.[0]?.type), `Format ${label} harus JPG, PNG, atau PDF`);

const fileOptional = z.any().optional();

export const spmbSchema = z.object({
  namaLengkap: z.string().min(3, { message: "Nama lengkap minimal 3 karakter" }).max(100),
  nik: z.string().length(16, { message: "NIK harus tepat 16 digit" }).regex(/^\d+$/, { message: "NIK harus berupa angka" }),
  tanggalLahir: z.string().min(1, { message: "Tanggal lahir wajib diisi" }),
  namaOrangTua: z.string().min(3, { message: "Nama orang tua/wali minimal 3 karakter" }),
  whatsapp: z.string().min(10, { message: "Nomor WhatsApp minimal 10 digit" }).max(15).regex(/^\d+$/, { message: "Nomor WhatsApp harus berupa angka" }),
  alamat: z.string().min(10, { message: "Alamat lengkap minimal 10 karakter" }),
  jalur: z.enum(["ZONASI", "AFIRMASI", "MUTASI"], { message: "Pilih jalur pendaftaran" }),
  fileKK: fileRequired("Kartu Keluarga"),
  fileAkte: fileRequired("Akte Kelahiran"),
  fileSPTJM: fileRequired("SPTJM"),
  fileFoto: fileRequired("Pas Foto"),
  // Dokumen pendukung — wajib untuk afirmasi & mutasi, opsional untuk zonasi
  filePendukung: fileOptional,
}).superRefine((data, ctx) => {
  if (data.jalur !== "ZONASI") {
    const files = data.filePendukung as FileList | undefined;
    if (!files || files.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: data.jalur === "AFIRMASI"
          ? "Dokumen KIP/KKS/PKH wajib diunggah untuk jalur Afirmasi"
          : "Surat Mutasi wajib diunggah untuk jalur Mutasi",
        path: ["filePendukung"],
      });
    }
  }
});

export type SpmbFormData = z.infer<typeof spmbSchema>;