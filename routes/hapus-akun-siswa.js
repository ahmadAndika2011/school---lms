// /delete-account/siswa?_method=DELETE
const express = require("express")
const router = express.Router()

const Siswa = require("../models/Siswa")
const fs = require("fs")
const path = require("path")

router.delete("/delete-account/siswa", async (req, res) => {
    const user = req.session.user
    const siswa = await Siswa.findById(user.id) 
    
    if(siswa.gambar){
        const filePath = path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "gambar-siswa",
            siswa.gambar
        )

        if(filePath){
            fs.unlink(filePath, (err) => {
                if(err){
                    console.log("error: ", err)
                }
            })
        }
    }

    await Siswa.findByIdAndDelete(siswa._id)
    
    req.session.destroy((err) => {
        if(err){
            console.log(err)
            return res.status(500).send("Terjadi kesalahan saat hapus akun.");
        }

        res.clearCookie("connect.sid")

        res.redirect("/")
    })
})

module.exports = router