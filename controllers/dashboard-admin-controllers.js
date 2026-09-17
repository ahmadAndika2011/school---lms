const Admin = require("../models/Admin");
const Berita = require("../models/Berita");
const Ekstrakulikuler = require("../models/Ekstrakulikuler");
const Fasilitas = require("../models/Fasilitas");
const Guru = require("../models/Guru");
const Siswa = require("../models/Siswa");
const Soal = require("../models/Soal");
const LayananPpdb = require("../models/LayananPpdb");
const LayananKjp = require("../models/LayananKjp");
const LayananPip = require("../models/LayananPip");

const {asyncHandler} = require("../utils/async-handler")

module.exports.dashboardAdmin = asyncHandler(async (req, res) => {
  const user = req.session.user;
  const admin = await Admin.findOne({ password: user.password });

  const berita = await Berita.find({});
  const ekstrakulikuler = await Ekstrakulikuler.find({});
  const fasilitas = await Fasilitas.find({});
  const guru = await Guru.find({});
  const siswa = await Siswa.find({});
  const soal = await Soal.find({});
  const layananPpdb = await LayananPpdb.find({});
  const layananKjp = await LayananKjp.find({});
  const layananPip = await LayananPip.find({});

  res.render("dashboard-admin", { admin, berita, ekstrakulikuler, fasilitas, guru, siswa, soal, layananPpdb, layananKjp, layananPip });
})
