const LayananPpdb = require("../models/LayananPpdb");
const fs = require("fs")

module.exports.getLayananPpdb = (req, res) => {
  res.render("layanan-ppdb");
}

module.exports.postLayananPpdb = async (req, res) => {
  Object.entries(req.body).forEach(([key, value]) => {
    console.log(key, value);
  });

  const { nama_siswa, nisn_siswa, nama_orang_tua_siswa, nama_sekolah_siswa } =
    req.body;
  foto = req.files[0].filename;

  const checkLayanan = await LayananPpdb.findOne({ nisn_siswa: nisn_siswa });
  if (checkLayanan) {
    if(req.files && req.files[0]){
        fs.unlink(req.files[0].path, (err) => {
            console.log("gagal hapus file: ", err)
        })
    }
    console.log("Data sudah ada");
    return res.redirect("/layanan/ppdb");
  }

  await LayananPpdb.create({
    foto_siswa: foto,
    nama_siswa: nama_siswa,
    nisn_siswa: nisn_siswa,
    nama_orang_tua_siswa: nama_orang_tua_siswa,
    nama_sekolah_siswa: nama_sekolah_siswa,
  });

  res.redirect("/layanan/ppdb");
}