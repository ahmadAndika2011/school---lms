const Siswa = require("../models/Siswa")

const {asyncHandler} = require("../utils/async-handler")

module.exports.siswa = asyncHandler(async (req, res) => {
    const siswa = await Siswa.find({})

    res.render("siswa", {siswa})
})