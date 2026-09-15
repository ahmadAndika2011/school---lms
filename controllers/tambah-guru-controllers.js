const Guru = require("../models/Guru");
const bcrypt = require("bcrypt")

module.exports.getTambahGuru = async (req, res) => {
  res.render("tambah-guru")
}

module.exports.postTambahGuru = async (req, res) => {
  const photo = req.files[0].filename
  const {username, password, nama, nip, jabatan, jenis_kelamin, status} = req.body
  const hashPassword = await bcrypt.hash(password, 10)

  await Guru.create({
    username: username,
    password: hashPassword,
    nama: nama,
    photo: photo,
    nip: nip,
    status: status,
    jenis_kelamin: jenis_kelamin,
    jabatan: jabatan
  })

  res.redirect("/tambah-guru")
}