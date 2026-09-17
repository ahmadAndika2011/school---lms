const express = require("express")
const router = express.Router()

const controllers = require("../controllers/hapus-soal-controllers")
const {checkAuth} = require("../middleware/check-auth")
const {checkRole} = require("../middleware/check-role")

router.delete("/hapus-soal/:id_soal", checkAuth, checkRole("admin"), controllers.hapusSoal)

// const Soal = require("../models/Soal")
// const HasilSoal = require("../models/HasilSoal")

// router.delete("/hapus-soal/:id_soal", async (req, res) => {
//     const {id_soal} = req.params
//     const soal = await Soal.findById(id_soal)
//     const hasilSoal = await HasilSoal.find({id_soal: soal._id})
//     if(hasilSoal){
//         hasilSoal.forEach(async (data) => {
//             await HasilSoal.findByIdAndDelete(data._id)
//         })
//     }

//     await Soal.findByIdAndDelete(soal._id)

//     res.redirect("/soal")
// })

module.exports = router