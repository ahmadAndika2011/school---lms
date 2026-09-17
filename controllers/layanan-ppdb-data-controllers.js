const LayananPpdb = require("../models/LayananPpdb")

const {asyncHandler} = require("../utils/async-handler")

module.exports.layananPpdbData = asyncHandler(async (req, res) => {
    const layananPpdb = await LayananPpdb.find({})

    res.render("layanan-ppdb-data", {layananPpdb})
})