import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Target, BookOpen, Monitor, HeartPulse, Dribbble, Users, Home, User, Award, Calendar, ShieldCheck, Building2 } from "lucide-react";

const missions = [
  "Menyelenggarakan proses pembelajaran yang aktif, kreatif, efektif, dan menyenangkan.",
  "Menanamkan nilai-nilai keagamaan dan budi pekerti luhur dalam kehidupan sehari-hari.",
  "Mengembangkan potensi akademik dan non-akademik siswa secara optimal.",
  "Membangun lingkungan sekolah yang bersih, sehat, hijau, dan kondusif.",
  "Menjalin kerjasama yang harmonis antara sekolah, orang tua, dan masyarakat."
];

const facilities = [
  { name: "Ruang Kelas", icon: Home, desc: "Ruang belajar nyaman dan ber-AC untuk mendukung fokus siswa." },
  { name: "Perpustakaan", icon: BookOpen, desc: "Koleksi buku lengkap untuk menumbuhkan minat baca sejak dini." },
  { name: "Lab Komputer", icon: Monitor, desc: "Fasilitas IT modern untuk pengenalan teknologi informasi." },
  { name: "UKS", icon: HeartPulse, desc: "Layanan kesehatan sekolah yang siap siaga bagi seluruh siswa." },
  { name: "Lapangan Olahraga", icon: Dribbble, desc: "Area luas untuk kegiatan olahraga dan upacara bendera." },
  { name: "Mushola", icon: Users, desc: "Sarana ibadah bersih untuk pembinaan karakter religius." }
];

// FIX: unified teacher data — konsisten dengan HeadmasterGreeting
const teachers = [
  { name: "Julaiha, S.Pd.Gr.", role: "Kepala Sekolah", desc: "Memimpin dengan visi untuk kemajuan pendidikan dasar." },
  { name: "Budi Santoso, S.Pd", role: "Guru Kelas 6", desc: "Berpengalaman membimbing siswa menghadapi ujian akhir." },
  { name: "Dewi Lestari, S.Pd", role: "Guru Kelas 1", desc: "Sabar dan kreatif dalam meletakkan fondasi belajar." },
  { name: "Ahmad Fauzi, S.Or", role: "Guru Olahraga", desc: "Membangun semangat kompetitif dan kesehatan fisik siswa." }
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 tracking-tight px-2">
            Profil SDN Pulo 01 Pagi
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed px-2">
            Mewujudkan generasi cerdas, berakhlak mulia, dan berkarakter unggul sejak dini.
          </p>
        </div>
      </section>

      {/* Sejarah & Identitas */}
      <section className="py-14 md:py-20 px-4 md:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-5">
            <div className="inline-block px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">Sejarah Sekolah</div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Dedikasi Pendidikan Sejak Puluhan Tahun</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
              <p>SDN Pulo 01 Pagi berdiri dengan semangat memberikan akses pendidikan dasar yang berkualitas bagi masyarakat di wilayah Kebayoran Baru, Jakarta Selatan. Sejak awal berdirinya, sekolah ini telah menjadi rumah kedua bagi ribuan putra-putri bangsa.</p>
              <p>Dengan dukungan tenaga pendidik yang berdedikasi dan fasilitas yang terus dikembangkan, kami berkomitmen beradaptasi dengan perkembangan zaman tanpa meninggalkan nilai-nilai luhur budaya bangsa.</p>
            </div>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Building2 className="text-blue-600" size={20} /> Identitas Sekolah
            </h3>
            <div className="space-y-3">
              {[
                { label: "NPSN", value: "20106164", icon: ShieldCheck },
                { label: "Akreditasi", value: "A (Sangat Baik)", icon: Award },
                { label: "Status", value: "Negeri", icon: CheckCircle },
                { label: "Tahun Berdiri", value: "1952", icon: Calendar },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 md:gap-3">
                    <item.icon size={16} className="text-blue-500" />
                    <span className="text-xs md:text-sm font-semibold text-slate-500">{item.label}</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-14 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-block px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest">Visi & Misi</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Arah dan Tujuan Kami</h2>
          </div>
          <div className="bg-blue-900 rounded-2xl md:rounded-[3rem] p-8 md:p-12 mb-10 text-center text-white shadow-2xl">
            <h3 className="text-sm md:text-base font-bold text-blue-400 uppercase tracking-widest mb-3">Visi</h3>
            <p className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight italic px-2">
              &quot;Terwujudnya Peserta Didik yang Beriman, Bertaqwa, Berprestasi, dan Berwawasan Lingkungan.&quot;
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {missions.map((mission, idx) => (
              <div key={idx} className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 h-fit shrink-0"><Target size={18} /></div>
                <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">{mission}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <section className="py-14 md:py-20 px-4 md:px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-3">
              <div className="inline-block px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">Fasilitas Pendukung</div>
              <h2 className="text-3xl md:text-4xl font-black">Sarana Belajar Unggulan</h2>
            </div>
            <p className="text-slate-400 max-w-md text-sm md:text-base">Fasilitas modern untuk menunjang kegiatan belajar mengajar dan pengembangan bakat siswa.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {facilities.map((fac, idx) => (
              <div key={idx} className="group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-all">
                <div className="bg-yellow-400 text-blue-900 p-3 md:p-4 rounded-xl md:rounded-2xl w-fit mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <fac.icon size={24} className="md:w-8 md:h-8" />
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-2">{fac.name}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{fac.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tenaga Pendidik */}
      <section className="py-14 md:py-20 px-4 md:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-block px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">Tim Kami</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Tenaga Pendidik & Staf</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base px-2">Dibimbing oleh para profesional yang berdedikasi untuk mencetak generasi masa depan yang gemilang.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {teachers.map((teacher, idx) => (
              <div key={idx} className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 text-center hover:shadow-xl transition-all group">
                <div className="w-14 h-14 md:w-24 md:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-6 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <User size={28} className="md:w-10 md:h-10" />
                </div>
                <h4 className="text-xs md:text-lg font-bold text-slate-900 mb-1 leading-tight">{teacher.name}</h4>
                <p className="text-blue-600 text-[9px] md:text-sm font-bold mb-2 md:mb-3 uppercase tracking-wider">{teacher.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed hidden md:block">{teacher.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}