const express = require("express")
const router = express.Router()

const Guru = require("../models/Guru")
const Soal = require("../models/Soal")

router.get("/profile-guru", async (req, res) => {
    const user = req.session.user
    const guru = await Guru.findOne({nip: user.nip})
    const soal = await Soal.find({})

    res.render("profile-guru", {guru, soal})
})

module.exports = router
