const express = require("express")
const router = express.Router()

const controllers = require("../controllers/profile-siswa-controllers")
const {checkAuth} = require("../middleware/check-auth")
const {checkRole} = require("../middleware/check-role")

router.get("/profile", checkAuth, checkRole("siswa"), controllers.profileSiswa)

// const Siswa = require("../models/Siswa")
// const HasilSoal = require("../models/HasilSoal")

// router.get("/profile", async (req, res) => {
//     const user = req.session.user
//     const siswa = await Siswa.findOne({email: user.email})
    
//     if(!siswa){
//         req.session.destroy((err) => {
//             if (err) {
//             console.error("Logout error:", err);
//             return res.status(500).send("Terjadi kesalahan saat logout.");
//             }

//             res.clearCookie("connect.sid");
//             res.redirect("/");
//         });
//     }
    
//     const hasilSoal = await HasilSoal.find({id_siswa: siswa._id}).populate("id_soal").sort({createdAt: -1})

//     res.render("profile-siswa", {siswa, hasilSoal})
// })

module.exports = router