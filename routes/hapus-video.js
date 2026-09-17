const express = require("express")
const router = express.Router()

const { hapusVideo } = require("../controllers/hapus-video-controllers")
const {checkAuth} = require("../middleware/check-auth")

router.delete("/hapus-video/:id_hasil_soal", checkAuth, hapusVideo)

module.exports = router