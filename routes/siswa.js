const express = require("express")
const router = express.Router()

const controllers = require("../controllers/siswa-controllers")

router.get("/siswa", controllers.siswa)

// const Siswa = require("../models/Siswa")

// router.get("/siswa", async (req, res) => {
//     const siswa = await Siswa.find({})

//     res.render("siswa", {siswa})
// })

module.exports = router