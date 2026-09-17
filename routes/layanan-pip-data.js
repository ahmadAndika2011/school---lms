const express = require("express")
const router = express.Router()

const controllers = require("../controllers/layanan-pip-data-controllers")
const {checkAuth} = require("../middleware/check-auth")
const {checkRole} = require("../middleware/check-role")

router.get("/layanan/pip/data", checkAuth, checkRole("admin"), controllers.layananPipData)

// const LayananPip = require("../models/LayananPip")

// router.get("/layanan/pip/data", async (req, res) => {
//     const layananPip = await LayananPip.find({})

//     res.render("layanan-pip-data", {layananPip})
// })

module.exports = router