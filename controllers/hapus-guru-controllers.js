const Guru = require("../models/Guru")
const path = require("path")
const fs = require("fs")

const {asyncHandler} = require("../utils/async-handler")

module.exports.hapusGuru = asyncHandler(async (req, res) => {
    const {guru_id} =  req.params
    const guru = await Guru.findById(guru_id)
    if(guru.photo){
        const filePath = path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            "gambar-guru",
            guru.photo
        )

        fs.unlink(filePath, (err) => {
            if(err){
                console.log("error : ", err)
            }
        })
    }

    await Guru.findByIdAndDelete(guru._id)

    res.redirect("/guru")
})