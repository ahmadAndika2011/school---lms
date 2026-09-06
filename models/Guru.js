const mongoose = require("mongoose")

const guruSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    nip: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    jenis_kelamin: {
        type: String,
        enum: ["Laki-laki", "perempuan"]
    },
    jabatan: {
        type: String,
        required: true
    }
})

module.exports = mongoose.Schema("Guru", guruSchema)