const LayananPip = require("../models/LayananPip")

const {asyncHandler} = require("../utils/async-handler")

module.exports.layananPipData = asyncHandler(async (req, res) => {
    const layananPip = await LayananPip.find({})

    res.render("layanan-pip-data", {layananPip})
})
