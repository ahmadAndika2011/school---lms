const path = require("path")
const multer = require("multer")

module.exports.createUploader = (folder) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `public/uploads/${folder}`)
        },
        filename: (req, file, cb) => {
            const unique = Date.now() + "-" + Math.round(Math.random(), 1e9)
            cb(null, unique + path.extname(file.originalname))
        }
    })
    
    return multer({storage})
}