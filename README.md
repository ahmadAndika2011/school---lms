# Website Sekolah & LMS — SMA Nusantara

> Dibuat oleh **Andika** (satu orang, satu project 😄)

Website sekolah sekaligus **LMS (Learning Management System)** untuk **SMA Nusantara**.
Ia bukan sekadar profile school biasa — di dalamnya ada **manajemen data sekolah**,
**bank soal online**, **ujian dengan jawaban video**, **layanan digital sekolah
(PPDB, KJP, PIP)**, serta **chatbot AI** yang menjawab pertanyaan seputar sekolah.

---

## Tentang Website

Website ini dibangun dengan **Node.js + Express + MongoDB (Mongoose)** dan menggunakan
**EJS** sebagai view engine. Ada 3 peran pengguna (role):

| Role  | Bisa Apa Saja |
|-------|---------------|
| **Admin** | Dashboard admin, kelola data siswa & guru, kelola soal, kelola berita, kelola data pendaftar PPDB/KJP/PIP, izinkan/tutup pendaftaran siswa baru |
| **Guru** | Melihat profile sendiri, membuat soal online (dengan gambar), melihat hasil pengerjaan siswa + video jawaban, menghapus video jawaban siswa |
| **Siswa** | Signup/login (Google atau manual), mengerjakan soal online (dengan upload video jawaban & deteksi keluar tab), melihat hasil & nilai, mengisi layanan PPDB/KJP/PIP, mengubah nama, menghapus akun |

Fitur unggulan:

- 🧠 **AI Assistant** (`POST /api/ai-chat`) — menjawab pertanyaan seputar sekolah
  berdasarkan data yang ada di database (memakai Groq API).
- 📝 **Bank Soal & Ujian Online** — guru buat soal, siswa kerjakan, siswa meng-upload
  video rekaman saat mengerjakan, dan video otomatis dihapus jika sudah kadaluarsa
  (di-cek tiap 5 detik oleh job di `jobs/hapus-video-expired.js`).
- 🏫 **Layanan Digital** — PPDB (Penerimaan Peserta Didik Baru), KJP (Kartu Jakarta
  Pintar), dan PIP (Program Indonesia Pintar). Siswa mengisi form, admin memantau
  datanya.
- 🔗 **Login dengan Google** (OAuth via `google-auth-library`).

---

## Cara Menjalankan

1. Salin `.env` dan isi variabelnya:

   ```
   MONGODB_URI=...
   CLIENT_ID=...            (Google OAuth)
   CLIENT_SECRET=...
   SESSION_SECRET=...
   GROQ_API_KEY=...         (untuk AI chat)
   NODE_ENV=development
   ```

2. Install dependensi & jalankan:

   ```bash
   npm install
   npm run dev      # atau: npm start
   ```

3. Server berjalan di `http://localhost:3000`.

---

## Struktur Folder & File
```
school-&-lms/
├── server.js                  # Entry point: setup express, middleware, mount semua route
├── package.json
├── .env                       # Konfigurasi environment (jangan di-commit)
│
├── config/
│   ├── db.js                  # Koneksi MongoDB (mongoose)
│   └── session.js             # Middleware express-session + store ke MongoStore
│
├── routes/                    # ⭐ Definisi route (URL → handler)
│   ├── home.js
│   ├── ai-chat.js
│   ├── signup.js, login.js, logout.js
│   ├── dashboard-admin.js, izin-signup-siswa.js
│   ├── siswa.js, profile-siswa.js, update-nama-siswa.js
│   ├── hapus-akun-siswa.js, detail-siswa.js, hapus-siswa.js
│   ├── profile-guru.js, guru.js, detail-guru.js
│   ├── tambah-guru.js, hapus-guru.js
│   ├── soal.js, hasil-soal.js, kerjakan-soal.js
│   ├── detail-soal.js, tambah-soal.js, hapus-soal.js
│   ├── layanan-ppdb.js, layanan-ppdb-data.js
│   ├── layanan-ppdb-detail.js, hapus-data-ppdb.js
│   ├── layanan-kjp.js, layanan-kjp-data.js
│   ├── layanan-kjp-detail.js, hapus-data-kjp.js
│   ├── layanan-pip.js, layanan-pip-data.js
│   ├── layanan-pip-detail.js, hapus-data-pip.js
│   ├── tambah-berita.js, detail-berita.js, hapus-berita.js
│   ├── hapus-video.js            # ⚠️ ada tapi BELUM di-mount di server.js
│   ├── tambah-admin.js           # ⚠️ dev seeder, belum di-mount
│   ├── tambah-ekstrakulikuler.js # ⚠️ dev seeder, belum di-mount
│   └── tambah-fasilitas.js       # ⚠️ dev seeder, belum di-mount
│
├── controllers/               # Logika bisnis tiap fitur (dipanggil route)
│   ├── home-controllers.js
│   ├── signup-controllers.js, login-controllers.js, logout-controllers.js
│   ├── dashboard-admin-controllers.js, izin-signup-siswa-controllers.js
│   ├── siswa-controllers.js, profile-siswa-controllers.js
│   ├── update-nama-siswa-controllers.js, hapus-akun-siswa-controllers.js
│   ├── detail-siswa-controllers.js, hapus-siswa-controllers.js
│   ├── profile-guru-controllers.js, guru-controllers.js
│   ├── detail-guru-controllers.js, tambah-guru-controllers.js, hapus-guru-controllers.js
│   ├── soal-controllers.js, hasil-soal-controllers.js
│   ├── kerjakan-soal-controllers.js, detail-soal-controllers.js
│   ├── tambah-soal-controllers.js, hapus-soal-controllers.js
│   ├── layanan-ppdb-controllers.js, layanan-ppdb-data-controllers.js
│   ├── layanan-ppdb-detail-controllers.js, hapus-data-ppdb-controllers.js
│   ├── layanan-kjp-controllers.js, layanan-kjp-data-controllers.js
│   ├── layanan-kjp-detail-controllers.js, hapus-data-kjp-controllers.js
│   ├── layanan-pip-controllers.js, layanan-pip-data-controllers.js
│   ├── layanan-pip-detail-controllers.js, hapus-data-pip=controllers.js
│   ├── tambah-berita-controllers.js, detail-berita-controllers.js
│   ├── hapus-berita-controllers.js
│   └── hapus-video-controllers.js
│
├── models/                    # Schema Mongoose (database)
│   ├── Admin.js, Guru.js, Siswa.js, Soal.js, HasilSoal.js
│   ├── Berita.js, Ekstrakulikuler.js, Fasilitas.js
│   └── LayananPpdb.js, LayananKjp.js, LayananPip.js
│
├── views/                     # Template EJS (tampilan)
│   ├── partials/ (header.ejs, footer.ejs)
│   ├── home.ejs, login.ejs, signup.ejs, dashboard-admin.ejs
│   ├── siswa.ejs, detail-siswa.ejs, profile-siswa.ejs
│   ├── guru.ejs, detail-guru.ejs, profile-guru.ejs, tambah-guru.ejs
│   ├── soal.ejs, tambah-soal.ejs, detail-soal.ejs, kerjakan-soal.ejs, hasil-soal.ejs
│   ├── layanan-ppdb.ejs, layanan-ppdb-data.ejs, layanan-ppdb-detail.ejs
│   ├── layanan-kjp.ejs, layanan-kjp-data.ejs, layanan-kjp-detail.ejs
│   ├── layanan-pip.ejs, layanan-pip-data.ejs, layanan-pip-detail.ejs
│   └── tambah-berita.ejs, detail-berita.ejs
│
├── middleware/
│   ├── check-auth.js          # Wajib login (redirect ke "/" jika tidak login)
│   ├── check-role.js          # Batasi akses sesuai role ("admin"/"guru"/"siswa")
│   └── upload-image.js        # Helper multer untuk upload file/gambar
│
├── jobs/
│   └── hapus-video-expired.js # Hapus video jawaban yang sudah melewati batas waktu
│
├── public/                    # File statis
│   ├── css/                   # 23 file CSS (home, login, dashboard-admin, dll)
│   ├── js/                    # 7 file JS (cursor, header, home, kerjakan-soal, dll)
│   ├── img/                   # hero_campus.webp
│   └── uploads/               # Hasil upload multer
│       ├── gambar-siswa/, gambar-guru/, gambar-soal/, gambar-berita/
│       ├── gambar-siswa-layanan-ppdb/, -kjp/, -pip/
│       └── video-kerjakan-soal/
│
└── utils/                     # (kosong / belum dipakai)
```

---

## Peta Route → File

Semua route di-mount di `server.js` (umumnya `app.use("/", require("./routes/..."))`),
jadi path di tabel berikut adalah full URL. Kolom "Akses" menandakan siapa yang bisa
memanggil route tersebut (dijaga oleh middleware `check-auth` + `check-role`).

### Halaman Publik

| Metode & Route            | File Route              | Controller / View                  | Akses |
|---------------------------|-------------------------|-------------------------------------|-------|
| `GET /`                   | `routes/home.js`        | `controllers/home-controllers.js` → `views/home.ejs` | Publik |
| `GET /berita/detail/:berita_id` | `routes/detail-berita.js` | `controllers/detail-berita-controllers.js` → `views/detail-berita.ejs` | Publik |

### AI Chat

| Metode & Route   | File Route         | Keterangan |
|------------------|--------------------|------------|
| `POST /api/ai-chat` | `routes/ai-chat.js` | Tidak pakai controller — logika langsung di file route (kumpulkan data sekolah → kirim ke Groq API → balas JSON `{ reply }`) |

### Autentikasi

| Metode & Route                | File Route                | Controller / View                  | Akses |
|-------------------------------|---------------------------|-------------------------------------|-------|
| `GET /signup`                 | `routes/signup.js`        | `controllers/signup-controllers.js` → `views/signup.ejs` | Publik |
| `POST /signup/google`         | `routes/signup.js`        | `controllers/signup-controllers.js` (verifikasi token Google) | Publik |
| `POST /signup/complete`       | `routes/signup.js`        | `controllers/signup-controllers.js` (+ upload foto, multer) | Publik |
| `GET /login`                  | `routes/login.js`         | `controllers/login-controllers.js` → `views/login.ejs` | Publik |
| `POST /login`                 | `routes/login.js`         | `controllers/login-controllers.js` | Publik |
| `POST /logout`                | `routes/logout.js`        | `controllers/logout-controllers.js` | Login |

### Admin

| Metode & Route                          | File Route                        | Controller / View | Akses |
|-----------------------------------------|-----------------------------------|-------------------|-------|
| `GET /dashboard-admin`                  | `routes/dashboard-admin.js`       | `controllers/dashboard-admin-controllers.js` → `views/dashboard-admin.ejs` | admin |
| `POST /dashboard-admin/toggle-signup-siswa` | `routes/izin-signup-siswa.js`  | `controllers/izin-signup-siswa-controllers.js` (izin/tutup signup siswa) | admin |
| `GET /siswa`                            | `routes/siswa.js`                 | `controllers/siswa-controllers.js` → `views/siswa.ejs` | admin |
| `GET /siswa/detail/:id_siswa`           | `routes/detail-siswa.js`          | `controllers/detail-siswa-controllers.js` → `views/detail-siswa.ejs` | admin |
| `DELETE /hapus-siswa/:siswa_id`         | `routes/hapus-siswa.js`           | `controllers/hapus-siswa-controllers.js` | admin |
| `GET /guru`                             | `routes/guru.js`                  | `controllers/guru-controllers.js` → `views/guru.ejs` | admin |
| `GET /guru/detail/:id_guru`             | `routes/detail-guru.js`           | `controllers/detail-guru-controllers.js` → `views/detail-guru.ejs` | admin |
| `GET /tambah-guru`                      | `routes/tambah-guru.js`           | `controllers/tambah-guru-controllers.js` → `views/tambah-guru.ejs` | admin |
| `POST /tambah-guru`                     | `routes/tambah-guru.js`           | `controllers/tambah-guru-controllers.js` (+ upload foto) | admin |
| `DELETE /hapus-guru/:guru_id`           | `routes/hapus-guru.js`            | `controllers/hapus-guru-controllers.js` | admin |
| `DELETE /hapus-soal/:id_soal`           | `routes/hapus-soal.js`            | `controllers/hapus-soal-controllers.js` | admin |
| `GET /tambah-berita`                    | `routes/tambah-berita.js`         | `controllers/tambah-berita-controllers.js` → `views/tambah-berita.ejs` | admin |
| `POST /tambah-berita`                   | `routes/tambah-berita.js`         | `controllers/tambah-berita-controllers.js` (+ upload gambar) | admin |
| `DELETE /berita/detail/:id/delete`      | `routes/hapus-berita.js`          | `controllers/hapus-berita-controllers.js` | admin |
| `GET /layanan/ppdb/data`                | `routes/layanan-ppdb-data.js`     | `controllers/layanan-ppdb-data-controllers.js` → `views/layanan-ppdb-data.ejs` | admin |
| `GET /layanan/ppdb/detail/:nisn_siswa`  | `routes/layanan-ppdb-detail.js`   | `controllers/layanan-ppdb-detail-controllers.js` → `views/layanan-ppdb-detail.ejs` | admin |
| `DELETE /layanan/ppdb/data/delete`      | `routes/hapus-data-ppdb.js`       | `controllers/hapus-data-ppdb-controllers.js` | admin |
| `GET /layanan/kjp/data`                 | `routes/layanan-kjp-data.js`      | `controllers/layanan-kjp-data-controllers.js` → `views/layanan-kjp-data.ejs` | admin |
| `GET /layanan/kjp/detail/:nisn_siswa`   | `routes/layanan-kjp-detail.js`    | `controllers/layanan-kjp-detail-controllers.js` → `views/layanan-kjp-detail.ejs` | admin |
| `DELETE /layanan/kjp/data/delete`       | `routes/hapus-data-kjp.js`        | `controllers/hapus-data-kjp-controllers.js` | admin |
| `GET /layanan/pip/data`                 | `routes/layanan-pip-data.js`      | `controllers/layanan-pip-data-controllers.js` → `views/layanan-pip-data.ejs` | admin |
| `GET /layanan/pip/detail/:nisn_siswa`   | `routes/layanan-pip-detail.js`    | `controllers/layanan-pip-detail-controllers.js` → `views/layanan-pip-detail.ejs` | admin |
| `DELETE /layanan/pip/data/delete`       | `routes/hapus-data-pip.js`        | `controllers/hapus-data-pip=controllers.js` | admin |

> ⚠️ Catatan: untuk hapus data PIP, nama file controller-nya adalah
> `hapus-data-pip=controllers.js` (pakai tanda `=`), sesuai require di
> `routes/hapus-data-pip.js`.

### Siswa

| Metode & Route                          | File Route                   | Controller / View | Akses |
|-----------------------------------------|------------------------------|-------------------|-------|
| `GET /profile`                          | `routes/profile-siswa.js`    | `controllers/profile-siswa-controllers.js` → `views/profile-siswa.ejs` | siswa |
| `POST /update-nama-siswa`               | `routes/update-nama-siswa.js` | `controllers/update-nama-siswa-controllers.js` | siswa |
| `DELETE /delete-account/siswa`          | `routes/hapus-akun-siswa.js` | `controllers/hapus-akun-siswa-controllers.js` | siswa |
| `GET /soal`                             | `routes/soal.js`             | `controllers/soal-controllers.js` → `views/soal.ejs` | login |
| `GET /kerjakan-soal/:id_soal`           | `routes/kerjakan-soal.js`    | `controllers/kerjakan-soal-controllers.js` → `views/kerjakan-soal.ejs` | siswa |
| `POST /kerjakan-soal/:id_soal`          | `routes/kerjakan-soal.js`    | `controllers/kerjakan-soal-controllers.js` (+ upload video jawaban) | siswa |
| `GET /hasil-soal/:id_siswa/:id_soal`    | `routes/hasil-soal.js`       | `controllers/hasil-soal-controllers.js` → `views/hasil-soal.ejs` | siswa |
| `GET /layanan/ppdb`                     | `routes/layanan-ppdb.js`     | `controllers/layanan-ppdb-controllers.js` → `views/layanan-ppdb.ejs` | siswa |
| `POST /layanan/ppdb`                    | `routes/layanan-ppdb.js`     | `controllers/layanan-ppdb-controllers.js` (+ upload foto) | siswa |
| `GET /layanan/kjp`                      | `routes/layanan-kjp.js`      | `controllers/layanan-kjp-controllers.js` → `views/layanan-kjp.ejs` | siswa |
| `POST /layanan/kjp`                     | `routes/layanan-kjp.js`      | `controllers/layanan-kjp-controllers.js` (+ upload foto) | siswa |
| `GET /layanan/pip`                      | `routes/layanan-pip.js`      | `controllers/layanan-pip-controllers.js` → `views/layanan-pip.ejs` | siswa |
| `POST /layanan/pip`                     | `routes/layanan-pip.js`      | `controllers/layanan-pip-controllers.js` (+ upload foto) | siswa |
### Guru

| Metode & Route                    | File Route              | Controller / View | Akses |
|-----------------------------------|--------------------------|-------------------|-------|
| `GET /profile-guru`               | `routes/profile-guru.js` | `controllers/profile-guru-controllers.js` → `views/profile-guru.ejs` | guru |
| `GET /tambah-soal`                | `routes/tambah-soal.js`  | `controllers/tambah-soal-controllers.js` → `views/tambah-soal.ejs` | guru |
| `POST /tambah-soal`               | `routes/tambah-soal.js`  | `controllers/tambah-soal-controllers.js` (+ upload gambar soal) | guru |
| `GET /detail-soal/:id_soal`       | `routes/detail-soal.js`  | `controllers/detail-soal-controllers.js` → `views/detail-soal.ejs` | guru |

### File Route yang ADA tapi BELUM di-mount di `server.js`

File berikut ada di folder `routes/`, tetapi belum di-register di `server.js`:

| File Route                  | Isi Route                         | Keterangan |
|-----------------------------|-----------------------------------|------------|
| `routes/hapus-video.js`     | `DELETE /hapus-video/:id_hasil_soal` | Hapus video jawaban siswa (guru) — controller di `controllers/hapus-video-controllers.js` |
| `routes/tambah-admin.js`    | `GET /tambah-admin`               | Dev seeder: membuat akun admin awal (hanya saat `NODE_ENV=development`) |
| `routes/tambah-ekstrakulikuler.js` | `GET /tambah-ekstrakulikuler` | Dev seeder: memasukkan data ekstrakulikuler contoh |
| `routes/tambah-fasilitas.js` | `GET /tambah-fasilitas`           | Dev seeder: memasukkan data fasilitas contoh |

---

## Teknologi & Dependensi

| Paket | Fungsi |
|-------|--------|
| `express` | Web framework & routing |
| `mongoose` | ODM MongoDB |
| `ejs` | View engine (server-side rendering) |
| `express-session` + `connect-mongo` | Session login, disimpan di MongoDB |
| `bcrypt` / `bcryptjs` | Hash password |
| `passport` + `passport-google-oauth20` + `google-auth-library` | Login Google OAuth |
| `multer` | Upload gambar/video |
| `method-override` | Mendukung method `DELETE` di HTML form |
| `express-mongo-sanitize` | Proteksi NoSQL injection |
| `helmet` + `express-rate-limit` | Keamanan (sudah disiapkan, sebagian masih di-comment) |
| `dotenv` | Load variabel `.env` |

> Project ini dibuat **hanya oleh satu orang**, yaitu Andika. Semoga bermanfaat! 🚀
