const express = require("express")
const router = express.Router()

const multer = require("multer")
const path = require("path")

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "public/uploads/gambar-berita")
//     },
//     filename: function(req, file, cb){
//         const unique = Date.now() + "-" + Math.round(Math.random(), 1e9)
//         cb(null, unique + path.extname(file.originalname))
//     }
// })
// const upload = multer({storage})

const {createUploader} = require("../middleware/upload-image")
const upload = createUploader("gambar-berita")

const controllers = require("../controllers/tambah-berita-controllers")
const {checkAuth} = require("../middleware/check-auth")
const {checkRole} = require("../middleware/check-role")

router.get("/tambah-berita", checkAuth, checkRole("admin"), controllers.getTambahBerita)

router.post("/tambah-berita", checkAuth, checkRole("admin"), upload.array("gambar", 10), controllers.postTambahBerita)

// const Berita = require("../models/Berita")

// router.get("/tambah-berita", (req, res) => {
//     res.render("tambah-berita")
// })

// router.post("/tambah-berita", upload.array("gambar", 10), async (req, res) => {
//     const {nama, tanggal, deskripsi_singkat, deskripsi_lengkap} = req.body
//     const gambar = req.files
//     let listGambar = []
//     gambar.forEach((file) => {
//         listGambar.push(file.filename)
//     })

//     await Berita.create({
//         gambar: listGambar,
//         nama: nama,
//         tanggal: tanggal,
//         deskripsi_singkat: deskripsi_singkat,
//         deskripsi_lengkap: deskripsi_lengkap
//     })
//     res.redirect("/#berita")
// })

module.exports = router