const mongoose = require("mongoose");

const siswaSchema = new mongoose.Schema(
  {
    gambar: {
      type: String,
      default: "/uploads/foto-siswa/template.jpg",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    jenis_kelamin: {
      type: String,
      enum: ["Laki-laki", "perempuan"],
    },
    nisn: {
      type: Number,
      required: true,
      unique: true,
    },
    tempat_lahir: {
      type: String,
      required: true,
    },
    tanggal_lahir: {
      type: Date,
      required: true,
    },
    data_nilai: [
      {
        title: {
          type: String,
        },
        nilai: [
          {
            mapel: {
              type: String,
            },
            nilai: {
              type: Number,
            },
          },
        ],
      },
    ],
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Siswa", siswaSchema);
