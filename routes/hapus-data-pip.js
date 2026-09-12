const express = require("express")
const router = express.Router()

const LayananPip = require("../models/LayananPip")
const path = require("path")
const fs = require("fs")

router.delete("/layanan/pip/data/delete", async (req, res) => {
    const {id} = req.body
    const pipData = await LayananPip.findById(id)
    if(pipData.foto_siswa){
        const pathGambar =  path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "gambar-siswa-layanan-pip",
            pipData.foto_siswa
        ) 

        fs.unlink(pathGambar, (err) => {
            if(err){
                console.log("error: ", err)
            }
        })
    }

    await LayananPip.findByIdAndDelete(id)
    res.redirect("/layanan/pip/data")
})

module.exports = router