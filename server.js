require("dotenv").config();

const express = require("express");
const app = express();

const methodOverride = require("method-override");
const path = require("path");
const connectDB = require("./config/db");
const sessionMiddleware = require("./config/session");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// 1. Database
connectDB();

// 2. Keamanan Dasar & Limiter
app.disable("x-powered-by");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Terlalu banyak permintaan, coba lagi nanti.",
// });

// 3. Middlewares
// app.use(limiter);
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "https://accounts.google.com"],
//         scriptSrcElem: ["'self'", "https://accounts.google.com"],
//         styleSrc: ["'self'", "'unsafe-inline'", "https://accounts.google.com"],
//         styleSrcElem: ["'self'", "'unsafe-inline'", "https://accounts.google.com"],
//         frameSrc: ["https://accounts.google.com"],
//         connectSrc: ["'self'", "https://accounts.google.com"],
//       },
//     },
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(sessionMiddleware);

// 4. View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 5. Routes Utama
app.use("/", require("./routes/home"));

//? Authenticate
app.use("/", require("./routes/signup"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/logout"));

//? Dashboard Admin
app.use("/", require("./routes/dashboard-admin"));

//? Siswa
app.use("/", require("./routes/siswa"));
app.use("/", require("./routes/profile-siswa"));
app.use("/", require("./routes/update-nama-siswa"));
app.use("/", require("./routes/hapus-akun-siswa"));

//? Guru
app.use("/", require("./routes/profile-guru"));
app.use("/", require("./routes/guru"));
app.use("/", require("./routes/detail-guru"));
app.use("/", require("./routes/tambah-guru"))
app.use("/", require("./routes/hapus-guru"))

//? Soal
app.use("/", require("./routes/soal"));
app.use("/", require("./routes/hasil-soal"));
app.use("/", require("./routes/kerjakan-soal"));
app.use("/", require("./routes/detail-soal"));
app.use("/", require("./routes/tambah-soal"));

//? Layanan Sekolah
app.use("/", require("./routes/layanan-ppdb"));
app.use("/", require("./routes/layanan-ppdb-data"));
app.use("/", require("./routes/hapus-data-ppdb"));
app.use("/", require("./routes/layanan-ppdb-detail"));
app.use("/", require("./routes/layanan-kjp"));
app.use("/", require("./routes/layanan-kjp-data"));
app.use("/", require("./routes/hapus-data-kjp"));
app.use("/", require("./routes/layanan-kjp-detail"));
app.use("/", require("./routes/layanan-pip"));
app.use("/", require("./routes/layanan-pip-data"));
app.use("/", require("./routes/hapus-data-pip"));
app.use("/", require("./routes/layanan-pip-detail"));

//? Berita
app.use("/", require("./routes/tambah-berita"));
app.use("/", require("./routes/detail-berita"));
app.use("/", require("./routes/hapus-berita"));

// app.use("/", require("./routes/tambah-ekstrakulikuler"));
// app.use("/", require("./routes/tambah-fasilitas"));
// app.use("/", require("./routes/tambah-admin")); 

// 6. Handle 404 (Halaman Tidak Ditemukan)
app.use((req, res) => {
  res.status(404).send("Halaman tidak ditemukan.");
});

// 7. Global Error Handler (SATU-SATUNYA DITARUH DI SINI)
app.use((err, req, res, next) => {
  console.error(err.stack); // Tetap cetak error di terminal untuk debugging

  const message = process.env.NODE_ENV === "production" 
    ? "Terjadi kesalahan pada sistem." 
    : err.message;

  res.status(500).json({
    success: false,
    message: message
  });
});

// 8. Server Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});