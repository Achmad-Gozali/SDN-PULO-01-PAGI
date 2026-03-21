import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Kebijakan Privasi — SDN Pulo 01 Pagi",
  description: "Kebijakan privasi resmi SDN Pulo 01 Pagi Jakarta Selatan.",
};

export default function KebijakanPrivasiPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 mb-8 transition-colors">
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Kebijakan Privasi</h1>
        <p className="text-sm text-slate-500 mb-10">Terakhir diperbarui: Maret 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">1. Pendahuluan</h2>
            <p>
              SDN Pulo 01 Pagi Jakarta Selatan (&quot;kami&quot;) berkomitmen untuk melindungi privasi seluruh
              pengguna yang mengakses website resmi kami di <strong>sdnpulo01pagi.vercel.app</strong>.
              Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi
              informasi Anda.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">2. Informasi yang Kami Kumpulkan</h2>
            <p>Kami dapat mengumpulkan informasi berikut:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Nama lengkap orang tua/wali dan calon peserta didik yang mendaftar melalui formulir SPMB.</li>
              <li>Nomor telepon dan alamat email yang diisi pada formulir pendaftaran atau kontak.</li>
              <li>Data teknis seperti jenis perangkat, browser, dan halaman yang dikunjungi (melalui layanan analitik).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">3. Penggunaan Informasi</h2>
            <p>Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Memproses pendaftaran peserta didik baru (SPMB).</li>
              <li>Menghubungi orang tua/wali terkait proses penerimaan.</li>
              <li>Meningkatkan kualitas layanan dan konten website.</li>
              <li>Keperluan administrasi sekolah sesuai ketentuan yang berlaku.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">4. Perlindungan Data</h2>
            <p>
              Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi Anda
              dari akses, pengungkapan, perubahan, atau penghancuran yang tidak sah. Data pendaftaran
              hanya dapat diakses oleh pihak sekolah yang berwenang.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">5. Berbagi Informasi dengan Pihak Ketiga</h2>
            <p>
              Kami tidak menjual, memperdagangkan, atau mengalihkan informasi pribadi Anda kepada pihak
              luar tanpa persetujuan Anda, kecuali jika diwajibkan oleh hukum atau peraturan yang berlaku
              di Indonesia.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">6. Cookie</h2>
            <p>
              Website kami mungkin menggunakan cookie untuk meningkatkan pengalaman pengguna. Cookie
              adalah file kecil yang disimpan di perangkat Anda. Anda dapat mengatur browser untuk
              menolak cookie, namun beberapa fitur website mungkin tidak berfungsi optimal.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">7. Hak Anda</h2>
            <p>Anda berhak untuk:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Mengakses data pribadi yang kami simpan tentang Anda.</li>
              <li>Meminta koreksi data yang tidak akurat.</li>
              <li>Meminta penghapusan data Anda sesuai ketentuan yang berlaku.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">8. Perubahan Kebijakan</h2>
            <p>
              Kami berhak memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan akan dipublikasikan
              di halaman ini dengan tanggal pembaruan yang baru. Penggunaan website secara berkelanjutan
              setelah perubahan berarti Anda menyetujui kebijakan yang diperbarui.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-3">9. Hubungi Kami</h2>
            <p>Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami:</p>
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