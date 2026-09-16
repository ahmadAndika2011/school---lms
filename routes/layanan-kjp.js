const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const controllers = require("../controllers/layanan-kjp-controllers")

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/gambar-siswa-layanan-kjp");
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

//     cb(null, uniqueName + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storage });

const {createUploader} = require("../middleware/upload-image")
const upload = createUploader("gambar-siswa-layanan-kjp")

router.get("/layanan/kjp", controllers.getLayananKjp)
router.post("/layanan/kjp", upload.any(), controllers.postLayananKjp)

// const LayananKjp = require("../models/LayananKjp");
// const fs = require("fs")

// router.get("/layanan/kjp", (req, res) => {
//   res.render("layanan-kjp");
// });

// router.post("/layanan/kjp", upload.any(), async (req, res) => {
//   Object.entries(req.body).forEach(([key, value]) => {
//     console.log(key, value);
//   });

//   const { nama_siswa, nisn_siswa, nama_orang_tua_siswa, nama_sekolah_siswa } =
//     req.body;

//   const checkLayanan = await LayananKjp.findOne({ nisn_siswa: nisn_siswa });
//   if (checkLayanan) {
//     if(req.files && req.files[0]){
//         fs.unlink(req.files[0].path, (err) => {
//             if (err) console.log("gagal hapus file")
//         })
//     }

//     console.log("Data sudah ada");
//     return res.redirect("/layanan/kjp");
//   }

//   foto = req.files[0].filename;

//   await LayananKjp.create({
//     foto_siswa: foto,
//     nama_siswa: nama_siswa,
//     nisn_siswa: nisn_siswa,
//     nama_orang_tua_siswa: nama_orang_tua_siswa,
//     nama_sekolah_siswa: nama_sekolah_siswa,
//   });

//   res.redirect("/layanan/kjp");
// });

module.exports = router;
