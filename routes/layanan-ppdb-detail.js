const express = require("express")
const router = express.Router()

const LayananPpdb = require("../models/LayananPpdb")

router.get("/layanan/ppdb/detail/:nisn_siswa", async (req, res) => {
    const {nisn_siswa} = req.params
    const detail = await LayananPpdb.findOne({nisn_siswa: nisn_siswa})

    res.render("layanan-ppdb-detail", {detail})
})

module.exports = router