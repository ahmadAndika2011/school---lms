const express = require("express")
const router = express.Router()

const Siswa = require("../models/Siswa")
const path = require("path")
const fs = require("fs")

router.delete("/hapus-siswa/:siswa_id", async (req, res) => {
    const {siswa_id} =  req.params
    const siswa = await Siswa.findById(siswa_id)
    if(siswa.gambar){
        const filePath = path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "gambar-siswa",
            siswa.gambar
        )

        fs.unlink(filePath, (err) => {
            if(err){
                console.log("error : ", err)
            }
        })
    }

    await Siswa.findByIdAndDelete(siswa._id)

    res.redirect("/siswa")
})

module.exports = router