const express = require("express")
const router = express.Router()

const Ekstrakulikuler = require("../models/Ekstrakulikuler")
const Fasilitas = require("../models/Fasilitas")
const Guru = require("../models/Guru")

router.get("/", async (req, res) => {
    const user = req.session.user || null
    const ekstrakulikuler = await Ekstrakulikuler.find({})
    const fasilitas = await Fasilitas.find({})
    const guru = await Guru.find({})

    res.render("home", {user: user, ekstrakulikuler, fasilitas, guru})
})

module.exports = router