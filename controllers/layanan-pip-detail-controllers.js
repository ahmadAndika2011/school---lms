const LayananPip = require("../models/LayananPip")

const {asyncHandler} = require("../utils/async-handler")

module.exports.layananPipDetail = asyncHandler(async (req, res) => {
    const {nisn_siswa} = req.params
    const detail = await LayananPip.findOne({nisn_siswa: nisn_siswa})

    res.render("layanan-pip-detail", {detail})
})