const Soal = require("../models/Soal")
const HasilSoal = require("../models/HasilSoal")

module.exports.detailSoal = async (req, res) => {
    const {id_soal} = req.params

    const soal = await Soal.findById(id_soal)
    const jumlah_soal = soal.soal.length

    const hasilSoal = await HasilSoal.find({id_soal: soal._id}).populate("id_siswa")

    res.render("detail-soal", {soal, jumlah_soal, hasilSoal})
}