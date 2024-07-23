const express = require("express")
const bp=require("body-parser")
require('dotenv').config()
const { ConnectDB } = require("./config/db.js")
const app = express()

app.use(express.json()) 
app.use(bp.urlencoded({ extended: true }));

const router =require("./src/routes/main.js")

//db-connection
ConnectDB();

//setting routes
app.use("/",router)

//port setting
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

