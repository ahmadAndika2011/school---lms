const LayananKjp = require("../models/LayananKjp")

module.exports.LayananKjpDetail = async (req, res) => {
    const {nisn_siswa} = req.params
    const detail = await LayananKjp.findOne({nisn_siswa: nisn_siswa})

    res.render("layanan-kjp-detail", {detail})
}