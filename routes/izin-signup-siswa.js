const express = require("express")
const router = express.Router()

const {checkAuth} = require("../middleware/check-auth")
const controllers = require("../controllers/izin-signup-siswa-controllers")

router.post("/dashboard-admin/toggle-signup-siswa", checkAuth, controllers.izinSignupSiswa)


// const Admin = require("../models/Admin")

// router.post("/dashboard-admin/toggle-signup-siswa", checkAuth, async (req, res) => {
//     const {izin_signup_siswa} = req.body
//     const admin = await Admin.findById(req.session.user.id)
//     admin.izin_signup_siswa = izin_signup_siswa == "on"
//     await admin.save()

//     res.redirect("/dashboard-admin")
// })

module.exports = router