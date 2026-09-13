const mongoose = require("mongoose")

const hasilSoalSchema = new mongoose.Schema({
    id_siswa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Siswa",
        required: true
    },
    id_soal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Soal",
        required: true
    },
    jawaban: [
        {
            id_pertanyaan: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            jawaban_dipilih: {
                type: String,
                enum: ["a", "b", "c", "d", null],
                default: null
            },
            benar: {
                type: Boolean,
                required: true
            }
        }
    ],
    nilai: {
        type: Number,
        required: true
    }
}, { timestamps: true })

hasilSoalSchema.index({ id_siswa: 1, id_soal: 1 }, { unique: true })

module.exports = mongoose.model("HasilSoal", hasilSoalSchema)