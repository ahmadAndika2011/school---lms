const express = require("express");
const router = express.Router();

const LayananKjp = require("../models/LayananKjp");
const path = require("path");
const fs = require("fs");

router.delete("/layanan/kjp/data/delete", async (req, res) => {
  const { id } = req.body;
  const kjpData = await LayananKjp.findById(id);
  if (kjpData.foto_siswa) {
    const pathGambar = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      "gambar-siswa-layanan-kjp",
      kjpData.foto_siswa,
    );

    fs.unlink(pathGambar, (err) => {
      if (err) {
        console.log("error: ", err);
      }
    });
  }

  await LayananKjp.findByIdAndDelete(id);
  res.redirect("/layanan/kjp/data");
});

module.exports = router;
