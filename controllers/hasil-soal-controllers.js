const Siswa = require("../models/Siswa")
const Soal = require("../models/Soal")
const HasilSoal = require("../models/HasilSoal")

const {asyncHandler} = require("../utils/async-handler")

module.exports.hasilSoal = asyncHandler(async (req, res) => {
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
})