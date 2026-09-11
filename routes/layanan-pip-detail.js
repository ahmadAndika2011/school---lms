const express = require("express")
const router = express.Router()

const LayananPip = require("../models/LayananPip")

router.get("/layanan/pip/detail/:nisn_siswa", async (req, res) => {
    const {nisn_siswa} = req.params
    const detail = await LayananPip.findOne({nisn_siswa: nisn_siswa})

    res.render("layanan-pip-detail", {detail})
})

module.exports = router