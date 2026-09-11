const express = require("express")
const router = express.Router()

const Guru = require("../models/Guru")

router.get("/guru", async (req, res) => {
    const guru = await Guru.find({})

    res.render("guru", {guru})
})

module.exports = router