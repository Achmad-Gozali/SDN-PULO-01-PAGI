const SUPABASE_URL = "https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images";

export interface MadingPost {
  id: string;
  title: string;
  date: string;
  category: 'PENTING' | 'PRESTASI' | 'PENGUMUMAN';
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
}

export const madingPosts: MadingPost[] = [
  {
    id: "1",
    title: "M. Ilham Raih Juara 3 Dacil Putra Lomba Ramadhan Ceria Kecamatan Kebayoran Baru",
    date: "20 Maret 2026",
    category: "PRESTASI",
    excerpt: "Kebanggaan bagi SDN Pulo 01 Pagi! M. Ilham berhasil meraih Juara 3 cabang Dacil Putra dalam ajang Lomba Ramadhan Ceria tingkat Kecamatan Kebayoran Baru.",
    content: `
      <p>SDN Pulo 01 Pagi kembali mengukir prestasi di bulan suci Ramadhan ini. <strong>M. Ilham</strong>, siswa kebanggaan kita, berhasil meraih <strong>Juara 3 cabang Dacil (Adzan dan Iqomah) Putra</strong> dalam ajang Lomba Ramadhan Ceria tingkat Kecamatan Kebayoran Baru.</p>
      <p>Dengan suara yang merdu dan penuh penghayatan, M. Ilham tampil memukau di hadapan dewan juri dan peserta dari berbagai sekolah dasar se-kecamatan. Keberhasilannya ini merupakan buah dari latihan intensif dan bimbingan dari para guru agama di sekolah.</p>
      <p>Selamat kepada M. Ilham atas pencapaian luar biasa ini! Semoga prestasi ini menginspirasi teman-teman lainnya untuk terus mengembangkan bakat dan kemampuan di bidang keagamaan.</p>
    `,
    imageUrl: `${SUPABASE_URL}/PRESTASI-1.jpeg`,
    author: "Humas Sekolah"
  },
  {
    id: "2",
    title: "Mutiara Alfatuzahra Raih Juara 3 Lomba Mendongeng, Chayla Raih Harapan 3 Lomba Menulis Cerita",
    date: "15 Februari 2026",
    category: "PRESTASI",
    excerpt: "Dua siswi SDN Pulo 01 Pagi menorehkan prestasi gemilang di ajang Festival Literasi. Mutiara meraih Juara 3 Mendongeng dan Chayla meraih Harapan 3 Menulis Cerita.",
    content: `
      <p>Prestasi gemilang kembali diraih oleh siswa-siswi SDN Pulo 01 Pagi dalam ajang <strong>Festival Literasi</strong>.</p>
      <p><strong>Mutiara M Alfatuzahra</strong> berhasil meraih <strong>Juara 3 cabang Mendongeng</strong>. Dengan kemampuan bercerita yang memikat dan ekspresi yang menawan, Mutiara berhasil menyampaikan dongeng dengan penuh semangat di hadapan para juri.</p>
      <p><strong>Chayla Destya Jati</strong> meraih <strong>Juara Harapan 3 cabang Menulis Cerita</strong>. Tulisannya yang kreatif dan penuh imajinasi berhasil mencuri perhatian dewan juri di antara puluhan peserta lainnya.</p>
      <p>Selamat kepada Mutiara dan Chayla! Kalian adalah kebanggaan SDN Pulo 01 Pagi.</p>
    `,
    imageUrl: `${SUPABASE_URL}/PRESTASI-2.jpeg`,
    author: "Humas Sekolah"
  },
  {
    id: "3",
    title: "Polisi Cilik SDN Pulo 01 Borong 6 Penghargaan di LKBB Timoer Se-Jabodetabek Open",
    date: "10 Januari 2026",
    category: "PRESTASI",
    excerpt: "Tim Polisi Cilik SDN Pulo 01 Pagi tampil luar biasa dan berhasil meraih 6 kategori juara sekaligus dalam ajang LKBB Timoer Se-Jabodetabek Open.",
    content: `
      <p>Prestasi luar biasa ditorehkan oleh Tim <strong>Polisi Cilik (Pocil) SDN Pulo 01 Pagi</strong> dalam ajang bergengsi <strong>LKBB Timoer Se-Jabodetabek Open</strong>!</p>
      <p>Adapun prestasi yang berhasil diraih adalah:</p>
      <ul>
        <li><strong>Komandan Favorit 1</strong></li>
        <li><strong>Pasukan Favorit 2</strong></li>
        <li><strong>The Best School 3</strong></li>
        <li><strong>Komandan Terbaik 3</strong></li>
        <li><strong>Suporter Terbaik 1</strong></li>
        <li><strong>Juara Harapan Utama 1</strong></li>
      </ul>
      <p>Selamat kepada seluruh anggota tim Polisi Cilik SDN Pulo 01 Pagi!</p>
    `,
    imageUrl: `${SUPABASE_URL}/PRESTASI-4.jpeg`,
    author: "Humas Sekolah"
  },
  {
    id: "4",
    title: "Tim SDN Pulo 01 Raih Juara 2 Lomba Cerdas Cermat HUT RI ke-80",
    date: "20 Agustus 2025",
    category: "PRESTASI",
    excerpt: "Mutiara M Alfathuzahra, Syafiq Al-Fatih, dan Arsyfa Mulia Anwar — trio kelas 6 SDN Pulo 01 Pagi — berhasil meraih Juara 2 Lomba Cerdas Cermat HUT RI ke-80.",
    content: `
      <p>Tiga siswa kelas 6 SDN Pulo 01 Pagi berhasil menorehkan prestasi membanggakan dalam <strong>Lomba Cerdas Cermat HUT RI ke-80</strong>.</p>
      <p><strong>Mutiara M Alfathuzahra, Syafiq Al-Fatih, dan Arsyfa Mulia Anwar</strong> tampil dengan percaya diri dan meraih posisi <strong>Juara 2</strong> dalam kompetisi bergengsi ini.</p>
      <p>Selamat kepada Mutiara, Syafiq, dan Arsyfa! Kalian adalah bukti nyata bahwa siswa SDN Pulo 01 Pagi mampu bersaing dan berprestasi.</p>
    `,
    imageUrl: `${SUPABASE_URL}/PRESTASI-5.jpeg`,
    author: "Humas Sekolah"
  },
  {
    id: "5",
    title: "Tim Marawis SDN Pulo 01 Raih Juara 2 Pentas PAI Kecamatan Kebayoran Baru",
    date: "5 Desember 2025",
    category: "PRESTASI",
    excerpt: "Tim Marawis SDN Pulo 01 Pagi berhasil meraih Juara 2 dalam Lomba Marawis tingkat SD Kecamatan Kebayoran Baru pada ajang Pentas PAI.",
    content: `
      <p>Penampilan memukau Tim Marawis SDN Pulo 01 Pagi berbuah manis! Dalam ajang <strong>Pentas PAI</strong> tingkat Kecamatan Kebayoran Baru, tim marawis berhasil meraih <strong>Juara 2 Lomba Marawis Tingkat SD</strong>.</p>
      <p>Prestasi ini semakin membuktikan bahwa SDN Pulo 01 Pagi tidak hanya unggul dalam bidang akademik, tetapi juga dalam pembinaan seni budaya Islami.</p>
      <p>Selamat kepada seluruh anggota Tim Marawis SDN Pulo 01 Pagi!</p>
    `,
    imageUrl: `${SUPABASE_URL}/PRESTASI-6.jpeg`,
    author: "Humas Sekolah"
  },
  {
    id: "6",
    title: "Tim Pramuka Siaga SDN Pulo 01 Borong Juara di Pesta Besar Siaga Kec. Kebayoran Baru",
    date: "15 Oktober 2025",
    category: "PRESTASI",
    excerpt: "Tim Pramuka Siaga SDN Pulo 01 Pagi tampil gemilang dan meraih banyak penghargaan dalam Lomba Pesta Besar Siaga Tingkat SD se-Kecamatan Kebayoran Baru.",
    content: `
      <p><strong>Tim Pramuka Siaga</strong> SDN Pulo 01 Pagi berhasil meraih banyak penghargaan dalam ajang <strong>Pesta Besar Siaga Tingkat SD se-Kecamatan Kebayoran Baru</strong>.</p>
      <p><strong>Tim Putra:</strong></p>
      <ul>
        <li>Juara 2 Lagu Kebangsaan</li>
        <li>Juara 3 Juara Umum</li>
      </ul>
      <p><strong>Tim Putri:</strong></p>
      <ul>
        <li>Juara 1 Puzzle</li>
        <li>Juara 1 Tari Putri</li>
        <li>Juara 1 Hasta Karya</li>
        <li>Juara 3 Lagu Kebangsaan</li>
      </ul>
      <p>Selamat kepada seluruh anggota Tim Pramuka Siaga SDN Pulo 01 Pagi!</p>
    `,
    imageUrl: `${SUPABASE_URL}/PRESTASI-7.jpeg`,
    author: "Humas Sekolah"
  },
  {
    id: "7",
    title: "Tim Futsal SDN Pulo 01 Raih Juara 2 Gen Smart Cup Vol 6 Tahun 2025",
    date: "1 November 2025",
    category: "PRESTASI",
    excerpt: "Tim Futsal SDN Pulo 01 Pagi berhasil meraih Juara 2 dalam ajang bergengsi Gen Smart Cup Vol 6 Tahun 2025.",
    content: `
      <p>Tim Futsal SDN Pulo 01 Pagi berhasil melaju hingga babak final dan meraih <strong>Juara 2</strong> dalam ajang bergengsi <strong>Gen Smart Cup Vol 6 Tahun 2025</strong>.</p>
      <p>Kekompakan tim, skill individu, dan strategi yang matang menjadi kunci keberhasilan mereka. Pencapaian ini membuktikan bahwa SDN Pulo 01 Pagi juga unggul dalam olahraga.</p>
      <p>Selamat kepada seluruh anggota Tim Futsal SDN Pulo 01 Pagi!</p>
    `,
    imageUrl: `${SUPABASE_URL}/PRESTASI-8.jpeg`,
    author: "Humas Sekolah"
  },
  {
    id: "8",
    title: "Radithya Zhafran Raih Medali Emas & Saydatul Raih Medali Perak Silat IPSI Jakarta Selatan 2025",
    date: "20 September 2025",
    category: "PRESTASI",
    excerpt: "Dua atlet pencak silat SDN Pulo 01 Pagi menorehkan prestasi gemilang di Lomba Silat Piala Pengkot IPSI Jakarta Selatan 2025.",
    content: `
      <p>Dalam <strong>Lomba Silat Piala Pengkot IPSI Jakarta Selatan Tahun 2025</strong>, dua atlet muda SDN Pulo 01 Pagi berhasil naik podium.</p>
      <p><strong>Radithya Zhafran A</strong> meraih <strong>Medali Emas</strong> dengan teknik yang sempurna dan mental juara yang kuat.</p>
      <p><strong>Saydatul Budiyadari</strong> meraih <strong>Medali Perak</strong> dengan penampilan penuh semangat dan teknik yang matang.</p>
      <p>Selamat kepada Radithya dan Saydatul! Kalian adalah atlet-atlet muda kebanggaan SDN Pulo 01 Pagi.</p>
    `,
    imageUrl: `${SUPABASE_URL}/PRESTASI-10.jpeg`,
    author: "Humas Sekolah"
  },
  {
    id: "9",
    title: "Pocil SDN Pulo 01 Raih 4 Penghargaan Bergengsi di LKBB Nasional 2025",
    date: "5 September 2025",
    category: "PRESTASI",
    excerpt: "Tim Polisi Cilik SDN Pulo 01 Pagi kembali mengharumkan nama sekolah dengan meraih 4 penghargaan sekaligus dalam ajang LKBB Nasional 2025.",
    content: `
      <p>Tim <strong>Polisi Cilik (Pocil) SDN Pulo 01 Pagi</strong> kembali membuktikan kelasnya di tingkat nasional dalam ajang <strong>LKBB Nasional 2025</strong>!</p>
      <ul>
        <li><strong>Juara Harapan 1</strong></li>
        <li><strong>Juara Suporter Terbaik 1</strong></li>
        <li><strong>Juara Pasukan Terfavorit 1</strong></li>
        <li><strong>Juara Make Up & Kostum Terbaik 1</strong></li>
      </ul>
      <p>Selamat kepada seluruh anggota Tim Pocil SDN Pulo 01 Pagi! Kalian adalah kebanggaan kami semua.</p>
    `,
    imageUrl: `${SUPABASE_URL}/PRESTASI-11.jpeg`,
    author: "Humas Sekolah"
  },
  {
    id: "10",
    title: "Marching Band SDN Pulo 01 Borong 6 Juara di Batavia Marching Band Competition Nasional 2025",
    date: "1 Agustus 2025",
    category: "PRESTASI",
    excerpt: "Prestasi membanggakan di tingkat nasional! Marching Band SDN Pulo 01 Pagi berhasil meraih 6 kategori juara dalam Batavia Marching Band Competition Tingkat Nasional 2025.",
    content: `
      <p>Dalam ajang bergengsi <strong>Batavia Marching Band Competition Tingkat Nasional 2025</strong>, Marching Band SDN Pulo 01 Pagi meraih 6 kategori juara sekaligus!</p>
      <ul>
        <li>Juara V Kategori Visual Concert Junior</li>
        <li>Juara V Kategori Esemble Junior</li>
        <li>Juara V Kategori Field Commander Junior</li>
        <li>Juara V Kategori Teknik Junior</li>
        <li>Juara V Kategori Artistry Junior</li>
      </ul>
      <p>Selamat kepada seluruh anggota Marching Band SDN Pulo 01 Pagi! Kalian telah mengharumkan nama sekolah di tingkat nasional.</p>
    `,
    imageUrl: `${SUPABASE_URL}/PRESTASI-12.jpeg`,
    author: "Humas Sekolah"
  },
];