const express = require("express");
const router = express.Router();

const Guru = require("../models/Guru");

router.get("/tambah-guru", async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    await Guru.create({
      nama: "andika",
      photo: "",
      nip: "0191",
      status: "pns",
      jenis_kelamin: "Laki-laki",
      jabatan: "presiden"
    });

    return res.send("Success");
  } else {
    return res.send("Not Success");
  }
});

module.exports = router;
