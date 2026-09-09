const express = require("express")
const router = express.Router()

const Soal = require("../models/Soal")

router.get("/detail-soal/:id_soal", async (req, res) => {
    const {id_soal} = req.params

    const soal = await Soal.findById(id_soal)
    const jumlah_soal = soal.soal.length

    console.log(jumlah_soal)
    res.render("detail-soal", {soal, jumlah_soal})
})

module.exports = router