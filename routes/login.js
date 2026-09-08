const express = require("express")
const router = express.Router()

const Siswa = require("../models/Siswa")
const bcrypt = require("bcrypt")
const Guru = require("../models/Guru")

router.get("/login", (req,res) => {
    res.render("login")
})

router.post("/login", async (req, res) => {
    const {username, password, remember} = req.body

    if(username.includes("guru")){
        const guru = await Guru.findOne({nama: username})
        if(!guru){
            console.log("Account tidak ada")
            return res.redirect("/login")
        }

        const isMatch = guru.nip === password
        if(!isMatch){
            console.log("NIP salah")
            return res.redirect("/login")
        }

        req.session.user = {
            id: guru._id,
            name: guru.name,
            nip: guru.nip,
            role: "guru"
        }

        return res.redirect("/")
    }

    const siswa = await Siswa.findOne({name: username})
    if(!siswa){
        console.log("siswa tidak ada")
        return res.redirect("/")
    }
    
    const isMatch = await bcrypt.compare(password, siswa.password)
    if(!isMatch){
        console.log("password salah")
        return res.redirect("/")
    }

    if(remember){
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7
    }

    req.session.user = {
        id: siswa._id,
        name: siswa.name,
        email: siswa.email,
        role: "siswa"
    }
    res.redirect("/")
})

module.exports = router