const LayananPpdb = require("../models/LayananPpdb")

module.exports.layananPpdbData = async (req, res) => {
    const layananPpdb = await LayananPpdb.find({})

    res.render("layanan-ppdb-data", {layananPpdb})
}