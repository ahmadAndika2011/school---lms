const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const LayananPip = require("../models/LayananPip");
const fs = require("fs")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/gambar-siswa-layanan-pip");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/layanan/pip", (req, res) => {
  res.render("layanan-pip");
});

router.post("/layanan/pip", upload.any(), async (req, res) => {
  Object.entries(req.body).forEach(([key, value]) => {
    console.log(key, value);
  });

  const { nama_siswa, nisn_siswa, nama_orang_tua_siswa, nama_sekolah_siswa } =
    req.body;
  foto = req.files[0].filename;

  const checkLayanan = await LayananPip.findOne({ nisn_siswa: nisn_siswa });
  if (checkLayanan) {
    if(req.files && req.files[0]){
        fs.unlink(req.files[0].path, (err) => {
            console.log("gagal hapus file: ", err)
        })
    }

    console.log("Data sudah ada");
    return res.redirect("/layanan/pip");
  }

  await LayananPip.create({
    foto_siswa: foto,
    nama_siswa: nama_siswa,
    nisn_siswa: nisn_siswa,
    nama_orang_tua_siswa: nama_orang_tua_siswa,
    nama_sekolah_siswa: nama_sekolah_siswa,
  });

  res.redirect("/layanan/pip");
});

module.exports = router;
