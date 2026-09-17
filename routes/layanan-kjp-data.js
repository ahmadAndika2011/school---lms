const express = require("express")
const router = express.Router()

const controllers = require("../controllers/layanan-kjp-data-controllers")
const {checkAuth} = require("../middleware/check-auth")

router.get("/layanan/kjp/data", checkAuth, controllers.layananKjpData)

// const LayananKjp = require("../models/LayananKjp")

// router.get("/layanan/kjp/data", async (req, res) => {
//     const layananKjp = await LayananKjp.find({})

//     res.render("layanan-kjp-data", {layananKjp})
// })

module.exports = router