const express = require("express")
const router = express.Router()

const Ekstrakulikuler = require("../models/Ekstrakulikuler")

router.get("/", async (req, res) => {
    const user = req.session.user || null
    const ekstrakulikuler = await Ekstrakulikuler.find({})
    res.render("home", {user: user, ekstrakulikuler})
})

module.exports = router