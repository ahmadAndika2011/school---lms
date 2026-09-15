const LayananPpdb = require("../models/LayananPpdb")

module.exports.layananPpdbDetail = async (req, res) => {
    const {nisn_siswa} = req.params
    const detail = await LayananPpdb.findOne({nisn_siswa: nisn_siswa})

    res.render("layanan-ppdb-detail", {detail})
}