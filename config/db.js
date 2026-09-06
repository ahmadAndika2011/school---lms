const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)

        console.log("MONGODB CONNECTED!!!")
    } catch (error){
        console.error(
            "MongoDB error:",
            error.message
        )
    }
}

module.exports = connectDB