const Guru = require("../models/Guru")
const Soal = require("../models/Soal")

const {asyncHandler} = require("../utils/async-handler")

module.exports.profileGuru = asyncHandler(async (req, res) => {
    const user = req.session.user
    const guru = await Guru.findOne({nip: user.nip})
    const soal = await Soal.find({id_guru: guru._id}).populate("id_guru")

    res.render("profile-guru", {guru, soal})
})