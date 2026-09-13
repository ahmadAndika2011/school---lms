// guru/detail/6aa604dbee3fe24ca9a34b4a
const express = require("express")
const router = express.Router()

const Guru = require("../models/Guru")

router.get("/guru/detail/:id_guru", async (req, res) => {
    const {id_guru} = req.params
    const guru = await Guru.findById(id_guru)
    res.render("detail-guru", {guru})
})

module.exports = router