const express = require("express")
const router = express.Router()

const Siswa = require("../models/Siswa")
const Soal = require("../models/Soal")
const HasilSoal = require("../models/HasilSoal")

router.get("/hasil-soal/:id_siswa/:id_soal", async (req, res) => {
    try {
        const { id_siswa, id_soal } = req.params

        const siswa = await Siswa.findById(id_siswa)
        if (!siswa) {
            return res.status(404).send("Siswa tidak ditemukan.")
        }

        const soal = await Soal.findById(id_soal)
        if (!soal) {
            return res.status(404).send("Soal tidak ditemukan.")
        }

        const hasil = await HasilSoal.findOne({ id_siswa, id_soal })
        if (!hasil) {
            return res.status(404).send("Hasil pengerjaan tidak ditemukan.")
        }

        res.render("hasil-soal", { siswa, soal, hasil })
    } catch (err) {
        console.error(err)
        res.status(500).send("Terjadi kesalahan saat mengambil hasil soal.")
    }
})

module.exports = router