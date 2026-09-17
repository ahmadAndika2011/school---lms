const express = require("express")
const router = express.Router()

const controllers = require("../controllers/hapus-guru-controllers")
const {checkAuth} = require("../middleware/check-auth")

router.delete("/hapus-guru/:guru_id", checkAuth, controllers.hapusGuru)

// const Guru = require("../models/Guru")
// const path = require("path")
// const fs = require("fs")

// router.delete("/hapus-guru/:guru_id", async (req, res) => {
//     const {guru_id} =  req.params
//     const guru = await Guru.findById(guru_id)
//     if(guru.photo){
//         const filePath = path.join(
//             __dirname,
//             "..",
//             "public",
//             "uploads",
//             "gambar-guru",
//             guru.photo
//         )

//         fs.unlink(filePath, (err) => {
//             if(err){
//                 console.log("error : ", err)
//             }
//         })
//     }

//     await Guru.findByIdAndDelete(guru._id)

//     res.redirect("/guru")
// })

module.exports = router