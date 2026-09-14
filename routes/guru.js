const express = require("express")
const router = express.Router()

const controllers = require("../controllers/guru-controllers")

router.get("/guru", controllers.guru)

// const Guru = require("../models/Guru")

// router.get("/guru", async (req, res) => {
//     const guru = await Guru.find({})

//     res.render("guru", {guru})
// })

module.exports = router