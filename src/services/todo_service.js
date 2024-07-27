const { Task } = require("../../models/todo_model")

async function Save(details) {
    let task = new Task({
        id: details.id,
        creationDate: details.creationDate,
        taskName: details.taskName,
        taskStatus: details.taskStatus,
        completionDate: details.completionDate,
        deadlineDate: details.deadlineDate,
    })
    try {
        await task.save()
        console.log("New Task Has Been Added")
    }
    catch (err) {
        "Entry Could Not Be saved, check your database connection"
    }
}

async function Edit(id, new_val, date) {
    try {
        const data = await Task.findOneAndUpdate({ id: id }, { taskName: new_val, deadlineDate: date })
        console.log(data)
        return data;
    }
    catch (err) {
        console.log("Cannot edit the particular record")
    }

}

async function Delete(id) {
    try {
        const data = await Task.find({ id: id });
        console.log(data)
        console.log(await Task.deleteOne({ id: id }))
    }
    catch (err) {
        console.log("Cannot not delete the particular record")
    }
}

async function getData(options) {  // expr not able to parse parameters

    let sortBy=""
    console.log(options.sortBy, options.statusFilter)
    if (options.sortBy!="") {
        sortBy = ((options.sortBy == "Deadline Date") ? {"deadlineDate":1} : {"taskName":1});
    }

    // let allStatus = { $in: ["To-do", "In-Progress", "Completed"] }

    try {

        if (options.sortBy!="" && options.statusFilter!="") {
            console.log("1",sortBy)
            const data = await Task.find({ taskName: { $regex: `${options.search}` },taskStatus: `${options.statusFilter}` }).collation({locale:'en'}).sort(sortBy)
            return data
        }
        else if(options.sortBy!="" && options.statusFilter==""){
            console.log("2")
            const data = await Task.find({ taskName: { $regex: `${options.search}` }}).collation({locale:'en',strength: 2}).sort(sortBy)
            return data
        }
        else if(options.sortBy=="" && options.statusFilter!=""){
            console.log("3")
            const data = await Task.find({ taskName: { $regex: `${options.search}` }, taskStatus: `${options.statusFilter}` }).lean()
            return data
        }
        else if(options.sortBy=="" && options.statusFilter=="") {
            console.log("4")
            const data = await Task.find({ taskName: { $regex: `${options.search}` }}).lean()
            return data;
        }
    }
    catch (err) {
        console.log("Could not fetcth all records")
    }
}

async function EditStatus(data) {
    try {
        const { id, taskStatus, completionDate } = data
        const val = await Task.findOneAndUpdate({ id: id }, { taskStatus: taskStatus, completionDate: completionDate })
        console.log(val)
        return val;
    }
    catch (err) {
        console.log("Cannot edit the particular record")
    }
}

module.exports = {
    Save, Edit, Delete, getData, EditStatus,
}