const Soal = require("../models/Soal");
const {asyncHandler} = require("../utils/async-handler")

module.exports.getTambahSoal = (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.render("tambah-soal");
}

module.exports.postTambahSoal = asyncHandler(async (req, res) => {
  const { judul_soal, deskripsi } = req.body;

  const soalMentah = req.body.soal || {};

  const gambarPerSoal = {};
  (req.files || []).forEach((file) => {
    const match = file.fieldname.match(/^soal\[(\d+)\]\[gambar\]\[\]$/);
    if (match) {
      const idx = match[1];
      if (!gambarPerSoal[idx]) gambarPerSoal[idx] = [];
      gambarPerSoal[idx].push(file.filename);
    }
  });

  const daftarSoal = Object.keys(soalMentah)
    .sort((a, b) => Number(a) - Number(b))
    .map((idx) => {
      const item = soalMentah[idx];
      const pilihanObj = item.pilihan || {};

      const jawaban = Object.keys(pilihanObj).map((huruf) => ({
        pilihan: huruf,
        text: pilihanObj[huruf],
      }));

      return {
        gambar: gambarPerSoal[idx] || [],
        pertanyaan: item.pertanyaan,
        jawaban: jawaban,
        jawaban_benar: item.jawaban_benar,
      };
    });

  if (daftarSoal.length === 0) {
    return res.status(400).send("Minimal harus ada 1 soal.");
  }

  await Soal.create({
    id_guru: req.session.user.id,
    judul: judul_soal,
    deskripsi,
    soal: daftarSoal,
  });

  res.redirect("/profile-guru");
});