const LayananPpdb = require("../models/LayananPpdb")

const {asyncHandler} = require("../utils/async-handler")

module.exports.layananPpdbDetail = asyncHandler(async (req, res) => {
    const {nisn_siswa} = req.params
    const detail = await LayananPpdb.findOne({nisn_siswa: nisn_siswa})

    res.render("layanan-ppdb-detail", {detail})
})