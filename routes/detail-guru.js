// guru/detail/6aa604dbee3fe24ca9a34b4a
const express = require("express")
const router = express.Router()

const controllers = require("../controllers/detail-guru-controllers")
const {checkAuth} = require("../middleware/check-auth")
const {checkRole} = require("../middleware/check-role")

router.get("/guru/detail/:id_guru", checkAuth, checkRole("admin"), controllers.detailGuru)

// const Guru = require("../models/Guru")

// router.get("/guru/detail/:id_guru", async (req, res) => {
//     const {id_guru} = req.params
//     const guru = await Guru.findById(id_guru)
//     res.render("detail-guru", {guru})
// })

module.exports = router