const express = require("express")
const router = express.Router()

const Siswa = require("../models/Siswa")
const HasilSoal = require("../models/HasilSoal")

router.get("/siswa/detail/:id_siswa", async (req, res) => {
    const {id_siswa} = req.params
    const siswa = await Siswa.findById(id_siswa)
    const hasilSoal = await HasilSoal.find({id_siswa: siswa._id}).populate("id_soal").sort({createdAt: -1})

    res.render("detail-siswa", {siswa, hasilSoal})
})

module.exports = router