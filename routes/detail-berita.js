const express = require("express")
const router = express.Router()

const controllers = require("../controllers/detail-berita-controllers")

router.get("/berita/detail/:berita_id", controllers.detailBerita)

// const Berita = require("../models/Berita")

// router.get("/berita/detail/:berita_id", async (req, res) => {
//     const {berita_id} = req.params
//     const berita = await Berita.findById(berita_id)

//     res.render("detail-berita", {berita})
// })

module.exports = router