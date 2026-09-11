const mongoose = require("mongoose")

const LayananPipSchema = new mongoose.Schema({
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

module.exports = mongoose.model("LayananPip", LayananPipSchema)