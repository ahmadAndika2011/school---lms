const multer = require("multer");
const path = require("path");
const LayananKjp = require("../models/LayananKjp");
const fs = require("fs")

module.exports.getLayananKjp = (req, res) => {
  res.render("layanan-kjp");
}

module.exports.postLayananKjp = async (req, res) => {
  Object.entries(req.body).forEach(([key, value]) => {
    console.log(key, value);
  });

  const { nama_siswa, nisn_siswa, nama_orang_tua_siswa, nama_sekolah_siswa } =
    req.body;

  const checkLayanan = await LayananKjp.findOne({ nisn_siswa: nisn_siswa });
  if (checkLayanan) {
    if(req.files && req.files[0]){
        fs.unlink(req.files[0].path, (err) => {
            if (err) console.log("gagal hapus file")
        })
    }

    console.log("Data sudah ada");
    return res.redirect("/layanan/kjp");
  }

  foto = req.files[0].filename;

  await LayananKjp.create({
    foto_siswa: foto,
    nama_siswa: nama_siswa,
    nisn_siswa: nisn_siswa,
    nama_orang_tua_siswa: nama_orang_tua_siswa,
    nama_sekolah_siswa: nama_sekolah_siswa,
  });

  res.redirect("/layanan/kjp");
}