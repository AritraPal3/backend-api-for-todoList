const Task  = require("../models/schema")

function Save(details) {
    let task = {
        id: details.id,
        creationDate: details.completionDate,
        taskName: details.taskName,
        taskStatus: details.taskStatus,
        completionDate: details.completionDate
    }
    try {
        task.save();
        console.log("New Task Has Been Added")
    }
    catch (err) {
        "Entry Could Not Be saved, check your database connection"
    }
}

async function Edit(id, new_val) {
    try {
        const data = await Task.find({ id: id }).exec();
        console.log(data)
    }
    catch (err) {
        console.log("Cannot edit the particular record")
    }

}

async function Delete(id) {
    try {
        const data = await Task.find({ id: id }).exec();
        console.log(data)
        console.log(await Task.deleteOne({id:id}))
    }
    catch (err) {
        console.log("Cannot not fetcth the particular record")
    }
}

async function getData() {
    try {
        const data = await Task.find();
        console.log(data)
    }
    catch (err) {
        console.log("Could not fetcth all records")
    }
}

module.exports={
    Save,Edit,Delete,getData
}