const mongoose = require('mongoose')

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION)
        console.log("connected to mongodb")
    } catch (error) {
        console.log("not connected to mongodb")
    }
}

module.exports = ConnectDb