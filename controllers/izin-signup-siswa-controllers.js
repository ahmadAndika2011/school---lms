const Admin = require("../models/Admin")

const {asyncHandler} = require("../utils/async-handler")

module.exports.izinSignupSiswa = asyncHandler(async (req, res) => {
    const {izin_signup_siswa} = req.body
    const admin = await Admin.findById(req.session.user.id)
    admin.izin_signup_siswa = izin_signup_siswa == "on"
    await admin.save()

    res.redirect("/dashboard-admin")
})