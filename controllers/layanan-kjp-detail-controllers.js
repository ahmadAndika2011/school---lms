const LayananKjp = require("../models/LayananKjp")

const {asyncHandler} = require("../utils/async-handler")

module.exports.LayananKjpDetail = asyncHandler(async (req, res) => {
    const {nisn_siswa} = req.params
    const detail = await LayananKjp.findOne({nisn_siswa: nisn_siswa})

    res.render("layanan-kjp-detail", {detail})
})