const LayananPip = require("../models/LayananPip")

module.exports.layananPipData = async (req, res) => {
    const layananPip = await LayananPip.find({})

    res.render("layanan-pip-data", {layananPip})
}
