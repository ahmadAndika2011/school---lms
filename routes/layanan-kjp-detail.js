const express = require("express")
const router = express.Router()

const LayananKjp = require("../models/LayananKjp")

router.get("/layanan/kjp/detail/:nisn_siswa", async (req, res) => {
    const {nisn_siswa} = req.params
    const detail = await LayananKjp.findOne({nisn_siswa: nisn_siswa})

    res.render("layanan-kjp-detail", {detail})
})

module.exports = router