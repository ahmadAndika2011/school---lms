const express = require("express")
const router = express.Router()

const { hapusVideo } = require("../controllers/hapus-video-controllers")

router.delete("/hapus-video/:id_hasil_soal", hapusVideo)

module.exports = router