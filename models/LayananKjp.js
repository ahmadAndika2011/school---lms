const mongoose = require("mongoose")

const LayananKjpSchema = new mongoose.Schema({
    foto_siswa: {
        type: String,
        required: true
    },
    nama_siswa: {
        type: String,
        required: true
    },
    nisn_siswa: {
        type: String,
        required: true
    },
    nama_orang_tua_siswa: {
        type: String,
        required: true
    },
    nama_sekolah_siswa: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("LayananKjp", LayananKjpSchema)