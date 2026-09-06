const mongoose = require("mongoose")

const soalSchema = new mongoose.Schema({
    id_guru: {
        type: String,
        required: true
    },
    judul: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    soal: [
        {
            gambar: [String],
            pertanyaan: {
                type: String,
                required: true
            },
            jawaban: [
                {
                    pilihan: {
                        type: String,
                        enum: ["a", "b", "c", "d"]
                    },
                    text: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
})

module.exports = mongoose.model("Soal", soalSchema)