const express = require("express")
const router = express.Router()

const Siswa = require("../models/Siswa")
const HasilSoal = require("../models/HasilSoal")

router.get("/profile", async (req, res) => {
    const user = req.session.user
    const siswa = await Siswa.findOne({email: user.email})
    
    const hasilSoal = await HasilSoal.find({id_siswa: siswa._id}).populate("id_soal").sort({createdAt: -1})

    res.render("profile-siswa", {siswa, hasilSoal})
})
module.exports = router