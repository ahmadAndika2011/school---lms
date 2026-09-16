const fs = require("fs");
const path = require("path");
const HasilSoal = require("../models/HasilSoal");

const BATAS_WAKTU = 15 * 60 * 1000; // 30 detik (TESTING) — ubah ke 15 * 60 * 1000 untuk production

async function hapusVideoKadaluarsa() {
    const batasWaktu = new Date(Date.now() - BATAS_WAKTU);

    const hasilSoalExpired = await HasilSoal.find({
        video: { $ne: null },
        videoUploadedAt: { $lte: batasWaktu }
    });

    for (const hasil of hasilSoalExpired) {
        const filePath = path.join(__dirname, "../public/uploads/video-kerjakan-soal", hasil.video);

        fs.unlink(filePath, (err) => {
            if (err && err.code !== "ENOENT") {
                console.error("Gagal hapus video:", filePath, err.message);
            }
        });

        hasil.video = null;
        hasil.videoUploadedAt = null;
        await hasil.save();
    }
}

module.exports = hapusVideoKadaluarsa;