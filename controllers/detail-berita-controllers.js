const Berita = require("../models/Berita")
const {asyncHandler} = require("../utils/async-handler")

module.exports.detailBerita = asyncHandler(async (req, res) => {
    const {berita_id} = req.params
    const berita = await Berita.findById(berita_id)

    res.render("detail-berita", {berita})
})