const mongoose = require("mongoose")

const ekstrakulikulerSchema = new mongoose.Schema({
    nama_ekstrakulikuler: {
        type: String,
        required: true
    },
    jadwal: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Ekstrakulikuler", ekstrakulikulerSchema)