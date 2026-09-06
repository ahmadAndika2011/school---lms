const mongoose = require("mongoose")

const fasilitasSchema = new mongoose.Schema({
    gambar: {
        type: String
    },
    nama: {
        type: String,
        required: true
    },
    jumlah: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Fasilitas", fasilitasSchema)