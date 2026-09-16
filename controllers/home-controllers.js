const Ekstrakulikuler = require("../models/Ekstrakulikuler")
const Fasilitas = require("../models/Fasilitas")
const Guru = require("../models/Guru")
const Siswa = require("../models/Siswa")
const Berita = require("../models/Berita")
const Soal = require("../models/Soal")

module.exports.home = async (req, res) => {
    const user = req.session.user || null
    const ekstrakulikuler = await Ekstrakulikuler.find({})
    const fasilitas = await Fasilitas.find({})
    const berita = await Berita.find({}).sort({ tanggal: -1 }).limit(6)
    const guru = await Guru.find({})
    const jumlahGuru = guru.length
    const siswa = await Siswa.find({})
    const jumlahSiswa = siswa.length
    const soal = await Soal.find({})

    let admin;
    if(user){
        if(user.role === "admin"){
            admin = true
        }else{
            admin = false
        }
    }


    res.render("home", {user: user, ekstrakulikuler, fasilitas, berita, guru, jumlahGuru, jumlahSiswa, admin, soal})
}