const express = require("express")
const router = express.Router()

const LayananPpdb = require("../models/LayananPpdb")
const path = require("path")
const fs = require("fs")

router.delete("/layanan/ppdb/data/delete", async (req, res) => {
    const {id} = req.body
    const ppdbData = await LayananPpdb.findById(id)
    if(ppdbData.foto_siswa){
        const pathGambar =  path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "gambar-siswa-layanan-ppdb",
            ppdbData.foto_siswa
        ) 

        fs.unlink(pathGambar, (err) => {
            if(err){
                console.log("error: ", err)
            }
        })
    }

    await LayananPpdb.findByIdAndDelete(id)
    res.redirect("/layanan/ppdb/data")
})

module.exports = router