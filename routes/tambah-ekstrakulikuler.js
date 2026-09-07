const express = require("express");
const router = express.Router();

const Ekstrakulikuler = require("../models/Ekstrakulikuler");

router.get("/tambah-ekstrakulikuler", async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    await Ekstrakulikuler.create({
      nama_ekstrakulikuler: "Voli",
      jadwal: "Sabtu",
    });

    return res.send("Success");
  } else {
    return res.send("Not Success");
  }
});

module.exports = router;
