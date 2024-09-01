const mongoose = require("mongoose")


const connectToDatabase = async()=>{
    mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
        console.log("MongoDB connected!")
    })

}

module.exports = connectToDatabase