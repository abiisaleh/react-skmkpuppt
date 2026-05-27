import { Question } from '../types';

export const questions: Question[] = [
  {
    id: "entry_1063016371",
    section: "Informasi Layanan",
    title: "Pilih Satuan Kerja (Satker)",
    type: "select",
    options: [
      "KPU Provinsi Papua Tengah",
      "KPU Kabupaten Deiyai",
      "KPU Kabupaten Dogiyai",
      "KPU Kabupaten Intan Jaya",
      "KPU Kabupaten Mimika",
      "KPU Kabupaten Nabire",
      "KPU Kabupaten Paniai",
      "KPU Kabupaten Puncak",
      "KPU Kabupaten Puncak Jaya"
    ]
  },
  {
    id: "entry_1627610245",
    section: "Informasi Layanan",
    title: "Jenis Layanan",
    type: "radio",
    options: [
      "Layanan Pemutakhiran Data Pemilih",
      "Layanan Verifikasi dan Pemutakhiran Data Partai Politik",
      "Layanan PPID",
      "Layanan Pendidikan Pemilih",
      "Layanan Pengaduan Masyarakat",
      "Layanan Kerjasama"
    ]
  },
  {
    id: "entry_1808773534",
    section: "Profil Responden",
    title: "Tanggal Menerima Layanan",
    type: "date",
    description: "Layanan yang Anda pilih saat ini berada pada periode tahun 2026"
  },
  {
    id: "entry_1856999164",
    section: "Profil Responden",
    title: "Jenis Kelamin",
    type: "radio",
    options: ["Laki-Laki", "Perempuan"]
  },
  {
    id: "entry_920799597",
    section: "Profil Responden",
    title: "Pendidikan",
    type: "radio",
    options: [
      "Tidak Sekolah",
      "SD/Sederajat",
      "SMP/Sederajat",
      "SMA/Sederajat",
      "D1/D2/D3",
      "D4/S1",
      "S2",
      "S3"
    ]
  },
  {
    id: "entry_1218160737",
    section: "Profil Responden",
    title: "Usia",
    type: "radio",
    options: [
      "< 17 Tahun",
      "17 - 25 Tahun",
      "26 - 34 Tahun",
      "35 - 44 Tahun",
      "45 - 54 Tahun",
      "55 - 65 Tahun",
      "> 65 Tahun"
    ]
  },
  {
    id: "entry_1965801609",
    section: "Profil Responden",
    title: "Pekerjaan",
    type: "radio",
    options: [
      "ASN",
      "TNI",
      "POLRI",
      "Swasta",
      "Wirausaha",
      "Ibu Rumah Tangga",
      "Pelajar/ Mahasiswa",
      "Petani/ Nelayan",
      "Pekerja Lepas/ Freelance"
    ]
  },
  {
    id: "disabilitas",
    section: "Profil Responden",
    title: "Apakah Anda penyandang/pendamping penyandang disabilitas?",
    type: "radio",
    options: ["Ya", "Tidak"]
  },
  {
    id: "entry_1236261329",
    section: "Profil Responden",
    title: "Jenis disabilitas yang dimiliki/didampingi",
    type: "radio",
    options: [
      "Disabilitas Fisik",
      "Disabilitas Intelektual",
      "Disabilitas Mental",
      "Disabilitas Sensorik"
    ],
    optional: true
  },
  // Dynamic performance indicators (mapping answers 1 to 4)
  {
    id: "entry_1445581200",
    section: "Penilaian Kualitas Layanan",
    title: "Informasi pelayanan tersedia melalui media elektronik maupun nonelektronik",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_1180416296",
    section: "Penilaian Kualitas Layanan",
    title: "Kesesuaian persyaratan dengan informasi yang diberikan",
    type: "rating",
    options: [
      "Sangat Tidak Sesuai",
      "Tidak Sesuai",
      "Sesuai",
      "Sangat Sesuai"
    ]
  },
  {
    id: "entry_552067651",
    section: "Penilaian Kualitas Layanan",
    title: "Standar dan prosedur layanan di informasikan dengan jelas",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_1286819770",
    section: "Penilaian Kualitas Layanan",
    title: "Prosedur/Alur layanan mudah dipahami dan dilakukan",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_1069590004",
    section: "Penilaian Kualitas Layanan",
    title: "Layanan diberikan sesuai prosedur tanpa kecurangan",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_134167973",
    section: "Penilaian Kualitas Layanan",
    title: "Jangka waktu layanan sesuai dengan yang di informasikan",
    type: "rating",
    options: [
      "Sangat Tidak Sesuai",
      "Tidak Sesuai",
      "Sesuai",
      "Sangat Sesuai"
    ]
  },
  {
    id: "entry_1054587047",
    section: "Penilaian Kualitas Layanan",
    title: "Biaya layanan sesuai dengan yang di informasikan",
    type: "rating",
    options: [
      "Sangat Tidak Sesuai",
      "Tidak Sesuai",
      "Sesuai",
      "Sangat Sesuai"
    ]
  },
  {
    id: "entry_1108107551",
    section: "Penilaian Kualitas Layanan",
    title: "Tidak ada pungutan liar (pungli) dalam pelayanan",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_669654690",
    section: "Penilaian Kualitas Layanan",
    title: "Tidak ada percaloan/perantara tidak resmi dalam pelayanan",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_78637134",
    section: "Penilaian Kualitas Layanan",
    title: "Produk layanan yang diterima sesuai dengan yang dipublikasikan",
    type: "rating",
    options: [
      "Sangat Tidak Sesuai",
      "Tidak Sesuai",
      "Sesuai",
      "Sangat Sesuai"
    ]
  },
  {
    id: "entry_313189702",
    section: "Penilaian Kualitas Layanan",
    title: "Aplikasi sistem pelayanan merespon kebutuhan dengan cepat (membuka halaman, konten, pencarian informasi, unduh/unggah)",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_1604113489",
    section: "Penilaian Kualitas Layanan",
    title: "Fitur pada aplikasi sistem layanan mudah digunakan",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_86170556",
    section: "Penilaian Kualitas Layanan",
    title: "Seluruh pengguna layanan dilayani secara adil tanpa diskriminasi",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_1898434051",
    section: "Penilaian Kualitas Layanan",
    title: "Pelayanan diberikan tanpa imbalan uang, barang, atau fasilitas di luar aturan",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_740605731",
    section: "Penilaian Kualitas Layanan",
    title: "Layanan konsultasi dan pengaduan mudah diakses",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  {
    id: "entry_413614946",
    section: "Penilaian Kualitas Layanan",
    title: "Sistem layanan online nyaman dan mudah digunakan",
    type: "rating",
    options: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Setuju",
      "Sangat Setuju"
    ]
  },
  // Kritik dan Saran
  {
    id: "entry_207142440",
    section: "Pesan",
    title: "Kritik & Saran",
    type: "text",
    optional: true
  }
];

