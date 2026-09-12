const mongoose = require("mongoose")

const beritaSchema = new mongoose.Schema({
    gambar: [String],
    nama: {
        type: String,
        required: true
    },
    tanggal: {
        type: Date,
        required: true
    },
    deskripsi_singkat: {
        type: String,
        required: true
    },
    deskripsi_lengkap: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Berita", beritaSchema)