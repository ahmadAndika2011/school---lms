//? Check Role Admin
module.exports.checkRoleAdmin = (req, res, next) => {
    const user = req.session.user
    if(user.role !== "admin"){
        return res.redirect("/")
    }
    next()
}

//? Check Role Guru
module.exports.checkRoleGuru = (req, res, next) => {
    const user = req.session.user
    if(user.role !== "guru"){
        return res.redirect("/")
    }
    next()
}

//? check role siswa
module.exports.checkRoleSiswa = (req, res, next) => {
    const user = req.session.user
    if(user.role !== "siswa"){
        return res.redirect("/")
    }
    next()
}