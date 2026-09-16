const express = require("express");
const router = express.Router();

const Ekstrakulikuler = require("../models/Ekstrakulikuler");
const Fasilitas = require("../models/Fasilitas");
const Guru = require("../models/Guru");
const Siswa = require("../models/Siswa");
const Berita = require("../models/Berita");
const LayananPpdb = require("../models/LayananPpdb");
const LayananKjp = require("../models/LayananKjp");
const LayananPip = require("../models/LayananPip");

// Susun ringkasan data sekolah jadi teks yang bisa dipahami AI
function buildContext({ ekstrakulikuler, fasilitas, guru, jumlahGuru, jumlahSiswa, berita, layananPpdb, layananKjp, layananPip }) {
  const daftarEkskul = ekstrakulikuler
    .map((e) => `- ${e.nama_ekstrakulikuler} (Jadwal: ${e.jadwal})`)
    .join("\n") || "Belum ada data ekstrakulikuler.";

  const daftarFasilitas = fasilitas
    .map((f) => `- ${f.nama} (${f.jumlah})`)
    .join("\n") || "Belum ada data fasilitas.";

  const daftarGuru = guru
    .map((g) => `- ${g.nama} (${g.jabatan})`)
    .join("\n") || "Belum ada data guru.";

  const daftarBerita = berita
    .map((b) => `- ${b.nama}: ${b.deskripsi_singkat}`)
    .join("\n") || "Belum ada berita terbaru.";

  return `
=== DATA SEKOLAH SMA NUSANTARA ===

Statistik:
- Jumlah murid aktif: ${jumlahSiswa}
- Jumlah tenaga pengajar: ${jumlahGuru}

Ekstrakulikuler yang tersedia:
${daftarEkskul}

Fasilitas sekolah:
${daftarFasilitas}

Sebagian tenaga pengajar:
${daftarGuru}

Berita & pengumuman terbaru:
${daftarBerita}

Layanan digital yang tersedia:
- PPDB (Penerimaan Peserta Didik Baru): pendaftaran siswa baru secara online, akses di /layanan/ppdb
- KJP (Kartu Jakarta Pintar): bantuan biaya pendidikan bagi siswa yang memenuhi syarat, akses di /layanan/kjp
- PIP (Program Indonesia Pintar): bantuan untuk kelangsungan pendidikan siswa, akses di /layanan/pip

=== AKHIR DATA SEKOLAH ===
`.trim();
}

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }

    const [ekstrakulikuler, fasilitas, guru, siswa, berita, layananPpdb, layananKjp, layananPip] =
      await Promise.all([
        Ekstrakulikuler.find({}),
        Fasilitas.find({}),
        Guru.find({}),
        Siswa.find({}),
        Berita.find({}).sort({ tanggal: -1 }).limit(6),
        LayananPpdb.find({}),
        LayananKjp.find({}),
        LayananPip.find({}),
      ]);

    const context = buildContext({
      ekstrakulikuler,
      fasilitas,
      guru,
      jumlahGuru: guru.length,
      jumlahSiswa: siswa.length,
      berita,
      layananPpdb,
      layananKjp,
      layananPip,
    });

    const systemPrompt = `
Kamu adalah "Asisten AI Sekolah", asisten virtual resmi untuk website SMA Nusantara.

PERAN DAN GAYA BICARA:
- Bicara dalam Bahasa Indonesia yang ramah, sopan, dan mudah dipahami, seperti staf tata usaha yang membantu siswa/orang tua.
- Jawaban singkat, padat, langsung ke inti — hindari basa-basi panjang.
- Gunakan sapaan hangat tapi tidak berlebihan (tidak perlu "Kak" di setiap kalimat).
- Jika relevan, gunakan poin-poin (bullet) agar mudah dibaca.

ATURAN MENJAWAB:
1. Jawab HANYA berdasarkan data sekolah yang diberikan di bawah ini. Jangan mengarang informasi (nama guru, jumlah, jadwal, dll) yang tidak ada di data.
2. Jika pertanyaan di luar konteks sekolah (misalnya soal umum, hiburan, matematika, dsb), jawab singkat lalu arahkan kembali: "Maaf, saya hanya bisa membantu seputar informasi SMA Nusantara ya."
3. Jika informasi yang ditanyakan tidak ada di data sekolah, katakan dengan jujur bahwa data tersebut belum tersedia, dan sarankan menghubungi pihak sekolah langsung (misalnya lewat menu "Hubungi Kami" atau tombol Chat WhatsApp).
4. Untuk pertanyaan soal pendaftaran (PPDB), KJP, atau PIP, jelaskan secara singkat dan arahkan ke halaman layanan terkait.
5. Jangan pernah memberikan data pribadi/sensitif siswa atau guru (nomor telepon, alamat, NISN, dll) meskipun ditanya.

${context}
`.trim();

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message.trim() },
          ],
          temperature: 0.4,
          max_tokens: 400,
        }),
      }
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", errText);
      return res.status(502).json({ error: "Gagal menghubungi AI." });
    }

    const data = await groqRes.json();
    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "Maaf, saya tidak bisa menjawab saat ini.";

    res.json({ reply });
  } catch (err) {
    console.error("AI chat error:", err);
    res.status(500).json({ error: "Terjadi kesalahan di server." });
  }
});

module.exports = router;