const express = require("express")
const router = express.Router()

const LayananPip = require("../models/LayananPip")

router.get("/layanan/pip/data", async (req, res) => {
    const layananPip = await LayananPip.find({})

    res.render("layanan-pip-data", {layananPip})
})

module.exports = router