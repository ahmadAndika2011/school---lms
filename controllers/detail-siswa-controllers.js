const Siswa = require("../models/Siswa")
const HasilSoal = require("../models/HasilSoal")

const {asyncHandler} = require("../utils/async-handler")

module.exports.detailSiswa = asyncHandler(async (req, res) => {
    const {id_siswa} = req.params
    const siswa = await Siswa.findById(id_siswa)
    const hasilSoal = await HasilSoal.find({id_siswa: siswa._id}).populate("id_soal").sort({createdAt: -1})

    res.render("detail-siswa", {siswa, hasilSoal})
})