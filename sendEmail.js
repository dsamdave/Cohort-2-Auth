const nodemailer = require("nodemailer")

// infoe@youhtrive.com
// zoho sendgrid, gsuite, microsoft360

const sendUserEmail = async(userEmail )=>{
    
    try {

        // Login Details
    
        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        })
        // Details to send
    
        const detailsToSend = {
            from: process.env.Email,
            to: userEmail,
            subject: "YOUR LOGIN DETAILS",
            html: `<div>
            <h1>Hello, user</h1>
            <h1>Password: gyfvhgfvjghgb</h1>
            <h1>Email: ${userEmail}</h1>
            <h1>Thanks</h1>
            </div>`
        }
        const result = await mailTransporter.sendMail(detailsToSend)
    
        
    } catch (error) {
        console.log(error)
    }
}




module.exports = sendUserEmail