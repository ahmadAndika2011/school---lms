const Siswa = require("../models/Siswa")

module.exports.updateNamaSiswa = async (req, res) => {
    const {nama} = req.body
    const user = req.session.user

    await Siswa.findByIdAndUpdate(user.id, {name: nama.trim()}, {new: true})
    user.name = nama.trim()

    res.redirect("/profile")
}