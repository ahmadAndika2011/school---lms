const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const Siswa = require("../models/Siswa");
const fs = require("fs");
const https = require("https");
const path = require("path");
const multer = require("multer");

const client = new OAuth2Client(process.env.CLIENT_ID);

const UPLOAD_DIR = path.join(__dirname, "../public/uploads/gambar-siswa");
const DEFAULT_GAMBAR = "/uploads/foto-siswa/template.jpg";

// Pastikan folder tujuan ada saat server start
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// ================================
// KONFIGURASI MULTER (UPLOAD FILE)
// ================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // maks 2MB, samakan dengan validasi di frontend
  fileFilter: function (req, file, cb) {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Format file tidak didukung."));
    }
    cb(null, true);
  },
});

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Gagal download gambar, status ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close(resolve);
        });

        fileStream.on("error", (err) => {
          fs.unlink(filepath, () => reject(err));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

router.get("/signup", (req, res) => {
  res.render("signup", {
    cid: process.env.CLIENT_ID,
  });
});

router.post("/signup/google", async (req, res) => {
  try {
    if (req.session.user) {
      return res.redirect("/");
    }

    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Credential Google tidak ditemukan",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;
    const picture = payload.picture;

    const existingUser = await Siswa.findOne({ email: email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Email ini sudah terdaftar. Silakan login.",
      });
    }

    req.session.googleSignup = {
      googleId: googleId,
      email: email,
      picture: picture,
    };

    res.json({
      success: true,
      email: email,
    });
  } catch (error) {
    console.error("Google signup error:", error);

    res.status(500).json({
      success: false,
      message: "Google signup gagal",
    });
  }
});

// ================================
// upload.single("foto_profil") wajib dipasang di sini
// "foto_profil" harus SAMA PERSIS dengan atribut name="" di <input type="file"> pada form
// ================================
router.post("/signup/complete", upload.single("foto_profil"), async (req, res) => {
  try {
    const googleSignup = req.session.googleSignup;

    if (!googleSignup) {
      return res
        .status(401)
        .send("Session Google tidak ditemukan. Silakan signup ulang.");
    }

    const { name, password, jenis_kelamin, nisn, tempat_lahir, tanggal_lahir } =
      req.body;

    if (
      !name ||
      !password ||
      !jenis_kelamin ||
      !nisn ||
      !tempat_lahir ||
      !tanggal_lahir
    ) {
      return res.status(400).send("Semua field harus diisi.");
    }

    const nisnExists = await Siswa.findOne({ nisn: nisn });
    if (nisnExists) {
      return res.status(400).send("NISN sudah digunakan.");
    }

    // ================================
    // INI BAGIAN UTAMA: mengambil gambar hasil upload
    // Setelah melewati middleware `upload.single("foto_profil")`,
    // multer menaruh info file di `req.file` (bukan req.body)
    // ================================
    let gambarPath = DEFAULT_GAMBAR;

    if (req.file) {
      // User upload foto sendiri lewat form -> pakai file itu
      gambarPath = `/uploads/gambar-siswa/${req.file.filename}`;
    } else if (googleSignup.picture) {
      // Kalau tidak upload, fallback ke foto profil Google
      const fileName = `${Date.now()}-${googleSignup.googleId}.jpg`;
      const filePath = path.join(UPLOAD_DIR, fileName);

      try {
        await downloadImage(googleSignup.picture, filePath);
        gambarPath = `/uploads/gambar-siswa/${fileName}`;
      } catch (err) {
        console.error("Gagal download foto profil Google:", err);
        // Tetap lanjut pakai gambar default kalau download gagal
      }
    }

    const siswa = await Siswa.create({
      name: name,
      email: googleSignup.email,
      password: password,
      googleId: googleSignup.googleId,
      gambar: gambarPath,
      jenis_kelamin: jenis_kelamin,
      nisn: nisn,
      tempat_lahir: tempat_lahir,
      tanggal_lahir: tanggal_lahir,
    });

    delete req.session.googleSignup;

    req.session.user = {
      id: siswa._id,
      name: siswa.name,
      email: siswa.email,
      gambar: siswa.gambar,
    };

    res.redirect("/");
  } catch (error) {
    console.error("Complete signup error:", error);

    if (error instanceof multer.MulterError || error.message === "Format file tidak didukung.") {
      return res.status(400).send(error.message);
    }

    res.status(500).send("Terjadi kesalahan saat membuat akun.");
  }
});

module.exports = router;