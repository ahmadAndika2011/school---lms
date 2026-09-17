const fs = require("fs")
const path = require("path")
const HasilSoal = require("../models/HasilSoal")

const {asyncHandler} = require("../utils/async-handler")

module.exports.hapusVideo = asyncHandler(async (req, res) => {
    const {id_hasil_soal} = req.params

    const hasilSoal = await HasilSoal.findById(id_hasil_soal)

    if(hasilSoal.video){
        const filePath = path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "video-kerjakan-soal",
            hasilSoal.video
        )

        fs.unlink(filePath, (err) => {
            if(err){
                console.log("error : ", err)
            }
        })
    }

    hasilSoal.video = null
    hasilSoal.videoUploadedAt = null
    await hasilSoal.save()

    res.status(200).json({ success: true })
})