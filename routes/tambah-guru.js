const express = require("express");
const router = express.Router();

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/gambar-guru")
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + Math.round(Math.random(), 1e9)
    cb(null, unique + path.extname(file.originalname))
  }
})
const upload = multer({storage})

const controllers = require("../controllers/tambah-guru-controllers")
const {checkAuth} = require("../middleware/check-auth")

router.get("/tambah-guru", checkAuth, controllers.getTambahGuru)

router.post("/tambah-guru", checkAuth, upload.array("photo"), controllers.postTambahGuru)

// const Guru = require("../models/Guru");
// const bcrypt = require("bcrypt")

// router.get("/tambah-guru", async (req, res) => {
//   res.render("tambah-guru")
// });

// router.post("/tambah-guru", upload.array("photo"), async (req, res) => {
//   const photo = req.files[0].filename
//   const {username, password, nama, nip, jabatan, jenis_kelamin, status} = req.body
//   const hashPassword = await bcrypt.hash(password, 10)

//   await Guru.create({
//     username: username,
//     password: hashPassword,
//     nama: nama,
//     photo: photo,
//     nip: nip,
//     status: status,
//     jenis_kelamin: jenis_kelamin,
//     jabatan: jabatan
//   })

//   res.redirect("/tambah-guru")
// })

module.exports = router;
