const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const bcrypt = require("bcrypt")

router.get("/tambah-admin", async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    const hashedPassword = await bcrypt.hash("11032011", 10);

    await Admin.create({
      username: "admin_sekolah",
      password: hashedPassword,
      nama: "andika"
    });

    return res.send("Success");
  } else {
    return res.send("Not Success");
  }
});

module.exports = router;
