const mongoose = require("mongoose")
require('dotenv').config()

const uri = process.env.CONNECTION_STRING

function ConnectDB() {
    try {
        mongoose.connect(uri)
        mongoose.connection.on("error",()=>{
            console.log("There is problem with your connection")
        })
        mongoose.connection.on("connected",()=>{
            console.log("Connection Successful")
        })
    }
    catch (err) {
        console.log("Please check your credentials or databse")
    }
}
module.exports ={
    ConnectDB
}