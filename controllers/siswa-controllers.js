const Siswa = require("../models/Siswa")

module.exports.siswa = async (req, res) => {
    const siswa = await Siswa.find({})

    res.render("siswa", {siswa})
}