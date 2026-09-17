const express = require("express")
const router = express.Router()

const { hapusVideo } = require("../controllers/hapus-video-controllers")
const {checkAuth} = require("../middleware/check-auth")
const {checkRole} = require("../middleware/check-role")

router.delete("/hapus-video/:id_hasil_soal", checkAuth, checkRole("guru"), hapusVideo)

module.exports = router