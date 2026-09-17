const express = require("express")
const router = express.Router()

const controllers = require("../controllers/update-nama-siswa-controllers")
const {checkAuth} = require("../middleware/check-auth")
const {checkRole} = require("../middleware/check-role")

router.post("/update-nama-siswa", checkAuth, checkRole("siswa"), controllers.updateNamaSiswa)

// const Siswa = require("../models/Siswa")

// router.post("/update-nama-siswa", async (req, res) => {
//     const {nama} = req.body
//     const user = req.session.user

//     await Siswa.findByIdAndUpdate(user.id, {name: nama.trim()}, {new: true})
//     user.name = nama.trim()

//     res.redirect("/profile")
// })

module.exports = router