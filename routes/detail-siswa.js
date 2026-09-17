const express = require("express")
const router = express.Router()

const controllers = require("../controllers/detail-siswa-controllers")
const {checkAuth} = require("../middleware/check-auth")
const {checkRole} = require("../middleware/check-role")

router.get("/siswa/detail/:id_siswa", checkAuth, checkRole("admin"), controllers.detailSiswa)

// const Siswa = require("../models/Siswa")
// const HasilSoal = require("../models/HasilSoal")

// router.get("/siswa/detail/:id_siswa", async (req, res) => {
//     const {id_siswa} = req.params
//     const siswa = await Siswa.findById(id_siswa)
//     const hasilSoal = await HasilSoal.find({id_siswa: siswa._id}).populate("id_soal").sort({createdAt: -1})

//     res.render("detail-siswa", {siswa, hasilSoal})
// })

module.exports = router