const Berita = require("../models/Berita")
const path = require("path")
const fs = require("fs")

const {asyncHandler} = require("../utils/async-handler")

module.exports.hapusBerita = asyncHandler(async (req, res) => {
    const {id} = req.params
    const berita = await Berita.findById(id)

    if(berita.gambar.length > 0){
        berita.gambar.forEach((file) => {
            const filePath = path.join(
                __dirname,
                "..",
                "public",
                "uploads",
                "gambar-berita",
                file
            )

            fs.unlink(filePath, (err) => {
                if(err){
                    console.log("error: ", err)
                }
            })
        })
    }

    await Berita.findByIdAndDelete(id)

    res.redirect("/#berita")
})