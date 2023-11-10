const mongoose = require('mongoose')

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
        })
        console.log("connected to mongodb")
    } catch (error) {
        console.log("not connected to mongodb")
    }
}

module.exports = ConnectDb