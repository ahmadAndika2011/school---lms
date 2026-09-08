const express = require("express")
const router = express.Router()

const Guru = require("../models/Guru")

router.get("/profile-guru", async (req, res) => {
    const user = req.session.user
    const guru = await Guru.findOne({nip: user.nip})

    res.render("guru", {guru})
})

module.exports = router
