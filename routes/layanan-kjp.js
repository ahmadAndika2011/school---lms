const express = require("express");
const router = express.Router();

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/gambar-siswa-layanan-kjp")
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9)

        cb(null, uniqueName + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

router.get("/layanan/kjp", (req, res) => {
  res.render("layanan-kjp");
});

router.post("/layanan/kjp", upload.any(), (req, res) => {
    // console.log(req.body)
  Object.entries(req.body).forEach(([key, value]) => {
    console.log(key, value);
  });

  res.redirect("/layanan/kjp");
});

module.exports = router;
