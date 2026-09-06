const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Terjadi kesalahan saat logout.");
    }

    res.clearCookie("connect.sid"); // sesuaikan nama cookie kalau kamu custom di session config
    res.redirect("/");
  });
});

module.exports = router;