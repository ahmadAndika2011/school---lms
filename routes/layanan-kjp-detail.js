const express = require("express")
const router = express.Router()

const controllers = require("../controllers/layanan-kjp-detail-controllers")
const {checkAuth} = require("../middleware/check-auth")
const {checkRole} = require("../middleware/check-role")

router.get("/layanan/kjp/detail/:nisn_siswa", checkAuth, checkRole("admin"), controllers.LayananKjpDetail)

// const LayananKjp = require("../models/LayananKjp")

// router.get("/layanan/kjp/detail/:nisn_siswa", async (req, res) => {
//     const {nisn_siswa} = req.params
//     const detail = await LayananKjp.findOne({nisn_siswa: nisn_siswa})

//     res.render("layanan-kjp-detail", {detail})
// })

module.exports = router