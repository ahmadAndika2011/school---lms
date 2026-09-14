const Guru = require("../models/Guru")

module.exports.detailGuru = async (req, res) => {
    const {id_guru} = req.params
    const guru = await Guru.findById(id_guru)
    res.render("detail-guru", {guru})
}