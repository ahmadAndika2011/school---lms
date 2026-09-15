const LayananKjp = require("../models/LayananKjp")

module.exports.layananKjpData = async (req, res) => {
    const layananKjp = await LayananKjp.find({})

    res.render("layanan-kjp-data", {layananKjp})
}