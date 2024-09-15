const express = require("express");
const connectToDatabase = require("./db");
const Users = require("./model/authModel");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const { validateRegistration, validateLogin } = require("./middleware/validations");
const jwt = require("jsonwebtoken");
const validateToken = require("./middleware/validateAuth");
const sendUserEmail = require("./sendEmail");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

// ConnectTo DATABASE

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.get("/", (req, res) => {
  return res.status(200).json({ 
    message: "Welcome to Youthrive Backend!" ,
    message2: "Testing CICD!" 
  });
});

app.post("/register", validateRegistration, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const exisitingUser = await Users.findOne({ email });

  if (exisitingUser) {
    return res.status(400).json({ message: "User Account Already exist!" });
  }

  // Hash password

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new Users({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // Send Users Email

  await sendUserEmail(email)

  return res.status(200).json({
    message: "Successful",
    user: newUser,
  });
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findById(id);

    return res.status(200).json({
      message: "Successful",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


// www.yourwebsite.com/api

// MVC Rule
// Models
// Views = Routes
// Controllers

app.post("/login", validateLogin, async (req, res)=>{

try {

    const { email, password } = req.body

    const user = await Users.findOne({email})

    if(!user){
        return res.status(404).json({message: "User account not found"})
    }

    const isMatched = bcrypt.compare(password, user.password )

    if(!isMatched){
        return res.status(400).json({message: "Incorrect password or email!"})
    }

    // Generating Tokens
    // Access Token

    const accessToken = jwt.sign({user}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "30m"})

    const refreshToken = jwt.sign({user}, `${process.env.REFRESH_TOKEN}`, {expiresIn: "5m"})


    await sendUserEmail(email)

    return res.status(200).json({
        message: "Login Successful",
        accessToken,
        user
    })
    
} catch (error) {
    return res.status(500).json({message: error.message})
}

})



// Protected Routes
app.post("/auth", validateToken, (req, res)=>{

  return res.status(200).json({
    message: "Successful",
    user: req.user
  })
})






