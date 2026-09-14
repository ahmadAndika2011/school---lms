const Berita = require("../models/Berita")

module.exports.detailBerita = async (req, res) => {
    const {berita_id} = req.params
    const berita = await Berita.findById(berita_id)

    res.render("detail-berita", {berita})
}