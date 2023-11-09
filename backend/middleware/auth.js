const jwt = require("jsonwebtoken")
const register = require("../Model/User")
require('dotenv').config();

const auth = async(req,res,next) => {
    let token;
    if(req.headers.authorization){
        try {
            token = req.headers.authorization
            if(token){
                token = token.split(" ")[1]
                const decode = jwt.verify(token,process.env.SECRET_KEY)
                const user = await register.findById(decode.id).select("-password")
                req.user = user
            }
            else{
                res.status(401).json({
                    success:false,
                    message: "No token provided, not token"
                })
            }
            next()
        } catch (error) {
            res.status(401).json({
                success: false,
                message:"Wrong token, token failed"
            })
        }
    }
    else {
        res.status(401).json({
            success: false,
            message: "No token provided, not authorized"
        });
    }
}


module.exports = auth