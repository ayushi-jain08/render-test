const express = require("express")
const app = express()
const cors = require("cors")
const ConnectDb = require('./Config/db')
const user = require("./Routes/User")
const fileUpload  = require('express-fileupload')
require('dotenv').config()
const auth = require("./middleware/auth")
const bodyParser = require('body-parser');
const product = require("./Routes/Product")
const review = require("./Routes/Reviews")
const category = require("./Routes/Category")
const subCategory = require("./Routes/SubCateory")
const chat = require('./Routes/Chat')
const message = require('./Routes/Message')


const myMiddleware = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next(); // Call next to pass control to the next middleware
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(myMiddleware);
app.use(cors())
app.use(express.json())
// app.use(auth)

ConnectDb()

app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles:true
}))

app.get("/", async(req,res) => {
    res.send("hello user")
})
app.use("/api", user)
app.use("/api",product)
app.use("/api",review)
app.use('/api', category )
app.use('/api', subCategory)
app.use("/api/chat", chat)
app.use("/api/message", message)


app.listen(process.env.PORT, () => {
    console.log("sever start")
})