const Siswa = require("../models/Siswa")

const {asyncHandler} = require("../utils/async-handler")

module.exports.updateNamaSiswa = asyncHandler(async (req, res) => {
    const {nama} = req.body
    const user = req.session.user

    await Siswa.findByIdAndUpdate(user.id, {name: nama.trim()}, {new: true})
    user.name = nama.trim()

    res.redirect("/profile")
})