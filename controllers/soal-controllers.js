const Soal = require("../models/Soal")

module.exports.soal = async (req, res) => {
    const siswa = req.session.user
    const daftarSoal = await Soal.find({}).populate("id_guru")

    res.render("soal", {daftarSoal, siswa})
}