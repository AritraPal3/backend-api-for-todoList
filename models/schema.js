const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    "id": String,
    "creationDate": String,
    "taskName": String,
    "taskStatus": String,
    "completionDate": String,
})

const Task = new mongoose.model("task", taskSchema) 
module.exports = {
    Task
}