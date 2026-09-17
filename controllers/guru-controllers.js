const Guru = require("../models/Guru")

const {asyncHandler} = require("../utils/async-handler")

module.exports.guru = asyncHandler(async (req, res) => {
    const guru = await Guru.find({})

    res.render("guru", {guru})
})