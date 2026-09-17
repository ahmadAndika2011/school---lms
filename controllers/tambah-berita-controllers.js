const Berita = require("../models/Berita")

const {asyncHandler} = require("../utils/async-handler")

module.exports.getTambahBerita = (req, res) => {
    res.render("tambah-berita")
}

module.exports.postTambahBerita = asyncHandler(async (req, res) => {
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