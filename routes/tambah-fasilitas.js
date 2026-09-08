const express = require("express");
const router = express.Router();

const Fasilitas = require("../models/Fasilitas");

// helper: pilih emoji berdasarkan kata kunci di nama fasilitas
function getEmojiByNama(nama) {
  const map = {
    toilet: "🚽",
    wc: "🚽",
    kamar: "🚽",
    perpustakaan: "📚",
    library: "📚",
    lapangan: "🏟️",
    olahraga: "🏀",
    basket: "🏀",
    "sepak bola": "⚽",
    kantin: "🍽️",
    kelas: "🏫",
    laboratorium: "🔬",
    lab: "🔬",
    komputer: "💻",
    parkir: "🅿️",
    musholla: "🕌",
    masjid: "🕌",
    aula: "🎤",
    uks: "🏥",
    taman: "🌳",
  };

  const lower = nama.toLowerCase();
  for (const key in map) {
    if (lower.includes(key)) return map[key];
  }
  return "🏫";
}

router.get("/tambah-fasilitas", async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    const nama = "Toilet";
    await Fasilitas.create({
      gambar: getEmojiByNama("lab"),
      nama: `Kelas`,
      jumlah: "5",
    });

    return res.send("Success");
  } else {
    return res.send("Not Success");
  }
});

module.exports = router;