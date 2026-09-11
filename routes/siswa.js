const express = require("express")
const router = express.Router()

const Siswa = require("../models/Siswa")

router.get("/siswa", async (req, res) => {
    const siswa = await Siswa.find({})

    res.render("siswa", {siswa})
})

module.exports = router