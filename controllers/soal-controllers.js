const Soal = require("../models/Soal")

const {asyncHandler} = require("../utils/async-handler")

module.exports.soal = asyncHandler(async (req, res) => {
    const siswa = req.session.user
    const daftarSoal = await Soal.find({}).populate("id_guru")

    res.render("soal", {daftarSoal, siswa})
})