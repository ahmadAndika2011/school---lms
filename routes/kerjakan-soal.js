const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const controllers = require("../controllers/kerjakan-soal-controllers")
const {createUploader} = reuqire("../middleware/upload-image.js")
const upload = createUploader("video-kerjakan-soal")
const {checkAuth} = require("../middleware/check-auth")

// const uploadDir = path.join(__dirname, "..", "public", "uploads", "video-kerjakan-soal")
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true })
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, uploadDir),
//     filename: (req, file, cb) => {
//         const namaUnik = `${req.params.id_soal}-${req.session.user.id}-${Date.now()}.webm`
//         cb(null, namaUnik)
//     }
// })

// const upload = multer({ storage })

router.get("/kerjakan-soal/:id_soal", controllers.getKerjakanSoal)
router.post("/kerjakan-soal/:id_soal", upload.single("video"), controllers.postKerjakanSoal)

module.exports = router