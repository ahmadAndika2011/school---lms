const express = require("express")
const router = express.Router()

router.get("/hasil-soal/:id_siswa/:soal_id", (req, res) => {
    res.render("hasil-soal")
})

module.exports = router