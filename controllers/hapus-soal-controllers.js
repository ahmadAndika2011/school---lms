const Soal = require("../models/Soal")
const HasilSoal = require("../models/HasilSoal")
const fs = require("fs")
const path = require("path")

module.exports.hapusSoal = async (req, res) => {
    const {id_soal} = req.params
    const soal = await Soal.findById(id_soal)
    const hasilSoal = await HasilSoal.find({id_soal: soal._id})
    if(hasilSoal){
        hasilSoal.forEach(async (data) => {
            await HasilSoal.findByIdAndDelete(data._id)
        })
    }

    soal.soal.forEach(data => {
        data.gambar.forEach(gambar => {
            const filePath = path.join(
                __dirname,
                "..",
                "public",
                "uploads",
                "gambar-soal",
                gambar
            )

            fs.unlink(filePath, (err) => {
                if(err){
                    console.log("error : ", err)
                }
            })
        })
    })

    await Soal.findByIdAndDelete(soal._id)

    res.redirect("/soal")
}