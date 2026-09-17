const express = require("express")
const router = express.Router()

const controllers = require("../controllers/detail-soal-controllers")
const {checkAuth} = require("../middleware/check-auth")

router.get("/detail-soal/:id_soal", checkAuth, controllers.detailSoal)

// const Soal = require("../models/Soal")
// const HasilSoal = require("../models/HasilSoal")

// router.get("/detail-soal/:id_soal", async (req, res) => {
//     const {id_soal} = req.params

//     const soal = await Soal.findById(id_soal)
//     const jumlah_soal = soal.soal.length

//     const hasilSoal = await HasilSoal.find({id_soal: soal._id}).populate("id_siswa")

//     res.render("detail-soal", {soal, jumlah_soal, hasilSoal})
// })

module.exports = router