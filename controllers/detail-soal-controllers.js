const Soal = require("../models/Soal")
const HasilSoal = require("../models/HasilSoal")
const ExcelJS = require("exceljs")

const {asyncHandler} = require("../utils/async-handler")

module.exports.detailSoal = asyncHandler(async (req, res) => {
    const {id_soal} = req.params

    const soal = await Soal.findById(id_soal)
    const jumlah_soal = soal.soal.length

    const hasilSoal = await HasilSoal.find({id_soal: soal._id}).populate("id_siswa")

    res.render("detail-soal", {soal, jumlah_soal, hasilSoal})
})

module.exports.downloadHasilSoal = asyncHandler(async (req, res) => {
  const { id_soal } = req.params;

  const soal = await Soal.findById(id_soal);
  if (!soal) {
    return res.status(404).send("Soal tidak ditemukan.");
  }

  const hasilSoal = await HasilSoal.find({ id_soal: soal._id }).populate("id_siswa");

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Hasil Soal");

  sheet.columns = [
    { header: "Nama Murid", key: "nama", width: 25 },
    { header: "NISN", key: "nisn", width: 20 },
    { header: "Nilai", key: "nilai", width: 10 },
    { header: "Keluar Tab", key: "keluarTab", width: 20 },
    { header: "Status", key: "status", width: 25 },
    { header: "Tanggal Mengerjakan", key: "tanggal", width: 22 },
  ];

  // Bold header
  sheet.getRow(1).font = { bold: true };

  hasilSoal.forEach((h) => {
    const siswa = h.id_siswa;

    sheet.addRow({
      nama: siswa ? siswa.name : "-",
      nisn: siswa ? siswa.nisn : "-",
      nilai: h.nilai,
      keluarTab: h.keluarTab ? `Keluar tab (${h.jumlahKeluarTab}x)` : "Tidak keluar",
      status: h.ditutupPaksa ? "Tab ditutup paksa" : "Selesai normal",
      tanggal: h.createdAt ? new Date(h.createdAt).toLocaleString("id-ID") : "-",
    });
  });

  const namaFile = `hasil-${soal.judul.replace(/[^a-z0-9]/gi, "_")}.xlsx`;

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", `attachment; filename="${namaFile}"`);

  await workbook.xlsx.write(res);
  res.end();
});