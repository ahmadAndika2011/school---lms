const express = require("express")
const router = express.Router()

const Siswa = require("../models/Siswa")

router.post("/update-nama-siswa", async (req, res) => {
    const {nama} = req.body
    const user = req.session.user

    await Siswa.findByIdAndUpdate(user.id, {name: nama.trim()}, {new: true})
    user.name = nama.trim()

    res.redirect("/profile")
})

module.exports = router