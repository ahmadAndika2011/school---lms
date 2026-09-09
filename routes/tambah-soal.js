const express = require("express");
const router = express.Router();
const multer = require("multer"); // <-- tambahkan ini
const path = require("path");     // <-- tambahkan ini

const Soal = require("../models/Soal");

// ================= KONFIGURASI UPLOAD =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "uploads", "gambar-soal"));
  },
  filename: function (req, file, cb) {
    const unik = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unik + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ================= GET: TAMPILKAN FORM =================
router.get("/tambah-soal", (req, res) => {
  res.render("tambah-soal");
});

// ================= POST: SIMPAN SOAL =================
// upload.any() dipakai karena jumlah field gambar dinamis (soal[0][gambar][], soal[1][gambar][], dst)
router.post("/tambah-soal", upload.any(), async (req, res) => {
  try {
    const { judul_soal, deskripsi } = req.body;

    // req.body.soal sudah otomatis di-nest oleh multer dari nama field "soal[i][...]"
    // menjadi object: { "0": { pertanyaan, pilihan: {a,b,c,d}, jawaban_benar }, "1": {...}, ... }
    const soalMentah = req.body.soal || {};

    // kelompokkan file gambar berdasarkan index soal, karena file TIDAK ikut di-nest otomatis
    const gambarPerSoal = {};
    (req.files || []).forEach((file) => {
      const match = file.fieldname.match(/^soal\[(\d+)\]\[gambar\]\[\]$/);
      if (match) {
        const idx = match[1];
        if (!gambarPerSoal[idx]) gambarPerSoal[idx] = [];
        gambarPerSoal[idx].push(file.filename);
      }
    });

    const daftarSoal = Object.keys(soalMentah)
      .sort((a, b) => Number(a) - Number(b))
      .map((idx) => {
        const item = soalMentah[idx];
        const pilihanObj = item.pilihan || {};

        const jawaban = Object.keys(pilihanObj).map((huruf) => ({
          pilihan: huruf,
          text: pilihanObj[huruf]
        }));

        return {
          gambar: gambarPerSoal[idx] || [],
          pertanyaan: item.pertanyaan,
          jawaban: jawaban,
          jawaban_benar: item.jawaban_benar
        };
      });

    if (daftarSoal.length === 0) {
      return res.status(400).send("Minimal harus ada 1 soal.");
    }

    await Soal.create({
        id_guru: req.session.id,
      judul: judul_soal,
      deskripsi,
      soal: daftarSoal
    });

    res.redirect("/profile-guru");
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan saat menyimpan soal.");
  }
});

module.exports = router;