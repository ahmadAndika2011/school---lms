const Guru = require("../models/Guru")

const {asyncHandler} = require("../utils/async-handler")

module.exports.detailGuru = asyncHandler(async (req, res) => {
    const {id_guru} = req.params
    const guru = await Guru.findById(id_guru)
    res.render("detail-guru", {guru})
})