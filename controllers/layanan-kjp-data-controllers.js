const LayananKjp = require("../models/LayananKjp")

const {asyncHandler} = require("../utils/async-handler")

module.exports.layananKjpData = asyncHandler(async (req, res) => {
    const layananKjp = await LayananKjp.find({})

    res.render("layanan-kjp-data", {layananKjp})
})