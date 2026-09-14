const Guru = require("../models/Guru")

module.exports.guru = async (req, res) => {
    const guru = await Guru.find({})

    res.render("guru", {guru})
}