// Nama cache versi
const CACHE_NAME = 'sts-kelas-4-v2';

const urlsToCache = [
 './index.html',
 './rekap.html',
 './install.html',
  './icon-512.png',
  './baner-sbs.png',
  
  // Daftar file soal dan gambar:
  '/soal/MTK-STS-K4-S2-HOTS.html',
  '/soal/ENG-STS-K4-S2-HOTS.html',
  '/soal/IPAS-STS-K4-S2-HOTS.html',
  '/soal/PJOK-STS-K4-S2-HOTS.html',
  '/soal/PNC-STS-K4-S2-HOTS.html',
  '/soal/IND-STS-K4-S2-HOTS.html',
  '/soal/JWA-STS-K4-S2-HOTS.html',
  '/soal/PAI-STS-K4-S2-HOTS.html',
  '/soal/gambar/cek_uang.jpg',
  '/soal/gambar/infografik_sampah.jpg',
  '/soal/gambar/kembang_desa.jpg',
  '/soal/gambar/kutu_buku.jpg',
  '/soal/gambar/mangga.jpg',
  '/soal/gambar/soal1_wayang.jpg',
  '/soal/gambar/soal2_gamelan.jpg',
  '/soal/gambar/soal3_tembang.jpg',
  '/soal/gambar/soal4_gunungan.jpg',
  '/soal/gambar/soal5_punakawan.jpg',
  '/soal/gambar/soal_19_pisang.jpg',
  '/soal/gambar/soal_20_fauna.jpg',
  '/soal/gambar/soal_24_interaksi.jpg',
  '/soal/gambar/soal_7_interaksi.jpg',
  '/soal/gambar/uang_10000.jpg',
  '/soal/gambar/buah-tin.jpg',
  '/soal/gambar/gambar1_luas_buku.jpg',
  '/soal/gambar/gambar2_volume_gelas.jpg',
  '/soal/gambar/gambar3_bangun_komposisi.jpg',
  '/soal/gambar/gambar4_luas_persegi_satuan.jpg',
  '/soal/gambar/gambar5_volume_kubus.jpg',
  '/soal/gambar/permainan_tradisional.jpg',
  '/soal/gambar/makanan_rendang.jpg',
  '/soal/gambar/tari_piring.jpg',
  '/soal/gambar/piket_kelas.jpg',
  '/soal/gambar/tarik_tambang.jpg',
  '/soal/gambar/q1_kitchen.jpg',
  '/soal/gambar/q2_clock.jpg',
  '/soal/gambar/q3_brush.jpg',
  '/soal/gambar/q4_sink.jpg',
  '/soal/gambar/q5_breakfast.jpg',
  '/soal/gambar/img_langkah_kaki.jpg',
  '/soal/gambar/img_meluncur_air.jpg',
  '/soal/gambar/img_alat_simpai.jpg',
  '/soal/gambar/img_main_jaringikan.jpg',
  '/soal/gambar/jatuh-sepeda.jpg',
  '/soal/gambar/kota-mekah.jpg',
  '/soal/gambar/masuk-rumah.jpg',
  '/soal/gambar/perahu-nuh.jpg',
  '/soal/gambar/img_langkah_rapat.jpg'
];

// Menyimpan file ke cache saat aplikasi pertama kali dibuka (atau saat ganti versi)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  // Memaksa service worker baru untuk langsung mengontrol aplikasi
  self.skipWaiting();
});

// FITUR PENTING: Menghapus cache lama (seperti v1) agar memori tidak penuh
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Jika nama cache tidak sama dengan 'sts-kelas-5-v2', maka hapus!
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Menghapus cache lama', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Memastikan service worker langsung aktif tanpa harus reload dua kali
  self.clients.claim();
});

// Mengambil file dari cache saat aplikasi berjalan offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan file dari cache
        }
        return fetch(event.request); // Ambil dari internet jika tidak ada di cache
      })
  );
});
