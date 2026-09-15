const express = require('express')
const router = express.Router()

const controllers = require("../controllers/soal-controllers")

router.get("/soal", controllers.soal)

// const Soal = require("../models/Soal")

// router.get("/soal", async (req, res) => {
//     const siswa = req.session.user
//     const daftarSoal = await Soal.find({}).populate("id_guru")

//     res.render("soal", {daftarSoal, siswa})
// })

module.exports = router