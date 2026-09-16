const express = require("express")
const router = express.Router()

const controllers = require("../controllers/layanan-ppdb-detail-controllers")
const {checkAuth} = require("../middleware/check-auth")

router.get("/layanan/ppdb/detail/:nisn_siswa", checkAuth, controllers.layananPpdbDetail)

// const LayananPpdb = require("../models/LayananPpdb")

// router.get("/layanan/ppdb/detail/:nisn_siswa", async (req, res) => {
//     const {nisn_siswa} = req.params
//     const detail = await LayananPpdb.findOne({nisn_siswa: nisn_siswa})

//     res.render("layanan-ppdb-detail", {detail})
// })

module.exports = router