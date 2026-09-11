const express = require("express")
const router = express.Router()

const LayananKjp = require("../models/LayananKjp")

router.get("/layanan/kjp/data", async (req, res) => {
    const layananKjp = await LayananKjp.find({})

    res.render("layanan-kjp-data", {layananKjp})
})

module.exports = router