const express = require("express")
const router = express.Router()

const Soal = require("../models/Soal")

router.post("/hapus-soal/:id_soal", (req, res) => {
    const {id_soal} = req.params

    res.redirect("/profile-guru")
})

module.exports = router