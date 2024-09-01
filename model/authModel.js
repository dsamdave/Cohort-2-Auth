
const mongoose = require("mongoose")


const authSchema = new mongoose.Schema({
    // userID: {type: String},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, required: true},
    
    
}, {
    timestamps: true,

})


const Users = new mongoose.model("Users", authSchema)


module.exports = Users