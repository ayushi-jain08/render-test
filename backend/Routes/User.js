const express = require("express");
const router = express();
const User = require("../Model/User");
const cloudinary = require("cloudinary").v2;
const bycrypt = require("bcrypt");
const GenerateToken = require("../Utils/GenerateToken")
const auth = require("../middleware/auth")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const bycrpyt = require("bcrypt")

cloudinary.config({
  cloud_name: "ayushicoder",
  api_key: "132166264294926",
  api_secret: "xm4XtEkHIpQH4YVsdcflComdxpU",
});

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }

    })
// =============REGISTER USER===================
router.post("/register", async (req, res) => {
    
  if (!req.files || !req.files.photo) {
    return res.status(400).json({ message: "Image file is required." });
  }
  // if (
  //   !name ||
  //   !email ||
  //   !phone ||
  //   !work ||
  //   !password 
  // ) {
  //   return res.status(422).json({ error: "Plz filled the field properly" });
  // }
  const file = req.files.photo;
  const folder = "images";

  const result = cloudinary.uploader.upload(file.tempFilePath, { folder });

  try {
    let users = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      work: req.body.work,
      password: req.body.password,
      pic: (await result).url,
    });
    console.log((await result).url);
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      res.status(400).send({
        success: false,
        message: "This email already exist",
      });
    } else {
      const user_data = await users.save();
      res.status(200).json(user_data);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "failed to registered",
    });
    console.log(error);
  }
});

// ==================LOGIN USER=========================
router.post("/login", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    const UserLogin = await User.findOne({ email: email });
    console.log(UserLogin);

    if (!UserLogin) {
      return res.status(422).json({ error: "invalid email" });
    } else {
      const isMatch = await bycrypt.compare(password, UserLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credential" });
      } else {
        res.status(200).json({
          _id: UserLogin._id,
          name: UserLogin.name,
          email: UserLogin.email,
          phone: UserLogin.phone,
          work: UserLogin.work,
          pic: UserLogin.pic,
          token: GenerateToken(UserLogin._id)
        });
      }
     
    }
  } catch (error) {
    console.log(error);
  }
});
// =====================UPDATE USER PROFILE=====================
router.patch("/updateduser", auth, async(req,res) => {
  try {
    let token;
    const users = await User.findById(req.user._id)
    if (!users) {
      return res.status(404).json({ message: "User not found." });
    }
      // if (!req.files || !req.files.photo) {
      //   return res.status(400).json({ message: "Image file is required." });
      // }
     
      // const file = req.files.photo;
      // const folder = "images";
      //   const result = await cloudinary.uploader.upload(file.tempFilePath, { folder });

        users.name = req.body.name || users.name;
        users.email = req.body.email || users.email;
        users.phone = req.body.phone || users.phone;
        users.work = req.body.work || users.work;
        // user.pic = result.url;
        if (req.body.password) {
          users.password = req.body.password;  
         }
        
          const updatedUser = await users.save();
  
          res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            work: updatedUser.work,
            // pic: updatedUser.pic,
            token: GenerateToken(updatedUser._id),
          });
  } catch (error) {
     console.error("Error processing request:", error);
    res.status(500).json({ message: "Server error." });
  }
})
// ==================PROFILE OF USER=======================
router.get("/abouts",auth,async(req,res) => {
  try {
    const user = await User.findById(req.user._id);
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      work: user.work,
      pic: user.pic
      // Avoid sending the password in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})


// ===============RESET PASSWORD LINK===================
router.post("/sendpasswordlink", async(req,res) => {
  const {email} = req.body

 if(!email){
  res.status(401).json({message:"Enter Your Email"})
 }
 try {
  const userFind = await User.findOne({email})
  
  const token = GenerateToken(userFind._id)

const setUserToken = await User.findByIdAndUpdate({_id:userFind._id},{verifytoken:token},{new:true})

if(setUserToken){
  const mailOptions = {
        from: "ayushijain0807@gmail.com",
        to: email,
        subject: "Sending Email For Password Reset",
       text: `This Link valid For 5 MINUTES http://localhost:3000/passwordreset/${userFind._id}/${setUserToken.verifytoken}`
      }
        transporter.sendMail(mailOptions, (error, info) => {
      if(error){
        console.log("Error", error)
        res.status(401).json({message: "email not send"})
      }else{
        console.log("Email sent" + info.response)
        res.status(200).json({status:201,message: "email send successfully"})

      }
    })
}
 } catch (error) {
  res.status(401).json({message: "Invalid User"})
 }
})


// ============VERIFY USER=====================
router.get("/forgotpassword/:id/:token", async(req,res) => {
  const {id,token} = req.params
  
  try {
    const validUser = await User.findOne({_id:id,verifytoken:token})

  const verifyToken = jwt.verify(token,process.env.SECRET_KEY)

  if(validUser && verifyToken.id){
    res.status(200).json({validUser})
  }else{
    res.status(401).json({status:401,message:"user not Valid"})
  }
  } catch (error) {
    res.status(401).json({status:401,error})
  }
})


router.post("/:id/:token", async(req,res) => {
  const {id,token} = req.params

  const {password} = req.body

  try {
    const validUser = await User.findOne({_id:id,verifytoken:token})

  const verifyToken = jwt.verify(token,process.env.SECRET_KEY)

  console.log('validUser:', validUser);
        console.log('verifyToken:', verifyToken);

  if(validUser && verifyToken.id){
  const newPassword = await bycrpyt.hash(password,12)

  const setNewUserPassword = await User.findByIdAndUpdate({_id:id},{password:newPassword})

  setNewUserPassword.save()
  res.status(201).json({status:201,setNewUserPassword})
  }else{
    res.status(401).json({status:401,message:"user not exist"})
  }
  } catch (error) {
    res.status(401).json({status:401,error})
  }
} )


// =====================GET ALL USER======================
router.get("/alluser",auth, async(req,res) => {
  const keyword = req.query.search
  ? {
    $or:[
      {name: {$regex:req.query.search, $options: "i"}},
      {email: {$regex: req.query.search, $options: "i"}},
    ]
  } : {}

const user = await User.find(keyword).find({ _id: { $ne: req.user._id } })

res.status(200).json(user)
})
module.exports = router;


