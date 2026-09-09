const express = require("express")
const router = express.Router()

const Soal = require("../models/Soal")
const HasilSoal = require("../models/HasilSoal")

router.get("/kerjakan-soal/:id_soal", async (req, res) => {
    const {id_soal} = req.params

    const soal = await Soal.findById(id_soal)
    const hasilSoal = await HasilSoal.findOne({id_siswa: req.session.user.id})
    if(hasilSoal){
        return res.redirect(`/hasil-soal/${hasilSoal.id_siswa}/${hasilSoal._id}`)
    }

    res.render("kerjakan-soal", {soal})
})

router.post("/kerjakan-soal/:id_soal", async (req, res) => {
    const {id_soal} = req.params

    const siswa = req.session.user

    const soal = await Soal.findById(id_soal)
    const jawabanSiswa = req.body.jawaban || {}
    let jumlahBenar = 0

    const detailJawaban = soal.soal.map((pertanyaan) => {
        const dipilih = jawabanSiswa[pertanyaan._id.toString()] || null

        const benar = dipilih === pertanyaan.jawaban_benar
        if (benar) jumlahBenar++

        return {
            id_pertanyaan: pertanyaan._id,
            jawaban_dipilih: dipilih,
            benar
        }
    })

    const totalSoal = soal.soal.length
    const nilai = totalSoal > 0 ? Math.round((jumlahBenar / totalSoal) * 100) : 0

    await HasilSoal.findOneAndUpdate(
        { id_siswa: siswa.id, id_soal: soal._id },
        {
            id_siswa: siswa._id,
            id_soal: soal._id,
            jawaban: detailJawaban,
            nilai
        },
        { upsert: true, new: true }
    )

    res.redirect(`/hasil-soal/${siswa.id}/${soal._id}`)
})

module.exports = router