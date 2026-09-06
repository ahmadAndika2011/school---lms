const express = require("express")
const router = express.Router()

const Siswa = require("../models/Siswa")

router.get("/profile", async (req, res) => {
    const user = req.session.user
    const siswa = await Siswa.findOne({email: user.email})
    // res.json(siswa)
    res.render("profile-siswa", {siswa})
})
module.exports = router