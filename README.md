# Portofolio (Website Sederhana)

Deskripsi singkat
- Situs portofolio statis sederhana berisi halaman `Home`, `About`, dan `Project`.
- Dibangun dengan HTML dan satu file CSS: penggunaan cocok untuk latihan frontend atau portofolio pribadi.

Struktur proyek
- [index.html](index.html): Halaman beranda (entry point).
- [about.html](about.html): Halaman "About" yang menjelaskan profil, pendidikan, pengalaman, hobi, dan foto.
- [project.html](project.html): Halaman proyek (daftar/preview proyek).
- [css/style.css](css/style.css): Semua gaya (layout, warna, responsivitas).
- img/: Direktori gambar yang dipakai di halaman (gambar profil dsb.).

Penjelasan singkat kode (fokus `about.html`)
- Header: elemen `<header id="header">` berisi judul dan navigasi antar halaman.
- Section utama: `<section class="about-section">` berisi paragraf pembuka (`.intro`), beberapa kartu informasi (`.about-card`) dan kartu hobi (`.hobby-card`).
- Ikon: menggunakan Font Awesome CDN (`<link>` di head) untuk ikon seperti pendidikan, briefcase, gamepad, dll.
- Gambar profil: file berada di `img/` (contoh: "WhatsApp Image 2025-10-02...jpg") — perhatikan spasi dan karakter pada nama file saat dipublikasikan.
- Footer: `<footer id="footer">` berisi hak cipta/credits.

Cara menjalankan
1. Buka file [index.html](index.html) di browser (double-click atau "Open with" → browser).
2. Tidak diperlukan server untuk penggunaan lokal, kecuali jika ingin menguji fetch/route dinamis.

Kustomisasi cepat
- Ubah teks di `about.html` untuk memperbarui profil dan pengalaman.
- Edit `css/style.css` untuk menyesuaikan warna, font, dan layout.
- Ganti/ tambahkan gambar di folder `img/` — hindari spasi pada nama file (gunakan `-` atau `_`).
- Jika butuh ikon lain, kunjungi Font Awesome (versi CDN sudah disertakan).

Catatan teknis & saran
- Pastikan path relatif (`css/style.css`, `img/...`) tetap benar jika memindahkan file.
- Untuk publikasi ke hosting statis (GitHub Pages, Netlify), pastikan mengganti nama file gambar yang mengandung spasi.
- Struktur sederhana ini cocok untuk pengembangan lebih lanjut: menambahkan halaman detail proyek, formulir kontak, atau integrasi deployment.

Kredit
- Dibuat oleh Tegar Mupagiwa Afrian (sesuai footer di `about.html`).


