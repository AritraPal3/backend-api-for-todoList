const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    "id": String,
    "creationDate": String,
    "taskName": String,
    "taskStatus": String,
    "completionDate": String,
    "deadlineDate":Date,
})

const Task = new mongoose.model("Task", taskSchema) 
module.exports = {
    Task
}