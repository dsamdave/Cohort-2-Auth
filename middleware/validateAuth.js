const jwt = require("jsonwebtoken")
const Users = require("../model/authModel")


const validateToken = async(req, res, next)=>{

    try {

        const tk = req.header("Authorization")

        if(!tk){
            return res.status(401).json({message: "Access Denied!"})
        }

        const tkk = tk.split(" ")
    
        const token = tkk[1]
    
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

        console.log({decoded})

        if(!decoded){
            return res.status(401).json({message: "Invalid Login details"})
        }

        const user = await Users.findOne({email: decoded.user.email})

        if(!user){
            return res.status(404).json({message: "User account not found!"})
        }
    
        req.user = user

        next()

        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }



}

module.exports = validateToken