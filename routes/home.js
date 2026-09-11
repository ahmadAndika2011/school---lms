const express = require("express")
const router = express.Router()

const Ekstrakulikuler = require("../models/Ekstrakulikuler")
const Fasilitas = require("../models/Fasilitas")
const Guru = require("../models/Guru")
const Siswa = require("../models/Siswa")

router.get("/", async (req, res) => {
    const user = req.session.user || null
    const ekstrakulikuler = await Ekstrakulikuler.find({})
    const fasilitas = await Fasilitas.find({})
    const guru = await Guru.find({})
    const jumlahGuru = guru[0].length

    res.render("home", {user: user, ekstrakulikuler, fasilitas, guru})
})

module.exports = router