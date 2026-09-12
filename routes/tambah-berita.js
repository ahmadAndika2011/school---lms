const express = require("express")
const router = express.Router()

const Berita = require("../models/Berita")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads/gambar-berita")
    },
    filename: function(req, file, cb){
        const unique = Date.now() + "-" + Math.round(Math.random(), 1e9)
        cb(null, unique + path.extname(file.originalname))
    }
})
const upload = multer({storage})

router.get("/tambah-berita", (req, res) => {
    res.render("tambah-berita")
})

router.post("/tambah-berita", upload.array("gambar", 10), async (req, res) => {
    const {nama, tanggal, deskripsi_singkat, deskripsi_lengkap} = req.body
    const gambar = req.files
    let listGambar = []
    gambar.forEach((file) => {
        listGambar.push(file.filename)
    })

    await Berita.create({
        gambar: listGambar,
        nama: nama,
        tanggal: tanggal,
        deskripsi_singkat: deskripsi_singkat,
        deskripsi_lengkap: deskripsi_lengkap
    })
    res.redirect("/#berita")
})

module.exports = router