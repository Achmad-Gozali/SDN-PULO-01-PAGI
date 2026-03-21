import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Syarat & Ketentuan — SDN Pulo 01 Pagi",
  description: "Syarat dan ketentuan penggunaan website resmi SDN Pulo 01 Pagi Jakarta Selatan.",
};

export default function SyaratKetentuanPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 mb-8 transition-colors">
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Syarat & Ketentuan</h1>
        <p className="text-sm text-slate-500 mb-10">Terakhir diperbarui: Maret 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">1. Penerimaan Syarat</h2>
            <p>
              Dengan mengakses dan menggunakan website resmi SDN Pulo 01 Pagi (<strong>sdnpulo01pagi.vercel.app</strong>),
              Anda menyatakan telah membaca, memahami, dan menyetujui syarat dan ketentuan yang berlaku.
              Jika Anda tidak menyetujui syarat ini, mohon hentikan penggunaan website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">2. Penggunaan Website</h2>
            <p>Website ini disediakan untuk keperluan:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Penyebaran informasi resmi SDN Pulo 01 Pagi kepada masyarakat.</li>
              <li>Pendaftaran peserta didik baru melalui sistem SPMB online.</li>
              <li>Publikasi berita dan kegiatan sekolah.</li>
              <li>Penyediaan galeri dokumentasi kegiatan sekolah.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">3. Larangan Penggunaan</h2>
            <p>Pengguna dilarang untuk:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Menggunakan website untuk tujuan yang melanggar hukum atau peraturan yang berlaku di Indonesia.</li>
              <li>Menyebarkan informasi palsu, menyesatkan, atau merugikan pihak sekolah.</li>
              <li>Mencoba meretas, merusak, atau mengganggu sistem website.</li>
              <li>Menggunakan konten website untuk kepentingan komersial tanpa izin tertulis dari pihak sekolah.</li>
              <li>Mengumpulkan data pengguna lain melalui website tanpa izin.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">4. Konten Website</h2>
            <p>
              Seluruh konten yang tersedia di website ini, termasuk teks, gambar, logo, dan materi
              lainnya, merupakan milik SDN Pulo 01 Pagi dan dilindungi oleh hak cipta. Dilarang
              mereproduksi atau mendistribusikan konten tanpa izin tertulis dari pihak sekolah.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">5. Pendaftaran SPMB</h2>
            <p>Untuk proses pendaftaran peserta didik baru melalui website ini:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Informasi yang diisi pada formulir pendaftaran harus akurat dan dapat dipertanggungjawabkan.</li>
              <li>Pengisian data palsu dapat mengakibatkan pembatalan pendaftaran.</li>
              <li>Penerimaan peserta didik baru tunduk pada ketentuan dan kuota yang ditetapkan oleh pihak sekolah dan Dinas Pendidikan.</li>
              <li>Keputusan panitia SPMB bersifat final dan tidak dapat diganggu gugat.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">6. Batasan Tanggung Jawab</h2>
            <p>
              SDN Pulo 01 Pagi tidak bertanggung jawab atas kerugian yang timbul akibat:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Gangguan akses atau ketidaktersediaan website karena pemeliharaan atau masalah teknis.</li>
              <li>Kesalahan atau ketidakakuratan informasi yang disebabkan oleh pihak ketiga.</li>
              <li>Penggunaan informasi dari website ini untuk tujuan di luar yang dimaksudkan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">7. Tautan Pihak Ketiga</h2>
            <p>
              Website ini mungkin mengandung tautan ke website pihak ketiga. Kami tidak bertanggung jawab
              atas konten, kebijakan privasi, atau praktik website pihak ketiga tersebut. Penggunaan
              tautan tersebut sepenuhnya menjadi risiko pengguna.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">8. Perubahan Syarat</h2>
            <p>
              Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.
              Perubahan berlaku efektif sejak dipublikasikan di halaman ini. Penggunaan website secara
              berkelanjutan setelah perubahan berarti Anda menerima syarat yang telah diperbarui.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">9. Hukum yang Berlaku</h2>
            <p>
              Syarat dan ketentuan ini diatur oleh hukum yang berlaku di Negara Kesatuan Republik Indonesia.
              Segala sengketa yang timbul akan diselesaikan melalui musyawarah mufakat, dan jika tidak
              tercapai kesepakatan, akan diselesaikan melalui jalur hukum yang berlaku.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">10. Hubungi Kami</h2>
            <p>Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami:</p>
            <ul className="list-none mt-3 space-y-1">
              <li>📍 PQWW+X33, Jl. Jemb. Sel., Pulo, Kec. Kby. Baru, Jakarta Selatan 12140</li>
              <li>📞 (021) 7228205</li>
              <li>✉️ sdnpulo01pagi@gmail.com</li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}