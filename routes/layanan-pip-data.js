const express = require("express")
const router = express.Router()

const controllers = require("../controllers/layanan-pip-data-controllers")
const {checkAuth} = require("../middleware/check-auth")

router.get("/layanan/pip/data", checkAuth, controllers.layananPipData)

// const LayananPip = require("../models/LayananPip")

// router.get("/layanan/pip/data", async (req, res) => {
//     const layananPip = await LayananPip.find({})

//     res.render("layanan-pip-data", {layananPip})
// })

module.exports = router