const express = require("express")
const router = express.Router()

const controllers = require("../controllers/layanan-ppdb-data-controllers")

router.get("/layanan/ppdb/data", controllers.layananPpdbData)

// const LayananPpdb = require("../models/LayananPpdb")

// router.get("/layanan/ppdb/data", async (req, res) => {
//     const layananPpdb = await LayananPpdb.find({})

//     res.render("layanan-ppdb-data", {layananPpdb})
// })

module.exports = router